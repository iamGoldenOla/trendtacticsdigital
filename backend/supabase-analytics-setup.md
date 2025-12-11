# Supabase Analytics Configuration for Learning Insights

This guide explains how to configure Supabase Analytics to gain valuable insights into user behavior, learning patterns, course performance, and business metrics for your LMS.

## Current Analytics Situation

Currently, the LMS has limited analytics capabilities:
- Basic quiz result tracking in `quiz_results` table
- Manual analysis of user data
- No automated reporting or dashboards
- Limited insight into user engagement and learning patterns

## Supabase Analytics Capabilities

Supabase provides several analytics options:
1. **Database Views**: Pre-computed analytics through SQL views
2. **Supabase Dashboard**: Built-in visualization tools
3. **Third-party Integrations**: Connect to BI tools like Metabase, Power BI
4. **Custom Dashboards**: Build analytics interfaces with Supabase data
5. **Event Tracking**: Log user actions for behavioral analysis

## Analytics Implementation Plan

### 1. Enhanced Database Views

We've already created some analytical views. Let's enhance them:

```sql
-- Enhanced user progress summary with more metrics
CREATE OR REPLACE VIEW user_analytics AS
SELECT 
  u.id as user_id,
  u.first_name,
  u.last_name,
  u.email,
  u.country,
  u.role,
  u.created_at as user_since,
  COUNT(ue.id) as total_enrollments,
  COUNT(CASE WHEN ue.completed_at IS NOT NULL THEN 1 END) as completed_courses,
  COUNT(ucert.id) as certificates_earned,
  COALESCE(ls.total_time_spent, 0) as total_minutes_learned,
  COALESCE(ls.courses_completed, 0) as courses_completed_stat,
  COALESCE(ls.certificates_earned, 0) as certificates_stat,
  COALESCE(ls.average_score, 0) as average_quiz_score,
  COALESCE(ls.streak_days, 0) as current_streak,
  ls.last_active_date,
  -- Calculated metrics
  ROUND(COALESCE(ls.total_time_spent, 0) / NULLIF(COUNT(ue.id), 0), 2) as avg_minutes_per_course,
  CASE 
    WHEN COUNT(ue.id) = 0 THEN 'No Activity'
    WHEN COUNT(CASE WHEN ue.completed_at IS NOT NULL THEN 1 END) = COUNT(ue.id) THEN 'Completed All'
    WHEN COUNT(CASE WHEN ue.completed_at IS NOT NULL THEN 1 END) > 0 THEN 'In Progress'
    ELSE 'Just Started'
  END as learning_status
FROM users u
LEFT JOIN user_enrollments ue ON u.id = ue.user_id
LEFT JOIN user_certificates ucert ON u.id = ucert.user_id
LEFT JOIN learning_stats ls ON u.id = ls.user_id
WHERE u.role = 'student' AND u.is_active = TRUE
GROUP BY u.id, u.first_name, u.last_name, u.email, u.country, u.role, u.created_at, 
         ls.total_time_spent, ls.courses_completed, ls.certificates_earned, 
         ls.average_score, ls.streak_days, ls.last_active_date;

-- Course performance analytics
CREATE OR REPLACE VIEW course_analytics AS
SELECT 
  c.id as course_id,
  c.title as course_title,
  c.category,
  c.level,
  c.price,
  c.created_at as created_date,
  u.first_name || ' ' || u.last_name as instructor_name,
  COUNT(ue.id) as total_enrollments,
  COUNT(CASE WHEN ue.completed_at IS NOT NULL THEN 1 END) as completions,
  ROUND(
    CASE 
      WHEN COUNT(ue.id) > 0 
      THEN (COUNT(CASE WHEN ue.completed_at IS NOT NULL THEN 1 END)::DECIMAL / COUNT(ue.id)::DECIMAL) * 100 
      ELSE 0 
    END, 2
  ) as completion_rate,
  ROUND(AVG(ue.progress), 2) as average_progress,
  MAX(ue.created_at) as last_enrollment,
  -- Revenue calculation (assuming all enrollments are paid)
  COUNT(ue.id) * c.price as potential_revenue,
  COUNT(CASE WHEN ue.completed_at IS NOT NULL THEN 1 END) * c.price as realized_revenue
FROM courses c
LEFT JOIN users u ON c.created_by = u.id
LEFT JOIN user_enrollments ue ON c.id = ue.course_id
WHERE c.is_published = TRUE
GROUP BY c.id, c.title, c.category, c.level, c.price, c.created_at, u.first_name, u.last_name;

-- Daily activity trends
CREATE OR REPLACE VIEW daily_activity AS
SELECT 
  DATE(created_at) as activity_date,
  COUNT(DISTINCT user_id) as active_users,
  COUNT(*) as total_actions,
  COUNT(CASE WHEN table_name = 'user_enrollments' THEN 1 END) as enrollments,
  COUNT(CASE WHEN table_name = 'user_lesson_completions' THEN 1 END) as lessons_completed,
  COUNT(CASE WHEN table_name = 'quiz_results' THEN 1 END) as quizzes_taken
FROM (
  SELECT user_id, created_at, 'user_enrollments' as table_name FROM user_enrollments
  UNION ALL
  SELECT user_id, created_at, 'user_lesson_completions' as table_name FROM user_lesson_completions
  UNION ALL
  SELECT NULL as user_id, created_at, 'quiz_results' as table_name FROM quiz_results
) all_activities
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY activity_date DESC;

-- User retention analysis
CREATE OR REPLACE VIEW user_retention AS
SELECT 
  DATE(u.created_at) as signup_cohort,
  COUNT(u.id) as cohort_size,
  COUNT(CASE WHEN ls.last_active_date >= DATE(u.created_at) + INTERVAL '1 day' THEN 1 END) as day_1_retained,
  COUNT(CASE WHEN ls.last_active_date >= DATE(u.created_at) + INTERVAL '7 days' THEN 1 END) as day_7_retained,
  COUNT(CASE WHEN ls.last_active_date >= DATE(u.created_at) + INTERVAL '30 days' THEN 1 END) as day_30_retained,
  ROUND(
    CASE 
      WHEN COUNT(u.id) > 0 
      THEN (COUNT(CASE WHEN ls.last_active_date >= DATE(u.created_at) + INTERVAL '1 day' THEN 1 END)::DECIMAL / COUNT(u.id)::DECIMAL) * 100 
      ELSE 0 
    END, 2
  ) as day_1_retention_rate,
  ROUND(
    CASE 
      WHEN COUNT(u.id) > 0 
      THEN (COUNT(CASE WHEN ls.last_active_date >= DATE(u.created_at) + INTERVAL '7 days' THEN 1 END)::DECIMAL / COUNT(u.id)::DECIMAL) * 100 
      ELSE 0 
    END, 2
  ) as day_7_retention_rate,
  ROUND(
    CASE 
      WHEN COUNT(u.id) > 0 
      THEN (COUNT(CASE WHEN ls.last_active_date >= DATE(u.created_at) + INTERVAL '30 days' THEN 1 END)::DECIMAL / COUNT(u.id)::DECIMAL) * 100 
      ELSE 0 
    END, 2
  ) as day_30_retention_rate
FROM users u
LEFT JOIN learning_stats ls ON u.id = ls.user_id
WHERE u.created_at >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY DATE(u.created_at)
ORDER BY signup_cohort DESC;

-- Geographic distribution
CREATE OR REPLACE VIEW geographic_distribution AS
SELECT 
  country,
  COUNT(*) as user_count,
  COUNT(CASE WHEN role = 'student' THEN 1 END) as student_count,
  COUNT(CASE WHEN role = 'instructor' THEN 1 END) as instructor_count,
  ROUND(AVG(ls.average_score), 2) as avg_quiz_score,
  SUM(ls.total_time_spent) as total_learning_minutes
FROM users u
LEFT JOIN learning_stats ls ON u.id = ls.user_id
WHERE u.is_active = TRUE
GROUP BY country
ORDER BY user_count DESC;
```

