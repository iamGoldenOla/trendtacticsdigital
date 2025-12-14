# 🚧 Temporary Academy Access

While waiting to purchase and configure your domain, here are several ways to access and test your Academy.

## 🌐 Current Access Methods

### 1. Local Development Server
Run a local server to test the Academy:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve

# Using PHP (if installed)
php -S localhost:8000
```

Then access at: `http://localhost:8000/academy.html`

### 2. GitHub Pages (Temporary)
If you haven't already enabled GitHub Pages:

1. Go to your repository Settings
2. Navigate to Pages section
3. Select "Deploy from a branch"
4. Choose branch: `main`
5. Save and wait for deployment

Your Academy will be available at: `https://[username].github.io/[repository-name]/academy.html`

### 3. Temporary Domain Services
Use free temporary domain services:

1. **Ngrok**:
   ```bash
   # Install ngrok
   npm install -g ngrok
   
   # Expose local server
   ngrok http 8000
   ```

2. **Surge.sh**:
   ```bash
   # Install surge
   npm install -g surge
   
   # Deploy current directory
   surge
   ```

## 🔧 Configuration for Temporary Access

### Update Academy Configuration
Modify `js/academy-supabase.js` for testing:

```javascript
// Temporary configuration for local/testing
const ACADEMY_SUPABASE_URL = 'https://uimdbodamoeyukrghchb.supabase.co';
const ACADEMY_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbWRib2RhbW9leXVrcmdoY2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NTYwMzksImV4cCI6MjA4MTAzMjAzOX0.kMFpnaZN04ac94u0wcXJFsS58lX88h8RCM2de3rwYIc';

// For production, these will be different
// const ACADEMY_SUPABASE_URL = 'https://your-production-url.supabase.co';
// const ACADEMY_SUPABASE_KEY = 'YOUR_PRODUCTION_ANON_KEY';
```

### Test Authentication
Create a test user for Academy testing:

1. Go to Supabase Dashboard
2. Navigate to Authentication → Users
3. Create a test user:
   - Email: `test@edvouralearninghub.com`
   - Password: `TestPass123!`
   - Role: `student`

### Sample Test Data
Use the sample courses we created:

1. Run `insert-sample-courses.sql` in Supabase SQL Editor
2. Add a few modules using `insert-course-structure.sql`
3. Create test enrollments manually in the database

## 🧪 Testing Checklist

### Basic Functionality
- [ ] Academy page loads correctly
- [ ] Courses display with proper information
- [ ] User can register/login
- [ ] Enrollment process works
- [ ] Progress tracking functions
- [ ] Certificates generate

### Advanced Features
- [ ] Search and filtering work
- [ ] Responsive design on mobile
- [ ] Video/audio content plays
- [ ] Downloadable resources accessible
- [ ] Quiz functionality
- [ ] User profile management

### Integration Points
- [ ] Shared authentication with main site
- [ ] Data consistency between systems
- [ ] Performance under load
- [ ] Error handling and recovery

## 🔐 Security for Testing

### Test Environment Security
1. Use different API keys for testing:
   ```javascript
   // Test environment
   const TEST_ACADEMY_KEY = 'YOUR_TEST_ANON_KEY';
   ```

2. Limit test user permissions:
   - Create read-only test users for general testing
   - Use admin accounts only for setup tasks

3. Monitor test activity:
   - Check Supabase logs regularly
   - Review database changes
   - Monitor function invocations

## 📊 Analytics for Testing

### Basic Tracking
Add temporary analytics for testing:

```html
<!-- Google Analytics (testing) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TEST_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TEST_ID');
</script>
```

### User Behavior
Track key user actions:
- Course views
- Enrollment clicks
- Lesson completions
- Quiz attempts
- Certificate downloads

## 🛠️ Development Tools

### Browser Development Tools
1. **Chrome DevTools**:
   - Network tab to monitor API calls
   - Console for JavaScript errors
   - Application tab for local storage

2. **Firefox Developer Tools**:
   - Similar functionality to Chrome
   - Additional CSS grid inspection

### Supabase Debugging
1. **Realtime Logs**:
   - Monitor function executions
   - Check for errors
   - Track performance

2. **Database Queries**:
   - Use Table Editor to verify data
   - Run SQL queries to test
   - Check RLS policies

## 📱 Mobile Testing

### Responsive Design
Test on multiple devices:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Tablet browsers

### Touch Interactions
Verify touch-friendly elements:
- Button sizes
- Navigation menus
- Form inputs
- Video players

## 🚨 Common Issues & Solutions

### Academy Page Not Loading
1. Check browser console for errors
2. Verify Supabase client initialization
3. Confirm network connectivity
4. Check file paths in HTML

### Courses Not Displaying
1. Verify courses exist in database
2. Check `is_published` flag
3. Test `get-courses` function directly
4. Review browser network requests

### Enrollment Failures
1. Confirm user authentication
2. Check course availability
3. Verify no duplicate enrollments
4. Review function logs

## 📞 Support Resources

### Documentation
- `SETUP_ACADEMY_SUPABASE.md` - Setup guide
- `TEST_ACADEMY_FUNCTIONALITY.md` - Testing procedures
- `BACKEND_RELATIONSHIP_GUIDE.md` - Architecture overview

### Community Support
- Supabase Discord: Real-time help
- GitHub Issues: Bug reporting
- Stack Overflow: Technical questions

### Professional Help
- Supabase Support: For account issues
- Freelance Developers: For custom modifications
- Digital Agencies: For comprehensive solutions

## 🎯 Next Steps

### Immediate Actions
1. [ ] Set up temporary access method
2. [ ] Create test user accounts
3. [ ] Insert sample course data
4. [ ] Begin functionality testing

### Short-term Goals
1. [ ] Complete all test scenarios
2. [ ] Document any issues found
3. [ ] Prepare for domain acquisition
4. [ ] Plan production deployment

### Long-term Planning
1. [ ] Domain purchase strategy
2. [ ] Hosting infrastructure setup
3. [ ] Marketing and launch planning
4. [ ] Content creation timeline

Your Academy is ready for testing! Use these temporary access methods to validate everything works correctly before your official launch.