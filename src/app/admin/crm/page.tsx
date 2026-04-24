"use client";
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function CRM() {
  const { data: leads, updateData } = useAppStore('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Hepsi');

  const updateStatus = (id: number, newStatus: string) => {
    updateData(leads.map((lead: any) => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  const deleteLead = (id: number) => {
    if (window.confirm('Bu başvuruyu silmek istediğinize emin misiniz?')) {
      updateData(leads.filter((lead: any) => lead.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Bekliyor': return { bg: '#fff7ed', text: '#c2410c', border: '#ffedd5' };
      case 'Arandı': return { bg: '#eff6ff', text: '#1d4ed8', border: '#dbeafe' };
      case 'Kayıt Oldu': return { bg: '#f0fdf4', text: '#15803d', border: '#dcfce3' };
      default: return { bg: '#f8fafc', text: '#475569', border: '#f1f5f9' };
    }
  };

  // Stats calculation
  const totalLeads = leads.length;
  const pendingLeads = leads.filter((l: any) => l.status === 'Bekliyor').length;
  const calledLeads = leads.filter((l: any) => l.status === 'Arandı').length;
  const registeredLeads = leads.filter((l: any) => l.status === 'Kayıt Oldu').length;

  // Filtering logic
  const filteredLeads = leads.filter((lead: any) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lead.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'Hepsi' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: 0, color: '#0f172a', fontWeight: '800', letterSpacing: '-0.5px' }}>Başvuru Yönetimi</h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>Gelen başvuruları takip edin ve yönetin.</p>
        </div>
        <button 
          onClick={() => {
            const csv = 'Tarih,Ad Soyad,Telefon,Program,Durum\n' + leads.map((l: any) => `${l.date},${l.name},${l.phone},${l.interest},${l.status}`).join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', `basvurular_${new Date().toISOString().split('T')[0]}.csv`);
            link.click();
          }}
          style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Excel'e Aktar
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Toplam Başvuru', value: totalLeads, color: '#0f172a' },
          { label: 'Bekleyenler', value: pendingLeads, color: '#c2410c' },
          { label: 'Arananlar', value: calledLeads, color: '#1d4ed8' },
          { label: 'Kayıt Olanlar', value: registeredLeads, color: '#15803d' },
        ].map((stat, idx) => (
          <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', fontWeight: '600' }}>{stat.label}</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '1.75rem', fontWeight: '800', color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="İsim veya telefon ile ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }}
          />
          <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
        </div>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', outline: 'none', fontSize: '0.95rem', fontWeight: '600', color: '#475569' }}
        >
          <option value="Hepsi">Tüm Durumlar</option>
          <option value="Bekliyor">Bekliyor</option>
          <option value="Arandı">Arandı</option>
          <option value="Kayıt Oldu">Kayıt Oldu</option>
        </select>
      </div>

      {/* Table Container */}
      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tarih</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ad Soyad</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Telefon</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Program</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Durum</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '60px', textAlign: 'center' }}>
                    <div style={{ color: '#94a3b8' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '10px' }}><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                      <p style={{ margin: 0 }}>Başvuru bulunamadı.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead: any) => {
                  const statusStyle = getStatusColor(lead.status);
                  return (
                    <tr key={lead.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="admin-tr">
                      <td style={{ padding: '1rem 1.5rem', color: '#64748b', fontSize: '0.85rem' }}>{lead.date}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ fontWeight: '700', color: '#1e293b' }}>{lead.name}</div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: '500' }}>{lead.phone}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ color: '#0369a1', background: '#f0f9ff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>
                          {lead.interest}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ 
                          padding: '0.4rem 0.8rem', 
                          borderRadius: '8px', 
                          fontSize: '0.75rem', 
                          fontWeight: '800', 
                          backgroundColor: statusStyle.bg, 
                          color: statusStyle.text,
                          border: `1px solid ${statusStyle.border}`,
                          whiteSpace: 'nowrap' 
                        }}>
                          {lead.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <select 
                            value={lead.status} 
                            onChange={(e) => updateStatus(lead.id, e.target.value)} 
                            style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.85rem', fontWeight: '600' }}
                          >
                            <option value="Bekliyor">Beklet</option>
                            <option value="Arandı">Arandı</option>
                            <option value="Kayıt Oldu">Kayıt Yap</option>
                          </select>
                          <button 
                            onClick={() => deleteLead(lead.id)} 
                            style={{ padding: '6px 10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#fecaca'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#fee2e2'}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}