import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eğitim Kadromuz',
  description: 'Silopi Bireysel Kurs Merkezi deneyimli ve uzman öğretmen kadrosu. Öğrencilerimizi hedeflerine taşıyan başarılı ekibimizle tanışın.',
  alternates: {
    canonical: 'https://bireyselkurs.com/kadro',
  },
};

export default function KadroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
