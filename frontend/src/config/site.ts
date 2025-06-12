export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Jun's Website",
  description: "This is a website for Jun.",
  navItems: [
    {
      label: "About",
      href: "/about",
    },
    { label: "Comments", href: "/comment" },
    { label: "Music", href: "/music" },
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
    { label: "Music", href: "/music" },
  ],
};
