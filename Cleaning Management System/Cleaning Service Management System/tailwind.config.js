/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',     
        'primary-dark': '#2563eb', 
        accent: '#9333ea',      
        'accent-dark': '#7e22ce', 
        dark: '#1e1b4b',        
        light: '#e0e7ff',       
      },
    },
  },
  plugins: [],
};