import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim ve Başvuru',
  description: 'Bireysel Kurs Merkezi iletişim bilgileri. Silopi\'deki eğitim kurumumuza ulaşın, adres ve telefon bilgilerimizi görüntüleyin veya online başvuru yapın.',
  alternates: {
    canonical: 'https://bireyselkurs.com/iletisim',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
