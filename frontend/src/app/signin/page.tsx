"use client";

import { UserContext } from "@/components/user/state";
import { useContext } from "react";

export default function SignIn() {
  const { setToken } = useContext(UserContext);

  return (
    <div>
      <h1>Sign In</h1>
      <form
        action={async (formdata) => {
          //   "use server";
          //   get username and password from formdata
          const username = formdata.get("username");
          const password = formdata.get("password");

          //   send request to server

          const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();

          //   get token from response
          const token = data.access;
          console.log(token);

          // localStorage not available in server
          localStorage.setItem("token", token);
        }}
      >
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Sign In</button>
      </form>
      <button
        onClick={async () => {
          const response = await fetch(
            "http://localhost:3000/api/auth/github/url",
            {
              method: "HEAD",
            }
          );

          //  get url from header
          const url = response.headers.get("Url");
          // open a small window to github
          if (!url) return;

          const githubWindow = window.open(
            url,
            "_blank",
            "width=700,height=700"
          );

          if (!githubWindow) {
            alert("Please disable your popup blocker");
            return;
          }

          var timer = setInterval(function () {
            if (githubWindow.closed) {
              clearInterval(timer);
              setToken(localStorage.getItem("token"));
            }
          }, 1000);
        }}
      >
        Github Signin
      </button>
    </div>
  );
}
