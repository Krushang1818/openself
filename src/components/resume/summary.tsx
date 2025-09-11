import { z } from "zod";
import { ResumeDataSchemaType, SummarySectionSchema } from "@/lib/resume";
import { Section } from "../ui/section";
import { withInteractable } from "@tambo-ai/react";

interface SummaryProps {
  summary: ResumeDataSchemaType["summary"];
  className?: string;
}

/**
 * Summary section component
 * Displays a summary of professional experience and goals
 */
export function Summary({ summary, className }: SummaryProps) {
  if (!summary) {
    return null;
  }

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="about-section">
        About
      </h2>
      <div
        className="text-pretty text-sm print:text-[12px]"
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
