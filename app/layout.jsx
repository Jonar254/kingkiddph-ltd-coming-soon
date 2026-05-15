import "@/index.css";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: "Your material partner, from concept to completion.",
  description:
    "From factory floors in China to finished rooms in Nairobi, Form & Finish is your material and fit-out partner, from concept to completion.",
  openGraph: {
    title: "Your material partner, from concept to completion.",
    description:
      "From factory floors in China to finished rooms in Nairobi, Form & Finish is your material and fit-out partner, from concept to completion.",
    url: "https://formandfinish.com",
    siteName: "Form & Finish",
    type: "website",
    images: [
      {
        url: "/images/Lounge.jpeg",
        width: 1200,
        height: 630,
        alt: "Form & Finish material sourcing and fit-out",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your material partner, from concept to completion.",
    description:
      "From factory floors in China to finished rooms in Nairobi, Form & Finish is your material and fit-out partner, from concept to completion.",
    images: ["/images/Lounge.jpeg"],
  },
  icons: {
    icon: "/images/logo-one.png",
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
