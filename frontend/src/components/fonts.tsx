import localFont from "next/font/local";

const LXGWBright = localFont({
  src: [
    {
      path: "../styles/fonts/LXGWBright-Medium.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/LXGWBright-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../styles/fonts/LXGWBright-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../styles/fonts/LXGWBright-LightItalic.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "../styles/fonts/LXGWBright-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/LXGWBright-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
  ],
});

export default LXGWBright;
