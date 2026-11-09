import { LoadingUi } from '@/components';
import { JwtPayload } from '@supabase/supabase-js';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { supabase } from '../../../../lib/supabase';

export default function AdminHomeScreen() {
    const [claims, setClaims] = useState<JwtPayload | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [dataDompet, setDataDompet] = useState<any[]>([])

    useEffect(() => {
        supabase.auth.getClaims().then(({ data: { claims } }) => {
            setClaims(claims)
        })
        supabase.auth.onAuthStateChange(() => {
            supabase.auth.getClaims().then(({ data: { claims } }) => {
                setClaims(claims)
            })
        })
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

            <Button title="new dompet" onPress={()=> router.push('/(admin)/dompet')} />

            {claims && <Text>{JSON.stringify(claims)}</Text>}    
        </View>
    );
}
  