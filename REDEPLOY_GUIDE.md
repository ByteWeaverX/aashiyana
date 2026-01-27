# 🚀 Redeploy on Railway After Fix

The Dockerfile has been fixed to properly handle the PORT environment variable. Here's how to redeploy:

## **Option 1: Auto-Redeploy (Automatic)**

Railway automatically detects the new commit and redeploys within 1-2 minutes. Just wait for the notification.

**Check status:**
1. Go to Railway Dashboard
2. Click on your "aashiyana" service
3. Watch the "Build Logs" and "Deploy Logs" tabs

---

## **Option 2: Manual Redeploy (Instant)**

If you want to redeploy immediately:

1. Go to **Railway Dashboard**
2. Click on your **"aashiyana"** service
3. Click the **"Redeploy"** button (usually in the top-right)
4. Click **"Deploy Latest Commit"**

---

## **What Changed**

**Old Dockerfile** (causing error):
```dockerfile
RUN echo '#!/bin/bash\ngunicorn app:app -w 4 -b 0.0.0.0:${PORT}' > /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
```

**New Dockerfile** (working):
```dockerfile
CMD sh -c 'gunicorn app:app -w 4 -b 0.0.0.0:${PORT} --timeout 120'
```

The new approach uses the shell form of CMD which properly expands environment variables at runtime.

---

## **Monitor the Deployment**

1. Go to your service in Railway
2. Watch the **"Deploy Logs"** tab
3. Look for: `Listening on http://0.0.0.0:5000` (or your PORT)
4. If you see it without errors → ✅ Success!

---

## **Test Your App**

Once deployment succeeds:
1. Go to your domain (e.g., `https://web-production-17abf.up.railway.app`)
2. You should see the landing page
3. Try signing up and logging in

---

## **If It Still Fails**

Check these things in Railway Dashboard:

1. **Environment Variables** (must be set):
   - `FLASK_APP`: `app.py`
   - `FLASK_ENV`: `production`
   - `SECRET_KEY`: Your generated key
   - `PORT`: `5000` (or Railway will auto-set)

2. **PostgreSQL Service** should be added (if not, add it)

3. **Check logs** for actual error messages

---

**The fix is pushed! Railway will auto-redeploy soon.** ✨
