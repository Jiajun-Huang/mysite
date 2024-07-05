"use client";

import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import Avatar from "../user/avatar";
import { UserContext } from "../user/state";
import style from "./nav.module.scss"; // Adjust the import according to your file structure

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const checkboxRef = useRef(null);

  useEffect(() => {
    const handleLinkClick = () => {
      if (checkboxRef.current) {
        checkboxRef.current.checked = false;
      }
    };

    const links = document.querySelectorAll(`.${style.links} a`);
    links.forEach((link) => link.addEventListener("click", handleLinkClick));

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
    };
  }, []);

  return (
    <header>
      <nav className={style.Nav}>
        <input
          type="checkbox"
          id={style.sidebarActive}
          style={{ display: "none" }}
          ref={checkboxRef}
        />
        <label htmlFor={style.sidebarActive} className={style.openBtn}>
          &#9776;
        </label>
        <label id={style.overlay} htmlFor={style.sidebarActive}></label>
        <div className={style.links}>
          <label htmlFor={style.sidebarActive} className={style.closeBtn}>
            X
          </label>
          <Link href="/" className={style.home}>
            Jiajun Huang
          </Link>
          <Link href="/about"> About </Link>
          <Link href="/comments"> Comments </Link>
          {user ? (
            <>
              <Avatar user={user.pk} width={30} height={30} />
              <div> {user.username} </div>
            </>
          ) : (
            <Link href="/login"> Login </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
