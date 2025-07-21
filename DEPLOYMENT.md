
# Deployment Guide

This guide will help you deploy your React application from GitHub to any web server using FileZilla.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Git
- FileZilla or any FTP client
- Web hosting account

## Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Navigate to the project directory
cd your-repo-name
```

## Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# Or if you prefer yarn
yarn install
```

## Step 3: Build the Project

```bash
# Create production build
npm run build

# Or with yarn
yarn build
```

This will create a `dist` folder with all the production-ready files.

## Step 4: Prepare Server Configuration

Depending on your hosting provider, copy the appropriate configuration file to your `dist` folder:

### For Apache Servers (most shared hosting)
- Copy `public/.htaccess` to `dist/.htaccess`

### For IIS Servers (Windows hosting)
- Copy `public/web.config` to `dist/web.config`

### For Nginx Servers
- Use the `nginx.conf` file to configure your server

## Step 5: Upload Files via FileZilla

1. **Open FileZilla** and connect to your web server:
   - Host: Your domain or server IP
   - Username: Your hosting username
   - Password: Your hosting password
   - Port: Usually 21 for FTP or 22 for SFTP

2. **Navigate to your web root directory** (usually `public_html`, `www`, or similar)

3. **Upload all files from the `dist` folder**:
   - Select all files in the `dist` folder (not the folder itself)
   - Drag and drop them to your web server's root directory
   - Make sure to upload the `.htaccess` or `web.config` file as well

## Step 6: Verify Deployment

1. Visit your website URL
2. Test navigation between different pages
3. Check that direct URL access works (e.g., yoursite.com/contact)
4. Verify that all images and assets load correctly

## Common Issues and Solutions

### Issue: 404 errors on page refresh or direct URL access
**Solution**: Make sure your server configuration file (`.htaccess` or `web.config`) is uploaded and configured correctly.

### Issue: Assets not loading
**Solution**: Check that all files from the `dist` folder were uploaded, including the `assets` folder.

### Issue: White screen or JavaScript errors
**Solution**: 
1. Check browser console for errors
2. Ensure all dependencies were installed before building
3. Try rebuilding with `npm run build`

### Issue: Mixed content warnings
**Solution**: If your site uses HTTPS, make sure all resources are loaded over HTTPS.

## Server-Specific Instructions

### Shared Hosting (cPanel, Hostgator, GoDaddy, etc.)
- Use the `.htaccess` file
- Upload to `public_html` folder
- Enable mod_rewrite in cPanel if available

### VPS/Dedicated Server
- Use appropriate server configuration (Apache/Nginx)
- Set up SSL certificate for HTTPS
- Configure domain DNS settings

### CDN/Static Hosting (Netlify, Vercel, etc.)
- These platforms handle SPA routing automatically
- Simply connect your GitHub repository
- No additional configuration needed

## Environment Variables

If your app uses environment variables:

1. Create a `.env.production` file in your project root
2. Add your production environment variables
3. Rebuild the project with `npm run build`

Example `.env.production`:
```
VITE_API_URL=https://api.yoursite.com
VITE_APP_NAME=Your App Name
```

## Security Considerations

1. Never upload sensitive files like `.env` or database configurations
2. Ensure your server has SSL certificate installed
3. Keep your dependencies updated
4. Use HTTPS for all production deployments

## Support

If you encounter issues:
1. Check your hosting provider's documentation
2. Contact your hosting support team
3. Review the browser console for error messages
4. Ensure your hosting plan supports the required features

## Automated Deployment (Optional)

For easier future deployments, consider setting up automated deployment:
- GitHub Actions for CI/CD
- Webhook-based deployment
- FTP deployment automation tools

This will eliminate the need for manual FileZilla uploads for future updates.
