@echo off
REM Railway Deployment Script for AASHIYANA
REM This script helps you deploy to Railway with minimal steps

echo.
echo ========================================
echo  AASHIYANA Railway Deployment
echo ========================================
echo.

echo Step 1: Verifying Git Status...
git status
echo.

echo Step 2: Generate a Strong Secret Key
echo.
echo Run this command in PowerShell to generate SECRET_KEY:
echo.
echo   python -c "import secrets; print(secrets.token_hex(32))"
echo.
echo Copy the output - you'll need it for Railway environment variables.
echo.

echo Step 3: Railway Deployment Instructions
echo.
echo 1. Go to https://railway.app
echo 2. Sign up or log in
echo 3. Click "New Project" ^> "Deploy from GitHub repo"
echo 4. Connect GitHub and select: ByteWeaverX/aashiyana
echo 5. Wait for automatic build and deployment
echo.
echo Step 4: Configure Environment Variables (in Railway Dashboard)
echo.
echo Add these variables:
echo   FLASK_APP: app.py
echo   FLASK_ENV: production
echo   SECRET_KEY: ^<paste-the-generated-secret-key^>
echo   PORT: 5000
echo.
echo Railway will automatically create DATABASE_URL for PostgreSQL
echo.

echo Step 5: Monitor Deployment
echo.
echo - Check logs in Railway Dashboard ^> Your Service ^> Logs
echo - Your app will be live at: https://^<your-domain^>.railway.app
echo.

echo ========================================
echo  Deployment Files Ready!
echo ========================================
echo.
echo GitHub Repo: https://github.com/ByteWeaverX/aashiyana
echo Documentation: See RAILWAY_QUICK_START.md
echo.
pause
