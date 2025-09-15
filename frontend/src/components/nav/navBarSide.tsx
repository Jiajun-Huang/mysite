"use client";

import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { NavbarBrand, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";

export default function NavBarSide() {
  return (
    <NavbarMenu>
      <div className="mx-4 mt-2 flex flex-col gap-2">
        <NavbarBrand as="li" className="gap-3 max-w-fit text-xl">
          <Link
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            href="/"
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
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </div>
    </NavbarMenu>
  );
}
