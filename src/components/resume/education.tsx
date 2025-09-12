import { useEffect, useMemo } from "react";

import { useResumeStore } from "@/store/resume-store";
import { useDebouncedCallback } from "@react-hookz/web";
import { withInteractable } from "@tambo-ai/react";
import { z } from "zod";

import {
  EducationSectionSchema,
  ResumeDataSchemaType,
  getYear,
} from "@/lib/resume";

import { Section } from "@/components/ui/section";

/**
 * Individual education card component
 */
function EducationItem({
  education,
}: {
  education: ResumeDataSchemaType["education"][0];
}) {
  const { school, start, end, degree } = education;

  // Skip rendering if required fields are missing
  if (!school || !degree || !start) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base">
        <h3
          className="font-semibold leading-none"
          id={`education-${school.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {school}
        </h3>
        <div
          className="text-sm tabular-nums text-neutral-700"
          aria-label={`Period: ${getYear(start)} to ${
            end ? ` ${getYear(end)}` : "Present"
          }`}
        >
          {getYear(start)} - {end ? `${getYear(end)}` : "Present"}
        </div>
      </div>
      <div
        className="mt-2 text-sm text-pretty text-neutral-500 print:text-[12px]"
        aria-labelledby={`education-${school
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
      >
        {degree}
      </div>
    </>
  );
}

/**
 * Main education section component
 * Renders a list of education experiences
 */
export function Education({
  educations,
}: {
  educations: ResumeDataSchemaType["education"];
}) {
  const { setResumeData } = useResumeStore();

  const debouncedSave = useDebouncedCallback(
    (data) => setResumeData(data),
    [setResumeData],
    300,
  );

  // Save education data when props change
  useEffect(() => {
    if (educations && educations.length > 0) {
      debouncedSave({ education: educations });
    }
  }, [educations, debouncedSave]);

  // Filter out invalid education entries
  const validEducations = useMemo(
    () => educations.filter((edu) => edu.school && edu.degree && edu.start),
    [educations],
  );

  if (validEducations.length === 0) {
    return null;
  }

  return (
    <Section>
      <h2 className="text-xl font-bold" id="education-section">
        Education
      </h2>
      <div
        className="space-y-4"
        role="feed"
        aria-labelledby="education-section"
      >
        {validEducations.map((item, idx) => (
          <article key={idx} role="article">
            <EducationItem education={item} />
          </article>
        ))}
      </div>
    </Section>
  );
}

export const InteractableEducation = withInteractable(Education, {
  componentName: "Education",
  description: "Education section with a list of educational experiences",
  propsSchema: z.object({
    educations: EducationSectionSchema,
  }),
});
