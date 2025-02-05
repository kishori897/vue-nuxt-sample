/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontFamily: {
      heading: ["Inter Display", "system-ui"],
      sans: ["Inter V", "system-ui"],
    },
    extend: {
      boxShadow: {
        "3d": `0 0.1rem 0 0 rgba(0,0,0,0.02)`,
      },
      lineHeight: {
        cozy: "1.4",
      },
    },
  },
}
