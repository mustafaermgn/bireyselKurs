import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ApplicationModal from "@/components/ApplicationModal";
import CallToAction from "@/components/CallToAction";
import WhatsAppButton from "@/components/WhatsAppButton";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "Bireysel Kurs Merkezi | Silopi YKS ve LGS Hazırlık",
  description: "Şırnak Silopi'de YKS, LGS ve YDS hazırlık odaklı, kurumsal kimliği ile güven veren yüksek başarı oranına sahip eğitim merkezi.",
  keywords: ["Silopi YKS kursu", "Silopi LGS hazırlık", "Silopi YDS", "Bireysel Kurs Merkezi", "Şırnak eğitim"],
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
