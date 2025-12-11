# Supabase Realtime Features Implementation

This guide explains how to implement real-time features in your LMS using Supabase Realtime, enabling live updates for user progress, notifications, collaborative learning, and more.

## Current State Analysis

Currently, the LMS has no real-time capabilities. All updates require manual page refreshes or periodic polling. With Supabase Realtime, we can implement:

1. Live progress tracking
2. Real-time notifications
3. Collaborative learning features
4. Live leaderboard updates
5. Instant messaging/chat
6. Real-time course updates

## Supabase Realtime Capabilities

Supabase Realtime provides:
- **Database Changes**: Listen to row-level changes in PostgreSQL
- **Presence**: Track who's online and their status
- **Broadcast**: Send messages to connected clients
- **Channels**: Organize real-time communication

## Implementation Plan

### 1. Enable Realtime in Supabase

First, enable Realtime in your Supabase project:

1. Go to Supabase Dashboard → Database → Replication
2. Enable Realtime for the tables you want to listen to:
   - `user_enrollments` (for progress tracking)
   - `user_lesson_completions` (for lesson completion)
   - `notifications` (for user notifications)
   - `messages` (for chat functionality)
   - `leaderboard` (for leaderboards)

### 2. Create Notifications System

Add a notifications table to the schema:

```sql
-- Add to supabase-full-schema.sql
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) CHECK (type IN ('info', 'success', 'warning', 'error')) DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  related_entity_type VARCHAR(50), -- 'course', 'lesson', 'achievement', etc.
  related_entity_id UUID, -- ID of the related entity
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Service role can access all notifications" ON notifications
  FOR ALL USING (CURRENT_ROLE = 'service_role');

-- Grant permissions
GRANT ALL ON notifications TO authenticated;
```

### 3. Create Messages Table for Chat

```sql
-- Add to supabase-full-schema.sql
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- For group chats or course discussions
CREATE TABLE IF NOT EXISTS discussion_threads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  created_by UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS thread_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  thread_id UUID REFERENCES discussion_threads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_discussion_threads_course_id ON discussion_threads(course_id);
CREATE INDEX IF NOT EXISTS idx_thread_messages_thread_id ON thread_messages(thread_id);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE thread_messages ENABLE ROW LEVEL SECURITY;

-- Policies for messages
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can insert their own messages" ON messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Service role can access all messages" ON messages
  FOR ALL USING (CURRENT_ROLE = 'service_role');

-- Policies for discussion threads
CREATE POLICY "Everyone can view active discussion threads" ON discussion_threads
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Authenticated users can create discussion threads" ON discussion_threads
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Thread creators can update their threads" ON discussion_threads
  FOR UPDATE USING (created_by = auth.uid());

-- Policies for thread messages
CREATE POLICY "Everyone can view thread messages" ON thread_messages
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM discussion_threads dt 
    WHERE dt.id = thread_messages.thread_id AND dt.is_active = TRUE
  ));

CREATE POLICY "Authenticated users can post in threads" ON thread_messages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON messages TO authenticated;
GRANT ALL ON discussion_threads TO authenticated;
GRANT ALL ON thread_messages TO authenticated;
```

### 4. Create Leaderboard View

```sql
-- Update the existing user_progress_summary view to support leaderboard
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  u.id as user_id,
  u.first_name,
  u.last_name,
  u.avatar,
  COUNT(ue.id) as courses_completed,
  COUNT(ucert.id) as certificates_earned,
  COALESCE(ls.total_time_spent, 0) as total_time_spent,
  COALESCE(ls.average_score, 0) as average_score,
  (COUNT(ue.id) * 100 + COUNT(ucert.id) * 50 + COALESCE(ls.total_time_spent, 0) * 0.1) as total_points
FROM users u
LEFT JOIN user_enrollments ue ON u.id = ue.user_id AND ue.completed_at IS NOT NULL
LEFT JOIN user_certificates ucert ON u.id = ucert.user_id
LEFT JOIN learning_stats ls ON u.id = ls.user_id
WHERE u.role = 'student' AND u.is_active = TRUE
GROUP BY u.id, u.first_name, u.last_name, u.avatar, ls.total_time_spent, ls.average_score
ORDER BY total_points DESC;
```

