# Installation Instructions

## Step 1: Install Dependencies

Run the following command in the `blankcanvas` folder:

```bash
npm install tailwindcss @tailwindcss/vite gsap
```

This will install:
- `tailwindcss` - Tailwind CSS framework
- `@tailwindcss/vite` - Tailwind CSS Vite plugin
- `gsap` - GreenSock Animation Platform for animations

## Step 2: Start Development Server

After installing dependencies, run:

```bash
npm run dev
```

This will start the Vite development server and you can view your app in the browser.

## What's Been Migrated

✅ HTML structure converted to React components
✅ CSS converted to Tailwind CSS utility classes
✅ JavaScript animations migrated to React with GSAP
✅ Vite configured with Tailwind CSS plugin
✅ Google Fonts (Manrope) added to index.html

## Project Structure

```
blankcanvas/
├── src/
│   ├── components/
│   │   ├── Preloader.tsx  (Animated preloader with images)
│   │   └── Hero.tsx       (Hero section with animated text)
│   ├── App.tsx            (Main app component)
│   ├── App.css            (Empty - using Tailwind)
│   ├── index.css          (Tailwind imports + global styles)
│   └── main.tsx           (React entry point)
├── index.html             (Updated with Google Fonts)
├── vite.config.ts         (Configured with Tailwind plugin)
└── package.json
```

## Features

- ✨ Smooth GSAP animations with custom easing
- 🎨 Tailwind CSS for styling
- 📱 Responsive design (mobile-friendly)
- ⚡ Fast development with Vite
- 🔤 Split text animations
- 🖼️ Image preloader with reveal animations