### 2. Event Tracking System

Create an events table to track user actions:

```sql
-- Add to supabase-full-schema.sql
CREATE TABLE IF NOT EXISTS user_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL, -- 'course_view', 'lesson_start', 'lesson_complete', etc.
  entity_type VARCHAR(50), -- 'course', 'lesson', 'module', etc.
  entity_id UUID, -- ID of the entity
  metadata JSONB, -- Additional event data
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_events_user_id ON user_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_events_event_type ON user_events(event_type);
CREATE INDEX IF NOT EXISTS idx_user_events_created_at ON user_events(created_at);
CREATE INDEX IF NOT EXISTS idx_user_events_entity ON user_events(entity_type, entity_id);

-- Enable RLS
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Service role can access all user events" ON user_events
  FOR ALL USING (CURRENT_ROLE = 'service_role');

-- Grant permissions
GRANT ALL ON user_events TO authenticated;
```

### 3. Event Tracking Service

Create `backend/services/eventTrackingService.js`:

```javascript
const { supabaseAdmin } = require('../supabaseAuth');

class EventTrackingService {
  // Track user event
  async trackEvent(userId, eventType, entityType = null, entityId = null, metadata = {}) {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_events')
        .insert([
          {
            user_id: userId,
            event_type: eventType,
            entity_type: entityType,
            entity_id: entityId,
            metadata: metadata
          }
        ])
        .select();

      if (error) throw new Error(error.message);

      return data[0];
    } catch (error) {
      console.error('Failed to track event:', error);
      // Don't throw error as tracking shouldn't break main functionality
      return null;
    }
  }

  // Track course view
  async trackCourseView(userId, courseId) {
    return await this.trackEvent(userId, 'course_view', 'course', courseId);
  }

  // Track lesson start
  async trackLessonStart(userId, lessonId) {
    return await this.trackEvent(userId, 'lesson_start', 'lesson', lessonId);
  }

  // Track lesson completion
  async trackLessonComplete(userId, lessonId) {
    return await this.trackEvent(userId, 'lesson_complete', 'lesson', lessonId);
  }

  // Track course enrollment
  async trackCourseEnrollment(userId, courseId) {
    return await this.trackEvent(userId, 'course_enrollment', 'course', courseId);
  }

  // Track course completion
  async trackCourseCompletion(userId, courseId) {
    return await this.trackEvent(userId, 'course_complete', 'course', courseId);
  }

  // Track quiz attempt
  async trackQuizAttempt(userId, quizData) {
    return await this.trackEvent(userId, 'quiz_attempt', 'quiz', null, quizData);
  }

  // Track certificate download
  async trackCertificateDownload(userId, certificateId) {
    return await this.trackEvent(userId, 'certificate_download', 'certificate', certificateId);
  }

  // Track ebook download
  async trackEbookDownload(userId, ebookName) {
    return await this.trackEvent(userId, 'ebook_download', 'ebook', null, { name: ebookName });
  }

  // Get user activity timeline
  async getUserActivityTimeline(userId, limit = 50) {
    const { data, error } = await supabaseAdmin
      .from('user_events')
      .select(`
        *,
        users(first_name, last_name)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);

    return data;
  }

  // Get popular courses
  async getPopularCourses(limit = 10) {
    const { data, error } = await supabaseAdmin
      .rpc('get_popular_courses', { limit_count: limit });

    if (error) throw new Error(error.message);

    return data;
  }

  // Get user engagement score
  async getUserEngagementScore(userId) {
    const { data, error } = await supabaseAdmin
      .rpc('calculate_user_engagement', { user_id: userId });

    if (error) throw new Error(error.message);

    return data;
  }
}

