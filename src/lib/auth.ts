import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import app from './firebase';

export const auth = getAuth(app);

/**
 * Admin hesabı oluştur
 */
export async function registerAdmin(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('✅ Admin hesabı oluşturuldu:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('❌ Hesap oluşturma hatası:', error);
    throw error;
  }
}

/**
 * Admin giriş yap
 */
export async function loginAdmin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ Admin giriş yaptı:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('❌ Giriş hatası:', error);
    throw error;
  }
}

/**
 * Admin çıkış yap
 */
export async function logoutAdmin() {
  try {
    await signOut(auth);
    console.log('✅ Admin çıkış yaptı');
  } catch (error) {
    console.error('❌ Çıkış hatası:', error);
    throw error;
  }
}

/**
 * Mevcut kullanıcıyı izle
 */
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Mevcut kullanıcıyı al
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Firebase hata mesajını okunabilir türkçeye çevir
 */
export function getErrorMessage(error: any): string {
  const code = error?.code || '';
  
  const errorMessages: Record<string, string> = {
    'auth/invalid-email': 'Geçersiz email adresi',
    'auth/user-disabled': 'Bu kullanıcı devre dışı bırakılmıştır',
    'auth/user-not-found': 'Kullanıcı bulunamadı',
    'auth/wrong-password': 'Yanlış şifre',
    'auth/email-already-in-use': 'Bu email zaten kullanılıyor',
    'auth/weak-password': 'Şifre çok zayıf (en az 6 karakter)',
    'auth/operation-not-allowed': 'Bu işlem izin verilmiyor',
  };
  
  return errorMessages[code] || 'Bilinmeyen hata: ' + code;
}
