"use client";

import { Project } from "@/lib/resume";
import { ExternalLink, Code, Github, GitBranch } from "lucide-react";
import { Section } from "@/components/ui/section";

interface ProjectsProps {
  projects: Project[];
}

const getPlatformIcon = (platform?: string) => {
  switch (platform) {
    case "github":
      return Github;
    case "gitlab":
      return GitBranch;
    case "bitbucket":
      return Code; // Using Code as fallback for Bitbucket
    default:
      return Code;
  }
};

const getPlatformColor = (platform?: string) => {
  switch (platform) {
    case "github":
      return "text-neutral-700 hover:text-neutral-900";
    case "gitlab":
      return "text-orange-600 hover:text-orange-800";
    case "bitbucket":
      return "text-blue-600 hover:text-blue-800";
    default:
      return "text-neutral-600 hover:text-neutral-800";
  }
};

export function Projects({ projects }: ProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <Section>
      <h2 className="text-xl font-bold" id="projects-section">
        Projects
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const PlatformIcon = getPlatformIcon(project.platform);
          const platformColor = getPlatformColor(project.platform);

          return (
            <div
              key={project.id}
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
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View deployed project"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {project.publicCodeUrl && (
                    <a
                      href={project.publicCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${platformColor} transition-colors`}
                      title={`View code on ${project.platform || "platform"}`}
                    >
                      <PlatformIcon size={18} />
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
