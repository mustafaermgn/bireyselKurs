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
            { path: '/admin/crm', label: 'Başvurular' },
            { path: '/admin/kadro', label: 'Eğitim Kadrosu' },
            { path: '/admin/basarilar', label: 'Başarılarımız' },
            { path: '/admin/duyurular', label: 'Duyurular' },
            { path: '/admin/kampanyalar', label: 'Kampanyalar' },
            { path: '/admin/medya', label: 'Medya' },
            { path: '/admin/blog', label: 'Haberler' },
            { path: '/admin/ayarlar', label: 'Site Ayarları' },
          ].map(item => (
            <Link 
              key={item.path}
              href={item.path} 
              onClick={() => setSidebarOpen(false)}
              style={{ 
                padding: '0.6rem 0.75rem', 
                borderRadius: '6px', 
                background: pathname === item.path ? '#334155' : 'transparent', 
                color: pathname === item.path ? 'white' : '#94a3b8', 
                display: 'flex', 
                alignItems: 'center', 
                fontSize: '0.9rem',
                fontWeight: pathname === item.path ? '600' : '500',
                transition: 'all 0.2s' 
              }}
              onMouseEnter={(e) => { if (pathname !== item.path) e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { if (pathname !== item.path) e.currentTarget.style.color = '#94a3b8'; }}
            >
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
          .admin-main > div { padding: 1rem !important; }
          header { padding: 0.75rem 1rem !important; }
        }
      `}} />
    </div>
  );
}
