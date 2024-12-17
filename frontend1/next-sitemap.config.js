/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://jiajunhuang.cc",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/api/*" },
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/api/*"],
};
