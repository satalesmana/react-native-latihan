import { JwtPayload } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { supabase } from '../../../../lib/supabase';

export default function AdminHomeScreen() {
    const [claims, setClaims] = useState<JwtPayload | null>(null)

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
            {claims && <Text>{JSON.stringify(claims)}</Text>}
        </View>
    );
}
  