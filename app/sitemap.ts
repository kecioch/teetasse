import prisma from "@/lib/prisma";
import { MetadataRoute } from "next";

export const revalidate = 60 * 60 * 24; // REVALIDATE SITEMAP EVERY DAY

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // CREATE SITEMAP
  console.log("CREATE SITEMAP");
  const BASE_URL = process.env.BASE_URL || "";
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      priority: 1,
    },
    {
      url: BASE_URL + "/products",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/about-us",
      priority: 0.3,
    },
  ];

  // ADD DYNAMIC PAGES
  const products = await prisma.productgroup.findMany();
  products.forEach((product) => {
    sitemap.push({
      url: BASE_URL + "/products/" + product.id,
      priority: 0.6,
    });
  });

  // RETURN SITEMAP
  //   console.log(sitemap);
  return sitemap;
}
