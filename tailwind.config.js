// export default {
//   theme: {
//     extend: {
//       fontFamily: {
//         light: ['"Motiva Sans Light"', "sans-serif"],
//         bold: ['"Motiva Sans Bold"', "serif"],
//       },
//       colors: {
//         // Brand colors (you already had these)
//         primary: "#18216d",    // rgb(24, 33, 109)
//         secondary: "#2E186A",  // rgb(46, 24, 106)

//         // Accent / action color
//         accent: "#FF825C",     // rgb(255, 130, 92) — coral-orange

//         // Grayscale & backgrounds
//         black: "#000000",              // rgb(0, 0, 0)
//         white: "#FFFFFF",              // rgb(255, 255, 255)
//         gray: {
//           50: "#F1F2F3",               // rgb(241, 242, 243)
//           100: "#EDEFF5",              // rgb(237, 243, 245)
//           300: "#CDD1D4",              // rgb(205, 209, 212)
//         },

//       },
//     },
//   },
// };

export default {
  theme: {
    extend: {
      fontFamily: {
        light: ['"Motiva Sans Light"', "sans-serif"],
        bold: ['"Motiva Sans Bold"', "serif"],
      },
      colors: {
        // Brand / Primary Colors
        primary: {
          DEFAULT: "#2E186A", // rgb(46, 24, 106)
          dark: "#18216D", // rgb(24, 33, 109)
        },
        // Accent / Call-to-Action
        accent: "#FF825C", // rgb(255, 130, 92)

        // Neutrals / Grays
        neutral: {
          50: "#F1F2F3", // rgb(241, 242, 243)
          100: "#EDEFF5", // rgb(237, 243, 245)
          200: "#CDD1D4", // rgb(205, 209, 212)
        },

        // Core
        black: "#000000", // rgb(0, 0, 0)
        white: "#FFFFFF", // rgb(255, 255, 255)

        // Special (semi-transparent overlay)
        overlay: "rgba(0, 0, 0, 0.85)",
      },
      gradientColorStops: {
        "primary-dark": "#18216D",
        primary: "#2E186A",
      },
    },
  },
};
