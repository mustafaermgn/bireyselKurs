"use client";
import { useAppStore } from '@/lib/store';

export default function CRM() {
  const { data: leads, updateData } = useAppStore('leads');

  const updateStatus = (id: number, newStatus: string) => {
    updateData(leads.map((lead: any) => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  const deleteLead = (id: number) => {
    updateData(leads.filter((lead: any) => lead.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Bekliyor': return { bg: '#fef3c7', text: '#d97706' };
      case 'Arandı': return { bg: '#e0f2fe', text: '#0284c7' };
      case 'Kayıt Oldu': return { bg: '#dcfce3', text: '#166534' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#0f172a', fontWeight: '800' }}>Başvuru Yönetimi (CRM)</h1>
      <div style={{ background: 'white', borderRadius: '12px', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Tarih</th>
              <th style={{ padding: '0.75rem 1rem' }}>Ad Soyad</th>
              <th style={{ padding: '0.75rem 1rem' }}>Telefon</th>
              <th style={{ padding: '0.75rem 1rem' }}>Program</th>
              <th style={{ padding: '0.75rem 1rem' }}>Durum</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (<tr><td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>Henüz başvuru yok.</td></tr>)}
            {leads.map((lead: any) => {
              const statusStyle = getStatusColor(lead.status);
              return (
                <tr key={lead.id} style={{ borderBottom: '1px solid #f8fafc' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.85rem' }}>{lead.date}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e293b' }}>{lead.name}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{lead.phone}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{lead.interest}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', backgroundColor: statusStyle.bg, color: statusStyle.text, whiteSpace: 'nowrap' }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <select value={lead.status} onChange={(e) => updateStatus(lead.id, e.target.value)} style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}>
                        <option value="Bekliyor">Bekle</option>
                        <option value="Arandı">Ara</option>
                        <option value="Kayıt Oldu">Kayıt</option>
                      </select>
                      <button onClick={() => deleteLead(lead.id)} style={{ padding: '0.3rem 0.6rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Sil</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}