import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: MAIN_METADATA.TITLE,
//   description: MAIN_METADATA.DESCRIPTION,
//   openGraph: {
//     type: "website",
//     siteName: MAIN_METADATA.SITE_NAME,
//     url: MAIN_METADATA.URL,
//     title: MAIN_METADATA.TITLE,
//     description: MAIN_METADATA.DESCRIPTION,
//     images: MAIN_METADATA.IMAGE,
//   },
//   twitter: {
//     card: "summary",
//     title: MAIN_METADATA.TITLE,
//     description: MAIN_METADATA.DESCRIPTION,
//     images: MAIN_METADATA.IMAGE,
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
