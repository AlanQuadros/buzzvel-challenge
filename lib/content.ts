export const categories = [
  {
    id: "design",
    number: "01",
    title: "Product Design",
    description: "Turn complex problems into clear, useful experiences.",
  },
  {
    id: "technology",
    number: "02",
    title: "Technology",
    description:
      "Build a stronger understanding of the tools shaping digital products.",
  },
  {
    id: "business",
    number: "03",
    title: "Business",
    description:
      "Develop practical skills for better decisions and stronger teams.",
  },
  {
    id: "creative",
    number: "04",
    title: "Creative",
    description: "Explore new ways to communicate, create and tell stories.",
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type Course = {
  id: string;
  category: CategoryId;
  title: string;
  description: string;
  instructor: string;
  lessons: string[];
  duration: string;
  level: "Beginner" | "Intermediate";
};

export const courses: Course[] = [
  {
    id: "designing-products",
    category: "design",
    title: "Designing products people understand.",
    description:
      "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
    instructor: "Maya Chen · Senior Product Designer",
    duration: "2h 40min",
    level: "Intermediate",
    lessons: [
      "Start with the problem",
      "Understand your users",
      "Map the experience",
      "Create a clear structure",
      "Sketch the possibilities",
      "Design thoughtful interactions",
      "Test with real people",
      "Put it into practice",
    ],
  },
  {
    id: "web-foundations",
    category: "technology",
    title: "Understand how the web works.",
    description:
      "Connect the dots between browsers, interfaces and the technology behind everyday digital products.",
    instructor: "Sam Rivera · Front-End Engineer",
    duration: "1h 50min",
    level: "Beginner",
    lessons: [
      "A journey through the web",
      "Inside the browser",
      "Structure and style",
      "Making things interactive",
      "Build your first page",
    ],
  },
  {
    id: "better-decisions",
    category: "business",
    title: "Make better decisions together.",
    description:
      "Turn complex information into clear priorities and help your team move forward with confidence.",
    instructor: "Jordan Lee · Product Lead",
    duration: "1h 30min",
    level: "Beginner",
    lessons: [
      "Frame the decision",
      "Ask better questions",
      "Weigh the options",
      "Align your team",
      "Learn from the outcome",
    ],
  },
  {
    id: "everyday-storytelling",
    category: "creative",
    title: "Find the story in your ideas.",
    description:
      "Shape your ideas into stories that connect with people, from your first outline to your final presentation.",
    instructor: "Taylor Brooks · Creative Director",
    duration: "2h",
    level: "Beginner",
    lessons: [
      "Know your audience",
      "Find your central idea",
      "Build a narrative",
      "Make it visual",
      "Tell your story",
      "Your final project",
    ],
  },
];

export const steps = [
  {
    number: "01",
    title: "Choose your focus",
    description:
      "Find courses based on the skill you want to build, not endless content categories.",
    shape: "focus",
  },
  {
    number: "02",
    title: "Learn from experience",
    description:
      "Follow concise lessons created by professionals who actually use these skills.",
    shape: "experience",
  },
  {
    number: "03",
    title: "Put it into practice",
    description:
      "Every course includes practical exercises designed to turn knowledge into action.",
    shape: "practice",
  },
] as const;

export const stats = [
  { value: "24K+", label: "active learners" },
  { value: "120+", label: "expert-led courses" },
  { value: "92%", label: "complete their first course" },
] as const;

export const information = {
  Careers: {
    title: "Teach, create, make a difference.",
    body: "Interested in helping curious people learn? Get in touch with the Luma team to talk about teaching and collaboration.",
  },
  Journal: {
    title: "Ideas worth exploring.",
    body: "Our learning journal is coming soon. In the meantime, explore a practical course and put a new idea to work.",
  },
  "Help Center": {
    title: "How can we help?",
    body: "Choose a course to see its lessons, duration and level. For questions about learning with your team or teaching with Luma, use the contact form below.",
  },
  Terms: {
    title: "About this demo",
    body: "Luma is a fictional learning platform built for the Buzzvel front-end challenge. Course information is sample content. No purchases, accounts or enrollments are created.",
  },
  Privacy: {
    title: "Your privacy",
    body: "This demo does not send form submissions or account details to a server. Your entries are used only in the current browser session. No analytics or tracking cookies are used.",
  },
} as const;
export type InformationKey = keyof typeof information;
