"use client";

import { useState } from "react";
import Link from "next/link";
import { ResumeDropzone } from "@/components/resume-dropzone";
import { useResumeStore } from "@/store/resume-store";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

function SectionWithHeadingAndCreateButton({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) {
  return (
    <>
      <p className="font-semibold">{heading}</p>
      <div className="mt-4">
        <Button asChild>
          <Link href={ROUTES.CHAT}>{buttonText}</Link>
        </Button>
      </div>
    </>
  );
}

function OrDivider() {
  return (
    <div
      className="mx-[-2.5rem] flex items-center pb-6 pt-8"
      aria-hidden="true"
    >
      <div className="flex-grow border-t" />
      <span className="mx-2 mt-[-2px] shrink-0 text-lg text-muted-foreground">
        or
      </span>
      <div className="flex-grow border-t" />
    </div>
  );
}

export default function ImportPage() {
  const resumeData = useResumeStore((state) => state.resumeData);

  const [hasAddedResume, setHasAddedResume] = useState(false);

  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  return (
    <main className="flex flex-col items-center justify-center py-14 flex-1">
      <div className="mx-auto w-full max-w-3xl rounded-md border px-10 py-10 text-center shadow-md">
        {!resumeData ? (
          <>
            <h1 className="text-lg font-semibold text-neutral-900">
              Import data from an existing resume
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-4"
            />
            {!hasAddedResume && (
              <>
                <OrDivider />
                <SectionWithHeadingAndCreateButton
                  heading="Don't have a resume yet?"
                  buttonText="Create from scratch"
                />
              </>
            )}
          </>
        ) : (
          <>
            {!hasAddedResume && (
              <>
                <SectionWithHeadingAndCreateButton
                  heading="You have data saved in browser from prior session"
                  buttonText="Continue where I left off"
                />
                <OrDivider />
              </>
            )}
            <h1 className="font-semibold text-neutral-900">
              Override data with a new resume
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-4"
            />
          </>
        )}
      </div>
    </main>
  );
}
