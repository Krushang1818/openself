import { z } from "zod";
import { Section } from "@/components/ui/section";
import {
  ResumeDataSchemaType,
  WorkExperienceSectionSchema,
  getShortMonth,
  getYear,
} from "@/lib/resume";
import { useMemo } from "react";
import { withInteractable } from "@tambo-ai/react";

interface WorkExperienceProps {
  work: ResumeDataSchemaType["workExperience"];
  className?: string;
}

export function WorkExperience({ work, className }: WorkExperienceProps) {
  // Filter out invalid work experiences and pre-format dates
  const validWork = useMemo(() => {
    return work
      .filter(
        (item) =>
          item.company && item.location && item.title && item.description,
      )
      .map((item) => ({
        ...item,
        formattedDate: `${getShortMonth(item.start)} ${getYear(item.start)} - ${
          !!item.end
            ? `${getShortMonth(item.end)} ${getYear(item.end)}`
            : "Present"
        }`,
        companyLower: item.company.toLowerCase(),
      }));
  }, [work]);

  if (validWork.length === 0) {
    return null;
  }

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="work-experience">
        Work Experience
      </h2>
      <div
        className="flex flex-col gap-4"
        role="feed"
        aria-labelledby="work-experience"
      >
        {validWork.map((item) => {
          return (
            <div
              key={item.company + item.location + item.title}
              className="flex flex-col justify-start items-start gap-1 print:mb-4"
            >
              <div className="flex flex-wrap justify-between items-start self-stretch gap-2">
                <div className="flex flex-wrap justify-start items-center gap-2">
                  <p className="text-base font-semibold text-left">
                    {item.title}
                  </p>
                  <div className="flex justify-center items-center relative overflow-hidden gap-2.5 px-[7px] py-0.5 rounded bg-[#eeeff0]">
                    <p className="text-[12px] font-semibold text-center text-neutral-600">
                      {item.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-right text-neutral-700">
                  {item.formattedDate}
                </p>
              </div>
              <div className="flex flex-col justify-start items-start relative gap-1.5">
                <p className="self-stretch text-sm font-medium text-left text-neutral-600 capitalize flex flex-wrap gap-1">
                  <span>{item.companyLower}</span>
                  {item.company && item.contract && <span>·</span>}
                  <span>{item.contract}</span>
                </p>
                <p className="self-stretch text-sm font-medium text-left text-neutral-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export const InteractableWorkExperience = withInteractable(WorkExperience, {
  componentName: "WorkExperience",
  description: "Work experience section with a list of work experiences",
  propsSchema: z.object({
    work: WorkExperienceSectionSchema,
  }),
});
