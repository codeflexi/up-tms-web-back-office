/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  
  theme: {
    fontFamily: {
      display: ["Prompt"],
      kanit: ["Kanit"],
      Prompt_100:["Prompt-100"],
      Prompt_400:["Prompt-400"],
      Prompt_600:["Prompt-600"],
      Inter:["Inter"],
      Inter_bold:["Inter-bold"]
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
