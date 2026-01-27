# 🚀 Deploy AASHIYANA to Railway - Step by Step

**GitHub Repository**: https://github.com/ByteWeaverX/aashiyana  
**Status**: ✅ All files pushed and ready!

---

## 📋 Pre-Deployment Checklist

- [x] All files pushed to GitHub ✓
- [x] Code configured for environment variables ✓
- [x] PostgreSQL driver included ✓
- [x] Gunicorn included ✓
- [x] Dockerfile ready ✓

---

## 🎯 Railway Deployment (Follow These Steps)

### **Step 1: Generate Secret Key** (2 minutes)

Open PowerShell and run:
```powershell
python -c "import secrets; print(secrets.token_hex(32))"
```

**Save this output** - you'll need it in Step 4!

Example output:
```
a7c2f9e1b5d4c6a9f2e1b5d4c6a9f2e1b5d4c6a9f2e1b5d4c6a9f2e1b5d4c6
```

---

### **Step 2: Go to Railway** (1 minute)

1. Open https://railway.app
2. Click **"Sign Up"** (free account)
3. Authorize with GitHub (recommended)

---

### **Step 3: Create New Project** (2 minutes)

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Click **"Connect GitHub"** and authorize Railway
4. **Select your repository**: `ByteWeaverX/aashiyana`
5. Click **"Deploy"**

✨ Railway will automatically:
- Detect your Dockerfile
- Build your Docker image
- Deploy to Railway servers
- Set up a domain name

---

### **Step 4: Configure Environment Variables** (3 minutes)

Once deployment completes:

1. Go to your Railway Dashboard
2. Click on your **"aashiyana-web"** service
3. Click **"Variables"** tab
4. Add these variables:

| Key | Value |
|-----|-------|
| `FLASK_APP` | `app.py` |
| `FLASK_ENV` | `production` |
| `SECRET_KEY` | Paste your generated key from Step 1 |
| `PORT` | `5000` |

**Leave `DATABASE_URL` blank** - Railway will auto-create PostgreSQL and set this automatically!

5. Click **"Deploy"** button to redeploy with new variables

---

### **Step 5: Add PostgreSQL Database** (1 minute)

1. In Railway Dashboard, click **"+"** button
2. Select **"Add PostgreSQL"**
3. Railway creates a PostgreSQL database automatically
4. The `DATABASE_URL` environment variable is automatically set ✓

---

### **Step 6: Monitor Deployment** (Real-time)

1. Go to your service → **"Logs"** tab
2. Watch real-time logs as your app starts
3. Look for: `"Running on http://0.0.0.0:5000"`

**Your app is now live!** 🎉

---

## 🌐 Access Your App

Once deployment completes:

1. Go to your service → **"Settings"** tab
2. Look for **"Domains"** section
3. Click the generated domain link
4. Your app is live! Example: `https://aashiyana-prod-xxxx.railway.app`

---

## ✅ Verify It's Working

Test your live app:

1. **Landing Page**: https://your-domain.railway.app
2. **Sign Up**: Create a test account
3. **Login**: Test login functionality
4. **Predict**: Use the price prediction feature

---

## 📊 After Deployment

### **Auto-Updates from GitHub**

Every time you push to GitHub:
1. Railway detects changes
2. Rebuilds Docker image
3. Redeploys automatically ✓

**No manual re-deployment needed!**

### **View Logs Anytime**

Railway Dashboard → Your Service → Logs

---

## 🆘 Troubleshooting

### **"App crashed on startup"**
- Check logs in Railway Dashboard
- Common issue: Missing environment variables
- **Fix**: Add all variables from Step 4

### **"Database connection error"**
- Ensure PostgreSQL service is added (Step 5)
- Verify `DATABASE_URL` is set (it auto-sets when you add PostgreSQL)
- **Fix**: Try redeploying after adding PostgreSQL

### **"Static files not loading"**
- Already configured in your Flask app ✓
- Clear browser cache and refresh

### **"Port already in use"**
- Not an issue with Railway - it manages ports automatically

---

## 📝 Quick Commands

After initial deployment, to update your app:

```powershell
# Make changes locally
# Then:
git add .
git commit -m "Your changes"
git push origin main

# Railway auto-deploys within 1-2 minutes!
```

---

## 🔐 Security Notes

- ✅ Environment variables are secure in Railway
- ✅ PostgreSQL passwords are auto-generated
- ✅ HTTPS is enabled automatically
- ✅ Never commit `.env` files

---

## 📞 Need Help?

- **Railway Docs**: https://docs.railway.app
- **GitHub Repo**: https://github.com/ByteWeaverX/aashiyana
- **Railway Support**: https://railway.app/support

---

## ✨ You're All Set!

**Next Steps:**
1. Generate SECRET_KEY (Step 1)
2. Go to railway.app and deploy from GitHub (Steps 2-3)
3. Add environment variables (Step 4)
4. Add PostgreSQL (Step 5)
5. Check logs (Step 6)

**Your app will be live in ~5-10 minutes!** 🚀
