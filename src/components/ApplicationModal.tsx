"use client";
import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export default function ApplicationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: leads, updateData } = useAppStore('leads');
  const [formData, setFormData] = useState({
    name: '', phone: '', interest: 'YKS', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setSubmitted(false);
    };
    window.addEventListener('open-application-modal', handleOpen);
    return () => window.removeEventListener('open-application-modal', handleOpen);
  }, []);

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

  const close = () => {
    setIsOpen(false);
    setSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div className="card" style={{
        background: 'white', padding: '40px', borderRadius: '12px',
        width: '100%', maxWidth: '500px', position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={close} 
          style={{
            position: 'absolute', top: '15px', right: '15px',
            background: '#fee2e2', color: '#dc2626', border: 'none',
            borderRadius: '50%', width: '32px', height: '32px',
            cursor: 'pointer', fontSize: '18px', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}
        >
          ×
        </button>

        <span className="section-subtitle">ÖN KAYIT</span>
        <h3 style={{ marginBottom: '20px', color: '#0f172a' }}>Hızlı Başvuru Formu</h3>
        
        {submitted ? (
          <div style={{ backgroundColor: '#dcfce3', color: '#166534', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '10px' }}>Teşekkürler!</h4>
            <p>Başvurunuz başarıyla alındı ve yönetim paneline iletildi.</p>
            <button onClick={close} className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }}>Kapat</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="text" required placeholder="Adınız Soyadınız" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '16px' }} />
            <input type="tel" required placeholder="Telefon Numaranız" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '16px' }} />
            <select value={formData.interest} onChange={(e) => setFormData({...formData, interest: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '16px' }}>
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
  );
}
