import "@/app/globals.css";
import Providers from "@/app/providers";
import Nav from "@/components/nav/nav";
import Tools from "@/components/tools/tools";
import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import style from "./page.module.scss";

export const metadata: Metadata = {
  title: "Jiajun Hunag' Website",
  description: "Jiajun Huang's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={style.body}>
        <Providers>
          <Nav />
          <main className={style.main}>{children}</main>
          <Tools />
        </Providers>
      </body>
    </html>
  );
}
