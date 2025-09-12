import { useEffect } from "react";

import { useResumeStore } from "@/store/resume-store";
import { useDebouncedCallback } from "@react-hookz/web";
import { withInteractable } from "@tambo-ai/react";
import { z } from "zod";

import { ResumeDataSchemaType, SkillsSectionSchema } from "@/lib/resume";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";

interface SkillsProps {
  skills: ResumeDataSchemaType["skills"];
  className?: string;
}

/**
 * Skills section component
 * Displays a list of professional skills as badges
 */
export function Skills({ skills, className }: SkillsProps) {
  const { setResumeData } = useResumeStore();

  const debouncedSave = useDebouncedCallback(
    (data) => setResumeData(data),
    [setResumeData],
    300,
  );

  // Save skills data when props change
  useEffect(() => {
    if (skills && skills.length > 0) {
      debouncedSave({ skills });
    }
  }, [skills, debouncedSave]);

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
