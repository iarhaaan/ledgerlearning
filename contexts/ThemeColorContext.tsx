import React, { createContext, useContext, useEffect, useState } from 'react';

type ColorPalette = {
    name: string;
    label: string;
    colors: {
        primary: string; // RGB values like '99 102 241'
        primaryFocus: string;
        primaryLight: string;
        accent: string;
        accentFocus: string;
        accentLight: string;
    };
};

export const COLOR_PALETTES: ColorPalette[] = [
    {
        name: 'indigo',
        label: 'Cosmic Indigo',
        colors: {
            primary: '99 102 241', // Indigo 500
            primaryFocus: '79 70 229', // Indigo 600
            primaryLight: '129 140 248', // Indigo 400
            accent: '99 102 241', // Indigo 500 (Same as Primary)
            accentFocus: '79 70 229', // Indigo 600
            accentLight: '129 140 248', // Indigo 400
        }
    },
    {
        name: 'emerald',
        label: 'Nature Emerald',
        colors: {
            primary: '16 185 129', // Emerald 500
            primaryFocus: '5 150 105', // Emerald 600
            primaryLight: '52 211 153', // Emerald 400
            accent: '16 185 129', // Emerald 500
            accentFocus: '5 150 105', // Emerald 600
            accentLight: '52 211 153', // Emerald 400
        }
    },
    {
        name: 'violet',
        label: 'Cyber Violet',
        colors: {
            primary: '139 92 246', // Violet 500
            primaryFocus: '124 58 237', // Violet 600
            primaryLight: '167 139 250', // Violet 400
            accent: '139 92 246', // Violet 500
            accentFocus: '124 58 237', // Violet 600
            accentLight: '167 139 250', // Violet 400
        }
    },
    {
        name: 'blue',
        label: 'Ocean Blue',
        colors: {
            primary: '59 130 246', // Blue 500
            primaryFocus: '37 99 235', // Blue 600
            primaryLight: '96 165 250', // Blue 400
            accent: '59 130 246', // Blue 500
            accentFocus: '37 99 235', // Blue 600
            accentLight: '96 165 250', // Blue 400
        }
    },
    {
        name: 'rose',
        label: 'Romantic Rose',
        colors: {
            primary: '244 63 94', // Rose 500
            primaryFocus: '225 29 72', // Rose 600
            primaryLight: '251 113 133', // Rose 400
            accent: '244 63 94', // Rose 500
            accentFocus: '225 29 72', // Rose 600
            accentLight: '251 113 133', // Rose 400
        }
    },
    {
        name: 'amber',
        label: 'Sunset Amber',
        colors: {
            primary: '245 158 11', // Amber 500
            primaryFocus: '217 119 6', // Amber 600
            primaryLight: '251 191 36', // Amber 400
            accent: '245 158 11', // Amber 500
            accentFocus: '217 119 6', // Amber 600
            accentLight: '251 191 36', // Amber 400
        }
    },
    {
        name: 'teal',
        label: 'Zen Teal',
        colors: {
            primary: '20 184 166', // Teal 500
            primaryFocus: '13 148 136', // Teal 600
            primaryLight: '45 212 191', // Teal 400
            accent: '20 184 166', // Teal 500
            accentFocus: '13 148 136', // Teal 600
            accentLight: '45 212 191', // Teal 400
        }
    },
    {
        name: 'fuchsia',
        label: 'Neon Fuchsia',
        colors: {
            primary: '217 70 239', // Fuchsia 500
            primaryFocus: '192 38 211', // Fuchsia 600
            primaryLight: '232 121 249', // Fuchsia 400
            accent: '217 70 239', // Fuchsia 500
            accentFocus: '192 38 211', // Fuchsia 600
            accentLight: '232 121 249', // Fuchsia 400
        }
    },
    {
        name: 'slate',
        label: 'Minimal Slate',
        colors: {
            primary: '100 116 139', // Slate 500
            primaryFocus: '71 85 105', // Slate 600
            primaryLight: '148 163 184', // Slate 400
            accent: '100 116 139', // Slate 500
            accentFocus: '71 85 105', // Slate 600
            accentLight: '148 163 184', // Slate 400
        }
    },
    {
        name: 'orange',
        label: 'Vibrant Orange',
        colors: {
            primary: '249 115 22', // Orange 500
            primaryFocus: '234 88 12', // Orange 600
            primaryLight: '251 146 60', // Orange 400
            accent: '249 115 22', // Orange 500
            accentFocus: '234 88 12', // Orange 600
            accentLight: '251 146 60', // Orange 400
        }
    },
];

interface ThemeColorContextType {
    activePalette: ColorPalette;
    setPalette: (name: string) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export const ThemeColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activePalette, setActivePalette] = useState<ColorPalette>(() => {
        const saved = localStorage.getItem('theme-palette');
        return COLOR_PALETTES.find(p => p.name === saved) || COLOR_PALETTES[0];
    });

    useEffect(() => {
        const root = document.documentElement;
        const colors = activePalette.colors;

        // Update CSS Variables for Primary
        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-primary-focus', colors.primaryFocus);
        root.style.setProperty('--color-primary-light', colors.primaryLight);

        // Update CSS Variables for Accent
        root.style.setProperty('--color-accent', colors.accent);
        root.style.setProperty('--color-accent-focus', colors.accentFocus);
        root.style.setProperty('--color-accent-light', colors.accentLight);

        localStorage.setItem('theme-palette', activePalette.name);
    }, [activePalette]);

    const setPalette = (name: string) => {
        const palette = COLOR_PALETTES.find(p => p.name === name);
        if (palette) {
            setActivePalette(palette);
        }
    };

    return (
        <ThemeColorContext.Provider value={{ activePalette, setPalette }}>
            {children}
        </ThemeColorContext.Provider>
    );
};

export const useThemeColor = () => {
    const context = useContext(ThemeColorContext);
    if (!context) {
        throw new Error('useThemeColor must be used within a ThemeColorProvider');
    }
    return context;
};
