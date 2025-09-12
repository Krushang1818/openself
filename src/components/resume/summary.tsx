import { useEffect } from "react";

import { useResumeStore } from "@/store/resume-store";
import { useDebouncedCallback } from "@react-hookz/web";
import { withInteractable } from "@tambo-ai/react";
import { z } from "zod";

import { ResumeDataSchemaType, SummarySectionSchema } from "@/lib/resume";

import { Section } from "../ui/section";

interface SummaryProps {
  summary: ResumeDataSchemaType["summary"];
  className?: string;
}

/**
 * Summary section component
 * Displays a summary of professional experience and goals
 */
export function Summary({ summary, className }: SummaryProps) {
  const { setResumeData } = useResumeStore();

  const debouncedSave = useDebouncedCallback(
    (data) => setResumeData(data),
    [setResumeData],
    300,
  );

  // Save summary data when props change
  useEffect(() => {
    if (summary) {
      debouncedSave({ summary });
    }
  }, [summary, debouncedSave]);

  if (!summary) {
    return null;
  }

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="about-section">
        About
      </h2>
      <div
        className="text-pretty text-sm print:text-[12px] text-neutral-500"
        aria-labelledby="about-section"
      >
        {summary}
      </div>
    </Section>
  );
}

export const InteractableSummary = withInteractable(Summary, {
  componentName: "About",
  description:
    "About section with summary of professional experience and goals",
  propsSchema: z.object({
    summary: SummarySectionSchema,
  }),
});
