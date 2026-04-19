"use client";

import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function BasarilarPage() {
  const { data: basarilar, isLoaded } = useAppStore('basarilar');
  const [selectedYear, setSelectedYear] = useState<string>('Tümü');

  const groupedBasarilar = basarilar?.reduce((acc: any, curr: any) => {
    const year = curr.year || 'Diğer';
    if (!acc[year]) acc[year] = [];
    acc[year].push(curr);
    return acc;
  }, {}) || {};

  const sortedYears = Object.keys(groupedBasarilar).sort((a, b) => {
    if (a === 'Diğer') return 1;
    if (b === 'Diğer') return -1;
    return parseInt(b) - parseInt(a);
  });

  const yearsToDisplay = selectedYear === 'Tümü' ? sortedYears : [selectedYear];

  return (
    <div className="main-container">
      {/* Page Header */}
      <section className="bg-navy" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ margin: 0 }}>Gurur Tablomuz</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>Anasayfa / Başarılarımız</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle" style={{ background: '#f1f5f9', display: 'inline-block', padding: '10px 25px', borderRadius: '30px', boxShadow: 'var(--shadow-sm)', color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: '800', letterSpacing: '1px' }}>ÖĞRENCİ BAŞARILARI</span>
            <h2 className="section-title" style={{ marginTop: '15px' }}>Bireysel Kurs Merkezi Gurur Tablosu</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: '#64748b' }}>
              Yılların verdiği tecrübe ile yüzlerce öğrencimizi hayallerine ulaştırmanın haklı gururunu yaşıyoruz.
            </p>
          </div>

          {isLoaded && sortedYears.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '50px' }}>
              <button
                onClick={() => setSelectedYear('Tümü')}
                style={{
                  padding: '10px 25px',
                  borderRadius: '30px',
                  border: 'none',
                  background: selectedYear === 'Tümü' ? 'var(--primary-color)' : '#f1f5f9',
                  color: selectedYear === 'Tümü' ? 'white' : '#64748b',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedYear === 'Tümü' ? '0 4px 10px rgba(241, 97, 1, 0.3)' : 'none'
                }}
              >
                Tümü
              </button>
              {sortedYears.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  style={{
                    padding: '10px 25px',
                    borderRadius: '30px',
                    border: 'none',
                    background: selectedYear === year ? 'var(--primary-color)' : '#f1f5f9',
                    color: selectedYear === year ? 'white' : '#64748b',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedYear === year ? '0 4px 10px rgba(241, 97, 1, 0.3)' : 'none'
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          {isLoaded && basarilar.length > 0 ? (
            yearsToDisplay.map((year) => (
              <div key={year} style={{ marginBottom: '60px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                  <h3 style={{ margin: 0, fontSize: '2rem', color: 'var(--primary-color)', fontWeight: '800' }}>{year}</h3>
                  <div style={{ height: '2px', background: '#e2e8f0', flex: 1 }}></div>
                </div>

                <div className="grid grid-cols-4 grid-cols-mobile-4" style={{ gap: '20px' }}>
                  {groupedBasarilar[year]?.map((b: any) => (
                    <div key={b.id} style={{ padding: '5px 2px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#f8fafc', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        {b.photo ? (
                          <img src={b.photo} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: '2rem' }}>🎓</span>
                        )}
                      </div>
                      <h4 style={{ margin: '0 0 3px 0', fontSize: '0.85rem', color: 'var(--heading-color)', fontWeight: '800' }}>{b.name}</h4>
                      <span style={{ display: 'inline-block', padding: '2px 6px', background: 'rgba(241, 97, 1, 0.1)', color: 'var(--primary-color)', borderRadius: '8px', fontSize: '0.6rem', fontWeight: 'bold', marginBottom: '5px' }}>
                        {b.exam}
                      </span>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b', lineHeight: '1.3' }}>{b.result}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#64748b', width: '100%' }}>
              {isLoaded ? 'Henüz eklenmiş bir başarı tablosu bulunmamaktadır.' : 'Yükleniyor...'}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
