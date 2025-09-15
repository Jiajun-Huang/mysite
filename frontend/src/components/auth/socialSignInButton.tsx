"use client";

import { Button } from "@heroui/button";
import { FC } from "react";

import { IconSvgProps } from "@/types";

interface SocialSignInButtonProps {
  icon: FC<IconSvgProps>;
  text: string;
  requestUrl: string;
}

export default function SocialSignInButton({
  icon: Icon,
  text,
  requestUrl,
}: SocialSignInButtonProps) {
  return (
    <Button
      className="flex-grow"
      color="secondary"
      variant="light"
      onClick={async () => {
        const response = await fetch(requestUrl, {
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
      <Icon className="mr-2" />
      {text}
    </Button>
  );
}
