import React from "react";
import style from "./button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  clickable?: boolean;
  hoverable?: boolean;
  [key: string]: any;
}

function Button({ children, clickable, hoverable, ...rest }: ButtonProps) {
  const buttonStyle = [style.Button];

  if (clickable) buttonStyle.push(style.click);

  if (hoverable) buttonStyle.push(style.hover);

  return (
    <button {...rest} type="button" className={buttonStyle.join(" ")}>
      {children}
    </button>
  );
}

export default Button;
