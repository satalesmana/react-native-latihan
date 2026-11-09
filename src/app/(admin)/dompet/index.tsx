import { CardColorPicker, CardDompet, Chip, LoadingUi, MyButton, MyTextInput } from '@/components';
import { CARD_ACCENTS, DEFAULT_CARD_ACCENT, DEFAULT_CARD_THEME } from '@/constants/cardThemes';
import { JwtPayload } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { supabase } from '../../../../lib/supabase';

export default function AdminDompetScreen() {
    const [namaDompet, setNamaDompet] = useState('')
    const [saldoAwal, setSaldoAwal] = useState('')
    const [theme, setTheme] = useState(DEFAULT_CARD_THEME)
    const [accent, setAccent] = useState(DEFAULT_CARD_ACCENT)
    const [claims, setClaims] = useState<JwtPayload | null>(null)
    const [loading, setLoading] = useState(false)
    
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getClaims().then(({ data: { claims } }) => {
            setClaims(claims)
        })
        supabase.auth.onAuthStateChange(() => {
            supabase.auth.getClaims().then(({ data: { claims } }) => {
                setClaims(claims)
            })
        })
    }, [])

    // ambil angka saja dari input saldo
    const onChangeSaldo = (text: string) => {
        setSaldoAwal(text.replace(/[^0-9]/g, ''))
    }

    const onSimpanDompet = async () => {
        try {
            setLoading(true)
            if (namaDompet.trim().length < 1) {
                throw new Error('Nama dompet wajib diisi')
            } 

            const { data, error } = await supabase
                .from('dompet')
                .insert([{ 
                    user_id: claims?.sub || 'xxxxxx', 
                    name:namaDompet.trim(),
                    cardbackground: theme.id,
                    cardcolor: accent.color,
                    balance: Number(saldoAwal) || 0 
                }
                ])
                .select()

            if (error) throw error

            Alert.alert(
                'Sukses',
                'Dompet berhasil disimpan',
                [
                    { text: 'OK', onPress: () => router.dismissTo('/(admin)/home') },
                ],
                { cancelable: false }
            )
        }catch (error:any) {
            console.error('Error saat menyimpan dompet:', error);
            Alert.alert('Error', error.message || 'Terjadi kesalahan saat menyimpan dompet');
        }finally {
            setLoading(false)
        }
    }

    const onBatal = () => {
        if (router.canGoBack()) router.back()
    }

    return (
        <ScrollView contentContainerClassName="p-4 bg-white">
            <CardDompet
                saldo={Number(saldoAwal) || 0}
                namaDompet={namaDompet.trim() || 'Dompet Utama'}
                nomorKartu="9021"
                validThru="12/29"
                theme={theme}
                accentColor={accent.color}
            />
            <LoadingUi visible={loading}/>
            
            <View className="mt-6">
                <Text className="text-[14px] font-semibold text-[#0A0A0A] mb-2">Nama Dompet</Text>
                <MyTextInput
                    value={namaDompet}
                    onChangeText={setNamaDompet}
                    placeholder="Contoh: Dompet Utama"
                />

                <Text className="text-[14px] font-semibold text-[#0A0A0A] mb-2">Saldo Awal</Text>
                <MyTextInput
                    value={saldoAwal}
                    onChangeText={onChangeSaldo}
                    placeholder="0"
                    keyboardType="numeric"
                />

                <CardColorPicker value={theme.id} onChange={setTheme} />

                <View className="mb-[15px]">
                    <View className="flex-row justify-between items-center mb-[10px]">
                        <Text className="text-[14px] font-semibold text-[#0A0A0A]">Warna Huruf & Aksen</Text>
                        <Text className="text-[13px] text-[#626262]">{accent.fullName}</Text>
                    </View>
                    <View className="flex-row gap-2">
                        {CARD_ACCENTS.map((item) => (
                            <Chip
                                key={item.id}
                                label={item.name}
                                dotColor={item.color}
                                selected={item.id === accent.id}
                                onPress={() => setAccent(item)}
                                className="flex-1"
                            />
                        ))}
                    </View>
                </View>
            </View>

            <View className="flex-col gap-2 mt-4">
                <MyButton
                    text="Simpan Dompet"
                    btnType="Primary"
                    action={onSimpanDompet}
                />
                <MyButton
                    text="Batal"
                    btnType="Secondary"
                    action={onBatal}
                />
            </View>
        </ScrollView>
    );
}
