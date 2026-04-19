"use client";

import React from 'react';

export default function ApplicationButton({ 
  className = "btn btn-primary", 
  style = {}, 
  children = "Hemen Başvur" 
}: { 
  className?: string, 
  style?: React.CSSProperties, 
  children?: React.ReactNode 
}) {
  return (
    <button 
      onClick={() => window.dispatchEvent(new Event('open-application-modal'))} 
      className={className} 
      style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', ...style }}
    >
      {children}
    </button>
  );
}
