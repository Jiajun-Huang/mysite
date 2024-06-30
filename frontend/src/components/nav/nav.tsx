"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import style from "./nav.module.scss";
function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // get user data
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return null;
          }
        })
        .then((data) => {
          if (data) {
            setUser(data);
          } else {
            setUser(null);
          }
        });
    }
  }, []);

  console.log(user);

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
        <Link href="/blog" className={style.item} title="Blog">
          Blog
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
