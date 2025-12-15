// Supabase Utility Functions
// This file contains common functions for interacting with Supabase

// Initialize Supabase client
const supabaseUrl = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA'; // Your actual Supabase anon key

// Only initialize if Supabase SDK is loaded
let supabase;
if (typeof window !== 'undefined' && window.supabase) {
    supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
} else {
    console.warn('Supabase SDK not loaded yet');
}

/**
 * Check if user is logged in
 * @returns {Promise<boolean>} True if user is logged in, false otherwise
 */
async function isUserLoggedIn() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return !!session;
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    }
}

/**
 * Get current user
 * @returns {Promise<Object|null>} User object or null if not logged in
 */
async function getCurrentUser() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Login result
 */
async function loginUser(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Register new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} userData - Additional user data
 * @returns {Promise<Object>} Registration result
 */
async function registerUser(email, password, userData = {}) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData
            }
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Logout user
 * @returns {Promise<Object>} Logout result
 */
async function logoutUser() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        // Clear localStorage
        localStorage.removeItem('studentLoggedIn');
        localStorage.removeItem('studentName');
        localStorage.removeItem('userId');
        localStorage.removeItem('enrolledCourse');

        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Call Supabase Edge Function
 * @param {string} functionName - Name of the function to call
 * @param {Object} payload - Payload to send to the function
 * @returns {Promise<Object>} Function call result
 */
async function callEdgeFunction(functionName, payload = {}) {
    try {
        const { data, error } = await supabase.functions.invoke(functionName, {
            body: payload
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error(`Error calling function ${functionName}:`, error);
        return { success: false, error: error.message };
    }
}

/**
 * Get user profile
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User profile data
 */
async function getUserProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error getting user profile:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updates - Profile updates
 * @returns {Promise<Object>} Update result
 */
async function updateUserProfile(userId, updates) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error updating user profile:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Check if user has access to a course
 * @param {string} userId - User ID
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} Access check result
 */
async function checkCourseAccess(userId, courseId) {
    try {
        const { data, error } = await supabase
            .from('enrollments')
            .select('id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (error) throw error;
        return { success: true, hasAccess: !!data };
    } catch (error) {
        console.error('Error checking course access:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Fetch courses from Supabase Edge Functions
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Courses data
 */
async function getCourses(params = {}) {
    try {
        const { data, error } = await supabase.functions.invoke('get-courses', {
            body: params
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching courses:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Enroll user in a course
 * @param {string} courseId - Course ID to enroll in
 * @returns {Promise<Object>} Enrollment result
 */
async function enrollInCourse(courseId) {
    try {
        const { data, error } = await supabase.functions.invoke('enroll', {
            body: { courseId }
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error enrolling in course:', error);
        return { success: false, error: error.message };
    }
}

// Export functions
window.supabaseUtils = {
    isUserLoggedIn,
    getCurrentUser,
    loginUser,
    registerUser,
    logoutUser,
    callEdgeFunction,
    getUserProfile,
    updateUserProfile,
    checkCourseAccess,
    getCourses,
    enrollInCourse,
    supabase
};