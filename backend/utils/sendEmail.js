const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_PORT === '465',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Email templates
const emailTemplates = {
    emailVerification: (data) => ({
        subject: 'Verify Your Email - Trendtactics Digital Academy',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verify Your Email</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1a2a4a 0%, #0f172a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
                    .btn { display: inline-block; background: #0047FF; color: #1a2a4a; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎓 Trendtactics Digital Academy</h1>
                        <p>Welcome to the future of digital marketing education!</p>
                    </div>
                    <div class="content">
                        <h2>Hi ${data.name},</h2>
                        <p>Thank you for joining Trendtactics Digital Academy! To complete your registration and start your learning journey, please verify your email address.</p>
                        <p>Click the button below to verify your email:</p>
                        <a href="${data.verificationUrl}" class="btn">Verify Email Address</a>
                        <p>If the button doesn't work, copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #666;">${data.verificationUrl}</p>
                        <p>This link will expire in 24 hours for security reasons.</p>
                        <p>If you didn't create an account with us, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 Trendtactics Digital Academy. All rights reserved.</p>
                        <p>This email was sent to you because you registered for an account.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    passwordReset: (data) => ({
        subject: 'Password Reset - Trendtactics Digital Academy',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1a2a4a 0%, #0f172a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
                    .btn { display: inline-block; background: #0047FF; color: #1a2a4a; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔐 Password Reset</h1>
                        <p>Trendtactics Digital Academy</p>
                    </div>
                    <div class="content">
                        <h2>Hi ${data.name},</h2>
                        <p>We received a request to reset your password for your Trendtactics Digital Academy account.</p>
                        <p>Click the button below to reset your password:</p>
                        <a href="${data.resetUrl}" class="btn">Reset Password</a>
                        <p>If the button doesn't work, copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #666;">${data.resetUrl}</p>
                        <p>This link will expire in 10 minutes for security reasons.</p>
                        <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 Trendtactics Digital Academy. All rights reserved.</p>
                        <p>This email was sent to you because you requested a password reset.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    welcomeEmail: (data) => ({
        subject: 'Welcome to Trendtactics Digital Academy!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Trendtactics Digital Academy</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1a2a4a 0%, #0f172a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
                    .btn { display: inline-block; background: #0047FF; color: #1a2a4a; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 Welcome to Trendtactics Digital Academy!</h1>
                        <p>Your journey to digital marketing mastery begins now!</p>
                    </div>
                    <div class="content">
                        <h2>Hi ${data.name},</h2>
                        <p>Welcome to Trendtactics Digital Academy! We're excited to have you join our community of learners.</p>
                        <p>Here's what you can do to get started:</p>
                        <ul>
                            <li>Explore our course catalog</li>
                            <li>Complete your profile</li>
                            <li>Join our community discussions</li>
                            <li>Start your first course</li>
                        </ul>
                        <a href="${data.dashboardUrl}" class="btn">Go to Dashboard</a>
                        <p>If you have any questions, our support team is here to help!</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 Trendtactics Digital Academy. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    courseEnrollment: (data) => ({
        subject: `Welcome to ${data.courseTitle}!`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Course Enrollment Confirmation</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1a2a4a 0%, #0f172a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
                    .btn { display: inline-block; background: #0047FF; color: #1a2a4a; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>📚 Course Enrollment Confirmed!</h1>
                        <p>You're now enrolled in ${data.courseTitle}</p>
                    </div>
                    <div class="content">
                        <h2>Hi ${data.name},</h2>
                        <p>Congratulations! You've successfully enrolled in <strong>${data.courseTitle}</strong>.</p>
                        <p>Course Details:</p>
                        <ul>
                            <li><strong>Duration:</strong> ${data.duration}</li>
                            <li><strong>Instructor:</strong> ${data.instructor}</li>
                            <li><strong>Level:</strong> ${data.level}</li>
                        </ul>
                        <a href="${data.courseUrl}" class="btn">Start Learning</a>
                        <p>We're excited to see you succeed in this course!</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 Trendtactics Digital Academy. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    courseCompletion: (data) => ({
        subject: `Congratulations! You've completed ${data.courseTitle}!`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Course Completion</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1a2a4a 0%, #0f172a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
                    .btn { display: inline-block; background: #0047FF; color: #1a2a4a; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 Course Completed!</h1>
                        <p>Congratulations on completing ${data.courseTitle}!</p>
                    </div>
                    <div class="content">
                        <h2>Hi ${data.name},</h2>
                        <p>Amazing work! You've successfully completed <strong>${data.courseTitle}</strong>.</p>
                        <p>Your certificate is ready for download:</p>
                        <a href="${data.certificateUrl}" class="btn">Download Certificate</a>
                        <p>Keep up the great work! Consider exploring our other courses to continue your learning journey.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 Trendtactics Digital Academy. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }),

    adminNewLead: (data) => ({
        subject: `🚀 New Lead: ${data.name || 'Newsletter Signup'}`,
        html: `
            <!DOCTYPE html>
            <html>
            <body>
                <h2>New Lead Captured</h2>
                <p><strong>Type:</strong> ${data.type}</p>
                <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ''}
                ${data.message ? `<p><strong>Message:</strong><br>${data.message}</p>` : ''}
                <hr>
                <p>Sent from Trendtactics Digital Backend</p>
            </body>
            </html>
        `
    })
};

// Send email function
const sendEmail = async (options) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `${process.env.EMAIL_FROM_NAME || 'Trendtactics Digital Academy'} <${process.env.EMAIL_FROM}>`,
            to: options.email,
            subject: options.subject,
            html: options.html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Email sending error:', error);
        throw error;
    }
};

// Send email with template
const sendEmailWithTemplate = async (email, templateName, data) => {
    try {
        const template = emailTemplates[templateName];
        if (!template) {
            throw new Error(`Email template '${templateName}' not found`);
        }

        const emailData = template(data);

        return await sendEmail({
            email,
            subject: emailData.subject,
            html: emailData.html
        });
    } catch (error) {
        console.error('Template email sending error:', error);
        throw error;
    }
};

module.exports = {
    sendEmail,
    sendEmailWithTemplate,
    emailTemplates
}; 