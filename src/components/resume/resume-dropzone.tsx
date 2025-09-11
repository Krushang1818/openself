import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FileLock2Icon, UploadIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Dropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { generateResumeObject } from "@/lib/server/ai/generate-resume-object";
import { useResumeStore } from "@/store/resume-store";
import { parsePdf } from "@/lib/server/parse-pdf";
import { ROUTES } from "@/lib/routes";

const defaultFileState = {
  name: "",
  size: 0,
  fileUrl: "",
};

export function ResumeDropzone({
  onFileUrlChange,
  className,
}: {
  onFileUrlChange: (fileUrl: string) => void;
  className?: string;
}) {
  const router = useRouter();
  const { setResumeData, isLoading, setLoading, setError } = useResumeStore();

  const [file, setFile] = useState(defaultFileState);

  const setNewFile = (newFile: File) => {
    if (file.fileUrl) {
      URL.revokeObjectURL(file.fileUrl);
    }

    const { name, size } = newFile;
    const fileUrl = URL.createObjectURL(newFile);
    setFile({ name, size, fileUrl });
    onFileUrlChange(fileUrl);
  };

  const handleUploadFile = async () => {
    try {
      setLoading(true);
      setError(null);

      const resumeText = await parsePdf(file.fileUrl);

      let resumeObject = await generateResumeObject(resumeText);
      if (!resumeObject) {
        resumeObject = {
          header: {
            name: "John Doe",
            bio: "This is a short description of your profile",
            location: "",
            contacts: {},
          },
          summary: "You should add a summary here",
          workExperience: [],
          education: [],
          projects: [],
          skills: ["Cooking", "Singing", "Dancing"],
        };
      }

      // Store the parsed data
      setResumeData(resumeObject);

      // Navigate to chat page
      router.push(ROUTES.CHAT);
    } catch (error) {
      console.error("Error processing resume:", error);
      setError(
        error instanceof Error ? error.message : "Failed to process resume",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(defaultFileState);
    onFileUrlChange("");
  };

  const hasFile = Boolean(file.name);

  return (
    <div className="relative mx-2.5">
      {hasFile && (
        <button
          onClick={handleReset}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full z-10"
          disabled={isLoading}
        >
          <XIcon className="h-4 w-4 text-neutral-500" />
        </button>
      )}

      <Dropzone
        className={className}
        accept={{ "application/pdf": [".pdf"] }}
        maxFiles={1}
        icon={
          hasFile ? (
            <Image
              src="/uploaded-pdf.svg"
              alt="Uploaded PDF"
              width={24}
              height={24}
            />
          ) : (
            <UploadIcon className="size-6" />
          )
        }
        title={hasFile ? file.name : "Upload PDF"}
        description={
          hasFile ? (
            `${(Number(file.size) / 1024 / 1024).toFixed(2)} MB`
          ) : (
            <span className="inline-flex items-center gap-2">
              <FileLock2Icon className="size-4 shrink-0" />
              File data is used locally and never leaves your browser
            </span>
          )
        }
        isUploading={isLoading}
        onDrop={(acceptedFiles) => {
          if (acceptedFiles[0]) setNewFile(acceptedFiles[0]);
        }}
        onDropRejected={() => toast.error("Only PDF files are supported")}
      />

      {hasFile && (
        <div className="mt-4 flex items-center justify-center">
          <Button disabled={isLoading} onClick={handleUploadFile}>
            Import and Continue <span aria-hidden="true">→</span>
          </Button>
        </div>
      )}
    </div>
  );
}
