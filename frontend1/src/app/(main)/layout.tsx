import "@/app/globals.css";
import Providers from "@/app/providers";
import Nav from "@/components/nav/nav";
import Tools from "@/components/tools/tools";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
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
          <Button>Click me</Button>
          <DatePicker className="max-w-[284px]" label="Birth date" />
          <main className={style.main}>{children}</main>
          <Tools />
        </Providers>
      </body>
    </html>
  );
}
