import { JwtPayload } from '@supabase/supabase-js';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { supabase } from '../../../../lib/supabase';

export default function AdminHomeScreen() {
    const [claims, setClaims] = useState<JwtPayload | null>(null)
    const router = useRouter();

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

    return (
        <View>
            <Text>Admin Home Screen</Text>

            <Button title="new dompet" onPress={()=> router.push('/(admin)/dompet')} />

            {claims && <Text>{JSON.stringify(claims)}</Text>}    
        </View>
    );
}
  