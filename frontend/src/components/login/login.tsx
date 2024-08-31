import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "../user/state";
import style from "./login.module.scss";

type Props = {
  close: () => void;
};

export default function Login({ close }: Props) {
  const [isSignin, setIsSignin] = useState(true);
  const { login } = useContext(UserContext);
  const title = isSignin ? "Sign in" : "Create an account";
  const logoSize = 40;
  return (
    <div className={style.signinForm}>
      <h2>{title}</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget.querySelectorAll("input");
          const formData = new FormData(e.currentTarget);

          const response = await fetch(
            `/api/auth/${isSignin ? "login" : "signup"}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          const data = await response.json();
          if (data.access) {
            login(data.access);
            close();
          } else {
            alert(data.message);
          }
        }}
      >
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
            const response = await fetch("/api/auth/github/url/", {
              method: "HEAD",
            });

            //  get url from header
            const url = response.headers.get("Url");
            // open a small window to github
            if (!url) return;

            const windows = window.open(url);

            if (!windows) {
              alert("Please disable your popup blocker");
              return;
            }
            // save curren url to local storage for redirect after login
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
