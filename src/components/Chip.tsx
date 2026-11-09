import { Pressable, Text, View } from 'react-native';

interface ChipProps {
    label: string;
    selected?: boolean;
    onPress?: () => void;
    /** warna titik di kiri label (opsional) */
    dotColor?: string;
    className?: string;
}

export default function Chip({ label, selected = false, onPress, dotColor, className = '' }: ChipProps) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="radio"
            accessibilityLabel={label}
            accessibilityState={{ selected }}
            className={`flex-row items-center justify-center gap-2 px-3 py-2.5 rounded-xl border active:opacity-70 ${
                selected ? 'bg-[#E5EAFB] border-[#1F41BB]/20' : 'bg-[#F3F4F8] border-transparent'
            } ${className}`}
        >
            {dotColor && (
                <View
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: dotColor }}
                />
            )}
            <Text
                className={`text-[14px] font-medium ${selected ? 'text-[#1F41BB]' : 'text-[#0A0A0A]'}`}
            >
                {label}
            </Text>
        </Pressable>
    );
}
