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
      await loginAdmin(email, password);
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
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
          <div style={{ color: '#64748b', fontWeight: '500' }}>Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f16101 0%, #ff8c42 100%)', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo ve Başlık */}
        <div style={{ textAlign: 'center', marginBottom: '40px', color: 'white' }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎓</div>
          <h1 style={{ fontSize: '1.8rem', margin: 0, marginBottom: '5px', fontWeight: '700' }}>SİLOPİ KURS</h1>
          <p style={{ fontSize: '0.95rem', margin: 0, opacity: 0.9 }}>Admin Kontrol Paneli</p>
        </div>

        {/* Giriş Formu */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <h2 style={{ textAlign: 'center', color: '#0f172a', marginTop: 0, marginBottom: '8px', fontSize: '1.5rem' }}>Admin Giriş</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginTop: 0, marginBottom: '30px', fontSize: '0.95rem' }}>Panele erişmek için giriş yapın</p>

          {error && (
            <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', padding: '14px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0f172a', fontSize: '0.95rem' }}>
                📧 Email Adresi
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bireyselkurs.com"
                disabled={loading}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontSize: '0.95rem',
                  color: '#0f172a',
                  transition: 'border-color 0.3s',
                  opacity: loading ? 0.6 : 1,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#f16101')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
              />
            </div>

            {/* Password Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0f172a', fontSize: '0.95rem' }}>
                🔐 Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontSize: '0.95rem',
                  color: '#0f172a',
                  transition: 'border-color 0.3s',
                  opacity: loading ? 0.6 : 1,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#f16101')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{
                padding: '12px 16px',
                background: loading || !email || !password ? '#cbd5e1' : '#f16101',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                marginTop: '8px',
                boxShadow: loading || !email || !password ? 'none' : '0 4px 12px rgba(241, 97, 1, 0.3)',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                  Giriş yapılıyor...
                </span>
              ) : (
                '🔓 Giriş Yap'
              )}
            </button>
          </form>


        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', marginTop: '24px', margin: '24px 0 0 0' }}>
          © 2025 SİLOPİ BİREYSEL KURS. Tüm hakları saklıdır.
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: #cbd5e1;
        }
        code {
          font-family: 'Courier New', monospace;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}