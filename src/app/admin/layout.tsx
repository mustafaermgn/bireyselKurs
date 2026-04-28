"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { onAuthChange, logoutAdmin, getCurrentUser } from '@/lib/auth';
import { User } from 'firebase/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth kontrolü
  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      setLoading(false);
      
      // Giriş sayfasında değilse ve giriş yapmamışsa, login'e yönlendir
      if (!authUser && pathname !== '/admin') {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  // Login sayfasıysa sidebar gösterme
  if (pathname === '/admin') {
    return children;
  }

  // Yükleniyor durumu
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
        <div>Yükleniyor...</div>
      </div>
    );
  }

  // Giriş yapmadıysa login'e yönlendir
  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push('/admin');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

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
        width: '240px', 
        background: '#0f172a', 
        color: 'white', 
        padding: '1.5rem 0.75rem', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'fixed',
        left: sidebarOpen ? 0 : '-240px',
        top: 0,
        bottom: 0,
        zIndex: 50,
        boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }} className="admin-sidebar">
        <div style={{ marginBottom: '2rem', padding: '0 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '-0.5px' }}>BİREYSEL</h2>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>YÖNETİM PANELİ</p>
          </div>
          <button 
            className="mobile-close-btn" 
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { path: '/admin/crm', label: 'Başvurular', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
            { path: '/admin/kadro', label: 'Eğitim Kadrosu', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg> },
            { path: '/admin/basarilar', label: 'Başarılarımız', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> },
            { path: '/admin/duyurular', label: 'Duyurular', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg> },
            { path: '/admin/kampanyalar', label: 'Kampanyalar', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path></svg> },
            { path: '/admin/medya', label: 'Medya', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> },
            { path: '/admin/blog', label: 'Haberler', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> },
            { path: '/admin/ayarlar', label: 'Site Ayarları', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> },
          ].map(item => (
            <Link 
              key={item.path}
              href={item.path} 
              onClick={() => setSidebarOpen(false)}
              style={{ 
                padding: '0.75rem 1rem', 
                borderRadius: '10px', 
                background: pathname === item.path ? 'rgba(56, 189, 248, 0.1)' : 'transparent', 
                color: pathname === item.path ? '#38bdf8' : '#94a3b8', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                fontSize: '0.9rem',
                fontWeight: pathname === item.path ? '700' : '500',
                transition: 'all 0.3s ease',
                margin: '2px 0'
              }}
              onMouseEnter={(e) => { if (pathname !== item.path) e.currentTarget.style.color = 'white'; e.currentTarget.style.background = pathname === item.path ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={(e) => { if (pathname !== item.path) e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = pathname === item.path ? 'rgba(56, 189, 248, 0.1)' : 'transparent'; }}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '1rem 0.75rem', borderTop: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link href="/" style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            Siteye Dön
          </Link>
          <button 
            onClick={handleLogout}
            style={{ 
              color: '#f87171', 
              fontSize: '0.85rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: '600'
            }}
          >
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: 0, width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: 0 }} className="admin-main">
        {/* Header */}
        <header style={{ background: 'white', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 30, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <button 
            className="admin-menu-toggle"
            style={{ background: '#f1f5f9', border: 'none', width: '36px', height: '36px', borderRadius: '6px', fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
            <div style={{ textAlign: 'right', display: 'none' }} className="admin-user-info">
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '700', color: '#1e293b' }}>Yönetici</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{user?.email?.split('@')[0]}</p>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
              {user?.email?.[0].toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '1.5rem', flex: 1, minWidth: 0, maxWidth: '100%' }}>
          {children}
        </div>
      </main>
      
      {/* Dynamic styles for admin responsive */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 992px) {
          .admin-sidebar { left: 0 !important; }
          .admin-main { 
            margin-left: 240px !important; 
            width: calc(100% - 240px) !important; 
          }
          .admin-menu-toggle { display: none !important; }
          .mobile-close-btn { display: none !important; }
          .admin-user-info { display: block !important; }
        }
        @media (max-width: 767px) {
          .admin-main > div { padding: 0.5rem !important; }
          header { padding: 0.5rem 0.75rem !important; height: auto !important; }
          .admin-menu-toggle { width: 32px !important; height: 32px !important; font-size: 1.1rem !important; }
          /* Compact Typo & Margins */
          h1 { font-size: 1.25rem !important; margin-bottom: 0 !important; }
          p { font-size: 0.8rem !important; }
          .admin-main > div > div:first-child { margin-bottom: 0.75rem !important; }
          /* Buttons */
          button { padding: 6px 12px !important; font-size: 0.8rem !important; }
          /* Tables */
          table th, table td { padding: 0.5rem 0.5rem !important; font-size: 0.75rem !important; }
          /* Grids */
          .grid { gap: 10px !important; }
          .grid-cols-2, .grid-cols-3 { grid-template-columns: 1fr !important; }
          /* Cards & Modals */
          .admin-card, .modal-content { padding: 1rem !important; }
          .modal-overlay { padding: 10px !important; }
          /* Tabs */
          .admin-tabs button { padding: 8px 12px !important; font-size: 0.8rem !important; }
          /* Inputs */
          input, textarea, select { padding: 8px 10px !important; font-size: 0.85rem !important; margin-bottom: 10px !important; }
        }
      `}} />
    </div>
  );
}
