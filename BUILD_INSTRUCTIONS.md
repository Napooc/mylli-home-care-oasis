
# Build Instructions

## Quick Start

```bash
# 1. Clone the repository
git clone [your-repo-url]
cd [your-repo-name]

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. Upload the contents of the 'dist' folder to your web server
```

## Detailed Build Process

### 1. Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git (for cloning)

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

# Production build (recommended)
npm run build:prod

# Preview production build locally
npm run preview
```

### 4. What Gets Generated

The build process creates a `dist` folder containing:
- `index.html` - Main HTML file
- `assets/` - CSS, JS, and other static assets
- `lovable-uploads/` - Images and media files
- `.htaccess` or `web.config` - Server configuration
- Other static files

### 5. Upload Instructions

**For FileZilla or any FTP client:**
1. Connect to your web server
2. Navigate to your domain's root folder (usually `public_html`)
3. Upload ALL files from the `dist` folder (not the folder itself)
4. Ensure hidden files like `.htaccess` are also uploaded

### 6. Server Requirements

- Web server (Apache, Nginx, IIS)
- Support for URL rewriting (for SPA routing)
- HTTPS recommended (but not required)

### 7. Troubleshooting

**Build fails:**
- Check Node.js version (should be 18+)
- Delete `node_modules` and run `npm install` again
- Check for TypeScript errors

**404 errors after deployment:**
- Ensure `.htaccess` or `web.config` is uploaded
- Check that URL rewriting is enabled on your server

**Assets not loading:**
- Verify all files from `dist` folder were uploaded
- Check file permissions on your server

## Production Optimization

The build is automatically optimized for production with:
- Code minification and tree shaking
- CSS optimization and purging
- Image compression
- Bundle splitting for better caching
- Removal of development code and console logs

## File Structure After Build

```
dist/
├── index.html
├── .htaccess (for Apache)
├── web.config (for IIS)
├── assets/
│   ├── css/
│   ├── js/
│   └── img/
├── lovable-uploads/
│   └── [images...]
└── [other static files]
```

This structure is ready for direct upload to any web hosting service.
