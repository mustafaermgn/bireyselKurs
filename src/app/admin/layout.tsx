"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If it's the login page, don't show the dashboard sidebar
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'block', minHeight: '100vh', background: '#f1f5f9' }}>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside style={{ 
        width: '250px', 
        background: '#1e293b', 
        color: 'white', 
        padding: '2rem 1rem', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'fixed',
        left: sidebarOpen ? 0 : '-250px',
        top: 0,
        bottom: 0,
        zIndex: 50,
        transition: 'left 0.3s ease'
      }} className="admin-sidebar">
        <div style={{ marginBottom: '3rem', padding: '0 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: '#38bdf8' }}>Admin Panel</h2>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Bireysel Kurs</p>
          </div>
          <button 
            className="mobile-close-btn" 
            style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { path: '/admin', icon: '📊', label: 'Dashboard' },
            { path: '/admin/crm', icon: '📝', label: 'Başvuru CRM' },
            { path: '/admin/kadro', icon: '👨‍🏫', label: 'Eğitim Kadrosu' },
            { path: '/admin/basarilar', icon: '🏆', label: 'Başarılarımız' },
            { path: '/admin/duyurular', icon: '📢', label: 'Duyurular' },
            { path: '/admin/kampanyalar', icon: '💰', label: 'Kampanyalar' },
            { path: '/admin/medya', icon: '🖼️', label: 'Medya' },
            { path: '/admin/blog', icon: '📰', label: 'Etkinlik / Haberler' },
            { path: '/admin/ayarlar', icon: '⚙️', label: 'Site Ayarları' },
          ].map(item => (
            <Link 
              key={item.path}
              href={item.path} 
              onClick={() => setSidebarOpen(false)}
              style={{ 
                padding: '0.75rem 1rem', 
                borderRadius: '8px', 
                background: pathname === item.path ? '#334155' : 'transparent', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                transition: 'all 0.2s' 
              }}
            >
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '0 1rem' }}>
          <Link href="/" style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>←</span> Siteye Dön
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: 0, width: '100%', display: 'flex', flexDirection: 'column', height: '100vh', minWidth: 0, overflowX: 'hidden' }} className="admin-main">
        {/* Header */}
        <header style={{ background: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #cbd5e1', flexShrink: 0 }}>
          <button 
            className="admin-menu-toggle"
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
            <span style={{ color: '#475569', fontWeight: '500' }}>Admin Kullanıcısı</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              👤
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </main>
      
      {/* Dynamic styles for admin responsive */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 992px) {
          .admin-sidebar { left: 0 !important; }
          .admin-main { 
            margin-left: 250px !important; 
            width: calc(100% - 250px) !important; 
          }
          .admin-menu-toggle { display: none !important; }
          .mobile-close-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .admin-main > div { padding: 1rem !important; }
          header { padding: 1rem !important; }
        }
      `}} />
    </div>
  );
}
