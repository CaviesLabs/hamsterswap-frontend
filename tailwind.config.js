module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  purge: {
    enabled: true,
    content: ["./src/**/*.tsx"],
    options: {
      safelist: ["dark"], //specific classes
    },
  },
  theme: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    typography: (theme) => ({
      dark: {
        css: {
          colors: {
            menuItemSelected: "#fff",
            menuItem: "#fff",
          },
        },
      },
    }),
    screens: {
      s: "300px",
      xs: "370px",
      xxs: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      gand: { raw: "(min-height: 800px)" },
      tall: { raw: "(min-height: 700px)" },
      small: { raw: "(min-height: 600px)" },
    },
    extend: {
      colors: {
        /** Light mode */
        primary: "#191123",
        white: "#ffffff",
        black: "#000",
        green: "#3CBF7C",
        purple: "#735CF7",
        grey: "#9D9EA0",
        dividerColor: "#D2D7DF",
        blurPurple: "rgba(185, 152, 251, 0.8)",
        blurGreen: "rgba(60, 191, 124, 0.8)",
        hamserText: "rgba(149, 131, 255, 0.3)",
        hamserTextMobile: "rgba(149, 131, 255, 1)",
        greyText: "rgba(77, 77, 77, 1)",
        borderGrey: "#80808029",
        menuPurple: "rgba(115, 92, 247, 1)",
        primaryPurple: "rgba(115, 92, 247, 1)",
        menuItemSelected: "#20242D",
        menuItem: "#5F6C87",
        menuItemHover: "#735CF7",
        borderColor: "#D2D7DF",
        strongTitle: "#20242D",
        contentColor: "#5F6C87",
        footerItemColor: "#5F6C87",
        navy: "#5F6C87",

        /** Dark mode */
        menuItemSelectedDark: "#FFFFFF",
        menuItemDark: "#96A1B5",
        menuItemHoverDark: "#B998FB",
        borderColorDark: "#353C4B",
        strongTitleDark: "#FFFFFF",
        contentColorDark: "#FFFFFF",
        greenDark: "#69FFB2",
        purpleDark: "#B998FB",
        footerItemColorDark: "#B4BCCA",
        navyDark: "#96A1B5",
        backgroundDark: "#20242D",
        twhite: "#FFFFFF",
        dark10: "#F0F3FA",
        dark30: "#CBD4E1",
        dark60: "#5F6C87",
        purpleBg: "#EDECFF",
        red300: "#DE2C47",
      },
      boxShadow: {
        xl: "0px 4px 4px rgba(0, 0, 0, 0.25);",
        lg: "0px 4px 4px rgba(0, 0, 0, 0.25);",
      },
      spacing: {
        normal: "18px",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin"), require("flowbite/plugin")],
};
