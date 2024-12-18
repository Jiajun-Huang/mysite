export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Jiajun Huang's Website",
  description: "This is a website for Jiajun Huang.",
  navItems: [
    {
      label: "About",
      href: "/about",
    },
    { label: "Comments", href: "/comment" },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    { label: "Comments", href: "/comment" },
  ],
};
