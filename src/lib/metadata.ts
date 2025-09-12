import type { Metadata } from "next/types";

import { SITE_INFO } from "./site";

export function createMetadata(override: Metadata): Metadata {
  return {
    metadataBase: new URL(SITE_INFO.url),
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: SITE_INFO.url,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: SITE_INFO.openGraphImage,
          alt: "OpenSelf",
          width: 1200,
          height: 630,
        },
      ],
      siteName: "OpenSelf",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@alaymanguy",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: [SITE_INFO.twitterImage],
      ...override.twitter,
    },
    alternates: {
      canonical: SITE_INFO.url,
      ...override.alternates,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development" ||
  !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
