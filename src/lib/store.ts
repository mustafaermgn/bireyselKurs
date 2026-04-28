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
  duyurular: [] as { id: number | string; title: string; date: string; content: string }[],
  kampanyalar: [] as { id: number | string; name: string; discount: string; date: string; active: boolean }[],
  medya: [] as { id: number | string; name: string; url: string; description: string; extraImages: {url: string; description: string}[] }[],
  blog: [] as { id: number | string; title: string; author: string; date: string; content: string; photo?: string | null }[],
  leads: [] as { id: number | string; name: string; phone: string; interest: string; status: string; date: string }[],
  kadro: [] as { id: number | string; name: string; branch: string; avatar: string; photo?: string | null }[],
  basarilar: [] as { id: number | string; name: string; exam: string; result: string; photo?: string | null; year: string }[],
  ayarlar: {
    // GENEL & İLETİŞİM
    logo: '/logo.svg',
    adres: 'Cudi, 61. Cd. No:40, 73400 Silopi/Şırnak',
    telefon: '0555 054 1230',
    eposta: 'info@bireyselkurs.com',
    googleMapsUrl: 'https://maps.google.com/maps?q=Cudi,+61.+Cd.+No:40,+73400+Silopi/Şırnak&t=&z=15&ie=UTF8&iwloc=&output=embed',

    // ANASAYFA
    heroImages: [] as string[],
    heroArkaplanlar: [] as string[],
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
    ],

    // HAKKIMIZDA
    hakkimizdaUstBaslik: 'BİZ KİMİZ?',
    hakkimizdaAnaBaslik: 'Geleceğe Değer Katan\nBir Eğitim Yuvası',
    hakkimizdaP1: 'Şırnak Silopi\'de yılların verdiği tecrübe ile eğitim sektöründe öncü olan Bireysel Kurs Merkezi, öğrencilerini sadece sınavlara değil, hayata hazırlayan bir kuruluştur.',
    hakkimizdaP2: 'Alanında uzman, yenilikçi ve dinamik öğretmen kadromuzla, her öğrencinin bireysel farklılıklarını göz önünde bulundurarak onlara özel çalışma programları hazırlıyoruz. Çeyrek asırlık tecrübemizle, binlerce öğrencimizi hayallerindeki üniversite ve liselere ulaştırmanın gururunu yaşıyoruz.',
    vizyonBaslik: 'Vizyonumuz',
    vizyonAciklama: 'Bölgenin en prestijli ve en başarılı eğitim kurumu olmak, modern eğitim yaklaşımlarını kullanarak öğrencilerimizi Türkiye\'nin en iyi üniversitelerine ve liselerine yerleştirmek.',
    misyonBaslik: 'Misyonumuz',
    misyonAciklama: 'Atatürk ilke ve inkılaplarına bağlı, çağdaş, analitik düşünebilen, özgüveni yüksek, ahlaki değerlere sahip ve geleceği şekillendirecek başarılı bireyler yetiştirmek.',

    // KURSLAR (EĞİTİM PROGRAMLARI)
    lgsBaslik: 'LGS Hazırlık',
    lgsAciklama: '8. Sınıf öğrencilerine özel, yeni nesil sorularla tam uyumlu LGS hazırlık programı.',
    yksBaslik: 'YKS (TYT-AYT) Hazırlık',
    yksAciklama: '12. Sınıf ve mezun öğrencilere yönelik, Türkiye\'nin en iyi üniversitelerini hedefleyen yoğun ve disiplinli sınav hazırlık programı.',
    dilOkuluBaslik: 'Yabancı Dil Eğitimleri',
    dilOkuluAciklama: 'YDT, YDS ve YÖKDİL sınavlarına hazırlıkta, reading ve vocabulary ağırlıklı özel stratejik eğitimler.',
    araSinifBaslik: 'Ara Sınıf Takviye',
    araSinifAciklama: '9, 10 ve 11. sınıflar için okul derslerine destek ve üniversite sınavına erken hazırlık programı.'
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
      return data;
    }
  } catch (error) {
    console.error(`❌ Error fetching ${key} from Firebase:`, error);
    return key === 'ayarlar' ? defaultData[key] : [];
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
    localStorage.setItem('bkm_v2_' + key as string, JSON.stringify(newData));
    await saveToFirebase(key, newData);
    window.dispatchEvent(new Event('store-updated-' + key as string));
  };

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('bkm_v2_' + key as string);
      if (saved) setData(JSON.parse(saved));
    };
    window.addEventListener('store-updated-' + key as string, handleUpdate);
    return () => window.removeEventListener('store-updated-' + key as string, handleUpdate);
  }, [key]);

  return { data, updateData, isLoaded };
}
