# cPanel Deployment Guide

## ✅ **Correct Configuration**

### **1. Remote Directory**
```
CPANEL_REMOTE_DIR = /public_html
```

**This is CORRECT** for most cPanel setups. However, check your specific setup:

- **Main Domain:** `/public_html/`
- **Subdomain:** `/public_html/subdomain/`
- **Addon Domain:** `/public_html/addondomain/`

### **2. .htaccess File**

**❌ WRONG .htaccess (for SPA):**
```apache
RewriteRule ^.*$ index.html [L]
```
This redirects ALL pages to index.html - **will break your multi-page website!**

**✅ CORRECT .htaccess (for multi-page):**
The `.htaccess` file I created is correct for your website structure.

---

## 📁 **Your Website Structure**

You have a **multi-page website** with:
- `index.html` - Homepage
- `about.html` - About page
- `blog.html` - Blog page
- `contact.html` - Contact page
- `portfolio.html` - Portfolio page
- `services.html` - Services page
- And 30+ other HTML pages

**Each page is a separate file** - they need to load directly, not redirect to index.html!

---

## 🔧 **Deployment Configuration**

### **GitHub Actions Workflow**

Your current workflow uses:
```yaml
server-dir: ${{ secrets.FTP_SERVER_DIR || '/public_html/' }}
```

**Options:**

1. **Set GitHub Secret:**
   - Go to: Settings → Secrets → Actions
   - Add: `FTP_SERVER_DIR` = `/public_html/`
   - (Note the trailing slash - some setups need it, some don't)

2. **Or use default:**
   - The workflow already defaults to `/public_html/`
   - Just make sure your FTP credentials are set

---

## 📝 **.htaccess Features**

The `.htaccess` file I created includes:

### ✅ **What It Does:**
1. **Serves HTML files correctly** - Each page loads as intended
2. **Optional clean URLs** - `/about` instead of `/about.html` (commented out)
3. **Security headers** - Protects against common attacks
4. **Compression** - Faster page loads
5. **Browser caching** - Better performance
6. **Protects sensitive files** - Blocks access to .env, .log, etc.

### ⚠️ **What It Doesn't Do:**
- ❌ Redirect everything to index.html (that would break your site!)
- ❌ Force SPA behavior
- ❌ Break your multi-page structure

---

## 🚀 **Deployment Steps**

### **1. Upload .htaccess File**

1. Upload `.htaccess` to your cPanel `/public_html/` directory
2. In cPanel File Manager:
   - Click "Settings" → "Show Hidden Files"
   - Upload `.htaccess` file
   - Make sure it's in the root (`/public_html/`)

### **2. Verify Directory Structure**

Your files should be in:
```
/public_html/
├── index.html
├── about.html
├── blog.html
├── contact.html
├── styles/
├── js/
├── images/
└── .htaccess
```

### **3. Test Your Website**

After deployment, test:
- ✅ `yoursite.com/` → Should show index.html
- ✅ `yoursite.com/about.html` → Should show about page
- ✅ `yoursite.com/blog.html` → Should show blog page
- ✅ `yoursite.com/about` → Should also work (if clean URLs enabled)

---

## ⚠️ **Common Issues**

### **Issue 1: 404 Errors on Refresh**

**If you get 404 errors:**
- Check that `.htaccess` is uploaded correctly
- Verify file permissions (should be 644)
- Check cPanel error logs

### **Issue 2: All Pages Redirect to Home**

**If all pages show index.html:**
- You're using the WRONG .htaccess (SPA version)
- Use the multi-page version I created
- Remove the `RewriteRule ^.*$ index.html [L]` line

### **Issue 3: Files Not Uploading**

**If files don't appear:**
- Check FTP directory path
- Verify `/public_html/` is correct for your account
- Some hosts use `/public_html/domain.com/` for addon domains

---

## 🔍 **Verify Your cPanel Setup**

### **Check Your Directory:**

1. Log into cPanel
2. Go to File Manager
3. Check your domain's document root:
   - Main domain: Usually `/public_html/`
   - Subdomain: Usually `/public_html/subdomain/`
   - Addon domain: Check in "Addon Domains" section

### **Common cPanel Paths:**

| Setup | Path |
|-------|------|
| Main Domain | `/public_html/` |
| Subdomain | `/public_html/subdomain/` |
| Addon Domain | `/public_html/addondomain/` |
| Some Hosts | `/home/username/public_html/` |

---

## ✅ **Final Checklist**

Before deploying:

- [ ] `.htaccess` file created (multi-page version)
- [ ] FTP directory path confirmed (`/public_html/`)
- [ ] GitHub Secrets configured (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)
- [ ] Test deployment on staging first (if possible)
- [ ] Verify all HTML pages load correctly
- [ ] Check that images and CSS load
- [ ] Test JavaScript functionality

---

## 🎯 **Summary**

**✅ Correct:**
- `CPANEL_REMOTE_DIR = /public_html` ✅
- Multi-page `.htaccess` file ✅

**❌ Wrong:**
- SPA `.htaccess` (redirects everything to index.html) ❌

**Your website structure requires the multi-page `.htaccess` configuration!**

---

**Last Updated:** December 2024

