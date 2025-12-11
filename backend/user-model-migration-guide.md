# User Model Migration Guide: MongoDB to Supabase

This guide details how to migrate the User model from MongoDB to Supabase PostgreSQL while maintaining all existing functionality and enhancing security with Row Level Security (RLS).

## Current MongoDB User Model Analysis

The current User model in `backend/models/User.js` includes:

### Core Fields
- firstName, lastName (String)
- email (String, unique)
- password (String, bcrypt hashed)
- avatar (String, default image)
- bio (String)
- phone (String)
- dateOfBirth (Date)
- gender (Enum)

### Location Fields
- country (String)
- city (String)
- timezone (String, default UTC)

### Subscription Fields
- plan (Enum: free, starter, professional, enterprise)
- status (Enum: active, inactive, cancelled, expired)
- startDate, endDate (Date)
- stripeCustomerId, stripeSubscriptionId (String)
- autoRenew (Boolean)

### Learning Progress Fields
- enrolledCourses (Array of Objects)
- learningPaths (Array of Objects)
- achievements (Array of Objects)
- learningStats (Object)

### Preferences Fields
- emailNotifications, pushNotifications, marketingEmails (Boolean)
- language (String)
- theme (Enum: light, dark, auto)

### Account Status Fields
- isEmailVerified (Boolean)
- emailVerificationToken, emailVerificationExpires (String, Date)
- passwordResetToken, passwordResetExpires (String, Date)
- isActive (Boolean)
- lastLogin (Date)

### Role & Permissions Fields
- role (Enum: student, instructor, admin, super_admin)
- permissions (Array of Strings)

## Supabase PostgreSQL Implementation

The Supabase schema has already been defined in `supabase-full-schema.sql`. Here's how each component maps:

### Users Table
```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  bio TEXT,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other', 'prefer-not-to-say')),
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  timezone VARCHAR(50) DEFAULT 'UTC',
  is_email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token TEXT,
  email_verification_expires TIMESTAMPTZ,
  password_reset_token TEXT,
  password_reset_expires TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ DEFAULT NOW(),
  role VARCHAR(20) CHECK (role IN ('student', 'instructor', 'admin', 'super_admin')) DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Related Tables
- subscriptions (separate table for better normalization)
- user_preferences (separate table)
- learning_paths, courses, modules, lessons (content structure)
- user_enrollments, user_module_completions, user_lesson_completions (progress tracking)
- certificates, user_certificates (certification system)
- achievements, user_achievements (gamification)
- learning_stats (analytics)

## Migration Strategy

### 1. Data Migration Process

Create a migration script `backend/scripts/migrate-users.js`:

```javascript
const mongoose = require('mongoose');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env' });

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/trendtactics';
mongoose.connect(mongoUri);

// Supabase connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// MongoDB User model (simplified version)
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  avatar: String,
  bio: String,
  phone: String,
  dateOfBirth: Date,
  gender: String,
  country: String,
  city: String,
  timezone: String,
  subscription: {
    plan: String,
    status: String,
    startDate: Date,
    endDate: Date,
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    autoRenew: Boolean
  },
  preferences: {
    emailNotifications: Boolean,
    pushNotifications: Boolean,
    marketingEmails: Boolean,
    language: String,
    theme: String
  },
  isEmailVerified: Boolean,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  isActive: Boolean,
  lastLogin: Date,
  role: String
}, { timestamps: true });

const MongoUser = mongoose.model('User', userSchema);

