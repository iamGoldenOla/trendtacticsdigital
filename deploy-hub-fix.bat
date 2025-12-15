@echo off
title TrendTacticsDigital - Hub Fix Deployment

echo =====================================================
echo    TrendTacticsDigital Hub Fix Deployment Tool     
echo =====================================================
echo.

echo [1/4] Preparing deployment files...
echo ------------------------------------

:: Copy the new hub.html to a temporary deployment folder
if not exist "deployment" mkdir "deployment"

echo Copying hub.html...
copy "hub.html" "deployment\" >nul

echo Copying update script...
copy "update-hub-cpanel.php" "deployment\" >nul

echo.
echo [2/4] Deployment files prepared
echo --------------------------------
echo Files ready for upload:
echo   - hub.html (updated hub page)
echo   - update-hub-cpanel.php (auto-update script)
echo.

echo [3/4] Upload Instructions
echo ------------------------
echo Please upload these files to your cPanel hosting:
echo.
echo Method 1 - File Manager:
echo   1. Log into your cPanel
echo   2. Go to File Manager
echo   3. Navigate to public_html directory
echo   4. Upload both files from the deployment folder
echo.
echo Method 2 - FTP Client:
echo   1. Open your FTP client (FileZilla, etc.)
echo   2. Connect to your server
echo   3. Navigate to public_html directory
echo   4. Upload both files
echo.

echo [4/4] Execute Auto-Update
echo -----------------------
echo After uploading the files:
echo   1. Visit: http://trendtacticsdigital.com/update-hub-cpanel.php
echo   2. The script will automatically replace your old hub.html
echo   3. Test your hub page to confirm the # issue is fixed
echo.

echo =====================================================
echo    Deployment preparation complete!                 
echo =====================================================
echo Press any key to open the deployment folder...
pause >nul
explorer "deployment"