### 5. Frontend Realtime Implementation

Create a realtime service `frontend/src/services/realtimeService.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

class RealtimeService {
  constructor() {
    this.listeners = new Map();
  }

  // Listen to user progress updates
  subscribeToProgress(userId, callback) {
    const channel = supabase
      .channel('user-progress')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_enrollments',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new);
        }
      )
      .subscribe();

    this.listeners.set('progress', channel);
    return channel;
  }

  // Listen to lesson completions
  subscribeToLessonCompletion(userId, callback) {
    const channel = supabase
      .channel('lesson-completion')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_lesson_completions',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new);
        }
      )
      .subscribe();

    this.listeners.set('lesson-completion', channel);
    return channel;
  }

  // Listen to notifications
  subscribeToNotifications(userId, callback) {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new);
        }
      )
      .subscribe();

    this.listeners.set('notifications', channel);
    return channel;
  }

  // Listen to leaderboard updates
  subscribeToLeaderboard(callback) {
    const channel = supabase
      .channel('leaderboard')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_enrollments'
        },
        (payload) => {
          // Trigger leaderboard refresh
          callback(payload);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_enrollments'
        },
        (payload) => {
          // Trigger leaderboard refresh
          callback(payload);
        }
      )
      .subscribe();

    this.listeners.set('leaderboard', channel);
    return channel;
  }

  // Join a discussion thread
  joinDiscussionThread(threadId, userId, userName, callback) {
    const channel = supabase
      .channel(`thread:${threadId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'thread_messages',
          filter: `thread_id=eq.${threadId}`
        },
        (payload) => {
          callback(payload.new);
        }
      )
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        callback({ type: 'presence', users: presenceState });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Broadcast user join
          await channel.track({
            user_id: userId,
            user_name: userName,
            online_at: new Date().toISOString()
          });
        }
      });

    this.listeners.set(`thread:${threadId}`, channel);
    return channel;
  }

  // Send a message to a discussion thread
  async sendMessageToThread(threadId, userId, content) {
    const { data, error } = await supabase
      .from('thread_messages')
      .insert([
        {
          thread_id: threadId,
          sender_id: userId,
          content: content
        }
      ]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Get unread notifications count
  async getUnreadNotificationsCount(userId) {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      throw new Error(error.message);
    }

    return count;
  }

  // Unsubscribe from all listeners
  unsubscribeAll() {
    this.listeners.forEach((channel, key) => {
      supabase.removeChannel(channel);
    });
    this.listeners.clear();
  }

  // Unsubscribe from specific listener
  unsubscribe(key) {
    const channel = this.listeners.get(key);
    if (channel) {
      supabase.removeChannel(channel);
      this.listeners.delete(key);
    }
  }
}

export default new RealtimeService();
```

### 6. Notification Service

Create a notification service `backend/services/notificationService.js`:

```javascript
const { supabaseAdmin } = require('../supabaseAuth');

