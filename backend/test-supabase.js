// Test Supabase Connection
const { supabase, isSupabaseConfigured } = require('./config');

async function testConnection() {
  console.log('🧪 Testing Supabase Connection...\n');

  if (!isSupabaseConfigured) {
    console.error('❌ Supabase is not configured!');
    console.log('   Please check your .env file has:');
    console.log('   - SUPABASE_URL');
    console.log('   - SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY)');
    process.exit(1);
  }

  console.log('✅ Supabase client created successfully\n');

  // Test 1: Check if we can query the table
  console.log('📊 Test 1: Checking quiz_results table...');
  try {
    const { data, error, count } = await supabase
      .from('quiz_results')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Error accessing quiz_results table:', error.message);
      console.log('\n💡 Make sure you ran the SQL schema in Supabase SQL Editor!');
      console.log('   File: backend/supabase-schema.sql');
      process.exit(1);
    }

    console.log(`✅ Table exists and is accessible (${count || 0} records)`);
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  }

  // Test 2: Try inserting a test record
  console.log('\n📝 Test 2: Testing insert operation...');
  try {
    const testData = {
      email: 'test@example.com',
      summary: { test: true },
      answers: [{ question: 'test', answer: 'test' }],
      timestamp: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('quiz_results')
      .insert([testData])
      .select();

    if (error) {
      console.error('❌ Insert failed:', error.message);
      console.log('\n💡 Check your RLS policies in Supabase');
      process.exit(1);
    }

    console.log('✅ Insert successful! Test record ID:', data[0].id);

    // Clean up: Delete test record
    await supabase
      .from('quiz_results')
      .delete()
      .eq('id', data[0].id);
    
    console.log('✅ Test record cleaned up');
  } catch (err) {
    console.error('❌ Insert error:', err.message);
    process.exit(1);
  }

  console.log('\n🎉 All tests passed! Supabase is configured correctly.');
  console.log('\n✅ Your backend is ready to use Supabase!');
}

testConnection().catch(console.error);

