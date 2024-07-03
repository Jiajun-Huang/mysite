"use client";

import { UserContext } from "@/components/user/state";
import Link from "next/link";
import { useContext, useEffect } from "react";
import style from "./nav.module.scss";
function Nav() {
  const { user, setUser } = useContext(UserContext);


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
        <Link href="/about" className={style.item} title="About">
          About
        </Link>
        <Link href="/comments" className={style.item} title="comments">
          Comments
        </Link>
        {user ? (
          <div>{user.username}</div>
        ) : (
          <Link href="/signin" className={style.item} title="Sign In">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
