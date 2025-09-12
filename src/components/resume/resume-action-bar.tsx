"use client";

import { pdf } from "@react-pdf/renderer";
import { Download } from "lucide-react";

import { ResumeDataSchemaType } from "@/lib/resume";

import { Button } from "@/components/ui/button";

import { ResumePDF } from "./resume-pdf";

interface ResumeActionBarProps {
  resume: ResumeDataSchemaType;
  className?: string;
}

export function ResumeActionBar({
  resume,
  className = "",
}: ResumeActionBarProps) {
  const handleDownload = async () => {
    try {
      const blob = await pdf(<ResumePDF resume={resume} />).toBlob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${resume.header.name || "resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Error downloading resume. Please try again.");
    }
  };

  return (
    <div
      className={`sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 ${className}`}
    >
      <div className="flex justify-end">
        <Button onClick={handleDownload} aria-label="Download resume as PDF">
          <Download className="size-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
}
