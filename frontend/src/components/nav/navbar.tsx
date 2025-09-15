"use client";

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useState } from "react";

import NavUserAvartar from "./navUserAvartar";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINavbar
      isBordered
      isMenuOpen={isMenuOpen}
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent className=" sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit hidden sm:flex">
          <Link
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit text-lg">Jun</p>
          </Link>
        </NavbarBrand>
        <NavbarMenuToggle
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex  sm:basis-full" justify="center">
        <ul className="hidden sm:flex gap-4 ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                isBlock
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-lg",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className=" sm:basis-full" justify="end">
        <ThemeSwitch />
        <NavUserAvartar />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarBrand as="li" className="gap-3 max-w-fit text-xl">
            <Link
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              <Logo />
              <p className="font-bold text-inherit">Jun</p>
            </Link>
          </NavbarBrand>
          <Divider />
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                isBlock
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-xl",
                )}
                color="foreground"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
