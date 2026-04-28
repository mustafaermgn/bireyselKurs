import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ApplicationModal from "@/components/ApplicationModal";
import CallToAction from "@/components/CallToAction";
import WhatsAppButton from "@/components/WhatsAppButton";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bireyselkurs.com'),
  title: {
    default: "Bireysel Kurs Merkezi | Silopi YKS ve LGS Hazırlık",
    template: "%s | Bireysel Kurs Merkezi"
  },
  description: "Şırnak Silopi'de YKS, LGS ve YDS hazırlık odaklı, kurumsal kimliği ile güven veren yüksek başarı oranına sahip eğitim merkezi.",
  keywords: ["Silopi YKS kursu", "Silopi LGS hazırlık", "Silopi YDS", "Bireysel Kurs Merkezi", "Şırnak eğitim", "Silopi dershane", "TYT AYT hazırlık"],
  authors: [{ name: "Bireysel Kurs Merkezi" }],
  creator: "Bireysel Kurs Merkezi",
  publisher: "Bireysel Kurs Merkezi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://bireyselkurs.com",
    title: "Bireysel Kurs Merkezi | Geleceğinizi Şansa Bırakmayın",
    description: "Şırnak Silopi'de 25 yıllık eğitim tecrübesiyle YKS, LGS ve Yabancı Dil eğitiminde bölgenin lider eğitim kurumu.",
    siteName: "Bireysel Kurs Merkezi",
    images: [
      {
        url: "/og-image.jpg", // Add a fallback image in public folder later if needed
        width: 1200,
        height: 630,
        alt: "Bireysel Kurs Merkezi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bireysel Kurs Merkezi | Silopi",
    description: "Silopi'de YKS ve LGS hazırlık odaklı, kurumsal eğitim merkezi.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://bireyselkurs.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={poppins.className}>
        <Navbar />
        <main style={{ minHeight: '100vh', paddingTop: '90px' }}>
          {children}
        </main>
        <CallToAction />
        
        <ApplicationModal />
        <WhatsAppButton />
      </body>
    </html>
  );
}
