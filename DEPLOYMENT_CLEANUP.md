# Deployment Cleanup Guide

## ✅ Your Real Website Location

**Your real website is the HTML files in the root directory:**
- `index.html`
- `about.html`
- `services.html`
- `contact.html`
- `blog.html`
- `portfolio.html`
- `pricing.html`
- `tools.html`
- `ebooks.html`
- `quiz.html`
- `academy.html`
- All service pages (service-*.html)

**Plus these folders:**
- `/images` - All your images
- `/js` - Frontend JavaScript files
- `/styles` - CSS files
- `/videos` - Video files
- `/data` - JSON data files (needed for the site)

## ❌ What Should NOT Be Deployed

The workflow now excludes these automatically:

### Backend/Server Files
- `/backend` folder
- `server.js`
- `simple-server.js`
- `.env` files
- `package.json` (root level)
- `package-lock.json` (root level)

### Development Folders
- `/frontend` folder
- `/trendtactics-digital` folder
- `/trendtacticsdigital` folder

### Development Scripts
- `create-env-file.js`
- `setup-api-keys.js`
- `generate-ebooks-json.js`
- `add_keys.bat`
- `add_keys.ps1`
- `get-pip.py`

### Documentation
- All `*.md` files
- `README*` files

### Test/Admin Files
- `test-*.html`
- `debug-*.html`
- `diagnostic.html`
- `admin*.html`
- `dashboard.html`
- `login.html`
- `courses.html`
- `coming-soon.html`

### Other
- `/downloads` folder
- `/ebooks` folder (PDFs - if you want these, we can include them)
- `/public` folder
- `rss.xml`, `sitemap.xml` (if not needed)

## ✅ What WILL Be Deployed

### HTML Pages (Your Website)
- All main HTML pages in root
- All service pages

### Assets
- `/images` folder
- `/js` folder (frontend JavaScript)
- `/styles` folder (CSS)
- `/videos` folder
- `/data` folder (JSON files for content)

### Configuration
- `.htaccess` (Apache configuration)
- `favicon.ico`

## 🚀 Deployment Status

The workflow has been updated to automatically exclude all unnecessary files. 

**Next deployment will only include:**
- HTML files
- Images, CSS, JS, Videos
- Data JSON files
- .htaccess

**It will NOT include:**
- Backend files
- Development files
- Documentation
- Test files

## 📝 If You Need to Include Something

If you need to include `/ebooks` or `/downloads` folders, let me know and I'll update the workflow.


