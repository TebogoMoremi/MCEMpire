import type { Metadata } from "next";

export function siteOrigin() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.origin : undefined; }
  catch { return undefined; }
}
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const origin = siteOrigin();
  return {
    title, description,
    ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: `${origin}${path}` } } : {}),
    openGraph: { title, description, type: "website", siteName: "M.E.C Empire", ...(origin ? { url: `${origin}${path}`, images: [{ url: `${origin}/images/portfolio/roses-studio.jpeg`, width: 1280, height: 809, alt: "M.E.C Empire studio portrait with red roses" }] } : {}) },
  };
}
