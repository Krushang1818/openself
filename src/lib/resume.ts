import { z } from "zod";

export const MetadataSchema = z.object({
  name: z.string().describe("Name of the resume"),
  size: z.string().describe("Size for the resume"),
});

export const HeaderContactsSchema = z.object({
  website: z.string().describe("Personal website or portfolio URL").optional(),
  email: z.string().describe("Email address").optional(),
  phone: z.string().describe("Phone number").optional(),
  twitter: z.string().describe("Twitter/X username").optional(),
  linkedin: z.string().describe("LinkedIn username").optional(),
  github: z.string().describe("GitHub username").optional(),
});

export const HeaderSectionSchema = z.object({
  name: z.string(),
  bio: z.string().describe("Short bio of your profile"),
  location: z
    .string()
    .describe("Location with format 'City, Country'")
    .optional(),
  contacts: HeaderContactsSchema,
});

export const SummarySectionSchema = z
  .string()
  .describe("Summary of your profile");

export const WorkExperienceSectionSchema = z.array(
  z.object({
    company: z.string().describe("Company name"),
    link: z.string().describe("Company website URL"),
    location: z
      .string()
      .describe(
        "Location with format 'City, Country' or could be Hybrid or Remote",
      ),
    contract: z
      .string()
      .describe("Type of work contract like Full-time, Part-time, Contract"),
    title: z.string().describe("Job title"),
    start: z.string().describe("Start date in format 'YYYY-MM-DD'"),
    end: z
      .string()
      .optional()
      .nullable()
      .describe("End date in format 'YYYY-MM-DD'"),
    description: z.string().describe("Job description"),
  }),
);

export const ProjectSectionSchema = z.array(
  z.object({
    name: z.string().describe("Project name"),
    deployedUrl: z.string().describe("Deployed project URL"),
    publicCodeUrl: z.string().describe("Public code repository URL"),
    description: z.string().describe("Project description"),
    techStack: z.array(z.string()).describe("Tech stack used in the project"),
  }),
);

export const EducationSectionSchema = z.array(
  z.object({
    school: z.string().describe("School or university name"),
    degree: z.string().describe("Degree or certification obtained"),
    start: z.string().describe("Start year"),
    end: z.string().describe("End year"),
  }),
);

export const SkillsSectionSchema = z
  .array(z.string())
  .describe("Skills used within the different jobs the user has had.");

export const ResumeDataSchema = z.object({
  header: HeaderSectionSchema,
  summary: SummarySectionSchema,
  projects: ProjectSectionSchema,
  workExperience: WorkExperienceSectionSchema,
  education: EducationSectionSchema,
  skills: SkillsSectionSchema,
  picture: z.string().optional().describe("URL of the profile picture"),
});

export type ResumeDataSchemaType = z.infer<typeof ResumeDataSchema>;

export const ResumeStorageDataSchema = ResumeDataSchema.extend({
  metadata: MetadataSchema,
});

export type ResumeStorageDataSchemaType = z.infer<
  typeof ResumeStorageDataSchema
>;

export const getYear = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.getFullYear();
};

export const getShortMonth = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("en-us", { month: "short" });
};
