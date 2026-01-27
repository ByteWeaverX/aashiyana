# Railway Deployment Checklist for AASHIYANA

## ✅ Pre-Deployment Setup (Complete These)

### Step 1: Prepare Repository
- [x] Code updated for environment variables ✓
- [x] requirements.txt updated with psycopg2-binary & gunicorn ✓
- [x] Dockerfile configured with Gunicorn ✓
- [x] .dockerignore created ✓
- [ ] .env.example created for reference ✓

### Step 2: Push to GitHub
```powershell
cd C:\Users\DELL\Desktop\aashiyana\House_price_pridiction

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Configure for Railway deployment: add env variables, PostgreSQL support, and Gunicorn"

# Add GitHub remote (replace ByteWeaverX with your username if different)
git remote add origin https://github.com/ByteWeaverX/aashiyana-house.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Generate Strong Secret Key
```powershell
python -c "import secrets; print(secrets.token_hex(32))"
```
Copy the output - you'll need this for Railway environment variables.

---

## 🚂 Railway Setup (5 Minutes)

1. **Go to Railway**: https://railway.app
2. **Sign up** (free) or log in
3. **Create new project** → Click "Deploy from GitHub repo"
4. **Connect GitHub**:
   - Click "Connect GitHub"
   - Authorize Railway
   - Select: `ByteWeaverX/aashiyana-house`
   - Click "Deploy"

5. **Add Environment Variables** (in Railway Dashboard):
   - Go to your deployed service → "Variables" tab
   - Add these:
   ```
   FLASK_APP=app.py
   FLASK_ENV=production
   SECRET_KEY=<paste-the-generated-secret-key>
   PORT=5000
   ```

6. **Add PostgreSQL Database**:
   - Click "+" button → "Add PostgreSQL"
   - Railway auto-creates: `DATABASE_URL` environment variable ✓

---

## 📊 After Deployment

### View Logs
- Railway Dashboard → Your Service → "Logs" tab
- Real-time logs appear here

### Get Your App URL
- Railway Dashboard → Your Service → "Settings" tab
- Find "Domains" section
- Your app is live at: `https://<generated-domain>.railway.app`

### Test the App
- Visit: `https://<your-domain>.railway.app`
- Try sign up, login, and prediction features

---

## 🔧 Making Updates (After Initial Deployment)

1. Make code changes locally
2. Commit and push to GitHub:
   ```powershell
   git add .
   git commit -m "Your change description"
   git push origin main
   ```
3. Railway automatically rebuilds and redeploys! ✓

---

## 🆘 Troubleshooting

### "App crashes on startup"
- **Check**: Railway Logs tab
- **Common**: Missing environment variables
- **Fix**: Ensure all variables are set in Railway dashboard

### "Database connection error"
- **Check**: Is DATABASE_URL set in Railway?
- **Fix**: Try removing and re-adding PostgreSQL service

### "Port is already in use"
- **Not an issue** - Railway manages ports automatically

### "Static files not loading"
- Already configured in your Flask app ✓

---

## 📝 Git Push Commands (Quick Reference)

```powershell
# After making changes:
git add .
git commit -m "Description of changes"
git push origin main

# View git status
git status

# View recent commits
git log --oneline -5
```

---

## ✨ Your Deployment is Ready!

**Next Steps:**
1. Run the git commands in Step 2 above
2. Go to Railway.app and deploy from GitHub
3. Set environment variables
4. Your app goes live!

**GitHub**: https://github.com/ByteWeaverX/aashiyana-house

Need help? Check [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for detailed instructions.
