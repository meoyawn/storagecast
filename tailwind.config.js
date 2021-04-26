// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  mode: 'jit',
  darkMode: 'media',
  plugins: [
    require('@tailwindcss/forms'),
  ],
  purge: {
    content: [
      './src/**/*.{jsx,tsx}'
    ]
  },
  theme: {},
  variants: {},
}
