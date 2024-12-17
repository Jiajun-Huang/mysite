import ThemeChange from "../button/themeChange/themeChange";
import style from "./tools.module.scss";

export default function Tools() {
  return (
    <div className={style.tools}>
      <ThemeChange />
    </div>
  );
}