// Create RPC functions for complex analytics

// Function to get popular courses
/*
CREATE OR REPLACE FUNCTION get_popular_courses(limit_count INT DEFAULT 10)
RETURNS TABLE(
  course_id UUID,
  course_title TEXT,
  enrollment_count BIGINT,
  completion_rate NUMERIC,
  avg_progress NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.title,
    COUNT(ue.id) as enrollment_count,
    ROUND(
      CASE 
        WHEN COUNT(ue.id) > 0 
        THEN (COUNT(CASE WHEN ue.completed_at IS NOT NULL THEN 1 END)::DECIMAL / COUNT(ue.id)::DECIMAL) * 100 
        ELSE 0 
      END, 2
    ) as completion_rate,
    ROUND(AVG(ue.progress), 2) as avg_progress
  FROM courses c
  LEFT JOIN user_enrollments ue ON c.id = ue.course_id
  WHERE c.is_published = TRUE
  GROUP BY c.id, c.title
  ORDER BY enrollment_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
*/

// Function to calculate user engagement score
/*
CREATE OR REPLACE FUNCTION calculate_user_engagement(user_id UUID)
RETURNS TABLE(
  engagement_score NUMERIC,
  activity_level TEXT,
  last_active_days INTEGER
) AS $$
DECLARE
  total_activities INTEGER;
  days_since_last_activity INTEGER;
  score NUMERIC;
BEGIN
  -- Count total user activities in the last 30 days
  SELECT COUNT(*) INTO total_activities
  FROM user_events
  WHERE user_events.user_id = calculate_user_engagement.user_id
  AND created_at >= CURRENT_DATE - INTERVAL '30 days';
  
  -- Calculate days since last activity
  SELECT EXTRACT(DAY FROM (NOW() - MAX(created_at)))::INTEGER INTO days_since_last_activity
  FROM user_events
  WHERE user_events.user_id = calculate_user_engagement.user_id;
  
  -- Calculate engagement score (0-100)
  score := CASE
    WHEN total_activities >= 50 THEN 100
    WHEN total_activities >= 25 THEN 75
    WHEN total_activities >= 10 THEN 50
    WHEN total_activities >= 5 THEN 25
    ELSE 0
  END;
  
  -- Adjust score based on recent activity
  IF days_since_last_activity > 30 THEN
    score := score * 0.5;
  ELSIF days_since_last_activity > 14 THEN
    score := score * 0.75;
  ELSIF days_since_last_activity > 7 THEN
    score := score * 0.9;
  END IF;
  
  RETURN QUERY
  SELECT 
    score as engagement_score,
    CASE
      WHEN score >= 75 THEN 'Highly Engaged'
      WHEN score >= 50 THEN 'Moderately Engaged'
      WHEN score >= 25 THEN 'Lightly Engaged'
      ELSE 'Inactive'
    END as activity_level,
    COALESCE(days_since_last_activity, 999) as last_active_days;
END;
$$ LANGUAGE plpgsql;
*/

