import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yabancı Dil Eğitimleri ve YDS Hazırlık',
  description: 'Silopi Bireysel Kurs Merkezi Yabancı Dil Okulu. YDT, YDS ve YÖKDİL hazırlık, Genel İngilizce eğitimleriyle dünya dillerini bizimle öğrenin.',
  alternates: {
    canonical: 'https://bireyselkurs.com/dil-okulu',
  },
};

export default function DilOkuluLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
