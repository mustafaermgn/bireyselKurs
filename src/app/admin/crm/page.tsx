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
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#0f172a' }}>Başvuru Yönetimi (CRM)</h1>
      <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '1rem' }}>Tarih</th>
              <th style={{ padding: '1rem' }}>Ad Soyad</th>
              <th style={{ padding: '1rem' }}>Telefon</th>
              <th style={{ padding: '1rem' }}>Program</th>
              <th style={{ padding: '1rem' }}>Durum</th>
              <th style={{ padding: '1rem' }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (<tr><td colSpan={6} style={{ padding: '15px', textAlign: 'center' }}>Henüz başvuru yok.</td></tr>)}
            {leads.map((lead: any) => {
              const statusStyle = getStatusColor(lead.status);
              return (
                <tr key={lead.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem', color: '#64748b' }}>{lead.date}</td>
                  <td style={{ padding: '1rem', fontWeight: '500', color: '#0f172a' }}>{lead.name}</td>
                  <td style={{ padding: '1rem', color: '#475569' }}>{lead.phone}</td>
                  <td style={{ padding: '1rem', color: '#475569' }}>{lead.interest}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '600', backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '10px' }}>
                    <select value={lead.status} onChange={(e) => updateStatus(lead.id, e.target.value)} style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}>
                      <option value="Bekliyor">Bekliyor</option>
                      <option value="Arandı">Arandı</option>
                      <option value="Kayıt Oldu">Kayıt Oldu</option>
                    </select>
                    <button onClick={() => deleteLead(lead.id)} style={{ padding: '0.4rem 0.8rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Sil</button>
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