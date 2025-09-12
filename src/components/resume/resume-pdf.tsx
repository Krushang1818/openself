"use client";

import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { ResumeDataSchemaType, getShortMonth, getYear } from "@/lib/resume";

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
  socialLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  socialLink: {
    fontSize: 9,
    color: "#3b82f6",
    textDecoration: "underline",
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
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  titleLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  locationBadge: {
    fontSize: 10,
    backgroundColor: "#f3f4f6",
    padding: "2 4",
    borderRadius: 3,
    color: "#374151",
  },
  formattedDate: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "right",
  },
  companyContractContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    color: "#374151",
    textTransform: "capitalize",
  },
  contract: {
    fontSize: 11,
    color: "#374151",
  },
  separator: {
    fontSize: 9,
    color: "#6b7280",
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
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  school: {
    fontSize: 14,
    fontWeight: "bold",
  },
  educationDate: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "right",
  },
  degree: {
    fontSize: 11,
    color: "#374151",
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
  resume: ResumeDataSchemaType;
}

export function ResumePDF({ resume }: ResumePDFProps) {
  // Helper function to format social URLs
  const formatSocialUrl = (
    url: string | undefined,
    platform: "github" | "twitter" | "linkedin",
  ) => {
    if (!url) return undefined;

    const cleanUrl = url.trim();
    if (cleanUrl.startsWith("http")) return cleanUrl;

    // Handle twitter.com and x.com variations
    if (
      platform === "twitter" &&
      (cleanUrl.startsWith("twitter.com") || cleanUrl.startsWith("x.com"))
    ) {
      return `https://${cleanUrl}`;
    }

    const platformUrls = {
      github: "github.com",
      twitter: "x.com",
      linkedin: "linkedin.com/in",
    } as const;

    return `https://${platformUrls[platform]}/${cleanUrl}`;
  };

  // Format social links
  const socialLinks = {
    website: resume.header.contacts.website?.startsWith("http")
      ? resume.header.contacts.website
      : resume.header.contacts.website
        ? `https://${resume.header.contacts.website}`
        : undefined,
    github: formatSocialUrl(resume.header.contacts.github, "github"),
    twitter: formatSocialUrl(resume.header.contacts.twitter, "twitter"),
    linkedin: formatSocialUrl(resume.header.contacts.linkedin, "linkedin"),
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <Text style={styles.name}>{resume.header.name || "Your Name"}</Text>
          {resume.header.bio && (
            <Text style={styles.bio}>{resume.header.bio}</Text>
          )}
          {resume.header.location && (
            <Text style={styles.location}>{resume.header.location}</Text>
          )}

          {/* Social Links */}
          {(socialLinks.website ||
            resume.header.contacts.email ||
            resume.header.contacts.phone ||
            socialLinks.github ||
            socialLinks.twitter ||
            socialLinks.linkedin) && (
            <View style={styles.socialLinks}>
              {socialLinks.website && (
                <Link src={socialLinks.website} style={styles.socialLink}>
                  Website
                </Link>
              )}
              {socialLinks.website &&
                (resume.header.contacts.email ||
                  resume.header.contacts.phone ||
                  socialLinks.github ||
                  socialLinks.twitter ||
                  socialLinks.linkedin) && (
                  <Text style={styles.separator}>•</Text>
                )}
              {resume.header.contacts.email && (
                <Link
                  src={`mailto:${resume.header.contacts.email}`}
                  style={styles.socialLink}
                >
                  Email
                </Link>
              )}
              {resume.header.contacts.email &&
                (resume.header.contacts.phone ||
                  socialLinks.github ||
                  socialLinks.twitter ||
                  socialLinks.linkedin) && (
                  <Text style={styles.separator}>•</Text>
                )}
              {resume.header.contacts.phone && (
                <Link
                  src={`tel:${resume.header.contacts.phone}`}
                  style={styles.socialLink}
                >
                  Phone
                </Link>
              )}
              {resume.header.contacts.phone &&
                (socialLinks.github ||
                  socialLinks.twitter ||
                  socialLinks.linkedin) && (
                  <Text style={styles.separator}>•</Text>
                )}
              {socialLinks.github && (
                <Link src={socialLinks.github} style={styles.socialLink}>
                  GitHub
                </Link>
              )}
              {socialLinks.github &&
                (socialLinks.twitter || socialLinks.linkedin) && (
                  <Text style={styles.separator}>•</Text>
                )}
              {socialLinks.twitter && (
                <Link src={socialLinks.twitter} style={styles.socialLink}>
                  X
                </Link>
              )}
              {socialLinks.twitter && socialLinks.linkedin && (
                <Text style={styles.separator}>•</Text>
              )}
              {socialLinks.linkedin && (
                <Link src={socialLinks.linkedin} style={styles.socialLink}>
                  LinkedIn
                </Link>
              )}
            </View>
          )}
        </View>

        {/* About Section */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{resume.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resume.workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {resume.workExperience.map(
              (
                exp: ResumeDataSchemaType["workExperience"][0],
                index: number,
              ) => {
                const formattedDate = `${getShortMonth(exp.start)} ${getYear(
                  exp.start,
                )} - ${
                  exp.end
                    ? `${getShortMonth(exp.end)} ${getYear(exp.end)}`
                    : "Present"
                }`;

                return (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View style={styles.titleLocationContainer}>
                        <Text style={styles.jobTitle}>{exp.title}</Text>
                        {exp.location && (
                          <Text style={styles.locationBadge}>
                            {exp.location}
                          </Text>
                        )}
                      </View>
                      <Text style={styles.formattedDate}>{formattedDate}</Text>
                    </View>

                    <View style={styles.companyContractContainer}>
                      <Text style={styles.company}>
                        {exp.company.toLowerCase()}
                      </Text>
                      {exp.company && exp.contract && (
                        <Text style={styles.separator}>•</Text>
                      )}
                      {exp.contract && (
                        <Text style={styles.contract}>{exp.contract}</Text>
                      )}
                    </View>

                    {exp.description && (
                      <Text style={styles.description}>{exp.description}</Text>
                    )}
                  </View>
                );
              },
            )}
          </View>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.projects.map(
              (project: ResumeDataSchemaType["projects"][0], index: number) => (
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
              ),
            )}
          </View>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map(
              (edu: ResumeDataSchemaType["education"][0], index: number) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <Text style={styles.school}>{edu.school}</Text>
                    <Text style={styles.educationDate}>
                      {getYear(edu.start)} -{" "}
                      {edu.end ? getYear(edu.end) : "Present"}
                    </Text>
                  </View>
                  <Text style={styles.degree}>{edu.degree}</Text>
                </View>
              ),
            )}
          </View>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skills}>
              {resume.skills.map((skill: string, index: number) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
