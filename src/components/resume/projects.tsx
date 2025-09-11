import { z } from "zod";
import { ProjectSectionSchema, ResumeDataSchemaType } from "@/lib/resume";
import { ExternalLinkIcon, GitBranchIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { withInteractable } from "@tambo-ai/react";

interface ProjectsProps {
  projects: ResumeDataSchemaType["projects"];
  className?: string;
}

export function Projects({ projects, className }: ProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="projects-section">
        Projects
      </h2>
      <div className="space-y-4" role="feed" aria-labelledby="projects-section">
        {projects.map((project, idx) => {
          return (
            <article key={idx} role="article">
              <div className="flex items-start justify-between mb-2">
                <h3
                  className="font-semibold leading-none"
                  id={`project-${project.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {project.name}
                </h3>

                <div className="flex gap-4">
                  {true && (
                    <a
                      href={project.deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View deployed project"
                    >
                      <ExternalLinkIcon className="size-4" />
                    </a>
                  )}
                  {true && (
                    <a
                      href={project.publicCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitBranchIcon className="size-4" />
                    </a>
                  )}
                </div>
              </div>

              {project.description && (
                <p className="text-sm text-neutral-500 mb-2">
                  {project.description}
                </p>
              )}

              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-neutral-700 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </Section>
  );
}

export const InteractableProjects = withInteractable(Projects, {
  componentName: "Projects",
  description: "Projects section with a list of projects",
  propsSchema: z.object({
    projects: z.array(ProjectSectionSchema),
  }),
});
