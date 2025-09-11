import { Education } from "./education";
import { Header } from "./header";
import { Skills } from "./skills";
import { Summary } from "./summary";
import { WorkExperience } from "./work-experience";
import { type ResumeDataSchemaType } from "@/lib/resume";

export const FullResume = ({
  resume,
  profilePicture,
}: {
  resume?: ResumeDataSchemaType | null;
  profilePicture?: string;
}) => {
  if (!resume) {
    return null;
  }

  return (
    <section
      className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4 my-8 px-4"
      aria-label="Resume Content"
    >
      <Header header={resume?.header} picture={profilePicture} />

      <div className="flex flex-col gap-6">
        <Summary summary={resume?.summary} />

        <WorkExperience work={resume?.workExperience} />

        <Education educations={resume.education} />

        <Skills skills={resume.header.skills} />
      </div>
    </section>
  );
};

// Export the component for registration in tambo.ts
export const InteractableFullResume = FullResume;