async function migrateUsers() {
  try {
    console.log('Starting user migration...');
    
    // Fetch all users from MongoDB
    const mongoUsers = await MongoUser.find({});
    console.log(`Found ${mongoUsers.length} users to migrate`);
    
    let migratedCount = 0;
    
    for (const user of mongoUsers) {
      try {
        // Migrate user to Supabase users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert([
            {
              id: user._id,
              first_name: user.firstName,
              last_name: user.lastName,
              email: user.email,
              password_hash: user.password, // Already hashed by bcrypt
              avatar: user.avatar,
              bio: user.bio,
              phone: user.phone,
              date_of_birth: user.dateOfBirth,
              gender: user.gender,
              country: user.country,
              city: user.city,
              timezone: user.timezone || 'UTC',
              is_email_verified: user.isEmailVerified,
              email_verification_token: user.emailVerificationToken,
              email_verification_expires: user.emailVerificationExpires,
              password_reset_token: user.passwordResetToken,
              password_reset_expires: user.passwordResetExpires,
              is_active: user.isActive,
              last_login: user.lastLogin,
              role: user.role || 'student',
              created_at: user.createdAt,
              updated_at: user.updatedAt
            }
          ]);
        
        if (userError) {
          console.error(`Error migrating user ${user.email}:`, userError);
          continue;
        }
        
        // Migrate subscription data
        if (user.subscription) {
          const { data: subData, error: subError } = await supabase
            .from('subscriptions')
            .insert([
              {
                user_id: user._id,
                plan: user.subscription.plan || 'free',
                status: user.subscription.status || 'inactive',
                start_date: user.subscription.startDate,
                end_date: user.subscription.endDate,
                stripe_customer_id: user.subscription.stripeCustomerId,
                stripe_subscription_id: user.subscription.stripeSubscriptionId,
                auto_renew: user.subscription.autoRenew !== undefined ? user.subscription.autoRenew : true
              }
            ]);
          
          if (subError) {
            console.error(`Error migrating subscription for user ${user.email}:`, subError);
          }
        }
        
        // Migrate preferences
        if (user.preferences) {
          const { data: prefData, error: prefError } = await supabase
            .from('user_preferences')
            .insert([
              {
                user_id: user._id,
                email_notifications: user.preferences.emailNotifications !== undefined ? user.preferences.emailNotifications : true,
                push_notifications: user.preferences.pushNotifications !== undefined ? user.preferences.pushNotifications : true,
                marketing_emails: user.preferences.marketingEmails !== undefined ? user.preferences.marketingEmails : false,
                language: user.preferences.language || 'en',
                theme: user.preferences.theme || 'light'
              }
            ]);
          
          if (prefError) {
            console.error(`Error migrating preferences for user ${user.email}:`, prefError);
          }
        }
        
        migratedCount++;
        console.log(`Migrated user ${user.email} (${migratedCount}/${mongoUsers.length})`);
        
      } catch (err) {
        console.error(`Failed to migrate user ${user.email}:`, err);
      }
    }
    
    console.log(`Migration completed. Successfully migrated ${migratedCount} out of ${mongoUsers.length} users.`);
    
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Database connections closed.');
  }
}

// Run migration
if (require.main === module) {
  migrateUsers();
}

module.exports = migrateUsers;
```

### 2. Row Level Security Policies

The following RLS policies have already been implemented in the schema:

```sql
-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can view their own data
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (id = auth.uid());

-- Users can update their own data
CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (id = auth.uid());

-- Allow service role to access all data for backend operations
CREATE POLICY "Service role can access all user data" ON users
  FOR ALL USING (CURRENT_ROLE = 'service_role');
```

Additional policies for related tables:

```sql
-- Subscriptions
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (user_id = auth.uid());

-- Preferences
CREATE POLICY "Users can view their own preferences" ON user_preferences
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own preferences" ON user_preferences
  FOR UPDATE USING (user_id = auth.uid());

-- Enrollments
CREATE POLICY "Users can view their own enrollments" ON user_enrollments
  FOR SELECT USING (user_id = auth.uid());

-- Module completions
CREATE POLICY "Users can view their own module completions" ON user_module_completions
  FOR SELECT USING (user_id = auth.uid());

-- Lesson completions
CREATE POLICY "Users can view their own lesson completions" ON user_lesson_completions
  FOR SELECT USING (user_id = auth.uid());

-- Certificates
CREATE POLICY "Users can view their own certificates" ON certificates
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM user_certificates uc WHERE uc.certificate_id = certificates.id AND uc.user_id = auth.uid()
  ));

