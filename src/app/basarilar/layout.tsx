import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gurur Tablomuz ve Öğrenci Başarıları',
  description: 'Bireysel Kurs Merkezi öğrencilerinin YKS ve LGS sınavlarındaki Türkiye geneli dereceleri ve yerleştikleri seçkin üniversiteler/liseler.',
  alternates: {
    canonical: 'https://bireyselkurs.com/basarilar',
  },
};

export default function BasarilarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
