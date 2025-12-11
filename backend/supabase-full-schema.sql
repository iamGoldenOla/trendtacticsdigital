-- Comprehensive Supabase Schema for Trendtactics Digital LMS
-- This schema replaces the MongoDB models with PostgreSQL tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (replaces MongoDB User model)
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

-- Subscription table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan VARCHAR(20) CHECK (plan IN ('free', 'starter', 'professional', 'enterprise')) DEFAULT 'free',
  status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'cancelled', 'expired')) DEFAULT 'inactive',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  auto_renew BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT TRUE,
  marketing_emails BOOLEAN DEFAULT FALSE,
  language VARCHAR(10) DEFAULT 'en',
  theme VARCHAR(10) CHECK (theme IN ('light', 'dark', 'auto')) DEFAULT 'light',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning paths table
CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail TEXT,
  duration INTEGER, -- in hours
  level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  category VARCHAR(100),
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail TEXT,
  duration INTEGER, -- in hours
  level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  category VARCHAR(100),
  price DECIMAL(10, 2) DEFAULT 0.00,
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  learning_path_id UUID REFERENCES learning_paths(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modules table
CREATE TABLE IF NOT EXISTS modules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  duration INTEGER, -- in minutes
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  video_url TEXT,
  order_index INTEGER NOT NULL,
  duration INTEGER, -- in minutes
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User course enrollments table
CREATE TABLE IF NOT EXISTS user_enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_at TIMESTAMPTZ,
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- User module completions table
CREATE TABLE IF NOT EXISTS user_module_completions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- User lesson completions table
CREATE TABLE IF NOT EXISTS user_lesson_completions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES user_enrollments(id) ON DELETE CASCADE,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  certificate_url TEXT,
  UNIQUE(user_id, course_id)
);

-- User certificates table (linking table)
CREATE TABLE IF NOT EXISTS user_certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  certificate_id UUID REFERENCES certificates(id) ON DELETE CASCADE,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, certificate_id)
);

-- Achievements/Badges table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type VARCHAR(50) CHECK (type IN ('course_completion', 'module_completion', 'perfect_score', 'streak', 'certification', 'community_contribution')) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Learning stats table
CREATE TABLE IF NOT EXISTS learning_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  total_time_spent INTEGER DEFAULT 0, -- in minutes
  courses_completed INTEGER DEFAULT 0,
  certificates_earned INTEGER DEFAULT 0,
  average_score DECIMAL(5, 2) DEFAULT 0.00,
  streak_days INTEGER DEFAULT 0,
  last_active_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz results table (already exists, but including for completeness)
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT,
  summary JSONB NOT NULL,
  answers JSONB NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_user_enrollments_user_id ON user_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_enrollments_course_id ON user_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_learning_path ON courses(learning_path_id);
CREATE INDEX IF NOT EXISTS idx_modules_course ON modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_email ON quiz_results(email);
CREATE INDEX IF NOT EXISTS idx_quiz_results_timestamp ON quiz_results(timestamp DESC);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_module_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies for users to access their own data
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their own preferences" ON user_preferences
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own preferences" ON user_preferences
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can view their own enrollments" ON user_enrollments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their own module completions" ON user_module_completions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their own lesson completions" ON user_lesson_completions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their own certificates" ON certificates
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM user_certificates uc WHERE uc.certificate_id = certificates.id AND uc.user_id = auth.uid()
  ));

CREATE POLICY "Users can view their own achievements" ON user_achievements
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their own learning stats" ON learning_stats
  FOR SELECT USING (user_id = auth.uid());

-- Allow service role to access all data for backend operations
CREATE POLICY "Service role can access all user data" ON users
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all subscriptions" ON subscriptions
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all preferences" ON user_preferences
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all enrollments" ON user_enrollments
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all module completions" ON user_module_completions
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all lesson completions" ON user_lesson_completions
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all certificates" ON certificates
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all user certificates" ON user_certificates
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all achievements" ON achievements
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all user achievements" ON user_achievements
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all learning stats" ON learning_stats
  FOR ALL USING (CURRENT_ROLE = 'service_role');

CREATE POLICY "Service role can access all quiz results" ON quiz_results
  FOR ALL USING (CURRENT_ROLE = 'service_role');

-- Grant permissions
GRANT ALL ON users TO authenticated;
GRANT ALL ON subscriptions TO authenticated;
GRANT ALL ON user_preferences TO authenticated;
GRANT ALL ON learning_paths TO authenticated;
GRANT ALL ON courses TO authenticated;
GRANT ALL ON modules TO authenticated;
GRANT ALL ON lessons TO authenticated;
GRANT ALL ON user_enrollments TO authenticated;
GRANT ALL ON user_module_completions TO authenticated;
GRANT ALL ON user_lesson_completions TO authenticated;
GRANT ALL ON certificates TO authenticated;
GRANT ALL ON user_certificates TO authenticated;
GRANT ALL ON achievements TO authenticated;
GRANT ALL ON user_achievements TO authenticated;
GRANT ALL ON learning_stats TO authenticated;
GRANT ALL ON quiz_results TO authenticated;

-- Create views for analytics
CREATE OR REPLACE VIEW user_progress_summary AS
SELECT 
  u.id as user_id,
  u.first_name,
  u.last_name,
  u.email,
  COUNT(ue.id) as total_enrollments,
  COUNT(ucert.id) as certificates_earned,
  COALESCE(ls.total_time_spent, 0) as total_time_spent,
  COALESCE(ls.courses_completed, 0) as courses_completed,
  COALESCE(ls.average_score, 0) as average_score
FROM users u
LEFT JOIN user_enrollments ue ON u.id = ue.user_id
LEFT JOIN user_certificates ucert ON u.id = ucert.user_id
LEFT JOIN learning_stats ls ON u.id = ls.user_id
WHERE u.role = 'student'
GROUP BY u.id, u.first_name, u.last_name, u.email, ls.total_time_spent, ls.courses_completed, ls.average_score;

CREATE OR REPLACE VIEW course_popularity AS
SELECT 
  c.id,
  c.title,
  c.category,
  COUNT(ue.id) as enrollment_count,
  AVG(ue.progress) as average_progress
FROM courses c
LEFT JOIN user_enrollments ue ON c.id = ue.course_id
WHERE c.is_published = TRUE
GROUP BY c.id, c.title, c.category
ORDER BY enrollment_count DESC;

CREATE OR REPLACE VIEW learning_path_effectiveness AS
SELECT 
  lp.id,
  lp.title,
  COUNT(c.id) as total_courses,
  COUNT(ue.id) as total_enrollments,
  AVG(ue.progress) as average_progress
FROM learning_paths lp
LEFT JOIN courses c ON lp.id = c.learning_path_id
LEFT JOIN user_enrollments ue ON c.id = ue.course_id
WHERE lp.is_published = TRUE
GROUP BY lp.id, lp.title
ORDER BY total_enrollments DESC;