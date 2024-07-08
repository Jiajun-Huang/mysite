import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "../user/state";
import style from "./login.module.scss";

export default function Login({ close }) {
  const [isSignin, setIsSignin] = useState(true);
  const { setToken } = useContext(UserContext);
  const title = isSignin ? "Sign in" : "Create an account";
  const logoSize = 40;
  return (
    <div className={style.signinForm}>
      <h2>{title}</h2>
      <form>
        <div className={style.inputGroup}>
          {isSignin ? (
            <>
              <input type="text" placeholder="username" />
              <input type="password" placeholder="password" />
            </>
          ) : (
            <>
              <input type="text" placeholder="username" />
              <input type="text" placeholder="nickname" />
              <input type="email" placeholder="email" />
              <input type="password" placeholder="password" />
              <input type="password" placeholder="confirm password" />
            </>
          )}
        </div>
        <button type="submit">Continue</button>
      </form>
      <div className={style.signupLink}>
        {isSignin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsSignin(!isSignin)}>
          {isSignin ? "Sign up" : "Sign in"}
        </button>
      </div>
      <div className={style.divider}>
        <span>or</span>
      </div>
      <div className={style.socialLogin}>
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

            const githubWindow = window.open(url);

            if (!githubWindow) {
              alert("Please disable your popup blocker");
              return;
            }
            // save curren url to local storage
            localStorage.setItem("currentUrl", window.location.href);
            // close the popup
            close();
          }}
        >
          <Image
            src="https://raw.githubusercontent.com/gilbarbara/logos/29e8719bf78915c7a82a26a6c203f53c4cb8fff2/logos/github-icon.svg"
            width={logoSize}
            height={logoSize}
            alt="github"
          />
        </button>
      </div>
    </div>
  );
}
