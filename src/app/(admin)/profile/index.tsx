import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../../../lib/supabase';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearAuth } from '../../../store/slices/authSlice';

interface MenuItemProps {
    icon: keyof typeof Feather.glyphMap;
    title: string;
    onPress?: () => void;
    isDestructive?: boolean;
}

function ProfileMenuItem({ icon, title, onPress, isDestructive }: MenuItemProps) {
    return (
        <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={styles.menuLeft}>
                <View
                    style={[
                        styles.menuIconContainer,
                        isDestructive && styles.menuIconContainerDestructive,
                    ]}
                >
                    <Feather
                        name={icon}
                        size={20}
                        color={isDestructive ? '#EF4444' : '#1F41BB'}
                    />
                </View>
                <Text
                    style={[
                        styles.menuText,
                        isDestructive && styles.menuTextDestructive,
                    ]}
                >
                    {title}
                </Text>
            </View>
            <Feather
                name="chevron-right"
                size={20}
                color={isDestructive ? '#FCA5A5' : '#94A3B8'}
            />
        </TouchableOpacity>
    );
}

export default function AdminProfileScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const { user } = useAppSelector((state) => state.auth);

    const email = user?.email || '-';

    const handleSignOut = () => {
        Alert.alert('Sign Out', 'Apakah Anda yakin ingin keluar?', [
            { text: 'Batal', style: 'cancel' },
            {
                text: 'Keluar',
                style: 'destructive',
                onPress: async () => {
                    await supabase.auth.signOut();
                    dispatch(clearAuth());
                    router.replace('/login');
                },
            },
        ]);
    };

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="light-content" backgroundColor="#1F41BB" />

            {/* Area Header dengan Background #1F41BB */}
            <View style={[styles.headerArea, { paddingTop: Math.max(insets.top, 16) }]}>
                {/* Navigasi Atas (Back button) */}
                <View style={styles.navBar}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.navButton}
                        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Profile Card Floating */}
                <View style={styles.profileCard}>
                    <View style={styles.profileInfo}>
                        <Text style={styles.labelSub}>Email</Text>
                        <Text style={styles.userEmail} numberOfLines={2}>
                            {email}
                        </Text>
                    </View>

                    <View style={styles.userIconWrapper}>
                        <MaterialCommunityIcons
                            name="account"
                            size={44}
                            color="#1F41BB"
                        />
                    </View>
                </View>
            </View>

            {/* Container Putih Melengkung (Action List Menu) */}
            <View style={styles.bottomSheetContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.bottomSheetContent,
                        { paddingBottom: Math.max(insets.bottom + 20, 36) },
                    ]}
                >
                    <ProfileMenuItem
                        icon="info"
                        title="About Us"
                        onPress={() => {}}
                    />
                    <ProfileMenuItem
                        icon="file-text"
                        title="Syarat dan Ketentuan"
                        onPress={() => {}}
                    />
                    <ProfileMenuItem
                        icon="shield"
                        title="Kebijakan Privasi"
                        onPress={() => {}}
                    />
                    <ProfileMenuItem
                        icon="log-out"
                        title="Sign Out"
                        isDestructive
                        onPress={handleSignOut}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1F41BB',
    },
    headerArea: {
        backgroundColor: '#1F41BB',
        paddingHorizontal: 20,
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    navButton: {
        padding: 4,
    },
    profileCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        marginTop: 14,
        marginBottom: 26,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
        elevation: 8,
    },
    profileInfo: {
        flex: 1,
        paddingRight: 16,
    },
    labelSub: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    userIconWrapper: {
        width: 72,
        height: 72,
        borderRadius: 20,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        paddingHorizontal: 24,
        paddingTop: 28,
    },
    bottomSheetContent: {
        gap: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    menuIconContainer: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIconContainerDestructive: {
        backgroundColor: '#FEE2E2',
    },
    menuText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1E293B',
    },
    menuTextDestructive: {
        color: '#EF4444',
    },
});
