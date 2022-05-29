module.exports = {
  mode:"jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#0AA1DD',
        secondary:"#1865F2"
      }
    },
  },
  darkMode:true,
  plugins: [],
}