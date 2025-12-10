# 🚀 Quick Setup: GitHub FTP Secrets

## ✅ **Your FTP Information (from QServers email):**

- **FTP Hostname:** `ftp.trendtacticsdigital.com`
- **FTP Username:** `trendta1`
- **FTP Password:** (Same as your cPanel password)
- **Control Panel Username:** `trendta1`

---

## 📝 **Step-by-Step: Set GitHub Secrets**

### **Step 1: Go to GitHub Secrets Page**
1. Open: https://github.com/iamGoldenOla/trendtacticsdigital/settings/secrets/actions
2. Or navigate: Repository → **Settings** → **Secrets and variables** → **Actions**

### **Step 2: Add Secret 1 - FTP_SERVER**
1. Click: **"New repository secret"** (green button)
2. **Name:** `FTP_SERVER`
3. **Secret:** `ftp.trendtacticsdigital.com`
4. Click: **"Add secret"**

### **Step 3: Add Secret 2 - FTP_USERNAME**
1. Click: **"New repository secret"** again
2. **Name:** `FTP_USERNAME`
3. **Secret:** `trendta1`
4. Click: **"Add secret"**

### **Step 4: Add Secret 3 - FTP_PASSWORD**
1. Click: **"New repository secret"** again
2. **Name:** `FTP_PASSWORD`
3. **Secret:** (Enter your cPanel password - the same one you use to log into cPanel)
4. Click: **"Add secret"**

---

## ✅ **Verification Checklist:**

After adding all 3 secrets, you should see:
- ✅ `FTP_SERVER` = `ftp.trendtacticsdigital.com`
- ✅ `FTP_USERNAME` = `trendta1`
- ✅ `FTP_PASSWORD` = `[HIDDEN]` (you won't see the actual password)

---

## 🔒 **Password Security Note:**

**Current Setup:**
- You're using the same password for FTP and cPanel
- This is **common and acceptable** for personal/small projects
- GitHub encrypts the password, so it's safe in secrets

**Best Practice (Optional - for later):**
- Consider creating a separate FTP account with a different password
- This way, if FTP is compromised, cPanel is still safe
- But for now, using the same password is fine

---

## 🚀 **After Setting Secrets:**

1. **Go to:** GitHub → **Actions** tab
2. **Find:** The failed "Deploy to FTP" workflow
3. **Click:** "Re-run jobs" (or "Re-run all jobs")
4. **Watch:** The deployment should now succeed!

---

## 🧪 **Test Your FTP Connection (Optional):**

If you want to verify your FTP works before deploying:

1. **Download FileZilla** (free): https://filezilla-project.org/
2. **Enter:**
   - **Host:** `ftp.trendtacticsdigital.com`
   - **Username:** `trendta1`
   - **Password:** (Your cPanel password)
   - **Port:** `21`
3. **Click:** "Quickconnect"
4. If it connects successfully, your GitHub deployment will work too!

---

## 📋 **Summary:**

**What to set in GitHub:**
- `FTP_SERVER` = `ftp.trendtacticsdigital.com`
- `FTP_USERNAME` = `trendta1`
- `FTP_PASSWORD` = (Your cPanel password)

**Where to set it:**
- https://github.com/iamGoldenOla/trendtacticsdigital/settings/secrets/actions

**After setting:**
- Re-run the failed workflow
- Deployment should succeed!

---

**Ready to deploy!** 🎉



