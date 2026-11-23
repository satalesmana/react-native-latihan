import { ActionButton, CardDompet, LoadingUi, TransactionList } from '@/components';
import { CARD_THEMES, DEFAULT_CARD_ACCENT, DEFAULT_CARD_THEME } from '@/constants/cardThemes';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { supabase } from '../../../../lib/supabase';

export default function AdminHomeScreen() {
    const { user } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [dataDompet, setDataDompet] = useState<any[]>([])
    const { width } = useWindowDimensions()
    const CARD_GAP = 12
    const cardWidth = width * 0.70

    useEffect(() => {
        onLoadData()
    }, [])

    const onLoadData=async ()=>{
        try {
            setLoading(true)
             const { data, error } = await supabase
                    .from('dompet')
                    .select()
            if (error) throw error
            setDataDompet(data)
            console.log('Data dompet:', data);
        }catch (error:any) {
            console.log('Error saat load data:', error);
        }finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView>
            <View className='p-2 bg-white'>
                <LoadingUi visible={loading}/>

                <CardDompet
                    saldo={200}
                    namaDompet="TOTAL SALDO TERGABUNG"
                    nomorKartu="T001"
                    theme={ DEFAULT_CARD_THEME}
                    accentColor={DEFAULT_CARD_ACCENT.color}
                />

                <View className="flex-row gap-3 py-5">
                    <ActionButton 
                        type="cash-in" 
                        onPress={() => console.log('Cash-In')} 
                    />
                    <ActionButton 
                        type="cash-out" 
                        onPress={() => console.log('Cash-Out')} 
                    />
                </View>

                <View className='flex gap-2 flex-row justify-between py-4'>
                    <View>
                        <Text className='text-[18px] text-[#131B2E]'>Dompet Saya</Text>
                    </View>
                    <View>
                        <TouchableOpacity 
                            onPress={()=> router.push('/(admin)/dompet')}>
                            <Text className='text-[#3525CD]'>+ Tambah</Text>
                        </TouchableOpacity> 
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={cardWidth + CARD_GAP}
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: CARD_GAP }}
                >
                    {dataDompet.map((item) => (
                        <View key={item.id} style={{ width: cardWidth }}>
                            <CardDompet
                                saldo={Number(item.balance) || 0}
                                namaDompet={item.name}
                                nomorKartu={String(item.id ?? '').slice(-4).padStart(4, '0')}
                                theme={CARD_THEMES.find((t) => t.id === item.cardbackground) ?? DEFAULT_CARD_THEME}
                                accentColor={item.cardcolor || DEFAULT_CARD_ACCENT.color}
                            />
                        </View>
                    ))}
                </ScrollView>

                <View className='flex gap-2 flex-row justify-between py-4'>
                    <View>
                        <Text className='text-[18px] text-[#131B2E]'>Transaksi Terakhir</Text>
                    </View>
                    <View>
                        <TouchableOpacity 
                            onPress={()=> console.log('Lihat Semua')}>
                            <Text className='text-[#3525CD]'>Lihat Semua</Text>
                        </TouchableOpacity> 
                    </View>
                </View>

                
                <View className="gap-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <TransactionList
                            key={index}
                            title="Pembelian Token Listrik"
                            walletName="Dompet Operasional"
                            date="Kemarin, 09:15"
                            amount={150000}
                            type="out"
                            status="Berhasil"
                            onPress={() => console.log('Detail', index)}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
  