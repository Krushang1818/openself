"use client";

import { Download } from "lucide-react";
import { ResumeDataSchemaType } from "@/lib/resume";
import { pdf } from "@react-pdf/renderer";
import { ResumePDF } from "./resume-pdf";

interface DownloadButtonProps {
  resume: ResumeDataSchemaType;
  className?: string;
}

export function DownloadButton({
  resume,
  className = "",
}: DownloadButtonProps) {
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
    <button
      onClick={handleDownload}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
      aria-label="Download resume as PDF"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
}
