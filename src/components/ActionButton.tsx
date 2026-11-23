import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

export type ActionButtonType = 'cash-in' | 'cash-out';

export interface ActionButtonProps {
    type?: ActionButtonType;
    title?: string;
    subtitle?: string;
    onPress?: () => void;
    icon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    className?: string;
}

const TYPE_CONFIG = {
    'cash-in': {
        title: 'Cash-In',
        subtitle: 'Masuk / Top Up',
        iconName: 'plus-circle' as const,
        iconColor: '#245436',
        iconBgColor: '#D3E6E3',
        subtitleColor: 'text-[#2D5A3A]',
    },
    'cash-out': {
        title: 'Cash-Out',
        subtitle: 'Keluar / Tarik',
        iconName: 'arrow-up-circle' as const,
        iconColor: '#A81818',
        iconBgColor: '#FDECEE',
        subtitleColor: 'text-[#A81818]',
    },
};

export default function ActionButton({
    type = 'cash-in',
    title,
    subtitle,
    onPress,
    icon,
    style,
    className = '',
}: ActionButtonProps) {
    const config = TYPE_CONFIG[type];
    const displayTitle = title ?? config.title;
    const displaySubtitle = subtitle ?? config.subtitle;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.75 : 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                },
                style,
            ]}
            className={`flex-1 flex-row items-center bg-[#F3F6FD] rounded-xl p-3 gap-3 ${className}`}
        >
            {/* Icon Container */}
            <View
                style={{ backgroundColor: config.iconBgColor }}
                className="w-12 h-12 rounded-[16px] items-center justify-center"
            >
                {icon ? (
                    icon
                ) : (
                    <Feather name={config.iconName} size={24} color={config.iconColor} />
                )}
            </View>

            {/* Text Information */}
            <View className="flex-1 justify-center">
                <Text className="text-[17px] font-bold text-[#141A33] tracking-tight">
                    {displayTitle}
                </Text>
                <Text
                    numberOfLines={1}
                    className={`text-[12px] font-semibold mt-0.5 ${config.subtitleColor}`}
                >
                    {displaySubtitle}
                </Text>
            </View>
        </Pressable>
    );
}
