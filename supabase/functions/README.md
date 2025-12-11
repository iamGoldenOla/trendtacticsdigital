# Supabase Edge Functions

This directory contains all the Edge Functions for the Trendtactics Digital LMS platform.

## Directory Structure

```
functions/
├── _utils/           # Utility functions and shared code
├── ai/               # AI service functions
├── auth/             # Authentication functions
├── courses/          # Course management functions
├── system/           # System functions (health checks, etc.)
├── users/            # User management functions
├── DEPLOYMENT-GUIDE.md  # Deployment instructions
├── API-DOCUMENTATION.md # API documentation
└── .env.example      # Environment variables template
```

## Function Categories

### Authentication Functions (`auth/`)
- User registration, login, logout
- Profile management
- Session handling

### AI Functions (`ai/`)
- Chat completions with multiple providers
- Image generation
- Content analysis
- **Key rotation support** for OpenRouter (up to 21 keys)

### Course Functions (`courses/`)
- Course listing and details
- Enrollment management
- Progress tracking

### User Functions (`users/`)
- Profile management
- Learning statistics
- User preferences

### Utility Functions (`_utils/`)
- Supabase client initialization
- Authentication helpers
- Key rotation utilities

### System Functions (`system/`)
- Health checks
- System status

## Development

### Local Development

To develop and test functions locally:

1. Install the Supabase CLI (if possible)
2. Start Supabase locally: `supabase start`
3. Serve functions: `supabase functions serve`

### Adding New Functions

1. Create a new file in the appropriate directory
2. Follow the existing patterns for imports and structure
3. Export a `serve` function as the entry point
4. Handle errors appropriately
5. Return JSON responses with consistent structure

## Deployment

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed deployment instructions.

## API Documentation

See [API-DOCUMENTATION.md](API-DOCUMENTATION.md) for complete API documentation.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values for local development.
For production, set environment variables in the Supabase Dashboard.