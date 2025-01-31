const { writeFileSync } = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");
const path = require("path");

(async () => {

  const baseUrl = "https://portfolio-dlamott.vercel.app/"; 
  const routes = [
    "/", 
    "/about",
    "/project",
    "/resume",
    "/blog",
    "/blog/React-Markdown-Blog",
    "/blog/Ldap-Directory-Viewer",
    "/blog/Timed-Ldap-Template"
    
  ];

  const lastModified = new Date().toISOString().split("T")[0];

  // Create a SitemapStream instance
  const sitemapStream = new SitemapStream({ hostname: baseUrl });

  // Add routes to the sitemap
  for (const route of routes) {
    sitemapStream.write({ url: route, changefreq: "daily", priority: 0.7, lastmod: lastModified });
  }

  sitemapStream.end();

  // Convert stream to a string
  const sitemap = await streamToPromise(sitemapStream).then((data) =>
    data.toString()
  );

  // Write the sitemap to the public directory
  const filePath = path.join(__dirname, "public", "sitemap.xml");
  writeFileSync(filePath, sitemap);

  console.log("Sitemap generated at:", filePath);
})();
