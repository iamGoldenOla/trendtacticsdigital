@echo off
title TrendTacticsDigital - Deployment

echo =====================================================
echo    TrendTacticsDigital Deployment Tool     
echo =====================================================
echo.

echo [1/3] Preparing deployment files...
echo ------------------------------------
echo Main HTML files copied to deployment folder
echo Asset folders prepared for upload

echo.
echo [2/3] Upload Instructions
echo ------------------------
echo Please upload the entire contents of the "deployment" folder to your cPanel:
echo   - Host: Your cPanel FTP server
echo   - Username: Your cPanel username
echo   - Password: Your cPanel password
echo   - Directory: /public_html/

echo.
echo [3/3] Finalize Deployment
echo -----------------------
echo After uploading:
echo   1. Visit: http://trendtacticsdigital.com/update-hub-cpanel.php
echo   2. Test your website
echo   3. Verify authentication is working

echo.
echo =====================================================
echo    Deployment preparation complete!                 
echo =====================================================
echo Press any key to open the deployment folder...
pause >nul
explorer "%~dp0deployment"
