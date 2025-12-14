@echo off
TITLE Deploy Dashboard Updates to Live Website
COLOR 0A

echo ================================
echo  DASHBOARD DEPLOYMENT SCRIPT  
echo ================================
echo.

echo 🚀 Preparing to deploy dashboard updates...
echo.

echo 🔍 Verifying required files:
if exist "admin-dashboard.html" (
    echo ✅ admin-dashboard.html - Found
) else (
    echo ❌ admin-dashboard.html - Missing
    echo Please run the implementation first
    pause
    exit /b 1
)

if exist "analytics-dashboard.html" (
    echo ✅ analytics-dashboard.html - Found
) else (
    echo ❌ analytics-dashboard.html - Missing
    echo Please run the implementation first
    pause
    exit /b 1
)

if exist "hub.html" (
    echo ✅ hub.html - Found
) else (
    echo ❌ hub.html - Missing
    echo Please run the implementation first
    pause
    exit /b 1
)

if exist "js\main.js" (
    echo ✅ js\main.js - Found
) else (
    echo ❌ js\main.js - Missing
    echo Please run the implementation first
    pause
    exit /b 1
)

if exist "login.html" (
    echo ✅ login.html - Found
) else (
    echo ❌ login.html - Missing
    echo Please run the implementation first
    pause
    exit /b 1
)

if exist "register.html" (
    echo ✅ register.html - Found
) else (
    echo ❌ register.html - Missing
    echo Please run the implementation first
    pause
    exit /b 1
)

echo.
echo 📋 FILES READY FOR DEPLOYMENT:
echo 1. admin-dashboard.html
echo 2. analytics-dashboard.html
echo 3. hub.html
echo 4. js/main.js
echo 5. login.html
echo 6. register.html
echo.

echo 🛠️ DEPLOYMENT INSTRUCTIONS:
echo 1. Use FTP/SFTP client to upload these files to your live website
echo 2. Upload to the same directory structure:
echo    - admin-dashboard.html → website root
echo    - analytics-dashboard.html → website root
echo    - hub.html → website root (replace existing)
echo    - js/main.js → website js folder (replace existing)
echo    - login.html → website root (replace existing)
echo    - register.html → website root (replace existing)
echo.

echo 🔧 POST-DEPLOYMENT STEPS:
echo 1. Clear your browser cache
echo 2. Test the "Get Started" button functionality
echo 3. Register a test admin account (email with "admin")
echo 4. Verify admin dashboard access
echo 5. Test regular user access
echo.

echo 📖 DETAILED INSTRUCTIONS:
echo See DEPLOYMENT_INSTRUCTIONS.md for complete guide
echo.

echo ✅ Deployment preparation complete!
echo.
echo Please manually upload these files to your live website using your preferred method.
echo.
pause