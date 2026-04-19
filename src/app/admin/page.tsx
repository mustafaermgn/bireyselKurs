"use client";
import { useAppStore } from '@/lib/store';

export default function Dashboard() {
  const { data: leads } = useAppStore('leads');
  const { data: kampanyalar } = useAppStore('kampanyalar');
  const { data: duyurular } = useAppStore('duyurular');

  const pendingLeads = leads.filter(l => l.status === 'Bekliyor').length;
  const activeCampaigns = kampanyalar.filter(k => k.active).length;

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#0f172a' }}>Dashboard Özeti</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Toplam Başvuru</h3>
          <p style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 'bold', margin: '10px 0 0 0' }}>{leads.length}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Bekleyen Başvurular</h3>
          <p style={{ fontSize: '2rem', color: '#f59e0b', fontWeight: 'bold', margin: '10px 0 0 0' }}>{pendingLeads}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Aktif Kampanyalar</h3>
          <p style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold', margin: '10px 0 0 0' }}>{activeCampaigns}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Toplam Duyuru</h3>
          <p style={{ fontSize: '2rem', color: '#3b82f6', fontWeight: 'bold', margin: '10px 0 0 0' }}>{duyurular.length}</p>
        </div>
      </div>
    </div>
  );
}