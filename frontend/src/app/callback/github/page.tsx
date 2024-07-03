"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");

  useEffect(() => {
    if (!code) return;

    fetch("http://localhost:3000/api/auth/github/", {
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
          return response.json().then((data) => {
            const token = data.access;
            console.log(token);
            localStorage.setItem("token", token);
            window.close();
            return token;
          });
        }
        return response;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <h1>Callback</h1>
      <p>Params: {params.toString()}</p>
    </div>
  );
}
