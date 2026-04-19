"use client";

import { useState } from 'react';
import { uploadImage, deleteFile, getPathFromUrl } from '@/lib/storage';

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  onImageDelete?: (url: string) => void;
  folder?: string;
  label?: string;
  currentImage?: string | null;
}

export default function ImageUploader({
  onImageUpload,
  onImageDelete,
  folder = 'images',
  label = 'Görsel Yükle',
  currentImage,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('📁 Dosya seçildi:', { name: file.name, size: file.size, type: file.type });

    // Dosya tipi kontrol
    if (!file.type.startsWith('image/')) {
      const errorMsg = 'Lütfen bir resim dosyası seçiniz';
      setError(errorMsg);
      console.error('❌ ' + errorMsg, file.type);
      return;
    }

    // Dosya boyutu kontrol (5MB)
    if (file.size > 5 * 1024 * 1024) {
      const errorMsg = 'Dosya boyutu 5MB\'dan küçük olmalıdır';
      setError(errorMsg);
      console.error('❌ ' + errorMsg, file.size);
      return;
    }

    try {
      setUploading(true);
      setError('');
      console.log('🚀 Yükleme başladı...');

      // Ön izleme göster
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
        console.log('👁️ Ön izleme gösterildi');
      };
      reader.readAsDataURL(file);

      // Firebase Storage'e yükle
      console.log('⏳ Firebase\'e yükleniyor:', folder);
      const url = await uploadImage(file, folder);
      console.log('✅ URL alındı, callback çağrılıyor:', url);
      onImageUpload(url);
      setError('');
      console.log('✨ Yükleme tamamlandı');
    } catch (err) {
      const errorMsg = 'Yükleme başarısız: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata');
      setError(errorMsg);
      setPreview(null);
      console.error('🔴 ' + errorMsg, err);
      if (err instanceof Error && 'code' in err) {
        console.error('Hata kodu:', (err as any).code);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentImage) return;

    try {
      setUploading(true);
      const path = getPathFromUrl(currentImage);
      if (path) {
        await deleteFile(path);
      }
      setPreview(null);
      onImageDelete?.(currentImage);
    } catch (err) {
      setError('Silme başarısız: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#0f172a' }}>
        {label}
      </label>

      {preview && (
        <div style={{ marginBottom: '15px' }}>
          <img
            src={preview}
            alt="Ön izleme"
            style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
          />
          {currentImage && (
            <button
              onClick={handleDelete}
              disabled={uploading}
              style={{
                marginLeft: '10px',
                padding: '8px 16px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: uploading ? 'not-allowed' : 'pointer',
                opacity: uploading ? 0.6 : 1,
              }}
            >
              {uploading ? 'Siliniyor...' : 'Sil'}
            </button>
          )}
        </div>
      )}

      <div
        style={{
          border: '2px dashed #cbd5e1',
          borderRadius: '8px',
          padding: '30px',
          textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          background: uploading ? '#f1f5f9' : 'white',
          opacity: uploading ? 0.6 : 1,
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          style={{ display: 'none' }}
          id={`image-input-${label}`}
        />
        <label
          htmlFor={`image-input-${label}`}
          style={{
            display: 'block',
            cursor: uploading ? 'not-allowed' : 'pointer',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📷</div>
          <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '5px' }}>
            {uploading ? 'Yükleniyor...' : 'Dosya seçmek için tıklayın'}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
            veya dosyayı buraya sürükleyin
          </div>
        </label>
      </div>

      {error && (
        <div style={{ marginTop: '10px', padding: '10px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}
