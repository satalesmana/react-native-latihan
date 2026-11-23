import { CardDompet, LoadingUi } from '@/components';
import { CARD_THEMES, DEFAULT_CARD_ACCENT, DEFAULT_CARD_THEME } from '@/constants/cardThemes';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { Button, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { supabase } from '../../../../lib/supabase';

export default function AdminHomeScreen() {
    const { user } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [dataDompet, setDataDompet] = useState<any[]>([])
    const { width } = useWindowDimensions()
    const CARD_GAP = 12
    const cardWidth = width * 0.85

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
        <View>
            <LoadingUi visible={loading}/>

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

            <Button title="new dompet" onPress={()=> router.push('/(admin)/dompet')} />

            {user && <Text className="p-4 text-xs text-gray-500">Logged in as: {user.email}</Text>}
        </View>
    );
}
  