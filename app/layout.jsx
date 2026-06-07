import "@/index.css";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: "Kingkiddph Ltd - Stories That Connect | Coming Soon",
  description:
    "Coming Soon: Kingkiddph Production is a Kenya-based film and content production company creating purposeful visual storytelling for brands that want to connect, inspire and leave a lasting impact.",
  openGraph: {
    title: "Kingkiddph Ltd - Stories That Connect | Coming Soon",
    description:
      "Coming Soon: Kenya-based film and content production company creating purposeful visual storytelling. We produce documentaries, brand films, marketing campaigns, and digital content that feels authentic, cinematic and human.",
    url: "https://kingkiddph.com",
    siteName: "Kingkiddph Ltd",
    type: "website",
    images: [
      {
        url: "/images/kingkidd-webp/KingKiddPH-173.jpg",
        width: 1200,
        height: 630,
        alt: "Kingkiddph Production crew on set",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kingkiddph Ltd - Stories That Connect | Coming Soon",
    description:
      "Coming Soon: Kenya-based film and content production company creating purposeful visual storytelling for brands that connect, inspire and leave a lasting impact.",
    images: ["/images/kingkidd-webp/KingKiddPH-173.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/images/favicon.png",
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
