import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import NavUserAvartar from "./navUserAvartar";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky" isBordered>
      <NavbarContent className=" sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit hidden sm:flex">
          <Link
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium"
            )}
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">Jiajun Huang</p>
          </Link>
        </NavbarBrand>
        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex  sm:basis-full" justify="center">
        <ul className="hidden sm:flex gap-4 ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
                isBlock
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
          <NavbarBrand as="li" className="flex text-default">
            <Link
              className="flex justify-start items-center gap-1 text-default"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">ACME</p>
            </Link>
          </NavbarBrand>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
                isBlock
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
