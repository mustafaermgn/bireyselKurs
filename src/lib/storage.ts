import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Firebase Storage'e dosya yükle
 * @param file Yüklenecek dosya
 * @param path Storage'da dosyanın kaydedileceği yol
 * @returns Dosyanın download URL'si
 */
export async function uploadFile(file: File, path: string): Promise<string> {
  try {
    console.log('🔄 uploadFile çağrıldı:', path);
    const storageRef = ref(storage, path);
    console.log('📌 Storage ref oluşturuldu');
    await uploadBytes(storageRef, file);
    console.log('💾 Dosya baytlar yüklendi');
    const downloadURL = await getDownloadURL(storageRef);
    console.log('🔗 Download URL alındı:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('❌ uploadFile hatası:', error);
    if (error instanceof Error) {
      console.error('Hata mesajı:', error.message);
      console.error('Hata kodu:', (error as any).code);
    }
    throw error;
  }
}

/**
 * Firebase Storage'den dosya sil
 * @param path Storage'da dosyanın yolu
 */
export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Dosya silme hatası:', error);
    throw error;
  }
}

/**
 * URL'den dosya yolunu çıkar (silme işlemi için)
 * @param url Firebase Storage download URL'si
 * @returns Dosya yolu
 */
export function getPathFromUrl(url: string): string {
  try {
    // Firebase URL formatı: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{path}?alt=media&token={token}
    const match = url.match(/\/o\/(.+?)\?/);
    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }
  } catch (error) {
    console.error('URL parse hatası:', error);
  }
  return '';
}

/**
 * Resim dosyası yükle (blog, medya, başarılar vb.)
 * @param file Yüklenecek görsel dosyası
 * @param folder Klasör adı (blog, medya, basarilar, vb.)
 * @returns Görsel URL'si
 */
export async function uploadImage(file: File, folder: string = 'images'): Promise<string> {
  const timestamp = Date.now();
  const fileName = `${timestamp}-${file.name}`;
  const path = `${folder}/${fileName}`;
  console.log('📤 Dosya yükleniyor:', { folder, path, fileName, fileSize: file.size, fileType: file.type });
  try {
    const url = await uploadFile(file, path);
    console.log('✅ Dosya başarıyla yüklendi:', url);
    return url;
  } catch (error) {
    console.error('❌ Yükleme hatası:', error);
    throw error;
  }
}

/**
 * Dosya gönderirken kullanıcı feedback'i için upload ilerleme bilgisi
 */
export async function uploadFileWithProgress(
  file: File,
  path: string,
  onProgress: (progress: number) => void
): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    // Basit yükleme - Firebase SDK ilerlemeleri otomatik olmaz ama bunu simüle edebiliriz
    onProgress(50);
    await uploadBytes(storageRef, file);
    onProgress(90);
    const downloadURL = await getDownloadURL(storageRef);
    onProgress(100);
    return downloadURL;
  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
    throw error;
  }
}