module.exports = new EventTrackingService();
```

### 4. Analytics Dashboard Service

Create `backend/services/analyticsDashboardService.js`:

```javascript
const { supabaseAdmin } = require('../supabaseAuth');

class AnalyticsDashboardService {
  // Get overview metrics
  async getOverviewMetrics() {
    try {
      // Total users
      const { count: totalUsers } = await supabaseAdmin
        .from('users')
        .select('*', { count: 'exact' })
        .eq('role', 'student')
        .eq('is_active', true);

      // Total courses
      const { count: totalCourses } = await supabaseAdmin
        .from('courses')
        .select('*', { count: 'exact' })
        .eq('is_published', true);

      // Total enrollments
      const { count: totalEnrollments } = await supabaseAdmin
        .from('user_enrollments')
        .select('*', { count: 'exact' });

      // Completed courses
      const { count: completedCourses } = await supabaseAdmin
        .from('user_enrollments')
        .select('*', { count: 'exact' })
        .not('completed_at', 'is', null);

      // Active users (last 30 days)
      const { count: activeUsers } = await supabaseAdmin
        .from('users')
        .select('*', { count: 'exact' })
        .gte('last_login', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      return {
        totalUsers,
        totalCourses,
        totalEnrollments,
        completedCourses,
        completionRate: totalEnrollments > 0 ? Math.round((completedCourses / totalEnrollments) * 100) : 0,
        activeUsers,
        activeUserRate: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0
      };
    } catch (error) {
      throw new Error(`Failed to fetch overview metrics: ${error.message}`);
    }
  }

  // Get user demographics
  async getUserDemographics() {
    try {
      const { data, error } = await supabaseAdmin
        .from('geographic_distribution')
        .select('*')
        .limit(10);

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch user demographics: ${error.message}`);
    }
  }

  // Get course performance
  async getCoursePerformance(limit = 10) {
    try {
      const { data, error } = await supabaseAdmin
        .from('course_analytics')
        .select('*')
        .order('total_enrollments', { ascending: false })
        .limit(limit);

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch course performance: ${error.message}`);
    }
  }

