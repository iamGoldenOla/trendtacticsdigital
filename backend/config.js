// Supabase Configuration
// Load .env from project root (not backend folder)
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  console.warn('   The backend will continue to work but quiz results will not be saved to Supabase.');
}

// Create Supabase client
// Use service role key for backend operations (bypasses RLS)
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

module.exports = {
  supabase,
  isSupabaseConfigured: !!supabase
};
