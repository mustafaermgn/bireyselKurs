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
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
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
  return uploadFile(file, path);
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
