import { CardTheme, DEFAULT_CARD_THEME, toLinearGradient } from '@/constants/cardThemes';
import { Platform, Text, View } from 'react-native';

interface CardDompetInterface {
    saldo?: number;
    namaDompet?: string;
    nomorKartu?: string;
    validThru?: string;
    brand?: string;
    theme?: CardTheme;
    /** warna huruf & aksen kartu */
    accentColor?: string;
}

const formatRupiah = (value: number) =>
    'Rp ' + value.toLocaleString('id-ID', { maximumFractionDigits: 0 });

const monoFont = Platform.select({ ios: 'Menlo', default: 'monospace' });

export default function CardDompet({
    saldo = 0,
    namaDompet = 'Dompet Utama',
    nomorKartu = '9021',
    validThru = '12/29',
    brand = 'PAYNEX E-WALLET',
    theme = DEFAULT_CARD_THEME,
    accentColor = '#FFFFFF',
}: CardDompetInterface) {
    const accent = { color: accentColor };
    return (
        <View
            className="rounded-[20px] p-[22px] overflow-hidden"
            // warna/gradient tema bersifat dinamis, jadi tetap lewat style
            style={{
                backgroundColor: theme.color,
                experimental_backgroundImage: toLinearGradient(theme.gradient),
                boxShadow: '0px 8px 20px rgba(15, 18, 34, 0.3)',
            }}
        >
            {/* Header: chip + contactless + badge */}
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-[10px]">
                    <View className="w-8 h-[22px] rounded-[5px] bg-[#D9B44A] justify-center items-center gap-[3px]">
                        <View className="w-[14px] h-[1.5px] rounded-[1px] bg-[rgba(120,90,20,0.6)]" />
                        <View className="w-[14px] h-[1.5px] rounded-[1px] bg-[rgba(120,90,20,0.6)]" />
                    </View>
                    <View
                        className="w-[18px] h-[18px] rounded-full border-[1.5px] justify-center items-center opacity-85"
                        style={{ borderColor: accentColor }}
                    >
                        <View className="w-2 h-2 rounded-full border-[1.5px]" style={{ borderColor: accentColor }} />
                    </View>
                </View>

                <View className="flex-row items-center gap-[6px] px-[10px] py-[5px] rounded-full bg-[rgba(15,14,40,0.45)]">
                    <View className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: accentColor }} />
                    <Text className="text-[11px] font-bold tracking-[0.5px]" style={accent}>{brand}</Text>
                </View>
            </View>

            {/* Saldo */}
            <View className="mt-9">
                <Text className="text-white/70 text-[11px] font-semibold tracking-[0.8px] mb-1">
                    SALDO TERSEDIA
                </Text>
                <Text className="text-[30px] font-bold" style={accent}>{formatRupiah(saldo)}</Text>
            </View>

            {/* Footer */}
            <View className="flex-row justify-between items-end mt-9">
                <View>
                    <Text className="text-white/70 text-[11px] font-semibold tracking-[0.8px] mb-1">
                        NAMA DOMPET
                    </Text>
                    <Text className="text-[18px] font-bold" style={accent}>{namaDompet}</Text>
                </View>
                <View className="items-end">
                    <Text
                        className="text-[12px] tracking-[1.5px] mb-1"
                        style={{ fontFamily: monoFont, color: accentColor }}
                    >
                        •••• {nomorKartu}
                    </Text>
                    <Text className="text-white/70 text-[11px] font-semibold tracking-[0.5px]">
                        VALID THRU {validThru}
                    </Text>
                </View>
            </View>
        </View>
    );
}
