# Trendtactics Digital - Project Structure

## 📁 Root Directory Structure

```
TrendtacticsDigitalClean/
│
├── 📄 Main HTML Pages
│   ├── index.html              # Homepage
│   ├── about.html              # About page
│   ├── services.html           # Services overview
│   ├── blog.html               # Blog listing
│   ├── blog-post.html          # Single blog post template
│   ├── portfolio.html          # Portfolio showcase
│   ├── contact.html            # Contact page
│   ├── pricing.html            # Pricing page
│   ├── quiz.html               # Growth quiz
│   ├── tools.html              # Marketing tools
│   ├── academy.html            # LMS/Academy
│   ├── ebooks.html             # Free ebooks library
│   ├── shop.html               # Book shop
│   ├── courses.html            # Courses page
│   └── Service Pages:
│       ├── service-web-development.html
│       ├── service-app-development.html
│       ├── service-digital-marketing.html
│       ├── service-email-marketing.html
│       ├── service-content-creation.html
│       ├── service-social-media-marketing.html
│       └── service-facebook-ads.html
│
├── 🎨 Styles (CSS)
│   ├── styles/
│   │   ├── main.css            # Main stylesheet
│   │   ├── shared-effects.css  # Shared 3D effects
│   │   ├── about.css           # About page styles
│   │   ├── blog.css            # Blog styles
│   │   ├── portfolio.css       # Portfolio styles
│   │   ├── contact.css         # Contact page styles
│   │   ├── services.css        # Services styles
│   │   ├── quiz.css            # Quiz styles
│   │   ├── tools.css           # Tools page styles
│   │   ├── courses.css         # Courses styles
│   │   ├── admin.css           # Admin styles
│   │   └── compact-header.css  # Header styles
│
├── 💻 JavaScript
│   ├── js/
│   │   ├── main.js             # Core functionality
│   │   ├── app.js              # React components (CDN)
│   │   ├── about.js            # About page logic
│   │   ├── blog.js             # Blog functionality
│   │   ├── blog-post.js        # Single post logic
│   │   ├── portfolio.js        # Portfolio logic
│   │   ├── ebooks.js           # Ebooks functionality
│   │   ├── quiz.js             # Quiz logic
│   │   ├── services.js         # Services logic
│   │   ├── tools.js            # Tools functionality
│   │   ├── admin.js            # Admin panel
│   │   ├── email-service.js    # Email handling
│   │   ├── secure-ai-client.js # AI integration
│   │   └── puter-integration.js  # Puter.com integration
│
├── 📊 Data
│   ├── data/
│   │   ├── content.json        # Main content data
│   │   └── blog-posts.json      # Blog posts data
│
├── 🖼️ Images & Media
│   ├── images/
│   │   ├── brands/             # Client brand logos
│   │   ├── VIDEOS FOR ADVERT/  # Video assets
│   │   ├── Trendtactics-logo.jpg
│   │   ├── Trendtactics-logo - Copy.jpg
│   │   └── [various images]
│   │
│   └── videos/                 # Video files
│
├── 📚 Ebooks
│   └── ebooks/                 # PDF ebooks (16 files)
│
├── 📥 Downloads
│   └── downloads/              # Downloadable resources
│       ├── business-plan-template.docx
│       ├── marketing-checklist.pdf
│       └── social-media-calendar.xlsx
│
├── 🔧 Backend
│   ├── backend/
│   │   ├── server.js           # Main backend server
│   │   ├── config.js           # Configuration
│   │   ├── package.json        # Backend dependencies
│   │   │
│   │   ├── routes/             # API routes
│   │   │   ├── auth.js         # Authentication
│   │   │   └── ai.js           # AI endpoints
│   │   │
│   │   ├── models/             # Database models
│   │   │   ├── User.js
│   │   │   └── BlogPost.js
│   │   │
│   │   ├── controllers/        # Route controllers
│   │   │
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── services/           # Business logic
│   │   │   └── aiService.js
│   │   │
│   │   └── utils/              # Utilities
│   │       ├── apiKeyManager.js
│   │       └── sendEmail.js
│
├── ⚛️ Frontend (React App)
│   ├── frontend/
│   │   ├── package.json        # React dependencies
│   │   ├── tailwind.config.js  # Tailwind CSS config
│   │   ├── postcss.config.js   # PostCSS config
│   │   │
│   │   ├── public/             # Public assets
│   │   │   ├── index.html
│   │   │   ├── favicon.ico
│   │   │   └── manifest.json
│   │   │
│   │   └── src/                # React source code
│   │       ├── App.js
│   │       ├── index.js
│   │       └── [React components]
│
├── 🚀 Next.js App (Separate)
│   └── trendtactics-digital/   # Next.js 15 project
│       ├── package.json
│       ├── tailwind.config.js
│       └── [Next.js files]
│
├── 🌐 Public
│   └── public/
│       ├── js/
│       │   └── quiz.js
│       └── quiz.html
│
├── 🔄 GitHub Workflows
│   ├── .github/
│   │   ├── DEPLOYMENT_SETUP.md      # Deployment guide
│   │   ├── ENABLE_GITHUB_PAGES.md   # GitHub Pages setup
│   │   │
│   │   └── workflows/
│   │       ├── deploy.yml            # cPanel/FTP deployment
│   │       └── github-pages.yml      # GitHub Pages deployment
│
├── ⚙️ Configuration Files
│   ├── package.json            # Root package.json
│   ├── server.js               # Simple Express server
│   ├── simple-server.js        # Static file server
│   ├── .gitignore              # Git ignore rules
│   ├── .env                    # Environment variables
│   ├── .env.example            # Environment template
│   ├── sitemap.xml             # SEO sitemap
│   └── rss.xml                 # RSS feed
│
└── 📖 Documentation
    ├── README.md                # Main README
    ├── API_KEYS_SETUP.md       # API setup guide
    ├── BLOG_SETUP.md           # Blog setup
    ├── FRONTEND_INTEGRATION.md # Frontend guide
    ├── INTEGRATION_GUIDE.md    # Integration guide
    └── PRICING_ANALYSIS.md      # Pricing documentation
```

