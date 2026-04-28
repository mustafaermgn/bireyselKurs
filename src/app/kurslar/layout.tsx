import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eğitim Programları ve Kurslar',
  description: 'Silopi Bireysel Kurs Merkezi eğitim programları: YKS (TYT-AYT) Hazırlık, LGS Hazırlık, Ara Sınıf Takviye Kursları ve Yabancı Dil Eğitimleri.',
  alternates: {
    canonical: 'https://bireyselkurs.com/kurslar',
  },
};

export default function KurslarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
