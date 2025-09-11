import { ResumeDataSchemaType } from "@/lib/resume";
import { ExternalLinkIcon, GitBranchIcon } from "lucide-react";
import { Section } from "@/components/ui/section";

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
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, idx) => {
          return (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-neutral-900">
                  {project.name}
                </h3>
                <div className="flex gap-2">
                  {project.deployedUrl && (
                    <a
                      href={project.deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View deployed project"
                    >
                      <ExternalLinkIcon className="size-4" />
                    </a>
                  )}
                  {project.publicCodeUrl && (
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
                <p className="text-neutral-700 mb-4 leading-relaxed">
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
            </div>
          );
        })}
      </div>
    </Section>
  );
}
