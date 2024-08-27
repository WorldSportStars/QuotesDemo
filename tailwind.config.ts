import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Tailwind will scan these file types for class names
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Including `app` directory for Next.js app directory support
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem', // Optional: Add padding inside the container
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px', // Additional large screen size support
      },
    },
    extend: {
      // Add any custom colors, fonts, or other configurations here
      colors: {
        primary: '#1A73E8', // Example custom primary color
        secondary: '#FFB74D', // Example custom secondary color
      },
    },
  },
  plugins: [
    // Add Tailwind plugins here if needed, e.g., typography, forms, aspect-ratio, etc.
  ],
};

export default config;
