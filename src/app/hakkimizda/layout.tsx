import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Bireysel Kurs Merkezi olarak çeyrek asırlık tecrübemizle Şırnak Silopi\'de eğitim sektörünün öncü kuruluşuyuz. Misyonumuz ve vizyonumuz hakkında bilgi alın.',
  alternates: {
    canonical: 'https://bireyselkurs.com/hakkimizda',
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
