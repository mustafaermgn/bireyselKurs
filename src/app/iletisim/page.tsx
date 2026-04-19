"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function Iletisim() {
  const { data: leads, updateData } = useAppStore('leads');
  const [formData, setFormData] = useState({
    name: '', phone: '', interest: 'YKS', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      interest: formData.interest,
      status: 'Bekliyor',
      date: new Date().toISOString().split('T')[0]
    };
    updateData([newLead, ...leads]);
    setSubmitted(true);
    setFormData({ name: '', phone: '', interest: 'YKS', message: '' });
  };

  return (
    <div className="main-container">
      <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ margin: 0 }}>İletişim & Başvuru</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>Anasayfa / İletişim</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2" style={{ gap: '50px' }}>
            <div>
              <div className="card" style={{ padding: '40px', marginBottom: '30px', borderTop: '4px solid var(--primary-color)' }}>
                <h3 style={{ marginBottom: '20px' }}>Bize Ulaşın</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <li style={{ display: 'flex', gap: '15px' }}><div style={{ width: '50px', height: '50px', background: 'var(--bg-alt)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', fontSize: '20px' }}>📍</div><div><h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>Adres</h4><p style={{ margin: 0 }}>Cudi, 61. Cd. No:40, 73400 Silopi/Şırnak</p></div></li>
                  <li style={{ display: 'flex', gap: '15px' }}><div style={{ width: '50px', height: '50px', background: 'var(--bg-alt)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-teal)', fontSize: '20px' }}>📞</div><div><h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>Telefon</h4><p style={{ margin: 0 }}>0555 054 1230</p></div></li>
                </ul>
                <div style={{ marginTop: '30px', borderRadius: '8px', overflow: 'hidden' }}>
                  <iframe 
                    src="https://maps.google.com/maps?q=Cudi,+61.+Cd.+No:40,+73400+Silopi/Şırnak&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="250" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '40px', borderTop: '4px solid var(--accent-teal)' }}>
              <span className="section-subtitle">ÖN KAYIT</span>
              <h3 style={{ marginBottom: '20px' }}>Hızlı Başvuru Formu</h3>
              {submitted ? (
                <div style={{ backgroundColor: '#dcfce3', color: '#166534', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
                  <h4 style={{ marginBottom: '10px' }}>Teşekkürler!</h4>
                  <p>Başvurunuz başarıyla alındı ve yönetim paneline iletildi.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ marginTop: '20px' }}>Yeni Başvuru</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <input type="text" required placeholder="Adınız Soyadınız" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--background-alt)', fontSize: '16px' }} />
                  <input type="tel" required placeholder="Telefon Numaranız" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--background-alt)', fontSize: '16px' }} />
                  <select value={formData.interest} onChange={(e) => setFormData({...formData, interest: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--background-alt)', fontSize: '16px' }}>
                    <option value="YKS">YKS (TYT-AYT) Hazırlık</option>
                    <option value="LGS">LGS Hazırlık</option>
                    <option value="YDS">YDS / YÖKDİL Hazırlık</option>
                    <option value="Ara Sinif">Ara Sınıf</option>
                  </select>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Gönder</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}