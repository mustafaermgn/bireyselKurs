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

    // Dosya tipi kontrol
    if (!file.type.startsWith('image/')) {
      setError('Lütfen bir resim dosyası seçiniz');
      return;
    }

    // Dosya boyutu kontrol (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Dosya boyutu 5MB\'dan küçük olmalıdır');
      return;
    }

    try {
      setUploading(true);
      setError('');

      // Ön izleme göster
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Firebase Storage'e yükle
      const url = await uploadImage(file, folder);
      onImageUpload(url);
      setError('');
    } catch (err) {
      setError('Yükleme başarısız: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
      setPreview(null);
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
