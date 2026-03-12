// Academy Supabase Configuration
// This file contains the Supabase client specifically for the Academy project
//
// 🎓 ARCHITECTURE NOTE:
// This configuration is intentionally separate from the main website Supabase client
// to ensure complete isolation between the marketing website/Trendy AI (which share one backend)
// and the Academy (which has its own dedicated backend).
//
// SETUP INSTRUCTIONS:
// 1. Create a new Supabase project specifically for the Academy
// 2. Copy the Project URL and Anon Key from the new project's API settings
// 3. Replace the placeholder values below with your actual Academy project credentials
//
// This separation provides:
// - Security isolation between systems
// - Independent scaling
// - Separate billing and resource management
// - Easier maintenance and updates

// Academy Supabase project URL and anon key
// TODO: Replace with your actual Academy Supabase project URL and anon key
// Example format: 'https://abcdefghijklmnopqrst.supabase.co'
const ACADEMY_SUPABASE_URL = 'https://uimdbodamoeyukrghchb.supabase.co';

// TODO: Replace with your actual Academy Supabase anon key
// Example format: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
const ACADEMY_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbWRib2RhbW9leXVrcmdoY2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NTYwMzksImV4cCI6MjA4MTAzMjAzOX0.kMFpnaZN04ac94u0wcXJFsS58lX88h8RCM2de3rwYIc';

// Initialize Supabase client for Academy (only if valid credentials are provided)
let academySupabase = null;
if (ACADEMY_SUPABASE_URL && ACADEMY_SUPABASE_KEY && 
    ACADEMY_SUPABASE_URL !== 'https://uimdbodamoeyukrghchb.supabase.co' && 
    ACADEMY_SUPABASE_KEY !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbWRib2RhbW9leXVrcmdoY2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NTYwMzksImV4cCI6MjA4MTAzMjAzOX0.kMFpnaZN04ac94u0wcXJFsS58lX88h8RCM2de3rwYIc' &&
    typeof window.supabase !== 'undefined') {
    academySupabase = window.supabase.createClient(ACADEMY_SUPABASE_URL, ACADEMY_SUPABASE_KEY);
    console.log('✅ Academy Supabase client initialized');
} else {
    console.warn('⚠️ Academy Supabase client not initialized - please update configuration');
}

/**
 * Fetch courses from Academy Supabase Edge Functions
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Courses data
 */
async function getAcademyCourses(params = {}) {
    if (!academySupabase) {
        return { success: false, error: 'Academy Supabase client not initialized' };
    }
    
    try {
        const { data, error } = await academySupabase.functions.invoke('get-courses', {
            body: params
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching academy courses:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Enroll user in an Academy course
 * @param {string} courseId - Course ID to enroll in
 * @returns {Promise<Object>} Enrollment result
 */
async function enrollInAcademyCourse(courseId) {
    if (!academySupabase) {
        return { success: false, error: 'Academy Supabase client not initialized' };
    }
    
    try {
        const { data, error } = await academySupabase.functions.invoke('enroll', {
            body: { courseId }
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error enrolling in academy course:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get user's Academy enrollments
 * @returns {Promise<Object>} Enrollments data
 */
async function getAcademyEnrollments() {
    if (!academySupabase) {
        return { success: false, error: 'Academy Supabase client not initialized' };
    }
    
    try {
        const { data, error } = await academySupabase.functions.invoke('get-enrollments');
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching academy enrollments:', error);
        return { success: false, error: error.message };
    }
}

// Export Academy functions
window.academySupabaseUtils = {
    getAcademyCourses,
    enrollInAcademyCourse,
    getAcademyEnrollments,
    supabase: academySupabase,
    isInitialized: !!academySupabase
};