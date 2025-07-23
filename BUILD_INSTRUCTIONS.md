
# Build Instructions - Enhanced for FileZilla Deployment

## Quick Start

```bash
# 1. Clone the repository
git clone [your-repo-url]
cd [your-repo-name]

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. Verify deployment readiness
node verify-deployment.js

# 5. Upload the contents of the 'dist' folder to your web server
```

## Detailed Build Process

### 1. Prerequisites
- Node.js 18+ installed
- npm package manager
- Git (for cloning)
- FileZilla FTP client

### 2. Environment Setup

Create a `.env.production` file if needed:
```env
VITE_APP_NAME=Mylli Services
VITE_API_URL=https://your-api-url.com
```

### 3. Build Commands

```bash
# Development build
npm run dev

# Production build
npm run build

# Verify build integrity
node verify-deployment.js

# Preview production build locally
npm run preview
```

### 4. What Gets Generated

The build process creates a `dist` folder containing:
- `index.html` - Main HTML file
- `assets/` - CSS, JS, and other static assets (organized in subfolders)
- `lovable-uploads/` - Images and media files
- `.htaccess` - Apache server configuration
- `web.config` - IIS server configuration
- `404.html` - Error handling page
- `test-deployment.html` - Deployment verification page
- `robots.txt`, `sitemap.xml`, `favicon.ico` - SEO and branding files

### 5. Deployment Verification

Before uploading, run the verification script:
```bash
node verify-deployment.js
```

This checks for:
- All required files present
- Proper asset organization
- Correct file references in index.html
- Server configuration files

### 6. FileZilla Upload Instructions

**Step-by-Step Process:**
1. Open FileZilla and connect to your server
2. Navigate to your domain's root folder (usually `public_html`, `www`, or `htdocs`)
3. Select ALL files and folders from the `dist` directory
4. Drag and drop to upload (or right-click → Upload)
5. Ensure hidden files like `.htaccess` are uploaded

**Critical Files Checklist:**
- [ ] `index.html` (main application)
- [ ] `.htaccess` (Apache configuration)
- [ ] `web.config` (IIS configuration)
- [ ] `404.html` (error handling)
- [ ] `assets/` folder (CSS, JS, images)
- [ ] `lovable-uploads/` folder (uploaded images)
- [ ] `favicon.ico` (website icon)
- [ ] `robots.txt` (SEO)
- [ ] `sitemap.xml` (SEO)

### 7. Post-Deployment Testing

After upload, test your deployment:

1. **Basic Test**: Visit `yourdomain.com/test-deployment.html`
2. **Main App**: Visit `yourdomain.com`
3. **Navigation**: Test different pages and direct URLs
4. **Images**: Verify all images load correctly
5. **Mobile**: Test on mobile devices

### 8. Server Requirements

**Minimum Requirements:**
- Web server (Apache, Nginx, IIS)
- Support for URL rewriting/redirects
- PHP not required (static site)

**Recommended:**
- HTTPS/SSL certificate
- Gzip compression enabled
- Modern server with HTTP/2 support

### 9. Troubleshooting

**Common Issues and Solutions:**

| Issue | Solution |
|-------|----------|
| White screen | Check if `index.html` is in root directory |
| 404 on refresh | Ensure `.htaccess` is uploaded and mod_rewrite enabled |
| Assets not loading | Verify `assets/` folder uploaded completely |
| Images missing | Check `lovable-uploads/` folder uploaded |
| Favicon not showing | Confirm `favicon.ico` in root directory |

**Debug Steps:**
1. Check browser console (F12) for errors
2. Verify file permissions (644 for files, 755 for directories)
3. Test with `test-deployment.html` page
4. Contact hosting support if server configuration issues

### 10. Hosting Provider Notes

**Shared Hosting (GoDaddy, Hostgator, etc.):**
- Use `public_html` folder
- Enable mod_rewrite in control panel
- May need to contact support for URL rewriting

**VPS/Cloud Hosting:**
- Configure Apache/Nginx properly
- Ensure all required modules are installed
- Set up SSL certificate

**Windows Hosting (IIS):**
- Use `web.config` instead of `.htaccess`
- Ensure URL Rewrite module is installed
- Check application pool settings

### 11. Performance Optimization

The build includes:
- Code minification and tree shaking
- CSS optimization and purging
- Image compression and optimization
- Bundle splitting for better caching
- Gzip compression configuration
- Browser caching headers

### 12. Security Features

Included security measures:
- XSS protection headers
- Content type sniffing protection
- Clickjacking protection
- HTTPS redirect configuration (optional)
- Secure referrer policy

### 13. SEO Ready

The build includes:
- Sitemap.xml for search engines
- Robots.txt for crawler instructions
- Meta tags for social sharing
- Structured data markup
- Mobile-friendly responsive design

## File Structure After Build

```
dist/
├── index.html                 # Main application
├── 404.html                  # Error page
├── test-deployment.html       # Deployment test page
├── .htaccess                 # Apache configuration
├── web.config                # IIS configuration
├── favicon.ico               # Website icon
├── robots.txt                # SEO crawler instructions
├── sitemap.xml               # SEO sitemap
├── assets/                   # Organized assets
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript files
│   └── img/                  # Optimized images
└── lovable-uploads/          # User uploaded content
    └── [images...]
```

This structure is optimized for all major web hosting providers and includes comprehensive server configuration for maximum compatibility.

## Success Indicators

Your deployment is successful when:
- ✅ Main site loads at your domain
- ✅ All pages accessible via navigation
- ✅ Direct URLs work (no 404 errors)
- ✅ Images and assets load correctly
- ✅ Site works on mobile devices
- ✅ No console errors in browser
- ✅ `test-deployment.html` shows all green checkmarks

Ready for production use!
