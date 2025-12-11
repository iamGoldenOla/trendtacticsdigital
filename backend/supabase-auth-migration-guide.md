# Supabase Auth Integration Guide

This guide explains how to replace the current JWT-based authentication system with Supabase Auth.

## Current Authentication System

The current system uses:
- Custom JWT implementation with express-jwt
- MongoDB User model with bcrypt password hashing
- Custom middleware for authentication and authorization
- Session-based approach with cookies

## Supabase Auth Benefits

1. **Built-in Security**: Industry-standard OAuth providers, email/password auth
2. **Social Logins**: Google, GitHub, Facebook, etc. with minimal setup
3. **Email Verification**: Built-in email confirmation flows
4. **Password Recovery**: Automated password reset workflows
5. **Row Level Security**: Database-level security policies
6. **Real-time Auth State**: Instant auth state changes across clients

## Migration Steps

### 1. Enable Supabase Auth Providers

In your Supabase Dashboard:
1. Go to Authentication → Settings
2. Enable Email provider
3. Configure email templates
4. Enable any social providers you want (Google, GitHub, etc.)

### 2. Update Environment Variables

Replace the current auth configuration in `.env`:

```env
# Remove these JWT settings
# JWT_SECRET=
# JWT_EXPIRE=

# Add Supabase Auth settings
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
```

### 3. Create Supabase Auth Client

Create a new file `backend/supabaseAuth.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');

// Create Supabase client for auth operations
const supabaseAuth = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Create Supabase admin client for backend operations
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = {
  supabaseAuth,
  supabaseAdmin
};
```

### 4. Replace Authentication Middleware

Create a new middleware file `backend/middleware/supabaseAuth.js`:

```javascript
const { supabaseAuth } = require('../supabaseAuth');

// Authentication middleware using Supabase Auth
const authenticateToken = async (req, res, next) => {
  try {
    // Get session from Supabase Auth
    const { data: { session }, error } = await supabaseAuth.auth.getSession();
    
    if (error || !session) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No valid session'
      });
    }

    // Add user to request object
    req.user = session.user;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

// Authorization middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No user found'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient permissions'
      });
    }

    next();
  };
};

// Rate limiting middleware (using Supabase if needed)
const authRateLimit = (req, res, next) => {
  // Supabase handles rate limiting automatically
  next();
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  authRateLimit
};
```

### 5. Update Auth Routes

Modify `backend/routes/auth.js` to use Supabase Auth:

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { supabaseAuth, supabaseAdmin } = require('../supabaseAuth');
const { authenticateToken, authorizeRoles, authRateLimit } = require('../middleware/supabaseAuth');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Rate limiting for auth routes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many login attempts. Please try again later.'
    }
});

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // limit each IP to 3 registration attempts per hour
    message: {
        success: false,
        message: 'Too many registration attempts. Please try again later.'
    }
});

// @desc    Register user with Supabase Auth
// @route   POST /api/auth/register
// @access  Public
router.post('/register', 
    registerLimiter,
    [
        body('firstName')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('First name must be between 2 and 50 characters'),
        body('lastName')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Last name must be between 2 and 50 characters'),
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        body('country')
            .trim()
            .notEmpty()
            .withMessage('Country is required')
    ],
    asyncHandler(async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { firstName, lastName, email, password, country, city, phone, dateOfBirth, gender } = req.body;

        // Sign up with Supabase Auth
        const { data, error } = await supabaseAuth.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    country,
                    city: city || null,
                    phone: phone || null,
                    date_of_birth: dateOfBirth || null,
                    gender: gender || null
                }
            }
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // Create user record in users table
        const { data: userData, error: userError } = await supabaseAdmin
            .from('users')
            .insert([
                {
                    id: data.user.id,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    country: country,
                    city: city || null,
                    phone: phone || null,
                    date_of_birth: dateOfBirth || null,
                    gender: gender || null,
                    is_email_verified: data.user.identities ? true : false
                }
            ])
            .select();

        if (userError) {
            console.error('User creation error:', userError);
            // Note: User is still registered with Supabase Auth but not in our custom table
        }

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please check your email for verification.',
            data: {
                user: data.user,
                session: data.session
            }
        });
    })
);

