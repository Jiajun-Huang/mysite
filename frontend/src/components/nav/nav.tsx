import Link from "next/link";
import Button from "../button/button";
import style from "./nav.module.scss";
function Nav() {
  return (
    <nav className={style.Nav}>
      <div>
        <div className={style.home}>
          <Link href="/">Jiajun Huang</Link>
        </div>
      </div>
      <div className={style.part}>
        <Link href="/blog" className={style.item} title="Blog">
          Blog
        </Link>
        <Link href="/blog" className={style.item} title="Blog">
          Blog
        </Link>
        <Link href="/blog" className={style.item} title="Blog">
          Blog
        </Link>
        <Button clickable hoverable>
          Sign in
        </Button>
      </div>
    </nav>
  );
}

export default Nav;
