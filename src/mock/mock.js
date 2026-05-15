// Mock data for Form & Finish landing experience

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Inquire", href: "#inquire" },
];

export const heroContent = {
  eyebrow: "Coming Soon",
  title: "Your material partner, from concept to completion.",
  cta: "Contact Us",
  image: "/images/Lounge.webp",
};

export const introSection = {
  smallTitle:
    "We design beautiful homes that\nfeel lived-in and well-loved",
  body:
    "Our designs make room for the everyday. The muddy boots by the door after an afternoon outside, the cozy blanket you reach for every evening, and the kitchen that naturally gathers everyone together.",
  cta: "View Services",
  imageLeft:
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
  imageRight:
    "https://images.unsplash.com/photo-1628797285815-453c1d0d21e3?auto=format&fit=crop&w=1200&q=80",
};

export const services = [
  {
    title: "Full-Service Design",
    image:
      "https://images.pexels.com/photos/10486289/pexels-photo-10486289.jpeg",
    description:
      "From initial concept to final touches, our Custom Interior Design Consultation covers every step to turn your vision into a completed reality.",
    cta: "Inquire Now",
  },
  {
    title: "Design Concept Package",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
    description:
      "A comprehensive, custom-designed roadmap to bring your vision to life, including spatial layouts, color schemes, furniture selections, and styling tips.",
    cta: "Inquire Now",
  },
];

export const portfolio = [
  {
    title: "Sausalito Hillside",
    category: "Full-Service Design",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Marin Modern Farmhouse",
    category: "Full-Service Design",
    image:
      "https://images.pexels.com/photos/276746/pexels-photo-276746.jpeg",
  },
  {
    title: "Napa Vineyard Retreat",
    category: "Design Concept",
    image:
      "https://images.pexels.com/photos/35236655/pexels-photo-35236655.jpeg",
  },
  {
    title: "Pacific Heights Townhome",
    category: "Full-Service Design",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Sonoma Coastal Cottage",
    category: "Design Concept",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Berkeley Hills Bungalow",
    category: "Full-Service Design",
    image:
      "https://images.unsplash.com/photo-1628797285815-453c1d0d21e3?auto=format&fit=crop&w=1400&q=80",
  },
];

export const aboutSection = {
  eyebrow: "About Form & Finish",
  title: "Form & Finish",
  paragraphs: [
    "Form & Finish is a sourcing and fit-out studio linking East African projects with the best factories across China.",
    "We orchestrate every detail — materials, logistics, and finishing — so your spaces feel cohesive, durable, and ready for real life.",
  ],
  cta: "Explore Our Approach",
  image:
    "https://images.pexels.com/photos/6805421/pexels-photo-6805421.jpeg",
  signature: "Form & Finish",
};

export const testimonial = {
  quote:
    "Form & Finish coordinated every supplier and detail — now our Nairobi project feels cohesive, elevated, and completely turnkey.",
  author: "Emily Roanoake",
  image:
    "https://images.unsplash.com/photo-1773867567776-f727d0a6c1d4?auto=format&fit=crop&w=1800&q=80",
};

export const processSteps = [
  {
    number: "01",
    title: "Connect & Discover",
    description:
      "We start by getting to know you and the story you want your home to tell. This step is all about listening so we can design a space that feels authentically yours.",
  },
  {
    number: "02",
    title: "Design & Plan",
    description:
      "With a clear sense of your vision, we create a personalized design concept that includes layouts, finishes, furnishings, and all the little details that bring it to life.",
  },
  {
    number: "03",
    title: "Transform & Enjoy",
    description:
      "Once the plan is set, we guide your project hands-on from start to finish, making sure everything is executed beautifully and without any stress.",
  },
];

export const featuredIn = [
  "Architectural Digest",
  "Domino",
  "Dwell",
  "House Beautiful",
  "Elle Decor",
  "Magnolia Journal",
];

export const inquireSection = {
  eyebrow: "Let's work together",
  intro:
    "Interested in collaborating? Be sure you've reviewed our services, and then fill out the form below. We'll be in touch soon!",
  successMessage: "Thanks for your message! We'll be in touch soon.",
  fields: [
    { name: "name", label: "Name*", type: "text", required: true },
    { name: "email", label: "Email*", type: "email", required: true },
    { name: "address", label: "Project Address*", type: "text", required: true },
    {
      name: "projectType",
      label: "Type of Project*",
      type: "select",
      required: true,
      options: [
        "Full Home Design",
        "Single Room",
        "Kitchen / Bath",
        "New Construction",
        "Remodel",
        "Other",
      ],
    },
    { name: "startDate", label: "Ideal Start Date*", type: "text", required: true },
    {
      name: "scope",
      label: "Describe the scope of work*",
      type: "textarea",
      required: true,
    },
    {
      name: "referral",
      label: "How did you hear about us?",
      type: "text",
      required: false,
      placeholder: "Instagram, Referral, Google, etc.",
    },
  ],
};

export const footerContent = {
  brand: "Form & Finish",
  tagline:
    "From factory floors in China to finished rooms in Nairobi — Form & Finish is your material and fit-out partner, from concept to completion.",
  leftLinks: [],
  rightLinks: [],
  credit: "© 2026 Form & Finish | Website designed by Jonathan M",
  photoCredit: "",
};
