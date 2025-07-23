
# Deployment Guide - FileZilla & Web Hosting

This guide provides step-by-step instructions for deploying your React application to any web hosting provider using FileZilla.

## Prerequisites

- Node.js 18+ installed
- npm package manager
- FileZilla FTP client
- Web hosting account with FTP access

## Step 1: Build the Application

```bash
# 1. Clone the repository (if not already done)
git clone [your-repo-url]
cd [your-repo-name]

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. Verify the build (optional but recommended)
node verify-deployment.js
```

## Step 2: Prepare for Deployment

After running `npm run build`, you'll have a `dist` folder containing:

### Essential Files:
- `index.html` - Main application file
- `.htaccess` - Apache server configuration
- `web.config` - IIS server configuration
- `404.html` - Error page for routing
- `robots.txt` - SEO crawler instructions
- `sitemap.xml` - SEO sitemap
- `favicon.ico` - Website icon

### Essential Directories:
- `assets/` - Contains CSS, JS, and image files
- `lovable-uploads/` - User-uploaded images and media

## Step 3: Upload via FileZilla

### Connect to Your Server:
1. Open FileZilla
2. Enter your hosting details:
   - **Host**: Your domain or server IP
   - **Username**: Your hosting username
   - **Password**: Your hosting password
   - **Port**: Usually 21 (FTP) or 22 (SFTP)

### Upload Files:
1. **Navigate to web root** on the server (usually `public_html`, `www`, or `htdocs`)
2. **Select ALL files and folders** from your local `dist` folder
3. **Drag and drop** or right-click → Upload to transfer files
4. **Ensure hidden files** like `.htaccess` are uploaded (enable "Show hidden files" in FileZilla)

### Critical Upload Checklist:
- [ ] `index.html` uploaded
- [ ] `.htaccess` uploaded (for Apache servers)
- [ ] `web.config` uploaded (for IIS servers)
- [ ] `404.html` uploaded
- [ ] `assets/` folder and all contents uploaded
- [ ] `lovable-uploads/` folder and all contents uploaded
- [ ] `favicon.ico` uploaded
- [ ] `robots.txt` uploaded
- [ ] `sitemap.xml` uploaded

## Step 4: Verify Deployment

### Test Your Website:
1. **Visit your domain** in a web browser
2. **Check the homepage** loads correctly
3. **Test navigation** between different pages
4. **Verify direct URLs** work (e.g., yourdomain.com/contact)
5. **Check images** load properly
6. **Test on mobile** devices

### Browser Console Check:
1. Open Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Verify all assets load successfully

## Troubleshooting Common Issues

### Issue: White screen or "Cannot GET /" error
**Solution**: 
- Ensure `index.html` is in the root directory
- Check that `.htaccess` or `web.config` is uploaded
- Verify your hosting supports URL rewriting

### Issue: 404 errors on page refresh
**Solution**:
- Confirm `.htaccess` is uploaded and not renamed
- Check if your host supports mod_rewrite
- For shared hosting, contact support to enable URL rewriting

### Issue: Assets not loading (CSS/JS/Images)
**Solution**:
- Verify the `assets/` folder was uploaded completely
- Check file permissions (should be 644 for files, 755 for directories)
- Ensure `lovable-uploads/` folder is uploaded with all images

### Issue: Favicon not showing
**Solution**:
- Confirm `favicon.ico` is in the root directory
- Clear browser cache and refresh
- Check that the file isn't corrupted

### Issue: Mixed content warnings (HTTP/HTTPS)
**Solution**:
- Ensure your site has an SSL certificate
- All resources should load over HTTPS
- Check for hardcoded HTTP links in your code

## Hosting Provider Specific Notes

### Shared Hosting (GoDaddy, Hostgator, Bluehost, etc.):
- Upload to `public_html` folder
- Use `.htaccess` configuration
- May need to enable mod_rewrite in control panel

### VPS/Dedicated Servers:
- Upload to configured web root
- Ensure Apache/Nginx is properly configured
- May need to restart web server after configuration changes

### Windows Servers (IIS):
- Use `web.config` instead of `.htaccess`
- Ensure URL Rewrite module is installed
- Check application pool settings

## Security Best Practices

1. **Never upload sensitive files** like `.env` or database configurations
2. **Use HTTPS** for all production deployments
3. **Keep dependencies updated** regularly
4. **Enable security headers** (already configured in .htaccess/web.config)
5. **Regular backups** of your website files

## File Permissions

Set correct permissions after upload:
- **Files**: 644 (readable by all, writable by owner)
- **Directories**: 755 (executable and readable by all, writable by owner)
- **Executable files**: 755 (if any)

## Support

If you encounter issues:
1. Check your hosting provider's documentation
2. Contact hosting support for server-specific issues
3. Review browser console for error messages
4. Verify all files were uploaded correctly

## Automated Deployment (Optional)

For easier future deployments, consider:
- Setting up GitHub Actions for automated builds
- Using FTP deployment tools
- Implementing webhook-based deployment

This eliminates manual FileZilla uploads for future updates.

---

**Remember**: Always test your deployment thoroughly before directing users to your site!