## 🎯 Key Directories Explained

### **Main Website Files** (Root Level)
- All `.html` files are the main pages of your website
- These are static HTML files with embedded CSS and JavaScript
- No build process required - works directly in browser

### **styles/**
- Contains all CSS stylesheets
- `main.css` - Core styles for entire site
- `shared-effects.css` - 3D effects and animations
- Page-specific CSS files for individual pages

### **js/**
- All JavaScript functionality
- `main.js` - Core site functionality
- `app.js` - React components (loaded via CDN)
- Page-specific JS files

### **backend/**
- Node.js/Express backend server
- MongoDB database models
- API routes and authentication
- Used for LMS, admin panel, and API endpoints

### **frontend/**
- Separate React application
- Uses Create React App
- Has its own build process
- Currently separate from main website

### **.github/workflows/**
- GitHub Actions workflows
- Automated deployment to cPanel and GitHub Pages
- Runs on every push to `main` branch

## 📊 Project Statistics

- **Total HTML Pages:** ~25+ pages
- **CSS Files:** 11 stylesheets
- **JavaScript Files:** 15+ scripts
- **Ebooks:** 16 PDF files
- **Backend Routes:** Multiple API endpoints
- **Deployment Options:** cPanel/FTP + GitHub Pages

## 🔄 Development Workflow

1. **Main Website:** Edit HTML/CSS/JS directly → No build needed
2. **Backend:** Node.js server → `npm start` or `node backend/server.js`
3. **Frontend React:** Separate app → `cd frontend && npm start`
4. **Deployment:** Automatic via GitHub Actions on push to `main`

## 🚀 Quick Start Commands

```bash
# Simple static server
node simple-server.js

# Backend server
npm start
# or
node backend/server.js

# Frontend React app
cd frontend && npm start
```

---

**Last Updated:** December 2024
**Project Type:** Static Website + Node.js Backend + React Frontend

