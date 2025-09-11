import Link from "next/link";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import { GITHUB_URL, TWITTER_URL } from "@/lib/social";
import { ROUTES } from "@/lib/routes";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex h-[var(--header-height)] w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="view-container relative flex items-center justify-between px-4">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <Link href={ROUTES.HOME} className="flex items-center">
            <Icons.logo className="h-6 w-full" />
          </Link>
        </div>

        {/* Social icons on the right */}
        <nav className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Icons.github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer">
              <Icons.x className="h-5 w-5" />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