// @desc    Login user with Supabase Auth
// @route   POST /api/auth/login
// @access  Public
router.post('/login',
    loginLimiter,
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ],
    asyncHandler(async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Sign in with Supabase Auth
        const { data, error } = await supabaseAuth.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Update last login in users table
        await supabaseAdmin
            .from('users')
            .update({ last_login: new Date() })
            .eq('id', data.user.id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: data.user,
                session: data.session
            }
        });
    })
);

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', authenticateToken, asyncHandler(async (req, res) => {
    const { error } = await supabaseAuth.auth.signOut();
    
    if (error) {
        return res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
}));

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', authenticateToken, asyncHandler(async (req, res) => {
    // Get user data from users table
    const { data: user, error } = await supabaseAdmin
        .from('users')
        .select(`
            *,
            user_enrollments(*),
            learning_stats(*)
        `)
        .eq('id', req.user.id)
        .single();

    if (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch user data'
        });
    }

    res.status(200).json({
        success: true,
        data: user
    });
}));

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
router.put('/update-profile',
    authenticateToken,
    [
        body('firstName')
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('First name must be between 2 and 50 characters'),
        body('lastName')
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Last name must be between 2 and 50 characters'),
        body('phone')
            .optional()
            .isMobilePhone()
            .withMessage('Please provide a valid phone number')
    ],
    asyncHandler(async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const fieldsToUpdate = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            bio: req.body.bio,
            phone: req.body.phone,
            city: req.body.city,
            date_of_birth: req.body.dateOfBirth,
            gender: req.body.gender,
            avatar: req.body.avatar
        };

        // Remove undefined fields
        Object.keys(fieldsToUpdate).forEach(key => 
            fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
        );

        // Update user in users table
        const { data, error } = await supabaseAdmin
            .from('users')
            .update(fieldsToUpdate)
            .eq('id', req.user.id)
            .select();

        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update profile'
            });
        }

        res.status(200).json({
            success: true,
            data: data[0]
        });
    })
);

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
router.put('/change-password',
    authenticateToken,
    [
        body('currentPassword')
            .notEmpty()
            .withMessage('Current password is required'),
        body('newPassword')
            .isLength({ min: 8 })
            .withMessage('New password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    ],
    asyncHandler(async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { currentPassword, newPassword } = req.body;

        // Update password with Supabase Auth
        const { data, error } = await supabaseAuth.auth.updateUser({
            password: newPassword
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Failed to update password'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    })
);

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password',
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 3 // limit each IP to 3 requests per windowMs
    }),
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email')
    ],
    asyncHandler(async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email } = req.body;

        // Send password reset email
        const { data, error } = await supabaseAuth.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.CLIENT_URL}/reset-password`
        });

        if (error) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Password reset email sent'
        });
    })
);

// @desc    Reset password
// @route   PUT /api/auth/reset-password
// @access  Public (requires valid token)
router.put('/reset-password',
    [
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    ],
    asyncHandler(async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { password } = req.body;

        // Update password with Supabase Auth
        const { data, error } = await supabaseAuth.auth.updateUser({
            password: password
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Failed to reset password'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Password reset successful'
        });
    })
);

// @desc    Verify email
// @route   GET /api/auth/verify-email
// @access  Public (requires valid token)
router.get('/verify-email', asyncHandler(async (req, res) => {
    // Supabase handles email verification automatically
    // This endpoint can be used to confirm verification status
    
    const { data: { user }, error } = await supabaseAuth.auth.getUser();
    
    if (error || !user) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or expired verification token'
        });
    }

    // Update email verification status in users table
    await supabaseAdmin
        .from('users')
        .update({ is_email_verified: true })
        .eq('id', user.id);

    res.status(200).json({
        success: true,
        message: 'Email verified successfully'
    });
}));

module.exports = router;
```

### 6. Update Frontend Authentication

Update your frontend JavaScript to use Supabase Auth:

```javascript
// In your frontend auth JavaScript files
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Login function
async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
}

// Register function
async function register(userData) {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        country: userData.country
      }
    }
  });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
}

// Logout function
async function logout() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return true;
}

// Get current user
async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return user;
}
```

## Benefits of This Migration

1. **Enhanced Security**: Leverages Supabase's battle-tested authentication system
2. **Reduced Maintenance**: No need to maintain custom JWT implementation
3. **Scalability**: Built-in horizontal scaling capabilities
4. **Social Login**: Easy integration with OAuth providers
5. **Email Workflows**: Automated email verification and password recovery
6. **Real-time Updates**: Instant session invalidation across all clients
7. **Compliance**: Built-in GDPR, CCPA, and other compliance features

## Next Steps

1. Implement the changes outlined above
2. Test authentication flows thoroughly
3. Migrate existing users to Supabase Auth (if applicable)
4. Update documentation and developer guides
5. Monitor authentication metrics in Supabase Dashboard