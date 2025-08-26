'use client'

import { useEffect } from 'react'

export function TawkToWidget() {
  useEffect(() => {
    // Initialize Tawk.to
    var Tawk_API = (window as any).Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    
    s1.async = true;
    s1.src = 'https://embed.tawk.to/689df62ba2ecb11924758387/1j2kgj6r2';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    s0.parentNode?.insertBefore(s1, s0);

    return () => {
      // Cleanup if needed
      s1.remove();
    };
  }, []);

  return null; // This component doesn't render anything
}
