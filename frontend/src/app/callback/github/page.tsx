"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Callback() {
  const params = useSearchParams();
  const [count, setCount] = useState(5);

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
            return response;
          });
        }
        return response;
      })
      .then(() => {
        const countdown = setInterval(() => {
          setCount((prevCount) => {
            if (prevCount <= 1) {
              clearInterval(countdown);
              window.close();
            }
            return prevCount - 1;
          });
        }, 1000); 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [code]);

  return (
    <div>
      <h1>Callback</h1>
      <p>Params: {params.toString()}</p>
      <p>Window will close in {count} seconds...</p>
    </div>
  );
}
