import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

interface LenisContextType {
    lenis: Lenis | null;
    start: () => void;
    stop: () => void;
    scrollTo: (target: string | number | HTMLElement, options?: any) => void;
}

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export const useLenis = () => {
    const context = useContext(LenisContext);
    if (!context) {
        throw new Error('useLenis must be used within a LenisProvider');
    }
    return context;
};

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const location = useLocation();

    useEffect(() => {
        const newLenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        setLenis(newLenis);

        function raf(time: number) {
            newLenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            newLenis.destroy();
            setLenis(null);
        };
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, lenis]);

    const start = () => lenis?.start();
    const stop = () => lenis?.stop();
    const scrollTo = (target: string | number | HTMLElement, options?: any) => lenis?.scrollTo(target, options);

    return (
        <LenisContext.Provider value={{ lenis, start, stop, scrollTo }}>
            {children}
        </LenisContext.Provider>
    );
};
