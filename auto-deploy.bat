@echo off
TITLE Auto Deploy to GitHub Pages
COLOR 0A

echo ================================
echo  AUTO DEPLOYMENT TO GITHUB PAGES
echo ================================
echo.

echo 🚀 Starting automatic deployment...
echo.

echo 🔍 Checking prerequisites...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Node.js is installed
) else (
    echo ❌ Node.js not found
    echo 📝 Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if GitHub CLI is installed
gh --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ GitHub CLI is installed
) else (
    echo ❌ GitHub CLI not found
    echo 📝 Please install GitHub CLI from https://cli.github.com/
    echo 💡 After installation, run: gh auth login
    pause
    exit /b 1
)

echo.
echo 🔧 Checking Git repository status...

REM Check if we're in a git repository
git rev-parse --git-dir >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Git repository detected
) else (
    echo ❌ Not a Git repository
    echo 📝 Please initialize Git repository:
    echo    git init
    echo    git remote add origin YOUR_REPOSITORY_URL
    pause
    exit /b 1
)

REM Check current branch
for /f %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
echo ✅ Current branch: %CURRENT_BRANCH%

if not "%CURRENT_BRANCH%"=="main" (
    echo ⚠️  Warning: Not on main branch
    echo    Consider switching to main: git checkout main
)

echo.
echo 🚀 Running auto deployment script...
echo.

node auto-deploy.js

echo.
echo 🎉 Deployment process completed!
echo.
echo 📋 Next steps:
echo 1. Visit your repository on GitHub
echo 2. Go to Settings → Pages to monitor deployment
echo 3. Your site will be available at:
echo    https://iamGoldenOla.github.io/trendtacticsdigital
echo.
pause