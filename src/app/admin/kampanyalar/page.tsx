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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: 0 }}>Kampanya ve İndirimler</h1>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#f16101', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>+ Yeni Kampanya</button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #cbd5e1', background: '#f8fafc' }}>
              <th style={{ padding: '15px' }}>Kampanya Adı</th>
              <th style={{ padding: '15px' }}>İndirim Oranı</th>
              <th style={{ padding: '15px' }}>Son Geçerlilik</th>
              <th style={{ padding: '15px' }}>Durum</th>
              <th style={{ padding: '15px' }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {kampanyalar.length === 0 && (<tr><td colSpan={5} style={{ padding: '15px', textAlign: 'center' }}>Kampanya bulunamadı.</td></tr>)}
            {kampanyalar.map((k: any) => (
              <tr key={k.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px', fontWeight: '500' }}>{k.name}</td>
                <td style={{ padding: '15px' }}>{k.discount}</td>
                <td style={{ padding: '15px' }}>{k.date}</td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => toggleStatus(k.id)} style={{ border: 'none', background: k.active ? '#dcfce3' : '#fee2e2', color: k.active ? '#166534' : '#dc2626', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
                    {k.active ? 'Aktif' : 'Pasif'}
                  </button>
                </td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => deleteKampanya(k.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>Sil</button>
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