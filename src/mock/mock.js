// Mock data for Kingkiddph Ltd landing experience

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
  title: "Stories That Connect",
  cta: "Contact Us",
  image: "/images/kingkidd-webp/KingKiddPH-173.webp",
};

export const heroImages = [
  "/images/kingkidd-webp/KingKiddPH-173.webp",
  "/images/kingkidd-webp/KingKiddPH-29.webp",
  "/images/kingkidd-webp/Evoque-104.webp",
  "/images/kingkidd-webp/AfricaForexTradingExpo-89.webp",
  "/images/kingkidd-webp/_LMN4155.webp",
];

export const introSection = {
  smallTitle:
    "Creating purposeful visual storytelling\nfor brands that inspire",
  body:
    "Kingkiddph Production is a Kenya-based film and content production company creating purposeful visual storytelling for brands that want to connect, inspire and leave a lasting impact. We combine strategy, storytelling and high-quality production to help brands communicate with clarity and build meaningful audience trust.",
  cta: "View Services",
  imageLeft:
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
  imageRight:
    "https://images.unsplash.com/photo-1628797285815-453c1d0d21e3?auto=format&fit=crop&w=1200&q=80",
};

export const services = [
  {
    title: "Brand Films & Documentaries",
    image:
      "https://images.pexels.com/photos/10486289/pexels-photo-10486289.jpeg",
    description:
      "Cinematic storytelling that captures your brand's journey and values. From concept to final cut, we create films that resonate and leave a lasting impact.",
    cta: "Inquire Now",
  },
  {
    title: "Marketing Campaigns & Digital Content",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
    description:
      "Strategic visual content for corporates, SMEs and growing brands. We produce authentic, engaging content that connects with your audience and drives growth.",
    cta: "Inquire Now",
  },
];

export const portfolio = [
  {
    title: "Corporate Brand Story",
    category: "Brand Film",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Product Launch Campaign",
    category: "Marketing Campaign",
    image:
      "https://images.pexels.com/photos/276746/pexels-photo-276746.jpeg",
  },
  {
    title: "Founder's Journey Documentary",
    category: "Documentary",
    image:
      "https://images.pexels.com/photos/35236655/pexels-photo-35236655.jpeg",
  },
  {
    title: "Event Coverage & Highlights",
    category: "Corporate Event",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Social Media Content Series",
    category: "Digital Content",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Brand Testimonial Film",
    category: "Brand Film",
    image:
      "https://images.unsplash.com/photo-1628797285815-453c1d0d21e3?auto=format&fit=crop&w=1400&q=80",
  },
];

export const aboutSection = {
  eyebrow: "About Kingkiddph Ltd",
  title: "Kingkiddph Production",
  paragraphs: [
    "Kingkiddph Production is a Kenya-based film and content production company creating purposeful visual storytelling for brands that want to connect, inspire and leave a lasting impact.",
    "We partner with corporates, SMEs and growing brands to produce documentaries, brand films, marketing campaigns, corporate event coverage and digital content that feels authentic, cinematic and human. At our core, we believe great storytelling goes beyond visuals — it moves people, shapes perception and drives growth.",
  ],
  cta: "Explore Our Approach",
  image:
    "https://images.pexels.com/photos/6805421/pexels-photo-6805421.jpeg",
  signature: "Kingkiddph Ltd",
};

export const testimonial = {
  quote:
    "Kingkiddph captured our brand story in a way that truly resonated with our audience. Their cinematic approach and authentic storytelling helped us connect on a deeper level.",
  author: "Sarah Kimani",
  image:
    "https://images.unsplash.com/photo-1773867567776-f727d0a6c1d4?auto=format&fit=crop&w=1800&q=80",
};

export const processSteps = [
  {
    number: "01",
    title: "Strategy & Discovery",
    description:
      "We start by understanding your brand, audience and objectives. This step is all about listening so we can craft a story that feels authentic and strategically aligned with your goals.",
  },
  {
    number: "02",
    title: "Creative Development",
    description:
      "With a clear vision, we develop the creative concept, scriptwriting, storyboarding and production plan. Every detail is mapped out to ensure your story comes to life cinematically.",
  },
  {
    number: "03",
    title: "Production & Delivery",
    description:
      "From filming to post-production, we handle everything with precision and creativity. The result is high-quality content that resonates long after the screen fades to black.",
  },
];

export const featuredIn = [
  "Business Daily",
  "The Nairobian",
  "Creative Kenya",
  "East African Film",
  "Brand Africa",
  "Marketing Edge",
];

export const inquireSection = {
  eyebrow: "Let's work together",
  intro:
    "Interested in collaborating? Be sure you've reviewed our services, and then fill out the form below. We'll be in touch soon!",
  successMessage: "Thanks for your message! We'll be in touch soon.",
  fields: [
    { name: "name", label: "Name*", type: "text", required: true },
    { name: "email", label: "Email*", type: "email", required: true },
    { name: "company", label: "Company/Organization*", type: "text", required: true },
    {
      name: "projectType",
      label: "Type of Project*",
      type: "select",
      required: true,
      options: [
        "Brand Film",
        "Documentary",
        "Marketing Campaign",
        "Corporate Event Coverage",
        "Digital Content",
        "Other",
      ],
    },
    { name: "startDate", label: "Ideal Start Date*", type: "text", required: true },
    {
      name: "scope",
      label: "Describe your project*",
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
  brand: "Kingkiddph Ltd",
  tagline:
    "Kenya-based film and content production company creating purposeful visual storytelling for brands that want to connect, inspire and leave a lasting impact.",
  leftLinks: [],
  rightLinks: [],
  credit: "© 2026 Kingkiddph Ltd | Website designed by Jonathan M",
  photoCredit: "",
};
