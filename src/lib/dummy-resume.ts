import { ResumeDataSchemaType } from "./resume";

export const DUMMY_RESUME_DATA: ResumeDataSchemaType = {
  header: {
    name: "John Doe",
    bio: "Experienced software engineer with a passion for building scalable web applications",
    location: "San Francisco, CA",
    contacts: {
      website: "https://johndoe.dev",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      twitter: "@johndoe",
      linkedin: "johndoe",
      github: "johndoe",
    },
  },
  summary:
    "Dynamic and results-oriented software engineer with 5+ years of experience in full-stack development. Proven track record of delivering high-quality, scalable solutions using modern technologies. Passionate about clean code, user experience, and continuous learning.",
  workExperience: [
    {
      company: "TechCorp Inc.",
      link: "https://techcorp.com",
      location: "San Francisco, CA",
      contract: "Full-time",
      title: "Senior Software Engineer",
      start: "2022-01-01",
      end: null,
      description:
        "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and conducted code reviews.",
    },
    {
      company: "StartupXYZ",
      link: "https://startupxyz.com",
      location: "Remote",
      contract: "Full-time",
      title: "Full Stack Developer",
      start: "2020-03-01",
      end: "2021-12-31",
      description:
        "Built responsive web applications using React and Node.js. Collaborated with design team to implement pixel-perfect UIs. Optimized database queries improving performance by 40%.",
    },
    {
      company: "WebAgency",
      link: "https://webagency.com",
      location: "New York, NY",
      contract: "Contract",
      title: "Frontend Developer",
      start: "2019-06-01",
      end: "2020-02-28",
      description:
        "Developed client websites using HTML, CSS, and JavaScript. Worked with CMS platforms and implemented SEO best practices. Delivered projects on time and within budget.",
    },
  ],
  projects: [
    {
      name: "E-commerce Platform",
      deployedUrl: "https://ecommerce-demo.com",
      publicCodeUrl: "https://github.com/johndoe/ecommerce-platform",
      description:
        "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Built with React, Node.js, and PostgreSQL.",
      techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    },
    {
      name: "Task Management App",
      deployedUrl: "https://taskmanager-demo.com",
      publicCodeUrl: "https://github.com/johndoe/task-manager",
      description:
        "Collaborative task management application with real-time updates and team features. Features drag-and-drop interface and progress tracking.",
      techStack: ["Vue.js", "Firebase", "Tailwind CSS", "Socket.io"],
    },
    {
      name: "Weather Dashboard",
      deployedUrl: "https://weather-dashboard-demo.com",
      publicCodeUrl: "https://github.com/johndoe/weather-dashboard",
      description:
        "Interactive weather dashboard with location-based forecasts, historical data, and customizable widgets.",
      techStack: ["React", "D3.js", "OpenWeather API", "CSS3"],
    },
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      start: "2015",
      end: "2019",
    },
    {
      school: "Stanford University",
      degree: "Master of Science in Software Engineering",
      start: "2019",
      end: "2021",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Git",
    "REST APIs",
    "GraphQL",
    "CI/CD",
    "Agile/Scrum",
  ],
};
