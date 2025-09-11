import {
  InteractableEducation,
  InteractableHeader,
  InteractableSkills,
  InteractableSummary,
  InteractableWorkExperience,
} from "@/components/resume";
import { type ResumeDataSchemaType } from "@/lib/resume";

export const FullResume = ({
  resume,
}: {
  resume?: ResumeDataSchemaType | null;
}) => {
  if (!resume) {
    return null;
  }

  return (
    <section
      className="w-full space-y-8 font-mono bg-white print:space-y-4 px-4 py-3 rounded-2xl"
      aria-label="Resume Content"
    >
      <InteractableHeader header={resume?.header} picture={resume.picture} />

      <div className="flex flex-col gap-6">
        <InteractableSummary summary={resume?.summary} />

        <InteractableWorkExperience work={resume?.workExperience} />

        <InteractableEducation educations={resume.education} />

        <InteractableSkills skills={resume.skills} />
      </div>
    </section>
  );
};
