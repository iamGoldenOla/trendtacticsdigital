@echo off
setlocal

set SRC=C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean
set STAGE=C:\Users\Akinola Olujobi\Documents\TrendtacticsStage
set OUT=%SRC%\trendtactics-FULL-DEPLOY-FINAL.zip

echo === Trendtactics Digital - Full Deploy Zip Creator ===
echo.

:: Clean stage
if exist "%STAGE%" rmdir /s /q "%STAGE%"
mkdir "%STAGE%"

:: Copy folders
echo Copying folders...
for %%D in (images js styles videos ebooks data components public downloads) do (
    if exist "%SRC%\%%D" (
        xcopy "%SRC%\%%D" "%STAGE%\%%D\" /E /I /Q /Y
        echo   + %%D
    )
)

:: Copy HTML files
echo Copying HTML pages...
for %%F in (
    index.html about.html services.html blog.html blog-post.html
    portfolio.html contact.html pricing.html academy.html ebooks.html
    tools.html quiz.html shop.html hub.html me.html login.html
    register.html dashboard.html client-dashboard.html analytics-dashboard.html
    academy-enroll.html trendy-ai.html privacy-policy.html coming-soon.html
    courses.html
    service-app-development.html service-content-creation.html
    service-digital-marketing.html service-email-marketing.html
    service-facebook-ads.html service-social-media-marketing.html
    service-web-development.html
) do (
    if exist "%SRC%\%%F" (
        copy /Y "%SRC%\%%F" "%STAGE%\%%F" >nul
        echo   + %%F
    )
)

:: Copy root config files
echo Copying config files...
copy /Y "%SRC%\.htaccess" "%STAGE%\.htaccess" >nul
copy /Y "%SRC%\robots.txt" "%STAGE%\robots.txt" >nul
copy /Y "%SRC%\sitemap.xml" "%STAGE%\sitemap.xml" >nul
copy /Y "%SRC%\rss.xml" "%STAGE%\rss.xml" >nul
echo   + .htaccess, robots.txt, sitemap.xml, rss.xml

echo.
echo Staging complete! Now zipping...
echo.

:: Delete old zip if exists
if exist "%OUT%" del /f /q "%OUT%"

:: Use tar (built into Windows 10+) to create zip
cd /d "%STAGE%"
tar -a -c -f "%OUT%" *

echo.
echo ==========================================
echo DONE!
echo Zip: %OUT%
echo ==========================================
pause
