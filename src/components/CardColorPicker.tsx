import { CARD_THEMES, CardTheme, toLinearGradient } from '@/constants/cardThemes';
import { Pressable, Text, View } from 'react-native';

interface CardColorPickerProps {
    value: string;
    onChange: (theme: CardTheme) => void;
    themes?: CardTheme[];
    label?: string;
}

export default function CardColorPicker({
    value,
    onChange,
    themes = CARD_THEMES,
    label = 'Pilihan Desain Kartu',
}: CardColorPickerProps) {
    const selected = themes.find((t) => t.id === value);

    return (
        <View className="mb-[15px]">
            <View className="flex-row justify-between items-center mb-[10px]">
                <Text className="text-[14px] font-semibold text-[#0A0A0A]">{label}</Text>
                {selected && <Text className="text-[13px] text-[#626262]">{selected.name}</Text>}
            </View>

            <View className="flex-row justify-between gap-[10px]">
                {themes.map((theme) => {
                    const isSelected = theme.id === value;
                    return (
                        <Pressable
                            key={theme.id}
                            onPress={() => onChange(theme)}
                            accessibilityRole="radio"
                            accessibilityLabel={theme.name}
                            accessibilityState={{ selected: isSelected }}
                            className={`flex-1 aspect-square rounded-xl justify-center items-center border-2 active:opacity-80 ${
                                isSelected ? 'border-[#1F41BB]' : 'border-transparent'
                            }`}
                            // warna/gradient tema bersifat dinamis, jadi tetap lewat style
                            style={{
                                backgroundColor: theme.color,
                                experimental_backgroundImage: toLinearGradient(theme.gradient),
                                boxShadow: isSelected ? '0px 4px 10px rgba(31, 65, 187, 0.3)' : undefined,
                            }}
                        >
                            {isSelected && <Text className="text-white text-[18px] font-bold">✓</Text>}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
