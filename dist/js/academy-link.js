// Academy Link Integration
// This file handles the connection between TrendTactics Digital and TrendTactics Academy

class AcademyLink {
    constructor() {
        // Main website Supabase credentials
        this.mainSupabaseUrl = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
        this.mainSupabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA';
        
        // Academy Supabase credentials
        this.academySupabaseUrl = 'https://uimdbodamoeyukrghchb.supabase.co';
        this.academySupabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbWRib2RhbW9leXVrcmdoY2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NTYwMzksImV4cCI6MjA4MTAzMjAzOX0.kMFpnaZN04ac94u0wcXJFsS58lX88h8RCM2de3rwYIc';
        
        // Initialize clients
        this.mainSupabase = window.supabase.createClient(this.mainSupabaseUrl, this.mainSupabaseKey);
        this.academySupabase = window.supabase.createClient(this.academySupabaseUrl, this.academySupabaseKey);
    }
    
    /**
     * Sync user data between main website and Academy
     * @param {string} userId - User ID from main website
     * @returns {Promise<Object>} Sync result
     */
    async syncUserData(userId) {
        try {
            // Get user data from main website
            const { data: mainUser, error: mainError } = await this.mainSupabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
                
            if (mainError) throw mainError;
            
            // Check if user exists in Academy
            const { data: academyUser, error: academyError } = await this.academySupabase
                .from('users')
                .select('*')
                .eq('email', mainUser.email)
                .single();
                
            if (academyError && academyError.code !== 'PGRST116') {
                throw academyError;
            }
            
            // Create or update user in Academy
            let result;
            if (academyUser) {
                // Update existing user
                result = await this.academySupabase
                    .from('users')
                    .update({
                        name: mainUser.full_name || mainUser.email.split('@')[0],
                        updated_at: new Date().toISOString()
                    })
                    .eq('email', mainUser.email);
            } else {
                // Create new user
                result = await this.academySupabase
                    .from('users')
                    .insert({
                        id: userId,
                        email: mainUser.email,
                        name: mainUser.full_name || mainUser.email.split('@')[0],
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    });
            }
            
            return { success: true, data: result.data };
        } catch (error) {
            console.error('Error syncing user data:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Get user's Academy courses
     * @param {string} userId - User ID
     * @returns {Promise<Object>} Courses data
     */
    async getUserCourses(userId) {
        try {
            // First sync user data
            await this.syncUserData(userId);
            
            // Get user's courses from Academy
            const { data: courses, error } = await this.academySupabase
                .from('enrollments')
                .select(`
                    id,
                    course_id,
                    enrolled_at,
                    courses (
                        id,
                        title,
                        description,
                        thumbnail_url,
                        duration
                    )
                `)
                .eq('user_id', userId)
                .order('enrolled_at', { ascending: false });
                
            if (error) throw error;
            
            return { success: true, data: courses };
        } catch (error) {
            console.error('Error getting user courses:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Enroll user in Academy course
     * @param {string} userId - User ID
     * @param {string} courseId - Course ID
     * @returns {Promise<Object>} Enrollment result
     */
    async enrollInCourse(userId, courseId) {
        try {
            // First sync user data
            await this.syncUserData(userId);
            
            // Check if already enrolled
            const { data: existingEnrollment, error: checkError } = await this.academySupabase
                .from('enrollments')
                .select('id')
                .eq('user_id', userId)
                .eq('course_id', courseId)
                .maybeSingle();
                
            if (checkError) throw checkError;
            
            if (existingEnrollment) {
                return { success: true, message: 'Already enrolled in this course' };
            }
            
            // Create enrollment
            const { data: enrollment, error } = await this.academySupabase
                .from('enrollments')
                .insert({
                    user_id: userId,
                    course_id: courseId,
                    enrolled_at: new Date().toISOString()
                })
                .select()
                .single();
                
            if (error) throw error;
            
            return { success: true, data: enrollment };
        } catch (error) {
            console.error('Error enrolling in course:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Get Academy course details
     * @param {string} courseId - Course ID
     * @returns {Promise<Object>} Course details
     */
    async getCourseDetails(courseId) {
        try {
            const { data: course, error } = await this.academySupabase
                .from('courses')
                .select(`
                    *,
                    lessons (
                        id,
                        title,
                        duration,
                        order
                    )
                `)
                .eq('id', courseId)
                .single();
                
            if (error) throw error;
            
            return { success: true, data: course };
        } catch (error) {
            console.error('Error getting course details:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize AcademyLink
const academyLink = new AcademyLink();

// Export for global use
window.academyLink = academyLink;