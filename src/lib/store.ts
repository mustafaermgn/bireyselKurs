"use client";

import { useState, useEffect } from 'react';
import { db } from './firebase';
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  writeBatch,
  query,
  getDoc,
} from 'firebase/firestore';

const defaultData = {
  duyurular: [
    { id: 1 as number | string, title: 'YKS Deneme Sınavı', date: '2025-05-15', content: 'Türkiye geneli YKS deneme sınavımız 15 Mayıs\'ta yapılacaktır. Tüm öğrenciler katılmaya davetlidir.' },
    { id: 2 as number | string, title: 'LGS Hazırlık Programı Başladı', date: '2025-04-20', content: 'Bu yıl LGS\'ye hazırlanacak öğrencilerin kayıtları alınmaya başlanmıştır. Sınırlı kontenjan vardır.' },
    { id: 3 as number | string, title: 'İngilizce Konuşma Kulübü', date: '2025-04-10', content: 'Her Cuma saat 16:00\'da İngilizce konuşma kulübünün toplantısı yapılacaktır.' }
  ],
  kampanyalar: [
    { id: 1 as number | string, name: 'Erken Kayıt Fırsatı', discount: '%20', date: '2025-06-30', active: true },
    { id: 2 as number | string, name: 'Grup Kaydında %15 İndirim', discount: '%15', date: '2025-05-31', active: true },
    { id: 3 as number | string, name: 'Yaz Okulu Kampanyası', discount: '%25', date: '2025-07-31', active: false }
  ],
  medya: [
    { id: 1 as number | string, name: 'Eğitim Ortamımız', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop', description: '', extraImages: [] as string[] },
    { id: 2 as number | string, name: 'Kütüphanemiz', url: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800&auto=format&fit=crop', description: '', extraImages: [] as string[] },
    { id: 3 as number | string, name: 'Laboratuvar', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop', description: '', extraImages: [] as string[] },
    { id: 4 as number | string, name: 'Bilgisayar Laboratuvarı', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop', description: '', extraImages: [] as string[] }
  ],
  blog: [
    { id: 1 as number | string, title: 'YKS Başarı Stratejileri Semineri', author: 'Rehberlik Servisi', date: '2025-04-10', content: 'Öğrencilerimizle YKS öncesi motivasyon ve taktik seminerimizi gerçekleştirdik. Sınav kaygısını yönetmek ve etkili çalışma yöntemleri öğrendiler.', photo: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop' as string | null | undefined },
    { id: 2 as number | string, title: 'Etkili Ders Çalışma Teknikleri', author: 'Eğitim Koordinatörü', date: '2025-03-25', content: 'Pomodoro tekniği, spaced repetition ve active recall gibi bilimsel çalışma yöntemlerini tanıttık.', photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop' as string | null | undefined },
    { id: 3 as number | string, title: 'Kütüphane Kullanım Rehberi', author: 'Kütüphaneci', date: '2025-03-15', content: 'Kütüphanemizin tüm kaynaklarından en etkili şekilde yararlanmanın püf noktaları.', photo: 'https://images.unsplash.com/photo-1507842955343-583cf753a38d?q=80&w=800&auto=format&fit=crop' as string | null | undefined }
  ],
  leads: [
    { id: 1 as number | string, name: 'Ahmet Yılmaz', phone: '0555 123 4567', interest: 'YKS', status: 'Bekliyor', date: '2025-05-10' },
    { id: 2 as number | string, name: 'Fatma Demir', phone: '0532 456 7890', interest: 'LGS', status: 'Arandı', date: '2025-05-09' },
    { id: 3 as number | string, name: 'Mehmet Kaya', phone: '0544 789 0123', interest: 'İngilizce', status: 'Kayıt Yaptı', date: '2025-05-08' }
  ],
  kadro: [
    { id: 1 as number | string, name: 'Ali Yılmaz', branch: 'Matematik', avatar: '👨‍🏫', photo: null as string | null | undefined },
    { id: 2 as number | string, name: 'Ayşe Demir', branch: 'Fizik', avatar: '👩‍🏫', photo: null as string | null | undefined },
    { id: 3 as number | string, name: 'Kadir Çelik', branch: 'Kimya', avatar: '👨‍🏫', photo: null as string | null | undefined },
    { id: 4 as number | string, name: 'Zeynep Serim', branch: 'İngilizce', avatar: '👩‍🏫', photo: null as string | null | undefined }
  ],
  basarilar: [
    { id: 1 as number | string, name: 'Zeynep Kaya', exam: 'YKS 2024', result: 'Türkiye 145.si - Hacettepe Tıp', photo: null as string | null | undefined, year: '2024' },
    { id: 2 as number | string, name: 'Kerem Yılmaz', exam: 'LGS 2024', result: '0.1% Dilim - Galatasaray Lisesi', photo: null as string | null | undefined, year: '2024' },
    { id: 3 as number | string, name: 'Aylin Şen', exam: 'YKS 2024', result: 'Türkiye 892.si - Boğaziçi Bilgisayar', photo: null as string | null | undefined, year: '2024' },
    { id: 4 as number | string, name: 'Emre Aydın', exam: 'LGS 2024', result: '0.5% Dilim - Kabataş Lisesi', photo: null as string | null | undefined, year: '2024' }
  ],
  ayarlar: {
    heroImages: [] as string[],
    heroArkaplanlar: [] as string[],
    logo: '/logo.svg',
    heroUstBaslik: 'SİLOPİ BİREYSEL KURS MERKEZİ',
    heroAnaBaslik: 'Geleceğinizi Şansa Bırakmayın.',
    heroAciklama: '25 yıllık eğitim tecrübemizle Silopi\'de YKS, LGS ve Yabancı Dil eğitiminde yeni bir sayfa açıyoruz. Hedefi yüksek olanların doğru adresi.',
    kutu1Baslik: 'Deneyimli Eğitim Kadrosu',
    kutu1Aciklama: 'Yıllarını sınav sistemine adamış, öğrenci psikolojisini iyi analiz eden güçlü öğretmen kadrosu.',
    kutu2Baslik: 'Yeni Nesil Kaynaklar',
    kutu2Aciklama: 'ÖSYM formatına birebir uyumlu, en güncel ve seçkin yayınlarla desteklenen zengin döküman altyapısı.',
    kutu3Baslik: 'Birebir Rehberlik',
    kutu3Aciklama: 'Öğrencilerimizin akademik ve psikolojik süreçlerini yakından takip eden kişiye özel danışmanlık sistemi.',
    ctaBaslik: 'Erken Kayıt Dönemi Başladı',
    ctaAciklama: 'Sınırlı kontenjanlardan yararlanmak ve kursumuzu yakından tanımak için kurumumuzu ziyaret edin.',
    kurumBaslik: 'Eğitimde Yeni Nesil Yaklaşım',
    kurumAciklama: 'Bireysel Kurs Merkezi olarak, Silopi\'deki öğrencilerimize en modern ve konforlu eğitim ortamını sunmak için her detayı düşündük. Kurumumuzda 150 öğrenci kapasiteli, sessiz ve ergonomik ders çalışma imkanı sunan geniş bir kütüphanemiz bulunmaktadır. Tüm alanlarımızda yüksek hızlı fiber internet erişimi ile dijital kaynaklara kesintisiz ulaşım sağlıyoruz.\n\nEğitim teknolojilerinde öncü vizyonumuzla her sınıfta 4K çözünürlüklü projeksiyon sistemleri kullanarak dersleri daha görsel ve etkileşimli hale getiriyoruz. Akademik başarının sadece dersle sınırlı olmadığının bilinciyle, her öğrencimize kişiye özel eğitim koçluğu hizmeti veriyor, gelişimlerini haftalık periyotlarla yakından takip ediyoruz. Ayrıca ferah kafeteryamız ve 7/24 erişilebilir soru çözüm ofislerimizle, öğrencilerimizin sadece bir kurs değil, tam donanımlı bir yaşam alanı bulmalarını sağlıyoruz.',
    kurumGorsel: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    ozellikler: [
      { id: 1, title: 'Kütüphane Kapasitesi', value: '150 Öğrenci', icon: '📚' },
      { id: 2, title: 'Fiber İnternet', value: '1000 Mbps', icon: '🌐' },
      { id: 3, title: 'Birebir Koçluk', value: 'Haftalık Takip', icon: '🎯' },
      { id: 4, title: 'Teknolojik Sınıflar', value: '4K Projeksiyon', icon: '📽️' },
      { id: 5, title: 'Soru Çözüm Ofisi', value: '7/24 Erişim', icon: '✍️' },
      { id: 6, title: 'Kafeterya', value: 'Dinlenme Alanı', icon: '☕' }
    ]
  }
};

// Get collection name for a key
const getCollectionName = (key: string): string => {
  return key;
};

// Fetch data from Firestore
async function fetchFromFirebase<K extends keyof typeof defaultData>(key: K) {
  try {
    if (key === 'ayarlar') {
      // Ayarlar is stored as a single document
      const docRef = doc(db, 'ayarlar', 'config');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const fetchedData = docSnap.data();
        console.log('✅ Firebase\'ten ayarlar yüklendi:', fetchedData);
        // Yeni eklenen alanların kaybolmaması için defaultData ile birleştiriyoruz
        return { ...defaultData[key], ...fetchedData };
      } else {
        console.log('⚠️ Firebase\'de ayarlar dökümanı bulunamadı! Default veriler kullanılıyor.');
        return defaultData[key];
      }
    } else {
      // Other collections are stored as arrays
      const collectionRef = collection(db, getCollectionName(key));
      const querySnapshot = await getDocs(collectionRef);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      console.log(`📦 ${key} Firebase'ten yüklendi (${data.length} kayıt)`);
      return data.length > 0 ? data : defaultData[key];
    }
  } catch (error) {
    console.error(`❌ Error fetching ${key} from Firebase:`, error);
    return defaultData[key];
  }
}

// Save data to Firestore
async function saveToFirebase<K extends keyof typeof defaultData>(key: K, data: typeof defaultData[K]) {
  try {
    console.log(`💾 ${key} Firebase'e kaydediliyor...`);
    
    if (key === 'ayarlar') {
      // Save ayarlar as a single document
      const docRef = doc(db, 'ayarlar', 'config');
      await setDoc(docRef, data);
      console.log(`✅ ${key} başarıyla kaydedildi`);
    } else {
      // Save collections
      const batch = writeBatch(db);
      const collectionRef = collection(db, getCollectionName(key));

      // Delete all existing documents first
      const existingDocs = await getDocs(collectionRef);
      existingDocs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Add new documents
      (data as any[]).forEach((item) => {
        const docRef = doc(collectionRef, String(item.id || ''));
        batch.set(docRef, item);
      });

      await batch.commit();
      console.log(`✅ ${key} başarıyla kaydedildi (${(data as any[]).length} kayıt)`);
    }
  } catch (error) {
    console.error(`❌ ${key} kaydedilirken hata:`, error);
    if (error instanceof Error) {
      console.error('Hata mesajı:', error.message);
      console.error('Hata kodu:', (error as any).code);
      
      // Eğer auth hatası ise, kullanıcıyı uyar
      if ((error as any).code === 'permission-denied') {
        console.error('⚠️ GİRİŞ YAPMANIZ GEREKIYOR! Admin paneline girin ve giriş yapın.');
      }
    }
  }
}

export function useAppStore<K extends keyof typeof defaultData>(key: K) {
  const [data, setData] = useState<typeof defaultData[K]>(defaultData[key]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // Try Firebase first
      const firebaseData = await fetchFromFirebase(key);
      setData(firebaseData as typeof defaultData[K]);
      setIsLoaded(true);
    };

    loadData();
  }, [key]);

  const updateData = async (newData: typeof defaultData[K]) => {
    setData(newData);
    // Save to both Firebase and localStorage for offline access
    localStorage.setItem('bireyselkurs_' + key as string, JSON.stringify(newData));
    await saveToFirebase(key, newData);
    window.dispatchEvent(new Event('store-updated-' + key as string));
  };

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('bireyselkurs_' + key as string);
      if (saved) setData(JSON.parse(saved));
    };
    window.addEventListener('store-updated-' + key as string, handleUpdate);
    return () => window.removeEventListener('store-updated-' + key as string, handleUpdate);
  }, [key]);

  return { data, updateData, isLoaded };
}
