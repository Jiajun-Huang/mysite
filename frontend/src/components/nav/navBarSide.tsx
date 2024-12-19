import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { NavbarBrand, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

export default function NavBarSide() {
  return (
    <NavbarMenu>
      <div className="mx-4 mt-2 flex flex-col gap-2">
        <NavbarBrand as="li" className="gap-3 max-w-fit text-xl">
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
        <Divider />
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
  );
}
