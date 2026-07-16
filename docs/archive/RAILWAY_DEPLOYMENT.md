# Railway Deployment Guide - AASHIYANA

## ✅ Pre-Deployment Checklist

- [ ] You have a GitHub account and your project is pushed to GitHub
- [ ] You have a Railway account (free at https://railway.app)
- [ ] You have Docker installed locally (optional, but recommended for testing)
- [ ] Your project has a Dockerfile ✓
- [ ] requirements.txt is up to date ✓

---

## 🚀 Step 1: Prepare Your Project for Railway

### 1.1 Update Dockerfile (if needed)
Your Dockerfile looks good! Railway will use it to build and run your app.

### 1.2 Add a `.dockerignore` file
Create this file in your project root:
```
__pycache__
*.pyc
*.pyo
*.db
.git
.gitignore
.env
instance/
venv/
.DS_Store
.pytest_cache/
```

### 1.3 Set up Environment Variables
Your app needs these environment variables set in Railway:

**Create a `.env.railway` file (don't commit this)**
```
FLASK_APP=app.py
FLASK_ENV=production
SECRET_KEY=your-secure-random-key-here
DATABASE_URL=postgresql://... (Railway will provide this)
PORT=5000
```

---

## 📋 Step 2: Push Your Project to GitHub

1. Initialize git (if not already done):
```powershell
cd C:\Users\DELL\Desktop\aashiyana\House_price_pridiction
git init
git add .
git commit -m "Initial commit: House price prediction Flask app"
```

2. Create a new GitHub repository at https://github.com/new

3. Push your code:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/aashiyana-house.git
git branch -M main
git push -u origin main
```

---

## 🚂 Step 3: Deploy on Railway

### 3.1 Connect to Railway
1. Go to https://railway.app
2. Sign up (free) or log in
3. Click **"New Project"** → **"Deploy from GitHub repo"**

### 3.2 Connect GitHub
1. Click **"Connect GitHub"** and authorize Railway
2. Select your **aashiyana-house** repository
3. Click **"Deploy"**

Railway will automatically:
- Detect your Dockerfile ✓
- Build your image ✓
- Create a PostgreSQL database (if needed) ✓
- Deploy your app ✓

### 3.3 Configure Environment Variables

After deployment, go to your Railway project:

1. Click on your **aashiyana-web** service
2. Go to the **"Variables"** tab
3. Add these variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `FLASK_APP` | `app.py` | Main Flask app file |
| `FLASK_ENV` | `production` | Production mode |
| `SECRET_KEY` | `your-secure-key-here` | Generate a strong secret key |
| `DATABASE_URL` | Auto-set by Railway | PostgreSQL connection string |
| `PORT` | `5000` | Flask port |

### 3.4 Database Setup

Railway automatically creates a PostgreSQL database for you:

1. In your Railway project, click the **"+" button** → **"Add PostgreSQL"**
2. Railway will set the `DATABASE_URL` environment variable automatically
3. Update your `database.py` to use PostgreSQL instead of SQLite:

---

## 🔧 Step 4: Update Your App for Railway

### 4.1 Update `database.py` for PostgreSQL

Replace SQLite configuration with PostgreSQL:

```python
import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Use PostgreSQL in production, SQLite in development
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///users.db')

# PostgreSQL requires psycopg2
if DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
```

### 4.2 Update `app.py`

```python
import os
from database import db, init_db

app = Flask(__name__)

# Load environment variables
app.secret_key = os.getenv('SECRET_KEY', 'dev-key-change-in-production')
app.config['SESSION_COOKIE_SECURE'] = True  # HTTPS only in production
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# Initialize database
init_db(app)
```

### 4.3 Update `requirements.txt`

Add PostgreSQL driver:
```
pandas>=1.5.0
numpy>=1.23.0
scikit-learn>=1.2.0
xgboost>=1.7.0
matplotlib>=3.6.0
seaborn>=0.12.0
joblib>=1.2.0
flask>=3.0.0
flask-login>=0.6.3
flask-sqlalchemy>=3.0.0
werkzeug>=3.0.0
psycopg2-binary>=2.9.0
python-dotenv>=1.0.0
gunicorn>=21.0.0
```

### 4.4 Update `Dockerfile`

Add Gunicorn for production:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create necessary directories
RUN mkdir -p instance

EXPOSE 5000

# Use Gunicorn in production
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
```

---

## ✨ Step 5: Monitor Your Deployment

After pushing changes to GitHub:

1. Railway automatically triggers a new build and deployment
2. Watch the **Build** and **Deploy** logs in the Railway dashboard
3. Your app will be live at: `https://your-app-name.railway.app`

**View Logs:**
- Go to your service → **Logs** tab
- Real-time logs appear as your app runs

---

## 🔒 Security Checklist

- [ ] Change `SECRET_KEY` to a strong random string
- [ ] Set `SESSION_COOKIE_SECURE = True` (HTTPS enforced)
- [ ] Never commit `.env` files
- [ ] Use Railway's environment variables, not hardcoded values
- [ ] Enable HTTPS (automatic on Railway)
- [ ] Set strong database passwords (Railway auto-generates)

---

## 🆘 Troubleshooting

### App crashes on deploy
**Check logs:** Railway Dashboard → Logs tab
- Common issues: Missing environment variables, wrong Python version, missing dependencies

### Database connection error
**Fix:** Ensure `psycopg2-binary` is in `requirements.txt`

### Static files not loading
**Solution:** Add this to your `app.py`:
```python
@app.static_folder
def send_static(filename):
    return send_from_directory(app.static_folder, filename)
```

### Port issues
**Railway sets PORT via environment variable.** Use:
```python
port = os.getenv('PORT', 5000)
app.run(host='0.0.0.0', port=int(port))
```

---

## 📚 Useful Railway Commands

After installing the Railway CLI:

```powershell
# Login to Railway
railway login

# Link to your project
railway link

# Deploy latest changes
railway up

# View logs
railway logs

# Set environment variables
railway variables set KEY=value
```

---

## 🎉 You're Done!

Your app is now live on Railway! 

- **App URL:** `https://your-app-name.railway.app`
- **Dashboard:** `https://railway.app`
- **Auto-updates:** Every GitHub push triggers a new deployment

Need help? Railway docs: https://docs.railway.app
