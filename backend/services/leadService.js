/**
 * Lead Service
 * Handles contact form submissions and newsletter signups
 * Stores in Supabase with local file fallback
 */

const fs = require('fs');
const path = require('path');
const { supabase, isSupabaseConfigured } = require('../config');

class LeadService {
    constructor() {
        this.dataDir = path.join(__dirname, '..', '..', 'data');
        this.leadsFile = path.join(this.dataDir, 'leads.json');

        // Ensure data directory exists
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
    }

    /**
     * Save a new lead (contact form or newsletter)
     */
    async saveLead(leadData) {
        const lead = {
            ...leadData,
            timestamp: new Date().toISOString(),
            status: 'new'
        };

        try {
            // Try to notify admin via email (non-blocking)
            if (process.env.EMAIL_USER) {
                const { sendEmailWithTemplate } = require('../utils/sendEmail');
                sendEmailWithTemplate(process.env.EMAIL_USER, 'adminNewLead', lead)
                    .catch(err => console.error('Email notification failed:', err.message));
            }

            // 1. Try Supabase first (if configured)
            if (isSupabaseConfigured && supabase) {
                const { data, error } = await supabase
                    .from('leads')
                    .insert([lead])
                    .select();

                if (!error) {
                    console.log('✅ Lead saved to Supabase');
                    return { success: true, storage: 'supabase', id: data[0].id };
                }
                console.error('Supabase lead insert error:', error.message);
            }

            // 2. Fallback to local file storage
            let leads = [];
            if (fs.existsSync(this.leadsFile)) {
                try {
                    const content = fs.readFileSync(this.leadsFile, 'utf8');
                    leads = JSON.parse(content || '[]');
                } catch (e) {
                    leads = [];
                }
            }

            leads.push({ ...lead, id: `local-${Date.now()}` });
            fs.writeFileSync(this.leadsFile, JSON.stringify(leads, null, 2), 'utf8');

            console.log('✅ Lead saved to local file (fallback)');
            return {
                success: true,
                storage: 'file',
                message: isSupabaseConfigured ? 'Saved locally (Supabase failed)' : 'Saved locally'
            };

        } catch (error) {
            console.error('Lead saving error:', error);
            throw new Error('Failed to process lead');
        }
    }

    /**
     * Get all leads (admin only)
     */
    async getLeads() {
        // Implementation for admin dashboard
    }
}

module.exports = new LeadService();
