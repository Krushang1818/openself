import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/lib/routes";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/motion/border-beam";

export default function Home() {
  return (
    <main className="flex-1 view-container max-w-[1200px] px-4 pt-20 flex max-md:gap-10 flex-col md:flex-row pb-16">
      {/* Left side - Call to action */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start">
        <div className="max-w-md text-center md:text-left">
          <Badge className="font-mono gap-2.5 px-2.5 py-1.5 rounded bg-gray-100 text-primary text-sm mb-5">
            100% free & open source
          </Badge>

          <h1 className="text-[32px] font-bold mb-4 flex items-center justify-center md:justify-start gap-2 whitespace-nowrap">
            Cursor for Resumes
            <Image
              src="/highlight-pointer.png"
              alt="Pointer Icon"
              width={37}
              height={37}
              className="inline"
            />
          </h1>

          <p className="text-base text-neutral-600 mb-[30px] text-center md:text-left">
            Create polished resumes using natural language effortlessly.
          </p>

          <div className="relative flex flex-col items-center w-full md:w-fit">
            <Button
              className="relative group px-6 py-3 h-auto text-base"
              asChild
            >
              <Link href={ROUTES.IMPORT}>
                <div className="h-[120px] w-10 bg-gradient-to-r from-white/10 via-white/50 to-white/10 absolute blur-sm -rotate-45 -left-16 group-hover:left-[150%] duration-500 delay-200" />
                <Image
                  src="/sparkle.png"
                  alt="Sparkle Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span className="relative">Create Resume</span>
                <BorderBeam colorFrom="#5d5d5d" colorTo="#ffffff" />
              </Link>
            </Button>

            <p className="text-sm text-neutral-500 mt-4 text-center">
              No signup required!
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Preview */}
      <div className="w-full md:w-1/2 flex justify-center items-center flex-1 relative">
        <div className="absolute inset-0 rounded-3xl bg-black/3 blur-xl h-full"></div>
        <Image
          src="/cv-home.png"
          alt="CV Website Preview"
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-auto border relative object-contain rounded-2xl"
        />
      </div>
    </main>
  );
}
