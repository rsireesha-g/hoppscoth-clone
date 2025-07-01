/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent-color)',
        accentDark: 'var(--accent-dark-color)',
        accentContrast: 'var(--accent-contrast-color)',
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color',
        secondaryLight: 'var( --secondary-light-color)',
        getColor: 'var(--method-get-color)',
        deleteColor: 'var(--method-delete-color)',
        primaryDark: 'var(--primary-dark-color)',
        primaryLight: 'var(--primary-light-color)',
        dividerDark: 'var(--divider-dark-color)'
      }
    },
  },
  plugins: [],
}