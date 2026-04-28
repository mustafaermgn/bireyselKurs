"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';

export default function Home() {
  const { data: duyurular, isLoaded } = useAppStore('duyurular');
  const { data: kampanyalar, isLoaded: kampanyalarLoaded } = useAppStore('kampanyalar');
  const { data: blogs, isLoaded: blogsLoaded } = useAppStore('blog');
  const { data: ayarlar, isLoaded: ayarlarLoaded } = useAppStore('ayarlar');
  const { data: basarilar, isLoaded: basarilarLoaded } = useAppStore('basarilar');

  const [currentDuyuru, setCurrentDuyuru] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [showCampaignPopup, setShowCampaignPopup] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const newsCarouselRef = useRef<HTMLDivElement>(null);






  // Background Slider States
  const [bgIndex, setBgIndex] = useState(0);
  const [bgTouchStart, setBgTouchStart] = useState(0);
  const [bgTouchEnd, setBgTouchEnd] = useState(0);

  // Announcement cycle
  useEffect(() => {
    if (duyurular && duyurular.length > 1) {
      const interval = setInterval(() => {
        setCurrentDuyuru(prev => (prev + 1) % duyurular.length);
      }, 25000); // 25 saniye - Mobil marquee süresiyle senkronize edildi
      return () => clearInterval(interval);
    }
  }, [duyurular]);

  // Hero Image auto-scroll cycle
  useEffect(() => {
    if (ayarlarLoaded && ayarlar?.heroImages && ayarlar.heroImages.length > 1) {
      const interval = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carouselRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
          }
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [ayarlarLoaded, ayarlar?.heroImages]);

  // Background auto-scroll cycle
  useEffect(() => {
    if (ayarlarLoaded && ayarlar?.heroArkaplanlar && ayarlar.heroArkaplanlar.length > 1) {
      const interval = setInterval(() => {
        setBgIndex(prev => (prev + 1) % ayarlar.heroArkaplanlar.length);
      }, 5000); // 5 seconds
      return () => clearInterval(interval);
    }
  }, [ayarlarLoaded, ayarlar?.heroArkaplanlar]);

  // Background swipe logic
  const handleBgTouchStart = (e: React.TouchEvent) => setBgTouchStart(e.targetTouches[0].clientX);
  const handleBgTouchMove = (e: React.TouchEvent) => setBgTouchEnd(e.targetTouches[0].clientX);
  const handleBgTouchEnd = () => {
    if (!bgTouchStart || !bgTouchEnd || !ayarlarLoaded || !ayarlar?.heroArkaplanlar) return;
    const distance = bgTouchStart - bgTouchEnd;

    // Ignore small swipes
    if (Math.abs(distance) < 50) return;

    if (distance > 50 && ayarlar?.heroArkaplanlar) {
      setBgIndex((prev) => (prev + 1) % ayarlar.heroArkaplanlar.length);
    }
    if (distance < -50 && ayarlar?.heroArkaplanlar) {
      setBgIndex((prev) => (prev - 1 + ayarlar.heroArkaplanlar.length) % ayarlar.heroArkaplanlar.length);
    }

    setBgTouchStart(0);
    setBgTouchEnd(0);
  };

  // Splash Screen & Popup logic
  useEffect(() => {
    // Only run this logic once on mount
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      // Show campaign popup 500ms after splash screen disappears
      setTimeout(() => {
        setShowCampaignPopup(true);
      }, 500);
    }, 1500); // Shorter splash screen (1.5s)

    return () => clearTimeout(splashTimer);
  }, []);

  const activeKampanyalar = kampanyalar?.filter((k: { active: boolean; name: string; discount: string; date: string }) => k.active) || [];

  return (
    <>
      {/* 1. Splash / Onboard Screen */}
      {showSplash && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeOut 0.4s ease 1.1s forwards' }}>
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes smoothReveal {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            @keyframes fadeOut {
              from { opacity: 1; visibility: visible; }
              to { opacity: 0; visibility: hidden; }
            }
          `}} />
          <div style={{ animation: 'smoothReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}>
            {ayarlar?.logo ? (
              <img src={ayarlar.logo} alt="Bireysel Kurs Logo" style={{ width: '180px', height: '180px', objectFit: 'contain' }} />
            ) : (
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary-color)', fontSize: '2rem', fontWeight: 'bold' }}>
                BKM
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Campaign Advertisement Popup */}
      {kampanyalarLoaded && showCampaignPopup && activeKampanyalar.length > 0 && !showSplash && (
        <div className="campaign-overlay">
          <div className="campaign-modal">
            <button
              onClick={() => setShowCampaignPopup(false)}
              className="campaign-close"
              aria-label="Kapat"
            >
              ✕
            </button>
            
            <div className="campaign-header">
              <div className="campaign-badge">SINIRLI SÜRE</div>
              <h2 className="campaign-title">{activeKampanyalar[0].name}</h2>
              <div className="campaign-discount-badge">{activeKampanyalar[0].discount} İNDİRİM</div>
            </div>
            
            <div className="campaign-body">
              <p className="campaign-description">
                Geleceğinizi profesyonel bir eğitimle şekillendirmek için en doğru zaman. 
                Hemen başvurarak <strong>{activeKampanyalar[0].discount}</strong> avantajından yararlanın.
              </p>
              
              <div className="campaign-info-row">
                <div className="campaign-info-item">
                  <span className="info-label">GEÇERLİLİK</span>
                  <span className="info-value">{activeKampanyalar[0].date}</span>
                </div>
                <div className="campaign-info-item">
                  <span className="info-label">KONTENJAN</span>
                  <span className="info-value">SINIRLI</span>
                </div>
              </div>

              <button 
                onClick={() => { setShowCampaignPopup(false); window.dispatchEvent(new Event('open-application-modal')); }} 
                className="btn btn-primary campaign-cta"
              >
                Fırsatı Yakala & Başvur
              </button>
              
              <button 
                onClick={() => setShowCampaignPopup(false)} 
                className="campaign-secondary-link"
              >
                Daha sonra incele
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="main-container">
        {/* Professional Announcement Bar */}
        {isLoaded && duyurular && duyurular.length > 0 && (
          <div className="announcement-bar" onClick={() => setCurrentDuyuru((currentDuyuru + 1) % duyurular.length)}>
            <div className="container announcement-inner">
              <div className="announcement-label">
                <span className="pulse-icon"></span>
                DUYURU
              </div>
              <div className="announcement-content-wrapper">
                <div className="announcement-text" key={currentDuyuru}>
                  <span className="announcement-title">{duyurular[currentDuyuru]?.title}</span>
                  <span className="announcement-separator">|</span>
                  <span className="announcement-desc">{duyurular[currentDuyuru]?.content}</span>
                </div>
              </div>
              {duyurular.length > 1 && (
                <div className="announcement-nav">
                  <span>{currentDuyuru + 1} / {duyurular.length}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section
          className="bg-navy"
          onTouchStart={handleBgTouchStart}
          onTouchMove={handleBgTouchMove}
          onTouchEnd={handleBgTouchEnd}
          style={{
            padding: '120px 0 160px 0',
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Images Slider - Show only after ayarlar is loaded */}
          {ayarlarLoaded && ayarlar?.heroArkaplanlar && ayarlar.heroArkaplanlar.length > 0 && (
            <>
              {ayarlar.heroArkaplanlar.map((bg: string, idx: number) => (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    opacity: idx === bgIndex ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    zIndex: 0
                  }}
                />
              ))}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(1, 34, 55, 0.85)', zIndex: 1 }}></div>
            </>
          )}

          <div className="floating-shape" style={{ position: 'absolute', right: '-100px', top: '-100px', width: '400px', height: '400px', borderRadius: '50%', border: '40px solid rgba(255,255,255,0.03)', zIndex: 2 }}></div>
          <div className="floating-shape" style={{ position: 'absolute', left: '-50px', bottom: '-50px', width: '250px', height: '250px', borderRadius: '50%', border: '25px solid rgba(241, 97, 1, 0.08)', animationDelay: '2s', zIndex: 2 }}></div>
          <div className="floating-shape" style={{ position: 'absolute', left: '40%', top: '20%', width: '100px', height: '100px', borderRadius: '50%', background: 'var(--accent-teal)', opacity: '0.1', filter: 'blur(30px)', zIndex: 2 }}></div>

          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <div className="grid grid-cols-2 mobile-reverse" style={{ alignItems: 'center' }}>
              <div>
                <span style={{ color: 'var(--primary-color)', fontSize: '1.25rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>
                  {ayarlar?.heroUstBaslik || 'SİLOPİ BİREYSEL KURS MERKEZİ'}
                </span>
                <h1 className="hero-title" style={{ marginBottom: '25px', lineHeight: '1.15', fontWeight: '800' }}>
                  {ayarlar?.heroAnaBaslik || 'Geleceğinizi Şansa Bırakmayın.'}
                </h1>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: '45px', color: 'rgba(255,255,255,0.85)', maxWidth: '550px', lineHeight: '1.8' }}>
                  {ayarlar?.heroAciklama || "25 yıllık eğitim tecrübemizle Silopi'de YKS, LGS ve Yabancı Dil eğitiminde yeni bir sayfa açıyoruz."}
                </p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="btn btn-primary" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>Ön Başvuru</button>
                  <Link href="/kurslar" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Kurslarımız</Link>
                </div>
              </div>

              <div style={{ position: 'relative' }} className="mobile-mt">
                <div className="hero-image-circle" style={{ overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <div
                    ref={carouselRef}
                    style={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      overflowX: 'hidden',
                      pointerEvents: 'none',
                      userSelect: 'none'
                    }}
                  >
                    <style dangerouslySetInnerHTML={{
                      __html: `
                      .hero-image-circle div::-webkit-scrollbar { display: none; }
                    `}} />
                    {ayarlarLoaded && ayarlar?.heroImages && ayarlar.heroImages.length > 0 ? (
                      ayarlar.heroImages.map((img: string, idx: number) => (
                        <div key={idx} style={{ flex: '0 0 100%', width: '100%', height: '100%', scrollSnapAlign: 'start', position: 'relative' }}>
                          <img
                            src={img}
                            alt={`Bireysel Kurs Merkezi Kapak ${idx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            draggable="false"
                          />
                        </div>
                      ))
                    ) : (
                      <div style={{ flex: '0 0 100%', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f16101 0%, #ff8c42 100%)', color: 'white', fontSize: '4rem' }}>
                        {ayarlarLoaded ? '📸' : '⏳'}
                      </div>
                    )}
                  </div>

                  {/* Manual Navigation Buttons for Desktop - HIDDEN */}
                  {false && ayarlarLoaded && ayarlar?.heroImages && ayarlar.heroImages.length > 1 && (
                    <>
                      <button
                        onClick={() => carouselRef.current?.scrollBy({ left: -carouselRef.current.clientWidth, behavior: 'smooth' })}
                        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, color: 'var(--primary-color)', fontSize: '20px', boxShadow: 'var(--shadow-md)' }}
                      >
                        &larr;
                      </button>
                      <button
                        onClick={() => carouselRef.current?.scrollBy({ left: carouselRef.current.clientWidth, behavior: 'smooth' })}
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, color: 'var(--primary-color)', fontSize: '20px', boxShadow: 'var(--shadow-md)' }}
                      >
                        &rarr;
                      </button>
                    </>
                  )}
                </div>
                <div className="card mobile-hide glass-badge floating-shape" style={{ position: 'absolute', bottom: '30px', left: '-30px', padding: '20px 25px', width: 'auto', zIndex: 10, animationDelay: '1s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'var(--accent-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '26px', boxShadow: '0 5px 15px rgba(45, 163, 151, 0.4)' }}>🏆</div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>25 Yıllık</h4>
                      <p style={{ margin: 0, fontSize: '15px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>Köklü Deneyim</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overlapping Info Boxes */}
        <section style={{ position: 'relative', zIndex: 20, marginTop: '-80px', paddingBottom: '30px' }}>
          <div className="container">
            <div className="info-boxes-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>

              <div className="card floating-shape" style={{ width: '250px', height: '250px', borderRadius: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: 'none', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', borderTop: '6px solid var(--accent-teal)', borderBottom: '6px solid var(--accent-teal)' }}>
                <div style={{ color: 'var(--accent-teal)', marginBottom: '15px' }}>
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--heading-color)', fontWeight: '800' }}>{ayarlar?.kutu1Baslik || 'Uzman Kadro'}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.4', margin: 0 }}>{ayarlar?.kutu1Aciklama || 'Alanında deneyimli kadromuzla yanınızdayız.'}</p>
              </div>

              <div className="card floating-shape" style={{ width: '250px', height: '250px', borderRadius: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: 'none', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', borderTop: '6px solid var(--primary-color)', borderBottom: '6px solid var(--primary-color)', animationDelay: '0.5s' }}>
                <div style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--heading-color)', fontWeight: '800' }}>{ayarlar?.kutu2Baslik || 'Hedef Odaklı'}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.4', margin: 0 }}>{ayarlar?.kutu2Aciklama || 'Öğrencilerimizi hedeflerine adım adım ulaştırıyoruz.'}</p>
              </div>

              <div className="card floating-shape" style={{ width: '250px', height: '250px', borderRadius: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: 'none', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)', borderTop: '6px solid var(--accent-purple)', borderBottom: '6px solid var(--accent-purple)', animationDelay: '1s' }}>
                <div style={{ color: 'var(--accent-purple)', marginBottom: '15px' }}>
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                    <line x1="2" y1="20" x2="22" y2="20"></line>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--heading-color)', fontWeight: '800' }}>{ayarlar?.kutu3Baslik || 'Gelişim Takibi'}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.4', margin: 0 }}>{ayarlar?.kutu3Aciklama || 'Düzenli analizlerle gelişiminizi anlık ölçüyoruz.'}</p>
              </div>

            </div>
          </div>
        </section>



        {/* Events / Posts Section */}
        {blogsLoaded && blogs && blogs.length > 0 && (
          <section className="bg-alt" style={{ padding: '60px 0', borderTop: '1px solid #f1f5f9' }}>
            <div className="container">
              <div className="text-center" style={{ marginBottom: '40px' }}>
                <span className="section-subtitle" style={{ background: 'white', display: 'inline-block', padding: '5px 15px', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>HABERLER</span>
              </div>
              <div
                ref={newsCarouselRef}
                className="news-container"
              >
                {blogs.map((b: any) => (
                  <Link key={b.id} href={`/haber/${b.id}`} className="news-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card course-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, border: 'none', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', cursor: 'pointer', margin: '0 10px' }}>
                      <div style={{ height: '220px', backgroundColor: '#e2e8f0', position: 'relative', overflow: 'hidden' }}>
                        {b.photo ? (
                          <img src={b.photo} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                          </div>
                        )}
                        <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.95)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>{b.date}</div>
                      </div>
                      <div style={{ padding: '35px 30px', flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
                        <h4 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'var(--heading-color)', fontWeight: '800', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.title}</h4>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.content}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Courses Section - EĞİTİM PROGRAMLARI */}
        <section className="bg-alt" style={{ padding: '60px 0', borderTop: '1px solid #f1f5f9' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle" style={{ background: 'white', display: 'inline-block', padding: '10px 25px', borderRadius: '30px', boxShadow: 'var(--shadow-sm)', color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: '800', letterSpacing: '1px' }}>EĞİTİM PROGRAMLARI</span>
            </div>

            <div className="grid grid-cols-4 grid-cols-mobile-1" style={{ gap: '30px', paddingBottom: '20px' }}>

              {/* Card 1: LGS */}
              <div className="card course-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: 'none', background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--accent-teal)', opacity: '0.05', transition: 'all 0.6s ease' }} className="course-blob"></div>



                <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: '800' }}>
                    <Link href="/kurslar/lgs" style={{ color: 'var(--heading-color)', textDecoration: 'none' }}>LGS Hazırlık</Link>
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Sınav formatına uygun, yeni nesil soru teknikleriyle donatılmış özel LGS hazırlık programı (5, 6, 7 ve 8. Sınıflar).
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                  <Link href="/kurslar/lgs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-teal)', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }} className="course-link">
                    Ayrıntılar
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>

              {/* Card 2: YKS */}
              <div className="card course-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: 'none', background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--primary-color)', opacity: '0.05', transition: 'all 0.6s ease' }} className="course-blob"></div>



                <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: '800' }}>
                    <Link href="/kurslar/yks" style={{ color: 'var(--heading-color)', textDecoration: 'none' }}>YKS Hazırlık</Link>
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Üniversite hayalinize ulaşmanız için kapsamlı konu anlatımları ve Türkiye geneli deneme sınavları.
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                  <Link href="/kurslar/yks" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }} className="course-link">
                    Ayrıntılar
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>

              {/* Card 3: Dil Okulu */}
              <div className="card course-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: 'none', background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--accent-purple)', opacity: '0.05', transition: 'all 0.6s ease' }} className="course-blob"></div>



                <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: '800' }}>
                    <Link href="/dil-okulu" style={{ color: 'var(--heading-color)', textDecoration: 'none' }}>Dil Okulu & YDS</Link>
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Genel İngilizce, Kids, Teenage ve Sınav İngilizcesi programlarımızla dünya dillerini kalıcı öğrenin.
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                  <Link href="/dil-okulu" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }} className="course-link">
                    Ayrıntılar
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>

              {/* Card 4: Ara Sınıflar */}
              <div className="card course-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: 'none', background: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--accent-red)', opacity: '0.05', transition: 'all 0.6s ease' }} className="course-blob"></div>



                <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: '800' }}>
                    <Link href="/kurslar/ara-sinif" style={{ color: 'var(--heading-color)', textDecoration: 'none' }}>Ara Sınıflar</Link>
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Okul derslerine takviye ve temelden sınav hazırlığı (9, 10 ve 11. Sınıf öğrencileri için özel).
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                  <Link href="/kurslar/ara-sinif" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-red)', fontWeight: '700', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }} className="course-link">
                    Ayrıntılar
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kurum Bilgileri Bölümü - Profesyonel Masaüstü Görünümü */}
        {ayarlarLoaded && ayarlar.kurumBaslik && (
          <section className="section bg-white" style={{ padding: '100px 0', overflow: 'hidden' }}>
            <div className="container">
              <div className="grid grid-cols-2 grid-cols-mobile-1 responsive-gap" style={{ alignItems: 'center' }}>
                {/* Sol Taraf - Görsel ve Dekorasyon */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    left: '-40px',
                    width: '300px',
                    height: '300px',
                    background: 'var(--primary-color)',
                    opacity: '0.05',
                    borderRadius: '50%',
                    zIndex: 1
                  }}></div>
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    borderRadius: '40px',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(1, 34, 55, 0.12)',
                    border: '8px solid white'
                  }}>
                    <img
                      src={ayarlar.kurumGorsel || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"}
                      alt="Kurumumuz"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                  {/* Başarı Rozeti Deneyimi */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    right: '-30px',
                    background: 'white',
                    padding: '25px',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }} className="mobile-hide">
                    <div style={{ width: '50px', height: '50px', background: 'var(--primary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>🏆</div>
                    <div>
                      <h5 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: 'var(--heading-color)' }}>25+ Yıllık</h5>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Eğitim Tecrübesi</p>
                    </div>
                  </div>
                </div>

                {/* Sağ Taraf - İçerik */}
                <div style={{ textAlign: 'left' }} className="mobile-center">
                  <span className="section-subtitle" style={{
                    background: 'rgba(241, 97, 1, 0.08)',
                    display: 'inline-block',
                    padding: '8px 20px',
                    borderRadius: '30px',
                    color: 'var(--primary-color)',
                    fontSize: '0.95rem',
                    fontWeight: '800',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase'
                  }}>KURUMUMUZU TANIYIN</span>

                  <h2 style={{
                    marginTop: '20px',
                    marginBottom: '25px',
                    color: 'var(--heading-color)',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    letterSpacing: '-1px'
                  }}>{ayarlar.kurumBaslik}</h2>

                  <div style={{ width: '60px', height: '5px', background: 'var(--primary-color)', marginBottom: '35px', borderRadius: '3px' }} className="mobile-center"></div>

                  <p style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                    color: '#475569',
                    lineHeight: '1.8',
                    margin: 0,
                    whiteSpace: 'pre-line'
                  }}>
                    {ayarlar.kurumAciklama}
                  </p>

                  <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }} className="mobile-center">
                    <Link href="/iletisim" className="btn btn-primary" style={{ padding: '15px 35px', borderRadius: '15px' }}>Bize Katılın</Link>
                    <Link href="/hakkimizda" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--heading-color)', fontWeight: '700', textDecoration: 'none' }}>
                      Detaylı Bilgi
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}


        {/* Gurur Tablomuz (Başarılarımız) */}
        {basarilarLoaded && basarilar && basarilar.length > 0 && (
          <section className="bg-white" style={{ padding: '80px 0' }}>
            <div className="container">
              <div className="text-center" style={{ marginBottom: '50px' }}>
                <span className="section-subtitle" style={{ background: '#f1f5f9', display: 'inline-block', padding: '10px 25px', borderRadius: '30px', boxShadow: 'var(--shadow-sm)', color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: '800', letterSpacing: '1px' }}>GURUR TABLOMUZ</span>
                <h2 className="section-title" style={{ marginTop: '15px' }}>Öğrenci Başarılarımız</h2>
              </div>

              <div
                className="grid grid-cols-4 grid-cols-mobile-4"
                style={{
                  gap: '30px',
                  padding: '20px 0'
                }}
              >
                {basarilar.slice(0, 4).map((b: any) => (
                  <Link key={b.id} href="/basarilar" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="success-card-item">
                      <div className="success-card-img">
                        {b.photo ? (
                          <img src={b.photo} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: '2rem' }}>🎓</span>
                        )}
                      </div>
                      <h4 className="success-card-name">{b.name}</h4>
                      <span className="success-card-exam">
                        {b.exam}
                      </span>
                      <p className="success-card-result">{b.result}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA - layout.tsx içindeki CallToAction bileşeni tüm sayfalarda gösterilir */}
      </div>
    </>
  );
}
