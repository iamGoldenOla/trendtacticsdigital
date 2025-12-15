# 🔐 GitHub Secrets Setup Guide

## ❌ **Current Error:**
```
Error: getaddrinfo ENOTFOUND *** (control socket)
```

**This means:** The `FTP_SERVER` secret is either:
- Not set in GitHub
- Set incorrectly
- Empty or has placeholder value

---

## ✅ **How to Fix:**

### **Step 1: Get Your FTP Information from cPanel**

1. **Log into your cPanel**
2. **Go to:** Files → FTP Accounts
3. **Find your FTP account** (or create one if needed)
4. **Note down:**
   - **FTP Server:** Usually `ftp.yourdomain.com` or `yourdomain.com` or your server IP
   - **FTP Username:** Your cPanel username or FTP account username
   - **FTP Password:** Your FTP account password

### **Step 2: Set GitHub Secrets**

1. **Go to your GitHub repository:**
   - https://github.com/iamGoldenOla/trendtacticsdigital

2. **Click:** Settings (top menu)

3. **Click:** Secrets and variables → Actions (left sidebar)

4. **Click:** New repository secret (green button)

5. **Add these 3 secrets:**

#### **Secret 1: FTP_SERVER**
- **Name:** `FTP_SERVER`
- **Value:** Your FTP server address
  - Examples:
    - `ftp.yourdomain.com`
    - `yourdomain.com`
    - `123.45.67.89` (if using IP)
    - `files.yourdomain.com`
  
  **⚠️ Important:** 
  - Do NOT include `ftp://` or `ftps://` prefix
  - Do NOT include port number (like `:21`)
  - Just the domain or IP address

#### **Secret 2: FTP_USERNAME**
- **Name:** `FTP_USERNAME`
- **Value:** Your cPanel FTP username
  - Usually: `cpanel_username` or `cpanel_username@yourdomain.com`
  - Check in cPanel → FTP Accounts

#### **Secret 3: FTP_PASSWORD**
- **Name:** `FTP_PASSWORD`
- **Value:** Your FTP account password
  - The password you use to connect via FTP

---

## 🔍 **How to Find Your FTP Server Address:**

### **Method 1: Check cPanel FTP Accounts**
1. cPanel → Files → FTP Accounts
2. Look at "FTP Server" column
3. Copy the server address (without `ftp://`)

### **Method 2: Check Your Domain**
- If your website is `trendtacticsdigital.com`
- FTP server is usually: `ftp.trendtacticsdigital.com` or `trendtacticsdigital.com`

### **Method 3: Check cPanel Welcome Email**
- Your hosting provider usually sends FTP details in welcome email
- Look for "FTP Host" or "FTP Server"

### **Method 4: Contact Your Hosting Provider**
- Ask them: "What is my FTP server address for cPanel?"

---

## 🧪 **Test Your FTP Connection:**

Before setting secrets, test if your FTP works:

### **Using FileZilla (Free FTP Client):**
1. Download FileZilla: https://filezilla-project.org/
2. Enter:
   - **Host:** `ftp.yourdomain.com` (or your FTP server)
   - **Username:** Your FTP username
   - **Password:** Your FTP password
   - **Port:** 21 (or 22 for SFTP)
3. Click "Quickconnect"
4. If it connects, use the same "Host" value for `FTP_SERVER` secret

---

## ⚙️ **Alternative: Try Regular FTP Instead of FTPS**

Some servers don't support FTPS. If you continue having issues, we can change the workflow to use regular FTP.

**Current setting:** `protocol: ftps`  
**Alternative:** `protocol: ftp`

---

## 📋 **Quick Checklist:**

- [ ] Logged into cPanel
- [ ] Found FTP server address (e.g., `ftp.yourdomain.com`)
- [ ] Found FTP username
- [ ] Found FTP password
- [ ] Added `FTP_SERVER` secret in GitHub
- [ ] Added `FTP_USERNAME` secret in GitHub
- [ ] Added `FTP_PASSWORD` secret in GitHub
- [ ] Tested FTP connection with FileZilla (optional but recommended)

---

## 🚀 **After Setting Secrets:**

1. **Go back to:** GitHub → Actions tab
2. **Click:** "Re-run jobs" on the failed workflow
3. **Or:** Make a small commit and push to trigger new deployment

---

## ⚠️ **Common Mistakes:**

❌ **Wrong:**
- `FTP_SERVER = "ftp://ftp.yourdomain.com"`
- `FTP_SERVER = "ftp.yourdomain.com:21"`
- `FTP_SERVER = "https://ftp.yourdomain.com"`

✅ **Correct:**
- `FTP_SERVER = "ftp.yourdomain.com"`
- `FTP_SERVER = "yourdomain.com"`
- `FTP_SERVER = "123.45.67.89"`

---

## 🔒 **Security Note:**

- GitHub secrets are encrypted and only visible to repository admins
- They are never shown in logs (that's why you see `***`)
- Only use secrets for sensitive information

---

**Need Help?** If you're still having issues, share:
1. Your domain name (or first part, like `trendtacticsdigital.com`)
2. Whether you can connect via FileZilla
3. Any error messages from cPanel FTP Accounts page






