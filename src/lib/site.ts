export const getSiteUrl = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (!url) {
    url = `http://localhost:${process.env.PORT ?? 3000}`;
  }

  return url;
};

export const SITE_INFO = {
  title: "OpenSelf",
  description:
    "Cursor for Resumes - Create polished resumes effortlessly using natural language.",
  url: getSiteUrl(),
  openGraphImage: "/og.png",
  twitterImage: "/og.png",
};
