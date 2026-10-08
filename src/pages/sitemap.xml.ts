import type { APIRoute } from "astro";
import { getAllCocktails } from "../lib/cocktails";

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL("https://example.com");
  const cocktails = await getAllCocktails();

  const urls = [
    "",
    ...cocktails.flatMap((c) => [`/c/${c.id}`, `/c/${c.id}/cook`]),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url><loc>${new URL(path, base).href}</loc></url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
