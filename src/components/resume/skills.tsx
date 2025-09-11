import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { withInteractable } from "@tambo-ai/react";
import { ResumeDataSchemaType, SkillsSectionSchema } from "@/lib/resume";

interface SkillsProps {
  skills: ResumeDataSchemaType["skills"];
  className?: string;
}

/**
 * Skills section component
 * Displays a list of professional skills as badges
 */
export function Skills({ skills, className }: SkillsProps) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="skills-section">
        Skills
      </h2>
      <ul
        className={cn("flex list-none flex-wrap gap-1 p-0")}
        aria-label="List of skills"
        aria-labelledby="skills-section"
      >
        {skills.map((skill) => (
          <li key={skill}>
            <Badge
              className="print:text-[10px] pointer-events-none"
              aria-label={`Skill: ${skill}`}
            >
              {skill}
            </Badge>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export const InteractableSkills = withInteractable(Skills, {
  componentName: "Skills",
  description: "Skills section with a list of professional skills",
  propsSchema: z.object({
    skills: SkillsSectionSchema,
  }),
});
