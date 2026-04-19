'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin, getErrorMessage, getCurrentUser } from '@/lib/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Eğer zaten giriş yapmışsa dashboard'a yönlendir
    const user = getCurrentUser();
    if (user) {
      router.push('/admin/medya');
    }
    setCheckingAuth(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🔐 Admin giriş deneniyor:', email);
      await loginAdmin(email, password);
      console.log('✅ Giriş başarılı');
      router.push('/admin/medya');
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
      console.error('❌ Giriş hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f16101 0%, #ff8c42 100%)' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', color: '#0f172a', marginTop: 0, marginBottom: '10px' }}>Admin Paneli</h1>
        <p style={{ textAlign: 'center', color: '#64748b', marginTop: 0, marginBottom: '30px' }}>Giriş yapın</p>

        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0f172a' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              disabled={loading}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '1rem',
                opacity: loading ? 0.6 : 1,
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0f172a' }}>
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              disabled={loading}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                boxSizing: 'border-box',
                fontSize: '1rem',
                opacity: loading ? 0.6 : 1,
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#cbd5e1' : '#f16101',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem', marginTop: '20px' }}>
          ⚠️ Sadece yetkili admin kullanıcıları giriş yapabilir
        </p>
      </div>
    </div>
  );
}