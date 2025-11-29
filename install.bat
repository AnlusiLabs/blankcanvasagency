@echo off
echo Installing dependencies for BlankCanvas Agency...
echo.

cd /d "%~dp0"

echo Installing Tailwind CSS, GSAP and required packages...
call npm install tailwindcss @tailwindcss/vite gsap

echo.
echo Installation complete!
echo.
echo To start the development server, run:
echo npm run dev
echo.
pause
