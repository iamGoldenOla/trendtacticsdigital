# 📁 Deploy Trendtactics Academy as Subdirectory

This guide explains how to deploy your Trendtactics Academy as a subdirectory of your main website: `https://trendtacticsdigital.com/academy`

## 🎯 Objective

Configure your qServers hosting to serve the Academy files from the `/academy` path while maintaining the existing main website at the root.

## 📁 File Structure Setup

### 1. Current Structure (Before)
```
/public_html
├── index.html              # Main website
├── client-dashboard.html   # Client dashboard
├── login.html              # Login page
├── register.html           # Registration page
├── hub.html                # Hub page
├── academy.html            # Academy landing page
├── js/                     # JavaScript files
├── css/                    # Stylesheets
├── images/                 # Images
└── ...                     # Other main site files
```

### 2. Target Structure (After)
```
/public_html
├── index.html              # Main website
├── client-dashboard.html   # Client dashboard
├── login.html              # Login page
├── register.html           # Registration page
├── hub.html                # Hub page
├── js/                     # JavaScript files for main site
├── css/                    # Stylesheets for main site
├── images/                 # Images for main site
└── academy/                # Academy subdirectory
    ├── index.html          # Academy landing page
    ├── courses/            # Course pages
    ├── dashboard/          # Academy dashboard
    ├── js/                 # Academy JavaScript files
    ├── css/                # Academy stylesheets
    ├── images/             # Academy images
    └── ...                 # Other Academy files
```

## 🔧 Implementation Steps

### Step 1: Create Academy Directory
1. Log in to your qServers cPanel
2. Navigate to File Manager
3. Go to your `public_html` directory
4. Create a new folder named `academy`

### Step 2: Upload Academy Files
1. Move all Academy-related files into the `/academy` directory:
   - `academy.html` → `/academy/index.html`
   - All Academy CSS files → `/academy/css/`
   - All Academy JS files → `/academy/js/`
   - All Academy images → `/academy/images/`
   - Any other Academy-specific files

### Step 3: Update Internal Links
Update all internal links in your Academy files to reflect the new path structure:

```javascript
// In academy files, update these references:
const ACADEMY_BASE_URL = '/academy';

// Example updates:
// OLD: <script src="/js/academy-link.js"></script>
// NEW: <script src="/academy/js/academy-link.js"></script>

// OLD: <link rel="stylesheet" href="/css/academy.css">
// NEW: <link rel="stylesheet" href="/academy/css/academy.css">
```

### Step 4: Update Navigation Links
Update navigation links in your main site to point to the new Academy location:

```html
<!-- In hub.html, client-dashboard.html, and other main site files -->
<a href="/academy/">Access Academy</a>
```

### Step 5: Configure .htaccess (if needed)
Add rewrite rules to your main `.htaccess` file if needed:

```apache
# Academy rewrite rules
RewriteRule ^academy$ /academy/ [R=301,L]
RewriteRule ^academy/(.*)$ /academy/$1 [L]
```

## 🔐 Security Considerations

### 1. Protect Academy Resources
Ensure Academy resources are properly protected:

```javascript
// In academy files, maintain authentication checks
async function checkAcademyAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = '/login.html';
    }
}
```

### 2. CORS Configuration
Update CORS settings in your Supabase Academy backend:

```javascript
// Add to Supabase settings
Allowed Origins:
- https://trendtacticsdigital.com
- https://trendtacticsdigital.com/academy
- http://localhost:3000 (for development)
```

## 🧪 Testing Checklist

### 1. Main Site Testing
- [ ] Homepage loads correctly
- [ ] Navigation to all main pages works
- [ ] "Get Started" button leads to hub page
- [ ] Hub page links work correctly

### 2. Academy Testing
- [ ] `https://trendtacticsdigital.com/academy` loads correctly
- [ ] Academy authentication works
- [ ] Course enrollment functions
- [ ] Academy dashboard loads properly

### 3. Integration Testing
- [ ] Single sign-on between main site and Academy
- [ ] User data sync works correctly
- [ ] Course progress tracking functions
- [ ] Logout from either system affects both

## 🚀 Deployment Verification

### 1. Verify File Structure
```bash
# Check that files are in correct locations
ls -la /public_html/
ls -la /public_html/academy/
```

### 2. Test URLs
- [ ] `https://trendtacticsdigital.com` - Main site
- [ ] `https://trendtacticsdigital.com/academy` - Academy
- [ ] `https://trendtacticsdigital.com/client-dashboard.html` - Client dashboard
- [ ] `https://trendtacticsdigital.com/login.html` - Login page

### 3. Monitor for Issues
- Check server logs for 404 errors
- Verify all assets load correctly
- Test authentication flows thoroughly

## 🆘 Troubleshooting

### Common Issues:

#### 1. Broken Links
**Symptom**: 404 errors when accessing Academy pages
**Solution**: 
- Verify all internal links use correct paths
- Check that all files were moved to `/academy/` directory
- Update any hardcoded URLs in JavaScript files

#### 2. CSS/JS Not Loading
**Symptom**: Academy pages look unstyled or don't function
**Solution**:
- Check browser console for 404 errors on assets
- Verify CSS/JS files are in `/academy/css/` and `/academy/js/` directories
- Update asset paths in HTML files

#### 3. Authentication Issues
**Symptom**: Unable to access Academy after logging in to main site
**Solution**:
- Verify Academy uses same Supabase credentials as main site
- Check that localStorage/sessionStorage is accessible across paths
- Test authentication flow in private browsing mode

## 📈 Success Metrics

### Deployment Success:
- [ ] Main website accessible at `https://trendtacticsdigital.com`
- [ ] Academy accessible at `https://trendtacticsdigital.com/academy`
- [ ] No broken links or missing assets
- [ ] Authentication works seamlessly between systems

### Performance:
- Page load times under 3 seconds
- No console errors in browser developer tools
- Mobile responsiveness maintained

---

**Next Steps**: 
1. Implement the file structure changes on your qServers hosting
2. Update internal links in your Academy files
3. Test all functionality thoroughly
4. Monitor for any issues after deployment

Your Academy is now ready to be deployed as a subdirectory of your main website!