class NotificationService {
  // Create a notification for a user
  async createNotification(userId, title, message, type = 'info', relatedEntityType = null, relatedEntityId = null) {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .insert([
        {
          user_id: userId,
          title,
          message,
          type,
          related_entity_type: relatedEntityType,
          related_entity_id: relatedEntityId
        }
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }

  // Create course completion notification
  async createCourseCompletionNotification(userId, courseId, courseTitle) {
    return await this.createNotification(
      userId,
      'Course Completed!',
      `Congratulations! You've completed "${courseTitle}".`,
      'success',
      'course',
      courseId
    );
  }

  // Create lesson completion notification
  async createLessonCompletionNotification(userId, lessonTitle) {
    return await this.createNotification(
      userId,
      'Lesson Completed!',
      `Great job! You've completed "${lessonTitle}".`,
      'success',
      'lesson',
      null
    );
  }

  // Create achievement unlocked notification
  async createAchievementNotification(userId, achievementTitle) {
    return await this.createNotification(
      userId,
      'Achievement Unlocked!',
      `You've unlocked the "${achievementTitle}" achievement!`,
      'success',
      'achievement',
      null
    );
  }

  // Create certificate earned notification
  async createCertificateNotification(userId, courseTitle) {
    return await this.createNotification(
      userId,
      'Certificate Earned!',
      `You've earned a certificate for completing "${courseTitle}".`,
      'success',
      'certificate',
      null
    );
  }

  // Create subscription renewal reminder
  async createSubscriptionReminder(userId, daysUntilExpiry) {
    return await this.createNotification(
      userId,
      'Subscription Reminder',
      `Your subscription expires in ${daysUntilExpiry} days. Renew to continue learning.`,
      'warning',
      'subscription',
      null
    );
  }

  // Get user notifications
  async getUserNotifications(userId, limit = 10) {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Mark all notifications as read
  async markAllAsRead(userId) {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

module.exports = new NotificationService();
```

### 7. Update Progress Tracking with Realtime

Modify the existing progress tracking to emit realtime events:

```javascript
// In backend/services/progressService.js (new file)
const { supabaseAdmin } = require('../supabaseAuth');
const notificationService = require('./notificationService');

class ProgressService {
  // Update lesson completion
  async completeLesson(userId, lessonId) {
    // Check if already completed
    const { data: existing } = await supabaseAdmin
      .from('user_lesson_completions')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (existing) {
      return existing;
    }

    // Mark lesson as completed
    const { data, error } = await supabaseAdmin
      .from('user_lesson_completions')
      .insert([
        {
          user_id: userId,
          lesson_id: lessonId
        }
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    // Get lesson details for notification
    const { data: lesson } = await supabaseAdmin
      .from('lessons')
      .select('title')
      .eq('id', lessonId)
      .single();

    // Create notification
    await notificationService.createLessonCompletionNotification(userId, lesson.title);

    // Check if module is completed
    await this.checkModuleCompletion(userId, lessonId);

    return data[0];
  }

  // Check if module is completed
  async checkModuleCompletion(userId, lessonId) {
    // Get module for this lesson
    const { data: lesson } = await supabaseAdmin
      .from('lessons')
      .select('module_id')
      .eq('id', lessonId)
      .single();

    // Get all lessons in this module
    const { data: moduleLessons } = await supabaseAdmin
      .from('lessons')
      .select('id')
      .eq('module_id', lesson.module_id);

    // Get completed lessons for this user in this module
    const { data: completedLessons } = await supabaseAdmin
      .from('user_lesson_completions')
      .select('lesson_id')
      .eq('user_id', userId)
      .in('lesson_id', moduleLessons.map(l => l.id));

    // If all lessons completed, mark module as completed
    if (moduleLessons.length > 0 && completedLessons.length === moduleLessons.length) {
      await this.completeModule(userId, lesson.module_id);
    }
  }

  // Complete module
  async completeModule(userId, moduleId) {
    // Check if already completed
    const { data: existing } = await supabaseAdmin
      .from('user_module_completions')
      .select('*')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .maybeSingle();

    if (existing) {
      return existing;
    }

    // Mark module as completed
    const { data, error } = await supabaseAdmin
      .from('user_module_completions')
      .insert([
        {
          user_id: userId,
          module_id: moduleId
        }
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    // Get module details
    const { data: module } = await supabaseAdmin
      .from('modules')
      .select('title, course_id')
      .eq('id', moduleId)
      .single();

    // Update course progress
    await this.updateCourseProgress(userId, module.course_id);

    return data[0];
  }

  // Update course progress
  async updateCourseProgress(userId, courseId) {
    // Get all modules in this course
    const { data: courseModules } = await supabaseAdmin
      .from('modules')
      .select('id')
      .eq('course_id', courseId);

    // Get completed modules for this user in this course
    const { data: completedModules } = await supabaseAdmin
      .from('user_module_completions')
      .select('module_id')
      .eq('user_id', userId)
      .in('module_id', courseModules.map(m => m.id));

    // Calculate progress percentage
    const progress = courseModules.length > 0 
      ? Math.round((completedModules.length / courseModules.length) * 100) 
      : 0;

    // Update enrollment progress
    const { data: enrollment, error } = await supabaseAdmin
      .from('user_enrollments')
      .update({ progress: progress })
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    // If progress is 100%, mark course as completed
    if (progress === 100) {
      await this.completeCourse(userId, courseId);
    }

    return enrollment[0];
  }

  // Complete course
  async completeCourse(userId, courseId) {
    // Update enrollment with completion timestamp
    const { data: enrollment, error } = await supabaseAdmin
      .from('user_enrollments')
      .update({ 
        completed_at: new Date(),
        progress: 100
      })
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    // Get course details
    const { data: course } = await supabaseAdmin
      .from('courses')
      .select('title')
      .eq('id', courseId)
      .single();

    // Create completion notification
    await notificationService.createCourseCompletionNotification(userId, courseId, course.title);

    // Issue certificate
    await this.issueCertificate(userId, courseId);

    // Update learning stats
    await this.updateLearningStats(userId);

    return enrollment[0];
  }

  // Issue certificate
  async issueCertificate(userId, courseId) {
    // Create certificate
    const { data: certificate, error: certError } = await supabaseAdmin
      .from('certificates')
      .insert([
        {
          user_id: userId,
          course_id: courseId,
          issued_at: new Date()
        }
      ])
      .select();

    if (certError) {
      throw new Error(certError.message);
    }

    // Link to user
    const { error: linkError } = await supabaseAdmin
      .from('user_certificates')
      .insert([
        {
          user_id: userId,
          certificate_id: certificate[0].id,
          issued_at: new Date()
        }
      ]);

    if (linkError) {
      throw new Error(linkError.message);
    }

    // Get course details for notification
    const { data: course } = await supabaseAdmin
      .from('courses')
      .select('title')
      .eq('id', courseId)
      .single();

    // Create certificate notification
    await notificationService.createCertificateNotification(userId, course.title);

    return certificate[0];
  }

  // Update learning stats
  async updateLearningStats(userId) {
    // Get user's completed courses
    const { count: coursesCompleted } = await supabaseAdmin
      .from('user_enrollments')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .not('completed_at', 'is', null);

    // Get user's certificates
    const { count: certificatesEarned } = await supabaseAdmin
      .from('user_certificates')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    // Update learning stats
    const { data, error } = await supabaseAdmin
      .from('learning_stats')
      .upsert({
        user_id: userId,
        courses_completed: coursesCompleted,
        certificates_earned: certificatesEarned,
        last_active_date: new Date()
      })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }
}

module.exports = new ProgressService();
```

### 8. Frontend Integration Examples

#### Real-time Progress Tracker Component

```jsx
// In frontend/src/components/ProgressTracker.jsx
import React, { useEffect, useState } from 'react';
import realtimeService from '../services/realtimeService';

const ProgressTracker = ({ userId, courseId }) => {
  const [progress, setProgress] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Subscribe to progress updates
    const progressChannel = realtimeService.subscribeToProgress(userId, (newProgress) => {
      if (newProgress.course_id === courseId) {
        setProgress(newProgress.progress);
      }
    });

    // Subscribe to notifications
    const notificationChannel = realtimeService.subscribeToNotifications(userId, (notification) => {
      setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep only 10 latest
    });

    // Cleanup on unmount
    return () => {
      realtimeService.unsubscribe('progress');
      realtimeService.unsubscribe('notifications');
    };
  }, [userId, courseId]);

  return (
    <div className="progress-tracker">
      <h3>Course Progress</h3>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
      
      {notifications.length > 0 && (
        <div className="notifications">
          <h4>Recent Achievements</h4>
          {notifications.map(notification => (
            <div key={notification.id} className={`notification ${notification.type}`}>
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
```

#### Real-time Leaderboard Component

```jsx
// In frontend/src/components/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import realtimeService from '../services/realtimeService';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial leaderboard
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard'); // This would be an Edge Function
        const data = await response.json();
        setLeaders(data.leaders);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setLoading(false);
      }
    };

    fetchLeaderboard();

    // Subscribe to leaderboard updates
    const channel = realtimeService.subscribeToLeaderboard(() => {
      // Refresh leaderboard when changes occur
      fetchLeaderboard();
    });

    // Cleanup on unmount
    return () => {
      realtimeService.unsubscribe('leaderboard');
    };
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div className="leaderboard">
      <h3>Learning Leaderboard</h3>
      <ol>
        {leaders.map((leader, index) => (
          <li key={leader.user_id} className="leader-item">
            <span className="rank">#{index + 1}</span>
            <img src={leader.avatar} alt={leader.first_name} className="avatar" />
            <span className="name">{leader.first_name} {leader.last_name}</span>
            <span className="points">{Math.round(leader.total_points)} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
```

#### Real-time Discussion Component

```jsx
// In frontend/src/components/DiscussionThread.jsx
import React, { useEffect, useState } from 'react';
import realtimeService from '../services/realtimeService';

const DiscussionThread = ({ threadId, userId, userName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Join the discussion thread
    const channel = realtimeService.joinDiscussionThread(
      threadId, 
      userId, 
      userName, 
      (message) => {
        if (message.type === 'presence') {
          // Update online users list
          const users = Object.values(message.users).flat();
          setOnlineUsers(users);
        } else {
          // Add new message
          setMessages(prev => [...prev, message]);
        }
      }
    );

    // Fetch existing messages
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/discussion/${threadId}/messages`); // Edge Function
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    // Cleanup on unmount
    return () => {
      realtimeService.unsubscribe(`thread:${threadId}`);
    };
  }, [threadId, userId, userName]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await realtimeService.sendMessageToThread(threadId, userId, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="discussion-thread">
      <div className="online-users">
        <h4>Online Users ({onlineUsers.length})</h4>
        <ul>
          {onlineUsers.map(user => (
            <li key={user.user_id}>{user.user_name}</li>
          ))}
        </ul>
      </div>
      
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className="message">
            <div className="message-header">
              <span className="sender">{message.sender_name}</span>
              <span className="time">{new Date(message.created_at).toLocaleTimeString()}</span>
            </div>
            <div className="content">{message.content}</div>
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default DiscussionThread;
```

## Benefits of Realtime Implementation

1. **Enhanced User Experience**: Instant feedback on actions
2. **Increased Engagement**: Live updates encourage continued interaction
3. **Collaborative Learning**: Real-time discussions and group activities
4. **Motivation**: Live leaderboards and achievement notifications
5. **Efficiency**: Eliminates need for manual refreshing
6. **Communication**: Instant messaging and notifications
7. **Community Building**: Presence indicators show who's online

## Performance Considerations

1. **Connection Management**: Properly unsubscribe from channels when not needed
2. **Bandwidth Usage**: Only listen to relevant changes
3. **Fallback Mechanisms**: Graceful degradation when realtime fails
4. **Rate Limiting**: Prevent excessive notifications or updates
5. **Caching**: Cache frequently accessed data to reduce database queries

## Security Considerations

1. **Row Level Security**: Ensure users only receive updates for their data
2. **Authentication**: Verify user identity before subscribing to channels
3. **Data Filtering**: Never expose sensitive information through realtime updates
4. **Input Validation**: Sanitize all user inputs for messages and notifications
5. **Rate Limiting**: Prevent abuse through excessive realtime subscriptions

## Monitoring and Analytics

1. **Connection Metrics**: Track realtime connection success/failure rates
2. **Message Volume**: Monitor volume of realtime messages
3. **Latency**: Measure time from event to delivery
4. **User Engagement**: Track how realtime features affect user retention
5. **Error Tracking**: Log and monitor realtime-related errors

This implementation provides a robust foundation for real-time features in your LMS, enhancing user engagement and creating a more dynamic learning environment.