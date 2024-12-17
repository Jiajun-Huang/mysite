"use client";

import { UserContext } from "@/components/user/state";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default dynamic(() => Promise.resolve(Callback), {
  ssr: false,
});
export function Callback() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");
  const { login } = useContext(UserContext);

  useEffect(() => {
    if (!code) return;

    fetch("/api/auth/github/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: code,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (!data) return;
        const token = data.access;
        localStorage.setItem("token", token);
        const currentUrl = localStorage.getItem("currentUrl");

        if (currentUrl) {
          localStorage.removeItem("currentUrl");
          router.push(currentUrl);
        } else {
          router.push("/");
        }
        return token;
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  }, [code, router]);

  return (
    <>
      <div>Redirecting...</div>
    </>
  );
}
