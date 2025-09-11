import { withInteractable } from "@tambo-ai/react";
import { Education } from "./education";
import { Header } from "./header";
import { Skills } from "./skills";
import { Summary } from "./summary";
import { WorkExperience } from "./work-experience";
import { ResumeDataSchema, type ResumeDataSchemaType } from "@/lib/resume";

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
      className="w-full space-y-8 font-mono bg-white print:space-y-4 px-4 py-3 rounded-2xl"
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

// Create the interactable component
export const InteractableFullResume = withInteractable(FullResume, {
  componentName: "Resume",
  description:
    "Resume with header, summary, work experience, education, and skills",
  propsSchema: ResumeDataSchema,
});
