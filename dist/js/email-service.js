// Email Service Integration Examples
// This file shows how to integrate with popular email marketing services

class EmailService {
    constructor() {
        // Configuration - replace with your actual service credentials
        this.config = {
            mailchimp: {
                apiKey: 'YOUR_MAILCHIMP_API_KEY',
                listId: 'YOUR_MAILCHIMP_LIST_ID',
                server: 'YOUR_MAILCHIMP_SERVER_PREFIX'
            },
            convertkit: {
                apiKey: 'YOUR_CONVERTKIT_API_KEY',
                formId: 'YOUR_CONVERTKIT_FORM_ID'
            },
            sendgrid: {
                apiKey: 'YOUR_SENDGRID_API_KEY',
                listId: 'YOUR_SENDGRID_LIST_ID'
            }
        };
    }

    // Mailchimp Integration
    async subscribeToMailchimp(email, firstName = '', lastName = '') {
        try {
            const response = await fetch(`https://${this.config.mailchimp.server}.api.mailchimp.com/3.0/lists/${this.config.mailchimp.listId}/members`, {
                method: 'POST',
                headers: {
                    'Authorization': `apikey ${this.config.mailchimp.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'subscribed',
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                })
            });

            if (response.ok) {
                return { success: true, message: 'Successfully subscribed to newsletter!' };
            } else {
                const error = await response.json();
                return { success: false, message: error.detail || 'Subscription failed' };
            }
        } catch (error) {
            console.error('Mailchimp subscription error:', error);
            return { success: false, message: 'Network error occurred' };
        }
    }

    // ConvertKit Integration
    async subscribeToConvertKit(email, firstName = '') {
        try {
            const response = await fetch(`https://api.convertkit.com/v3/forms/${this.config.convertkit.formId}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    api_key: this.config.convertkit.apiKey,
                    email: email,
                    first_name: firstName
                })
            });

            if (response.ok) {
                return { success: true, message: 'Successfully subscribed to newsletter!' };
            } else {
                const error = await response.json();
                return { success: false, message: error.message || 'Subscription failed' };
            }
        } catch (error) {
            console.error('ConvertKit subscription error:', error);
            return { success: false, message: 'Network error occurred' };
        }
    }

    // SendGrid Integration
    async subscribeToSendGrid(email, firstName = '', lastName = '') {
        try {
            const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.config.sendgrid.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contacts: [{
                        email: email,
                        first_name: firstName,
                        last_name: lastName
                    }],
                    list_ids: [this.config.sendgrid.listId]
                })
            });

            if (response.ok) {
                return { success: true, message: 'Successfully subscribed to newsletter!' };
            } else {
                const error = await response.json();
                return { success: false, message: error.errors?.[0]?.message || 'Subscription failed' };
            }
        } catch (error) {
            console.error('SendGrid subscription error:', error);
            return { success: false, message: 'Network error occurred' };
        }
    }

    // Generic subscription method (you can choose which service to use)
    async subscribe(email, service = 'mailchimp', firstName = '', lastName = '') {
        switch (service.toLowerCase()) {
            case 'mailchimp':
                return await this.subscribeToMailchimp(email, firstName, lastName);
            case 'convertkit':
                return await this.subscribeToConvertKit(email, firstName);
            case 'sendgrid':
                return await this.subscribeToSendGrid(email, firstName, lastName);
            default:
                return { success: false, message: 'Invalid email service specified' };
        }
    }

    // Form validation
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Get subscriber count (example for Mailchimp)
    async getSubscriberCount() {
        try {
            const response = await fetch(`https://${this.config.mailchimp.server}.api.mailchimp.com/3.0/lists/${this.config.mailchimp.listId}`, {
                headers: {
                    'Authorization': `apikey ${this.config.mailchimp.apiKey}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data.stats.member_count;
            }
        } catch (error) {
            console.error('Error fetching subscriber count:', error);
        }
        return null;
    }
}

// Usage example:
// const emailService = new EmailService();
// 
// // Subscribe a user
// const result = await emailService.subscribe('user@example.com', 'mailchimp', 'John', 'Doe');
// if (result.success) {
//     console.log('Subscription successful:', result.message);
// } else {
//     console.error('Subscription failed:', result.message);
// }

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailService;
} else {
    window.EmailService = EmailService;
}

function showContactError(message) {
    const errorDiv = document.getElementById('contact-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    } else {
        alert(message);
    }
} 