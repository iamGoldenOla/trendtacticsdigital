/**
 * Course Service
 * Handles fetching course data from Supabase
 */

const { supabase, isSupabaseConfigured } = require('../config');

class CourseService {
    /**
     * Get all published courses
     */
    async getCourses() {
        try {
            if (isSupabaseConfigured && supabase) {
                const { data, error } = await supabase
                    .from('courses')
                    .select('*')
                    .eq('is_published', true);

                if (error) throw error;
                return data;
            }
            return []; // Fallback if not configured
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw new Error('Failed to fetch courses');
        }
    }

    /**
     * Get a single course by slug
     */
    async getCourseBySlug(slug) {
        try {
            if (isSupabaseConfigured && supabase) {
                const { data, error } = await supabase
                    .from('courses')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                return data;
            }
            return null;
        } catch (error) {
            console.error(`Error fetching course ${slug}:`, error);
            throw new Error('Failed to fetch course');
        }
    }
}

module.exports = new CourseService();
