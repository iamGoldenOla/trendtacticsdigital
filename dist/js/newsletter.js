// Newsletter Integration for Trendtactics Digital
// Supports Supabase and Mailchimp integration

(function() {
    'use strict';
    
    const SUPABASE_URL = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA'; // Replace with actual key
    
    // Initialize Supabase client if available
    let supabase = null;
    if (window.supabase && SUPABASE_ANON_KEY !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    
    // Subscribe to newsletter via Supabase
    async function subscribeSupabase(email, name = '', source = 'website') {
        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }
        
        try {
            const { data, error } = await supabase
                .from('newsletter_subscribers')
                .insert([
                    {
                        email: email,
                        name: name,
                        source: source,
                        subscribed_at: new Date().toISOString(),
                        status: 'active'
                    }
                ]);
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            throw error;
        }
    }
    
    // Subscribe via Mailchimp API (alternative)
    async function subscribeMailchimp(email, name = '', listId = 'YOUR_LIST_ID') {
        const apiKey = 'YOUR_MAILCHIMP_API_KEY';
        const serverPrefix = apiKey.split('-')[1];
        const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'subscribed',
                    merge_fields: {
                        FNAME: name.split(' ')[0] || '',
                        LNAME: name.split(' ').slice(1).join(' ') || ''
                    }
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Subscription failed');
            }
            
            return { success: true, data: await response.json() };
        } catch (error) {
            console.error('Mailchimp subscription error:', error);
            throw error;
        }
    }
    
    // Main subscription function
    async function subscribe(email, name = '', source = 'website', provider = 'supabase') {
        try {
            // Validate email
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error('Please enter a valid email address');
            }
            
            let result;
            if (provider === 'supabase' && supabase) {
                result = await subscribeSupabase(email, name, source);
            } else if (provider === 'mailchimp') {
                result = await subscribeMailchimp(email, name);
            } else {
                // Fallback: Store in localStorage (temporary)
                const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
                subscribers.push({ email, name, source, date: new Date().toISOString() });
                localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
                result = { success: true };
            }
            
            return result;
        } catch (error) {
            console.error('Subscription error:', error);
            throw error;
        }
    }
    
    // Show success message
    function showSuccessMessage(form) {
        const successMsg = document.createElement('div');
        successMsg.className = 'newsletter-success';
        successMsg.textContent = 'Thank you for subscribing! Check your email for confirmation.';
        successMsg.style.cssText = `
            background: #00FFFF;
            color: #0A1E3F;
            padding: 12px 20px;
            border-radius: 8px;
            margin-top: 10px;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        form.parentNode.insertBefore(successMsg, form.nextSibling);
        form.reset();
        
        setTimeout(() => {
            successMsg.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => successMsg.remove(), 300);
        }, 5000);
    }
    
    // Show error message
    function showErrorMessage(form, message) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'newsletter-error';
        errorMsg.textContent = message || 'Something went wrong. Please try again.';
        errorMsg.style.cssText = `
            background: #ff4444;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            margin-top: 10px;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        form.parentNode.insertBefore(errorMsg, form.nextSibling);
        
        setTimeout(() => {
            errorMsg.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => errorMsg.remove(), 5000);
        }, 5000);
    }
    
    // Initialize newsletter forms
    function initNewsletterForms() {
        const forms = document.querySelectorAll('.newsletter-form, .newsletter-form-lovable, [data-newsletter]');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const emailInput = form.querySelector('input[type="email"]');
                const nameInput = form.querySelector('input[type="text"], input[name="name"]');
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                
                const email = emailInput?.value.trim();
                const name = nameInput?.value.trim() || '';
                const source = form.dataset.source || window.location.pathname;
                const provider = form.dataset.provider || 'supabase';
                
                if (!email) {
                    showErrorMessage(form, 'Please enter your email address');
                    return;
                }
                
                // Disable submit button
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Subscribing...';
                }
                
                try {
                    await subscribe(email, name, source, provider);
                    showSuccessMessage(form);
                    
                    // Track conversion
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'newsletter_signup', {
                            'event_category': 'engagement',
                            'event_label': source
                        });
                    }
                } catch (error) {
                    showErrorMessage(form, error.message);
                } finally {
                    // Re-enable submit button
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = submitBtn.dataset.originalText || 'Subscribe';
                    }
                }
            });
        });
    }
    
    // Export functions
    window.Newsletter = {
        subscribe: subscribe,
        subscribeSupabase: subscribeSupabase,
        subscribeMailchimp: subscribeMailchimp
    };
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsletterForms);
    } else {
        initNewsletterForms();
    }
})();

