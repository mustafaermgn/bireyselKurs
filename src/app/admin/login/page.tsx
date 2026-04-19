"use client";

export default function Login() {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#0f172a' }}>Admin Girişi</h1>
            <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/admin'; }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569' }}>Kullanıcı Adı</label>
                <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', outline: 'none' }} required />
              </div>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#475569' }}>Şifre</label>
                <input type="password" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', outline: 'none' }} required />
              </div>
              <button type="submit" style={{ width: '100%', padding: '12px', background: '#f16101', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Giriş Yap</button>
            </form>
          </div>
        </div>
      );
    }