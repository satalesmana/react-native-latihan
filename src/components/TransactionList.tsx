import { Feather } from '@expo/vector-icons';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

export type TransactionType = 'in' | 'out';

export interface TransactionItemProps {
    id?: string | number;
    title: string;
    walletName?: string;
    date: string;
    amount: number | string;
    type?: TransactionType;
    status?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    className?: string;
}

const formatCurrency = (amount: number | string, type: TransactionType) => {
    if (typeof amount === 'string') {
        return amount.startsWith('+') || amount.startsWith('-')
            ? amount
            : `${type === 'in' ? '+' : '-'}${amount}`;
    }
    const formatted = 'Rp ' + amount.toLocaleString('id-ID', { maximumFractionDigits: 0 });
    return `${type === 'in' ? '+' : '-'}${formatted}`;
};

export default function TransactionList({
    title,
    walletName,
    date,
    amount,
    type = 'in',
    status = 'Berhasil',
    onPress,
    style,
    className = '',
}: TransactionItemProps) {
    const isIncome = type === 'in';

    const iconBgColor = isIncome ? '#D3E6E3' : '#FDECEE';
    const iconColor = isIncome ? '#245436' : '#A81818';
    const amountColor = isIncome ? 'text-[#245436]' : 'text-[#A81818]';
    const iconName = isIncome ? ('arrow-down-left' as const) : ('arrow-up-right' as const);

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.75 : 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 6,
                    elevation: 1,
                },
                style,
            ]}
            className={`flex-row items-center justify-between bg-[#F3F6FD] rounded-2xl p-3.5 gap-3 ${className}`}
        >
            {/* Left: Icon */}
            <View
                style={{ backgroundColor: iconBgColor }}
                className="w-12 h-12 rounded-[14px] items-center justify-center shrink-0"
            >
                <Feather name={iconName} size={22} color={iconColor} />
            </View>

            {/* Middle: Title, Wallet Badge & Date */}
            <View className="flex-1 justify-center min-w-0 pr-2">
                <Text
                    numberOfLines={1}
                    className="text-[15px] font-bold text-[#141A33] tracking-tight"
                >
                    {title}
                </Text>

                <View className="flex-row items-center gap-1.5 mt-1 flex-wrap">
                    {walletName && (
                        <View className="bg-[#E4E8F7] px-2 py-0.5 rounded-[6px]">
                            <Text
                                numberOfLines={1}
                                className="text-[11px] font-semibold text-[#303B58]"
                            >
                                {walletName}
                            </Text>
                        </View>
                    )}

                    {walletName && <Text className="text-[10px] text-gray-500">•</Text>}

                    <Text numberOfLines={1} className="text-[12px] text-[#4A5568]">
                        {date}
                    </Text>
                </View>
            </View>

            {/* Right: Amount & Status */}
            <View className="items-end justify-center shrink-0">
                <Text className={`text-[16px] font-bold tracking-tight ${amountColor}`}>
                    {formatCurrency(amount, type)}
                </Text>
                {status && (
                    <Text className="text-[12px] font-semibold text-[#245436] mt-0.5">
                        {status}
                    </Text>
                )}
            </View>
        </Pressable>
    );
}
