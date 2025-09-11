"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Resume as ResumeType } from "@/lib/resume";

// Register fonts if needed
// Font.register({
//   family: 'Inter',
//   src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
// });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 5,
  },
  location: {
    fontSize: 10,
    color: "#9ca3af",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 3,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  company: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 2,
  },
  date: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 3,
  },
  description: {
    fontSize: 11,
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },
  school: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 2,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: "#f3f4f6",
    padding: "3 8",
    borderRadius: 3,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 11,
    lineHeight: 1.4,
    marginBottom: 3,
  },
  projectLink: {
    fontSize: 10,
    color: "#3b82f6",
    marginBottom: 2,
  },
  techStack: {
    fontSize: 10,
    color: "#6b7280",
  },
});

interface ResumePDFProps {
  resume: ResumeType;
}

export function ResumePDF({ resume }: ResumePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {resume.basicDetails.name || "Your Name"}
          </Text>
          {resume.basicDetails.bio && (
            <Text style={styles.bio}>{resume.basicDetails.bio}</Text>
          )}
          {resume.basicDetails.location && (
            <Text style={styles.location}>{resume.basicDetails.location}</Text>
          )}
        </View>

        {/* About Section */}
        {resume.aboutSection?.detailedBio && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>
              {resume.aboutSection.detailedBio}
            </Text>
          </View>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {resume.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.date}>
                  {exp.startDate} -{" "}
                  {exp.isCurrentPosition ? "Present" : exp.endDate || "Present"}
                  {exp.location && ` • ${exp.location}`}
                </Text>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.school}>{edu.school}</Text>
                <Text style={styles.date}>
                  {edu.startDate} -{" "}
                  {edu.isCurrentlyEnrolled
                    ? "Present"
                    : edu.endDate || "Present"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resume.skills?.skills && resume.skills.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skills}>
              {resume.skills.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.description && (
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                )}
                {project.deployedUrl && (
                  <Text style={styles.projectLink}>
                    Live: {project.deployedUrl}
                  </Text>
                )}
                {project.publicCodeUrl && (
                  <Text style={styles.projectLink}>
                    Code: {project.publicCodeUrl}
                  </Text>
                )}
                {project.techStack && project.techStack.length > 0 && (
                  <Text style={styles.techStack}>
                    Tech: {project.techStack.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Tools */}
        {resume.tools.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tools & Technologies</Text>
            {Object.entries(
              resume.tools.reduce((acc, tool) => {
                if (!acc[tool.category]) {
                  acc[tool.category] = [];
                }
                acc[tool.category].push(tool.name);
                return acc;
              }, {} as Record<string, string[]>),
            ).map(([category, tools]) => (
              <Text key={category} style={styles.description}>
                {category.charAt(0).toUpperCase() + category.slice(1)}:{" "}
                {tools.join(", ")}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