-- Achievements
CREATE POLICY "Users can view their own achievements" ON user_achievements
  FOR SELECT USING (user_id = auth.uid());

-- Learning stats
CREATE POLICY "Users can view their own learning stats" ON learning_stats
  FOR SELECT USING (user_id = auth.uid());
```

### 3. Service Role Policies

For backend operations that require access to all user data:

```sql
-- Allow service role to access all data for backend operations
CREATE POLICY "Service role can access all user data" ON users
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all subscriptions" ON subscriptions
  FOR ALL USING (CURRENT_ROLE = 'service_role');

-- Similar policies for all related tables
```

### 4. Updated User Service

Create a new user service `backend/services/userService.js`:

```javascript
const { supabaseAdmin } = require('../supabaseAuth');

class UserService {
  // Get user by ID
  async getUserById(userId) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select(`
        *,
        subscriptions(*),
        user_preferences(*),
        user_enrollments(*),
        learning_stats(*)
      `)
      .eq('id', userId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  // Update user profile
  async updateUserProfile(userId, updates) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }
  
  // Update user preferences
  async updateUserPreferences(userId, preferences) {
    const { data, error } = await supabaseAdmin
      .from('user_preferences')
      .upsert({
        user_id: userId,
        ...preferences
      })
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }
  
  // Get user learning progress
  async getUserProgress(userId) {
    const { data, error } = await supabaseAdmin
      .from('user_progress_summary')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  // Update learning stats
  async updateLearningStats(userId, stats) {
    const { data, error } = await supabaseAdmin
      .from('learning_stats')
      .upsert({
        user_id: userId,
        ...stats,
        updated_at: new Date()
      })
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }
  
  // Add achievement
  async addAchievement(userId, achievementId) {
    const { data, error } = await supabaseAdmin
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_id: achievementId
      });
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  // Get user certificates
  async getUserCertificates(userId) {
    const { data, error } = await supabaseAdmin
      .from('certificates')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw new Error(error.message);
    return data;
  }
  
  // Create certificate
  async createCertificate(userId, courseId) {
    // First create the certificate
    const { data: certData, error: certError } = await supabaseAdmin
      .from('certificates')
      .insert({
        user_id: userId,
        course_id: courseId,
        issued_at: new Date()
      })
      .select();
    
    if (certError) throw new Error(certError.message);
    
    // Then link to user
    const { data: linkData, error: linkError } = await supabaseAdmin
      .from('user_certificates')
      .insert({
        user_id: userId,
        certificate_id: certData[0].id,
        issued_at: new Date()
      });
    
    if (linkError) throw new Error(linkError.message);
    
    return certData[0];
  }
}

module.exports = new UserService();
```

## Security Considerations

### 1. Password Handling
Since passwords are already bcrypt-hashed in MongoDB, they can be directly migrated to the `password_hash` field in Supabase. However, ensure that the hashing mechanism is consistent.

### 2. Data Validation
PostgreSQL provides built-in data validation through column types and constraints, reducing the need for extensive application-level validation.

### 3. Access Control
RLS ensures that users can only access their own data, with exceptions for administrative operations using the service role.

### 4. Audit Trail
The `created_at` and `updated_at` fields provide an audit trail for all user modifications.

## Testing Strategy

1. **Unit Tests**: Test each service method with mock data
2. **Integration Tests**: Test end-to-end user operations
3. **Security Tests**: Verify RLS policies prevent unauthorized access
4. **Performance Tests**: Ensure queries perform well with large datasets
5. **Migration Tests**: Test the migration script with sample data

## Rollback Plan

In case of issues:

1. Revert to MongoDB by updating connection strings
2. Restore MongoDB backup if needed
3. Temporarily disable RLS policies for debugging
4. Use service role for unrestricted access during troubleshooting

## Monitoring and Maintenance

1. Monitor Supabase logs for authentication errors
2. Set up alerts for unusual login patterns
3. Regularly review and update RLS policies
4. Monitor database performance and optimize queries as needed
5. Keep Supabase client libraries updated

This migration maintains all existing functionality while leveraging Supabase's enhanced security features and scalability.