export interface CardTheme {
    id: string;
    name: string;
    /** warna solid (fallback bila gradient tidak didukung) */
    color: string;
    /** warna-warna gradient, dari kiri-atas ke kanan-bawah */
    gradient: string[];
}

export const CARD_THEMES: CardTheme[] = [
    {
        id: 'indigo',
        name: 'Indigo Royale',
        color: '#2E2A6B',
        gradient: ['#3B3592', '#2E2A6B', '#24224F'],
    },
    {
        id: 'emerald',
        name: 'Emerald Forest',
        color: '#4E7A55',
        gradient: ['#6B9670', '#4E7A55', '#33553A'],
    },
    {
        id: 'sunset',
        name: 'Sunset Gold',
        color: '#C98A34',
        gradient: ['#D9A63E', '#C98A34', '#B4602E'],
    },
    {
        id: 'midnight',
        name: 'Midnight Black',
        color: '#0F1222',
        gradient: ['#1A1D33', '#0F1222', '#06070F'],
    },
    {
        id: 'ocean',
        name: 'Ocean Breeze',
        color: '#7489D6',
        gradient: ['#6366E0', '#7489D6', '#8FB0D6'],
    },
];

export const DEFAULT_CARD_THEME = CARD_THEMES[0];

export const toLinearGradient = (colors: string[]) =>
    `linear-gradient(135deg, ${colors.join(', ')})`;

export interface CardAccent {
    id: string;
    /** label singkat untuk chip */
    name: string;
    /** nama lengkap yang tampil di header */
    fullName: string;
    color: string;
}

export const CARD_ACCENTS: CardAccent[] = [
    { id: 'putih', name: 'Putih', fullName: 'Putih Cerah', color: '#FFFFFF' },
    { id: 'gold', name: 'Gold', fullName: 'Gold Mewah', color: '#E4CF5A' },
    { id: 'silver', name: 'Silver', fullName: 'Silver Elegan', color: '#C9D1DB' },
    { id: 'cyan', name: 'Cyan', fullName: 'Cyan Segar', color: '#B3E5FC' },
];

export const DEFAULT_CARD_ACCENT = CARD_ACCENTS[0];
