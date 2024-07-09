"use client";

import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import Popup from "../popup/popup";
import Avatar from "../user/avatar";
import { UserContext } from "../user/state";
import style from "./nav.module.scss";
// https://www.youtube.com/watch?v=PL3Odw-k8W4
const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const checkboxRef = useRef(null);

  useEffect(() => {
    // close sidebar when link is clicked
    const handleLinkClick = () => {
      if (checkboxRef.current) {
        checkboxRef.current.checked = false;
      }
    };
    const links = document.querySelectorAll(`.${style.links} a`);
    links.forEach((link) => link.addEventListener("click", handleLinkClick));

    // calculate the height of the nav bar
    const nav = document.getElementById("nav");
    const height = nav.offsetHeight;
    // add the variable to the root element
    const root = document.documentElement;
    root.style.setProperty("--nav-height", `${height}px`);

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
    };
  }, []);

  return (
    <header className={style.header} id="nav">
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
          <hr className={style.line} />
          <Link href="/about" className={style.item}>
            {" "}
            About{" "}
          </Link>
          <Link href="/comments" className={style.item}>
            {" "}
            Comments{" "}
          </Link>
          {user ? (
            <>
              <Avatar
                user={user.pk}
                width={30}
                height={30}
                className={style.avatar}
              />
              <div className={style.user}> {user.username} </div>
            </>
          ) : (
            <div>
              <button onClick={openPopup} className={style.item}>
                Sign In
              </button>
              <Popup isOpen={isPopupOpen} onClose={closePopup} />
            </div>
          )}
        </div>
        {/* <ThemeChange /> */}
      </nav>
    </header>
  );
};

export default Nav;