  // Get user retention data
  async getUserRetention() {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_retention')
        .select('*')
        .limit(30); // Last 30 cohorts

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch user retention: ${error.message}`);
    }
  }

  // Get daily activity trends
  async getDailyActivity(days = 30) {
    try {
      const { data, error } = await supabaseAdmin
        .from('daily_activity')
        .select('*')
        .limit(days);

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch daily activity: ${error.message}`);
    }
  }

  // Get top learners
  async getTopLearners(limit = 10) {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_analytics')
        .select('*')
        .order('total_minutes_learned', { ascending: false })
        .limit(limit);

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch top learners: ${error.message}`);
    }
  }

  // Get revenue metrics
  async getRevenueMetrics() {
    try {
      const { data, error } = await supabaseAdmin
        .from('course_analytics')
        .select('potential_revenue, realized_revenue');

      if (error) throw new Error(error.message);

      const totalPotential = data.reduce((sum, course) => sum + (course.potential_revenue || 0), 0);
      const totalRealized = data.reduce((sum, course) => sum + (course.realized_revenue || 0), 0);

      return {
        totalPotentialRevenue: totalPotential,
        totalRealizedRevenue: totalRealized,
        conversionRate: totalPotential > 0 ? Math.round((totalRealized / totalPotential) * 100) : 0
      };
    } catch (error) {
      throw new Error(`Failed to fetch revenue metrics: ${error.message}`);
    }
  }

  // Export data as CSV
  async exportData(viewName) {
    try {
      const { data, error } = await supabaseAdmin
        .from(viewName)
        .select('*');

      if (error) throw new Error(error.message);

      // Convert to CSV format
      if (data.length === 0) return '';

      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => 
        Object.values(row).map(value => 
          `"${String(value).replace(/"/g, '""')}"`
        ).join(',')
      );

      return [headers, ...rows].join('\n');
    } catch (error) {
      throw new Error(`Failed to export data: ${error.message}`);
    }
  }
}

module.exports = new AnalyticsDashboardService();
```

### 5. Edge Function for Analytics API

Create `supabase/functions/analytics/dashboard.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';
import { requireAuth, getUserFromToken } from '../_utils/auth.ts';

serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Check if user is admin
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (userData?.role !== 'admin' && userData?.role !== 'super_admin') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Forbidden: Admin access required' 
        }), 
        { 
          status: 403, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Parse query parameters
    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint') || 'overview';
    
    let data;
    
    switch (endpoint) {
      case 'overview':
        // Get overview metrics
        const [users, courses, enrollments] = await Promise.all([
          supabase.from('users').select('*', { count: 'exact' }).eq('role', 'student').eq('is_active', true),
          supabase.from('courses').select('*', { count: 'exact' }).eq('is_published', true),
          supabase.from('user_enrollments').select('*', { count: 'exact' })
        ]);
        
        const totalUsers = users.count || 0;
        const totalCourses = courses.count || 0;
        const totalEnrollments = enrollments.count || 0;
        
        data = {
          totalUsers,
          totalCourses,
          totalEnrollments,
          avgEnrollmentsPerUser: totalUsers > 0 ? (totalEnrollments / totalUsers).toFixed(2) : 0
        };
        break;
        
      case 'demographics':
        const { data: demographics } = await supabase
          .from('geographic_distribution')
          .select('*')
          .limit(10);
        data = demographics;
        break;
        
      case 'courses':
        const { data: courseData } = await supabase
          .from('course_analytics')
          .select('*')
          .order('total_enrollments', { ascending: false })
          .limit(10);
        data = courseData;
        break;
        
      default:
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Invalid endpoint' 
          }), 
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json' 
          }
        });
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    if (err.message === 'Missing or invalid Authorization header') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Unauthorized' 
        }), 
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    console.error('Analytics API Error:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

### 6. Frontend Analytics Dashboard

Create `frontend/src/components/AnalyticsDashboard.jsx`:

```jsx
import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState({});
  const [demographics, setDemographics] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAnalyticsData();
  }, [activeTab]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(
        `https://${process.env.SUPABASE_PROJECT_REF}.supabase.co/functions/v1/analytics/dashboard?endpoint=${activeTab}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        switch (activeTab) {
          case 'overview':
            setMetrics(data.data);
            break;
          case 'demographics':
            setDemographics(data.data);
            break;
          case 'courses':
            setCourses(data.data);
            break;
        }
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = async (viewName) => {
    try {
      const response = await fetch(
        `https://${process.env.SUPABASE_PROJECT_REF}.supabase.co/functions/v1/analytics/export?view=${viewName}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        // Create downloadable CSV file
        const blob = new Blob([data.csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${viewName}-export.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to export data:', error);
    }
  };

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="analytics-dashboard">
      <h1>Learning Analytics Dashboard</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'demographics' ? 'active' : ''}
          onClick={() => setActiveTab('demographics')}
        >
          Demographics
        </button>
        <button 
          className={activeTab === 'courses' ? 'active' : ''}
          onClick={() => setActiveTab('courses')}
        >
          Course Performance
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <div className="overview-metrics">
          <div className="metric-card">
            <h3>Total Users</h3>
            <p className="metric-value">{metrics.totalUsers || 0}</p>
          </div>
          
          <div className="metric-card">
            <h3>Total Courses</h3>
            <p className="metric-value">{metrics.totalCourses || 0}</p>
          </div>
          
          <div className="metric-card">
            <h3>Total Enrollments</h3>
            <p className="metric-value">{metrics.totalEnrollments || 0}</p>
          </div>
          
          <div className="metric-card">
            <h3>Avg. Enrollments per User</h3>
            <p className="metric-value">{metrics.avgEnrollmentsPerUser || 0}</p>
          </div>
          
          <div className="actions">
            <button onClick={() => exportData('user_analytics')}>
              Export User Data
            </button>
            <button onClick={() => exportData('course_analytics')}>
              Export Course Data
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'demographics' && (
        <div className="demographics-chart">
          <h2>User Distribution by Country</h2>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Users</th>
                <th>Students</th>
                <th>Instructors</th>
              </tr>
            </thead>
            <tbody>
              {demographics.map(country => (
                <tr key={country.country}>
                  <td>{country.country}</td>
                  <td>{country.user_count}</td>
                  <td>{country.student_count}</td>
                  <td>{country.instructor_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'courses' && (
        <div className="courses-performance">
          <h2>Top Performing Courses</h2>
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Enrollments</th>
                <th>Completion Rate</th>
                <th>Avg. Progress</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.course_id}>
                  <td>{course.course_title}</td>
                  <td>{course.category}</td>
                  <td>{course.total_enrollments}</td>
                  <td>{course.completion_rate}%</td>
                  <td>{course.average_progress}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
```

### 7. Third-party Integration Setup

#### Metabase Integration

1. Deploy Metabase (using Docker or cloud provider)
2. Connect to Supabase PostgreSQL database
3. Create dashboards using the analytical views

```yaml
# docker-compose.yml for Metabase
version: '3'
services:
  metabase:
    image: metabase/metabase:latest
    ports:
      - "3001:3000"
    environment:
      MB_DB_TYPE: postgres
      MB_DB_HOST: your-supabase-db-host
      MB_DB_PORT: 5432
      MB_DB_NAME: postgres
      MB_DB_USER: your-supabase-user
      MB_DB_PASS: your-supabase-password
    depends_on:
      - postgres
```

#### Google Data Studio Integration

1. Use PostgreSQL connector to connect to Supabase
2. Import analytical views as data sources
3. Create custom reports and dashboards

### 8. Automated Reporting

Create `backend/scripts/generateWeeklyReport.js`:

```javascript
const { supabaseAdmin } = require('../supabaseAuth');
const analyticsDashboardService = require('../services/analyticsDashboardService');

async function generateWeeklyReport() {
  try {
    console.log('Generating weekly analytics report...');
    
    // Get all metrics
    const overview = await analyticsDashboardService.getOverviewMetrics();
    const demographics = await analyticsDashboardService.getUserDemographics();
    const courses = await analyticsDashboardService.getCoursePerformance();
    const retention = await analyticsDashboardService.getUserRetention();
    const dailyActivity = await analyticsDashboardService.getDailyActivity();
    const topLearners = await analyticsDashboardService.getTopLearners();
    const revenue = await analyticsDashboardService.getRevenueMetrics();
    
    // Format report
    const report = `
Trendtactics Digital LMS - Weekly Analytics Report
=================================================

OVERVIEW METRICS
----------------
Total Users: ${overview.totalUsers}
Total Courses: ${overview.totalCourses}
Total Enrollments: ${overview.totalEnrollments}
Completion Rate: ${overview.completionRate}%
Active Users: ${overview.activeUsers} (${overview.activeUserRate}% of total)

REVENUE METRICS
---------------
Potential Revenue: $${revenue.totalPotentialRevenue.toFixed(2)}
Realized Revenue: $${revenue.totalRealizedRevenue.toFixed(2)}
Conversion Rate: ${revenue.conversionRate}%

TOP PERFORMING COURSES
----------------------
${courses.slice(0, 5).map(course => 
  `${course.course_title}: ${course.total_enrollments} enrollments (${course.completion_rate}% completion)`
).join('\n')}

USER DEMOGRAPHICS
-----------------
${demographics.slice(0, 5).map(country => 
  `${country.country}: ${country.user_count} users`
).join('\n')}

TOP LEARNERS
------------
${topLearners.slice(0, 5).map(learner => 
  `${learner.first_name} ${learner.last_name}: ${learner.total_minutes_learned} minutes`
).join('\n')}

    `;
    
    // Save report
    const fileName = `weekly-report-${new Date().toISOString().split('T')[0]}.txt`;
    const { error } = await supabaseAdmin.storage
      .from('reports')
      .upload(fileName, report, {
        contentType: 'text/plain'
      });
    
    if (error) throw new Error(error.message);
    
    console.log('Weekly report generated and saved successfully');
    
    // Optionally send email notification
    // sendEmailNotification(report);
    
  } catch (error) {
    console.error('Failed to generate weekly report:', error);
  }
}

// Schedule weekly reports
if (require.main === module) {
  generateWeeklyReport();
}

module.exports = generateWeeklyReport;
```

## Benefits of Supabase Analytics Implementation

1. **Data-Driven Decisions**: Make informed decisions based on real user data
2. **User Insights**: Understand user behavior and learning patterns
3. **Course Optimization**: Identify high-performing and underperforming courses
4. **Business Intelligence**: Track revenue, conversions, and growth metrics
5. **User Retention**: Monitor and improve user engagement and retention
6. **Performance Monitoring**: Track system performance and user experience
7. **Competitive Advantage**: Leverage data to improve your LMS offering
8. **Automated Reporting**: Save time with scheduled analytics reports

## Implementation Roadmap

### Phase 1: Foundation (Week 1)
- Create analytical views
- Set up event tracking system
- Implement basic analytics service

### Phase 2: Dashboard (Week 2)
- Create analytics dashboard service
- Develop frontend dashboard components
- Implement Edge Functions for API

### Phase 3: Advanced Features (Week 3)
- Set up third-party integrations
- Implement automated reporting
- Add advanced metrics and KPIs

### Phase 4: Optimization (Week 4)
- Performance tuning
- Security enhancements
- Documentation and training

## Monitoring and Maintenance

1. **Regular Review**: Monthly review of analytics data
2. **Performance Monitoring**: Monitor query performance of analytical views
3. **Data Quality**: Ensure data accuracy and completeness
4. **User Privacy**: Maintain compliance with privacy regulations
5. **Backup Strategy**: Regular backup of analytics data
6. **Continuous Improvement**: Iteratively enhance analytics capabilities

This comprehensive analytics setup provides deep insights into your LMS performance and user behavior, enabling data-driven improvements to the learning experience.