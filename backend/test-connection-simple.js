// Simple connection test
const { supabase, isSupabaseConfigured } = require('./config');

async function test() {
  if (!isSupabaseConfigured) {
    console.error('❌ Supabase not configured');
    return;
  }

  console.log('🔍 Testing basic connection...\n');
  
  try {
    // Simple health check - just ping Supabase
    const { data, error } = await supabase
      .from('quiz_results')
      .select('count', { count: 'exact', head: true })
      .limit(0);

    if (error) {
      if (error.code === 'PGRST116') {
        console.error('❌ Table "quiz_results" does not exist!');
        console.log('\n💡 You need to run the SQL schema first:');
        console.log('   1. Go to https://app.supabase.com');
        console.log('   2. Open SQL Editor');
        console.log('   3. Copy and paste the SQL from: backend/supabase-schema.sql');
        console.log('   4. Click "Run"');
      } else {
        console.error('❌ Error:', error.message);
        console.error('   Code:', error.code);
        console.error('   Details:', error.details);
      }
      return;
    }

    console.log('✅ Connection successful!');
    console.log('✅ Table exists and is accessible');
    
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    if (err.message.includes('fetch failed')) {
      console.log('\n💡 Possible issues:');
      console.log('   - Check your internet connection');
      console.log('   - Verify SUPABASE_URL is correct in .env');
      console.log('   - URL should be: https://xxxxx.supabase.co');
    }
  }
}

test();

