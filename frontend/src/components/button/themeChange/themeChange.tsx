"use client";
import { useEffect, useState } from "react";
import Button from "../button";
import stlye from "./themeChange.module.scss";

enum Theme {
  Light = "light",
  Dark = "dark",
  System = "system",
}

interface ColorScheme {
  [key: string]: string;
}

const LightColorScheme: ColorScheme = {
  backgroundColor: "#FFFFFF",
  primaryColor: "#0c77f4",
  textColor: "#1F1F1F",
  textLight: "#757575",
  textBright: "#000",
  hoverBrightness: "0.95",
  activeBrightness: "0.9",
};

const DarkColorScheme: ColorScheme = {
  backgroundColor: "#272727",
  primaryColor: "#0c77f4",
  textColor: "#E4E4E4",
  textLight: "#797979",
  textBright: "#fff",
  hoverBrightness: "1.2",
  activeBrightness: "1.3",
};

const ColorSchemeAttrrToCss: { [key: string]: string } = {
  backgroundColor: "--color-bg",
  primaryColor: "--color-primary",
  textColor: "--text-normal",
  textLight: "--text-light",
  textBright: "--text-bright",
  hoverBrightness: "--hover-brightness",
  activeBrightness: "--active-brightness",
};

function applyColorScheme(scheme: ColorScheme) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(scheme)) {
    root.style.setProperty(ColorSchemeAttrrToCss[key], value);
  }
}

function changeTheme(theme: Theme) {
  const root = document.documentElement;
  switch (theme) {
    case Theme.Light:
      applyColorScheme(LightColorScheme);

      break;
    case Theme.Dark:
      applyColorScheme(DarkColorScheme);
      break;
    case Theme.System:
      break;
  }
}

export default function ThemeChange() {
  const [theme, setTheme] = useState(Theme.Light);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const handleClick = () => {
    switch (theme) {
      case Theme.Light:
        setTheme(Theme.Dark);
        changeTheme(Theme.Dark);
        break;
      case Theme.Dark:
        setTheme(Theme.Light);
        changeTheme(Theme.Light);
        break;
    }
  };

  return (
    <div className={stlye.btn}>
      <div>
        <Button clickable hoverable onClick={handleClick}>
          {theme === Theme.Light ? "🌞" : "🌜"}
        </Button>
      </div>
      <div className={stlye.dropdown}>
        {/* <SelectDropDown
          onSelect={(value) => {
            setTheme(value as Theme);
          }}
          options={[Theme.Light, Theme.Dark, Theme.System]}
        /> */}
      </div>
    </div>
  );
}
