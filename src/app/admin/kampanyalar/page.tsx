"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function Kampanyalar() {
  const { data: kampanyalar, updateData } = useAppStore('kampanyalar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [newDate, setNewDate] = useState('');

  const addKampanya = (e: React.FormEvent) => {
    e.preventDefault();
    updateData([...kampanyalar, { id: Date.now(), name: newName, discount: newDiscount, date: newDate, active: true }]);
    setIsModalOpen(false);
    setNewName(''); setNewDiscount(''); setNewDate('');
  };

  const deleteKampanya = (id: number) => {
    updateData(kampanyalar.filter((k: any) => k.id !== id));
  };

  const toggleStatus = (id: number) => {
    updateData(kampanyalar.map((k: any) => k.id === id ? { ...k, active: !k.active } : k));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0, fontWeight: '800' }}>Kampanya ve İndirimler</h1>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#f16101', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700' }}>+ Yeni Kampanya</button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflowX: 'auto', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Kampanya Adı</th>
              <th style={{ padding: '0.75rem 1rem' }}>İndirim</th>
              <th style={{ padding: '0.75rem 1rem' }}>Son Tarih</th>
              <th style={{ padding: '0.75rem 1rem' }}>Durum</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {kampanyalar.length === 0 && (<tr><td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>Kampanya bulunamadı.</td></tr>)}
            {kampanyalar.map((k: any) => (
              <tr key={k.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e293b' }}>{k.name}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{k.discount}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{k.date}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <button onClick={() => toggleStatus(k.id)} style={{ border: 'none', background: k.active ? '#dcfce3' : '#fee2e2', color: k.active ? '#166534' : '#dc2626', padding: '0.2rem 0.6rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}>
                    {k.active ? 'Aktif' : 'Pasif'}
                  </button>
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                  <button onClick={() => deleteKampanya(k.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.85rem' }}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Yeni Kampanya Ekle</h2>
            <form onSubmit={addKampanya}>
              <input type="text" placeholder="Kampanya Adı" value={newName} onChange={(e) => setNewName(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <input type="text" placeholder="İndirim Oranı (Örn: %20)" value={newDiscount} onChange={(e) => setNewDiscount(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <input type="date" placeholder="Son Geçerlilik Tarihi" value={newDate} onChange={(e) => setNewDate(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>İptal</button>
                <button type="submit" style={{ padding: '10px 20px', background: '#f16101', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}