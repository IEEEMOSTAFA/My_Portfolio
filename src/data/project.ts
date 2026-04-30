export const projects = [
  {
    id: 1,
    title: "EdTech Learning Platform",
    slug: "edtech-learning-platform",
    description:
      "A scalable full-stack learning platform with course management and secure Stripe payments.",
    longDescription:
      "Designed and developed a production-ready EdTech platform enabling users to browse courses, enroll, and access structured learning content. Implemented secure authentication, role-based dashboards (Admin & Student), course management system, and Stripe-powered payments. Focused on scalability, performance, and clean UI/UX.",
    // image: "/edtech_platform.png",
    image: "/edtech_platform.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Prisma",
      "Stripe",
      "Tailwind CSS",
    ],
    features: [
      "Secure authentication system (JWT / session-based)",
      "Role-based dashboards (Admin & Student)",
      "Course creation, update & management",
      "Stripe payment gateway integration",
      "Protected routes with middleware",
      "Fully responsive modern UI",
    ],
    liveUrl: "https://edtech-frontend-flax.vercel.app/",
    githubUrl: "https://github.com/IEEEMOSTAFA/edtech-frontend",
    featured: true,
    category: "fullstack",
  },
  {
    id: 2,
    title: "Home Rent Management System",
    slug: "home-rent-management-system",
    description:
      "A full-stack rental platform to manage properties, tenants, and rent payments.",
    longDescription:
      "Built a comprehensive home rental management system that allows users to browse properties, manage tenants, and track rent payments efficiently. Includes secure authentication, admin dashboard, and scalable backend architecture designed for real-world usage.",
    image: "/HomeRent.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Prisma",
      "Docker",
    ],
    features: [
      "Authentication and authorization system",
      "Property listing and advanced search",
      "Tenant management dashboard",
      "Rent tracking and payment management",
      "Admin control panel",
      "Responsive and user-friendly UI",
    ],
    liveUrl: "https://edtech-frontend-flax.vercel.app/", // ⚠️ Replace with correct Home Rent link
    githubUrl: "https://github.com/IEEEMOSTAFA/HomeRent-Frontend",
    featured: true,
    category: "fullstack",
  },
];