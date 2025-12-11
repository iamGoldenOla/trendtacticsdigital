# Supabase Edge Functions API Documentation

This document provides detailed information about all available API endpoints for the Trendtactics Digital LMS platform.

## Base URL

All endpoints are relative to your Supabase project URL:
```
https://YOUR_PROJECT_ID.supabase.co/functions/v1
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Authentication Functions

### Register User
**POST** `/auth/register`

Registers a new user account.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "country": "string",
  "city": "string (optional)",
  "phone": "string (optional)",
  "dateOfBirth": "string (optional)",
  "gender": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email for verification.",
  "data": {
    "user": {},
    "session": {}
  }
}
```

### Login User
**POST** `/auth/login`

Authenticates a user and returns a session token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {},
    "session": {}
  }
}
```

### Logout User
**POST** `/auth/logout`

Invalidates the current user session.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Get User Profile
**GET** `/auth/get-user`

Retrieves the authenticated user's profile information.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "avatar": "string",
    "bio": "string",
    "phone": "string",
    "date_of_birth": "string",
    "gender": "string",
    "country": "string",
    "city": "string",
    "timezone": "string",
    "is_email_verified": true,
    "is_active": true,
    "last_login": "datetime",
    "role": "string",
    "created_at": "datetime",
    "updated_at": "datetime",
    "subscriptions": [],
    "user_preferences": [],
    "user_enrollments": [],
    "learning_stats": []
  }
}
```

### Update User Profile
**PUT** `/auth/update-profile`

Updates the authenticated user's profile information.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Request Body:**
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "bio": "string (optional)",
  "phone": "string (optional)",
  "city": "string (optional)",
  "dateOfBirth": "string (optional)",
  "gender": "string (optional)",
  "avatar": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {}
}
```

## AI Functions

### AI Chat
**POST** `/ai/chat`

Generates AI-powered responses to prompts.

**Request Body:**
```json
{
  "prompt": "string",
  "provider": "string (optional, default: openrouter)",
  "model": "string (optional)",
  "options": {
    "maxTokens": "number (optional)",
    "temperature": "number (optional)"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": "string",
    "model": "string",
    "usage": {}
  }
}
```

### Generate Image
**POST** `/ai/generate-image`

Creates images from text prompts using AI.

**Request Body:**
```json
{
  "prompt": "string",
  "size": "string (optional, default: 1024x1024)",
  "quality": "string (optional, default: standard)",
  "style": "string (optional, default: vivid)",
  "provider": "string (optional, default: openai)",
  "model": "string (optional)",
  "options": {}
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "string",
    "prompt": "string",
    "model": "string",
    "size": "string"
  }
}
```

### Analyze Content
**POST** `/ai/analyze-content`

Analyzes content for various metrics.

**Request Body:**
```json
{
  "content": "string",
  "analysisType": "sentiment|keywords|summary|seo|readability",
  "provider": "string (optional, default: openrouter)",
  "model": "string (optional)",
  "options": {}
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "analysisType": "string",
    "result": {},
    "model": "string",
    "usage": {}
  }
}
```

## Course Functions

### Get Courses
**GET** `/courses/get-courses`

Retrieves a list of published courses with filtering and pagination.

**Query Parameters:**
- category: string (optional)
- level: string (optional)
- limit: number (optional, default: 10)
- offset: number (optional, default: 0)
- search: string (optional)
- sortBy: string (optional, default: created_at)
- sortOrder: asc|desc (optional, default: desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [],
    "pagination": {
      "limit": "number",
      "offset": "number",
      "total": "number",
      "hasMore": "boolean"
    }
  }
}
```

### Get Course Details
**GET** `/courses/get-course?id=COURSE_ID`

Retrieves detailed information about a specific course.

**Query Parameters:**
- id: string (required)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "thumbnail": "string",
    "instructor_id": "uuid",
    "category_id": "uuid",
    "level": "string",
    "duration": "string",
    "price": "number",
    "is_published": "boolean",
    "created_at": "datetime",
    "updated_at": "datetime",
    "instructor": {},
    "categories": {},
    "lessons": [],
    "enrollments": [],
    "enrollment_count": "number",
    "average_rating": "number",
    "total_ratings": "number"
  }
}
```

### Enroll in Course
**POST** `/courses/enroll`

Enrolls the authenticated user in a course.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Request Body:**
```json
{
  "courseId": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully enrolled in course",
  "data": {}
}
```

### Get User Enrollments
**GET** `/courses/get-enrollments`

Retrieves all courses the authenticated user is enrolled in.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Response:**
```json
{
  "success": true,
  "data": []
}
```

### Update Progress
**PUT** `/courses/update-progress`

Updates the user's progress in a course.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Request Body:**
```json
{
  "enrollmentId": "string",
  "progress": "number (0-100)",
  "lessonId": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Progress updated successfully",
  "data": {}
}
```

## User Functions

### Get User Profile
**GET** `/users/get-profile`

Retrieves the authenticated user's complete profile.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Response:**
```json
{
  "success": true,
  "data": {}
}
```

### Update User Profile
**PUT** `/users/update-profile`

Updates the authenticated user's profile information.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Request Body:**
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "bio": "string (optional)",
  "phone": "string (optional)",
  "city": "string (optional)",
  "country": "string (optional)",
  "dateOfBirth": "string (optional)",
  "gender": "string (optional)",
  "avatar": "string (optional)",
  "timezone": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {}
}
```

### Get Learning Statistics
**GET** `/users/get-learning-stats`

Retrieves the authenticated user's learning statistics.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "total_courses_enrolled": "number",
    "courses_completed": "number",
    "total_learning_time": "number",
    "current_streak": "number",
    "longest_streak": "number",
    "last_activity": "datetime"
  }
}
```

### Update Learning Statistics
**PUT** `/users/update-learning-stats`

Updates the authenticated user's learning statistics.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Request Body:**
```json
{
  "totalTime": "number (optional)",
  "completedCourse": "boolean (optional)",
  "activity": "boolean (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Learning stats updated successfully",
  "data": {}
}
```

### Get User Preferences
**GET** `/users/get-preferences`

Retrieves the authenticated user's preferences.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "notification_emails": "boolean",
    "newsletter_subscription": "boolean",
    "privacy_level": "string",
    "theme": "string",
    "language": "string",
    "timezone": "string"
  }
}
```

### Update User Preferences
**PUT** `/users/update-preferences`

Updates the authenticated user's preferences.

**Headers:**
- Authorization: Bearer YOUR_JWT_TOKEN

**Request Body:**
```json
{
  "notificationEmails": "boolean (optional)",
  "newsletterSubscription": "boolean (optional)",
  "privacyLevel": "string (optional)",
  "theme": "string (optional)",
  "language": "string (optional)",
  "timezone": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Preferences updated successfully",
  "data": {}
}
```