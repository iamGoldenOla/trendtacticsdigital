# 🔗 Trendtactics Academy Linking Strategy

This document outlines how to connect your Trendtactics Academy with the main website once you acquire the domain.

## 🏗️ Current Architecture

### Backend Infrastructure
- **Main Website & Trendy AI**: `https://wtgwxnhnqdnbzpetltrt.supabase.co`
- **Trendtactics Academy**: `https://uimdbodamoeyukrghchb.supabase.co` (✅ Deployed)
- **GitHub Repository**: Contains all Academy frontend code (✅ Updated)

### Frontend Components
- **Main Website**: Landing pages, services, contact forms
- **Academy Frontend**: Course listings, enrollment, learning interface
- **Shared Authentication**: Unified login system

## 🌐 Domain Linking Options

### Option 1: Subdomain Approach (Recommended)
**Structure**:
```
Main Site: https://trendtacticsdigital.com
Academy:   https://academy.trendtacticsdigital.com
```

**Implementation Steps**:
1. Purchase `trendtacticsdigital.com`
2. Configure DNS records:
   ```
   Type: A Record
   Name: @
   Value: [Your hosting IP]
   
   Type: CNAME
   Name: academy
   Value: [GitHub Pages domain or hosting provider]
   ```
3. Update Academy configuration to use subdomain
4. Configure SSL certificates for both domains

### Option 2: Path-Based Routing
**Structure**:
```
Main Site: https://trendtacticsdigital.com
Academy:   https://trendtacticsdigital.com/academy
```

**Implementation Steps**:
1. Purchase `trendtacticsdigital.com`
2. Configure web server routing:
   - Root path (`/`) → Main website files
   - `/academy` path → Academy files
3. Update internal links to reflect path structure
4. Configure redirects and SEO appropriately

### Option 3: Separate Domain
**Structure**:
```
Main Site: https://trendtacticsdigital.com
Academy:   https://trendtacticsacademy.com
```

**Implementation Steps**:
1. Purchase both domains
2. Host each on separate infrastructure
3. Implement cross-domain authentication
4. Maintain consistent branding and user experience

## 🔧 Technical Implementation

### 1. GitHub Repository Setup
Your Academy code is already in the repository. To deploy:

**Using GitHub Pages**:
```bash
# If not already set up
git checkout -b gh-pages
git push origin gh-pages

# Configure in GitHub Settings → Pages
# Source: Deploy from a branch
# Branch: gh-pages
```

**Using Custom Hosting**:
1. Export repository files
2. Upload to hosting provider
3. Configure domain mapping
4. Set up SSL certificates

### 2. Environment Configuration
Update `js/academy-supabase.js` with production credentials:
```javascript
// Production Academy Supabase configuration
const ACADEMY_SUPABASE_URL = 'https://uimdbodamoeyukrghchb.supabase.co';
const ACADEMY_SUPABASE_KEY = 'YOUR_PRODUCTION_ANON_KEY';
```

### 3. Navigation Integration
Update main website navigation to link to Academy:
```html
<!-- In main website navigation -->
<a href="https://academy.trendtacticsdigital.com">Academy</a>
```

### 4. Shared Authentication
Ensure both sites use the same Supabase Auth:
```javascript
// Both sites should use the same Supabase Auth URL
const AUTH_URL = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
```

## 🚀 Deployment Checklist

### Pre-Domain Acquisition
- [x] Academy backend deployed to Supabase
- [x] Edge Functions deployed and tested
- [x] Sample courses added to database
- [x] GitHub repository updated with all changes
- [x] Documentation completed

### Post-Domain Acquisition
- [ ] Purchase `trendtacticsdigital.com`
- [ ] Configure DNS settings
- [ ] Set up hosting infrastructure
- [ ] Deploy Academy frontend
- [ ] Configure cross-domain authentication
- [ ] Test all integrations
- [ ] Set up monitoring and analytics

## 🔐 Security Considerations

### Cross-Origin Resource Sharing (CORS)
Configure CORS settings in Supabase:
```
Allowed Origins:
- https://trendtacticsdigital.com
- https://academy.trendtacticsdigital.com
- http://localhost:3000 (for development)
```

### Authentication Tokens
Ensure JWT tokens work across domains:
- Use same Supabase project for authentication
- Configure token refresh mechanisms
- Implement secure token storage

## 📊 Monitoring & Analytics

### Unified Tracking
Implement cross-domain analytics:
```javascript
// Google Analytics example
gtag('config', 'GA_MEASUREMENT_ID', {
  linker: {
    domains: ['trendtacticsdigital.com', 'academy.trendtacticsdigital.com']
  }
});
```

### Error Monitoring
Set up error tracking for both sites:
- Frontend JavaScript errors
- Backend function failures
- Database query performance
- User authentication issues

## 🆘 Troubleshooting Common Issues

### Domain Not Resolving
1. Check DNS propagation status
2. Verify DNS record configuration
3. Confirm domain registrar settings

### Authentication Failures
1. Check Supabase Auth configuration
2. Verify CORS settings
3. Test token validity across domains

### Function Connectivity
1. Check Edge Function deployment status
2. Verify API endpoint URLs
3. Test with authentication headers

## 📅 Timeline & Next Steps

### Immediate Actions
1. ✅ Continue testing Academy functionality
2. ✅ Add more sample content to database
3. ✅ Refine user interface and experience

### Short-term Goals (1-2 weeks)
1. 🔄 Plan domain acquisition strategy
2. 🛠️ Prepare hosting infrastructure
3. 🧪 Conduct comprehensive integration testing

### Long-term Vision (1-2 months)
1. 🌐 Launch with acquired domain
2. 📈 Implement marketing and analytics
3. 🎯 Add full course content and materials

## 💡 Pro Tips

1. **Start with Subdomain**: Easiest to implement and maintain
2. **Test Thoroughly**: Ensure seamless user experience across sites
3. **Monitor Performance**: Track load times and user engagement
4. **Plan for Growth**: Design scalable architecture from the beginning
5. **Maintain Consistency**: Keep branding and user experience uniform

Your Academy is technically complete and ready for deployment. The only missing piece is acquiring your domain and configuring the appropriate linking strategy.