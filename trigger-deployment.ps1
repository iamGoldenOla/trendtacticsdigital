# Trigger GitHub Pages deployment by creating an empty commit
Write-Host "🚀 Triggering GitHub Pages Deployment..." -ForegroundColor Green
Write-Host ""

# Check if we're in a git repository
try {
    $branch = git branch --show-current
    Write-Host "Current branch: $branch" -ForegroundColor Cyan
    
    # Check for uncommitted changes
    $status = git status --porcelain
    if ($status) {
        Write-Host "Warning: You have uncommitted changes. Please commit or stash them before proceeding." -ForegroundColor Yellow
        Write-Host $status -ForegroundColor Yellow
        exit 1
    }
    
    # Check if we're up to date with remote
    Write-Host "Checking remote status..." -ForegroundColor Cyan
    $remoteStatus = git status -sb
    if ($remoteStatus -match "behind") {
        Write-Host "Pulling latest changes from remote..." -ForegroundColor Cyan
        git pull origin $branch
    }
    
    # Create empty commit to trigger deployment
    Write-Host "Creating empty commit to trigger deployment..." -ForegroundColor Cyan
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit --allow-empty -m "Trigger deployment - $timestamp"
    
    # Push to trigger GitHub Actions
    Write-Host "Pushing to GitHub to trigger deployment..." -ForegroundColor Cyan
    git push origin main
    
    Write-Host ""
    Write-Host "✅ Deployment triggered successfully!" -ForegroundColor Green
    Write-Host "===================================" -ForegroundColor Green
    Write-Host "Visit https://github.com/iamGoldenOla/trendtacticsdigital/actions to monitor deployment progress" -ForegroundColor Yellow
    Write-Host "Your site should be available at https://iamGoldenOla.github.io/trendtacticsdigital in 2-5 minutes" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Tip: If you don't see changes immediately, clear your browser cache or try an incognito window" -ForegroundColor Cyan
}
catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please ensure you're in the correct git repository and have proper permissions." -ForegroundColor Yellow
}