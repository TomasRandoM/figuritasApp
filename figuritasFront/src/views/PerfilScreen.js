import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator, Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import UsuarioController from '../controllers/UsuarioController';
import PublicacionController from '../controllers/PublicacionController';
import FiguritaCard from '../components/FiguritaCard';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const NAVY  = '#0D1B2A';
const GOLD  = '#D4AF37';
const MUTED = 'rgba(212,175,55,0.30)';
const LIGHT = '#E0E1DD';

export default function PerfilScreen({ route }) {
  const { currentUser, logout } = useAuth();
  const userIdParam = route?.params?.userId;
  const targetUserId = userIdParam ?? currentUser?.id;
  const isOwnProfile = !userIdParam || userIdParam === currentUser?.id;

  const [usuario, setUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!targetUserId) return;
    setLoading(true);
    setError(null);
    try {
      const [u, pubs] = await Promise.all([
        UsuarioController.getById(targetUserId),
        PublicacionController.getByUsuario(targetUserId),
      ]);
      setUsuario(u);
      setPublicaciones(pubs);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (publicacionId) => {
    try {
      console.log(123);
      const ok = await PublicacionController.delete({
        publicacionId,
      });

      if (ok) {
        setPublicaciones((prev) =>
          prev.filter((p) => p.id !== publicacionId)
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const totalDisponibles = publicaciones.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      <View style={styles.headerRow}>

        <View style={styles.headerLeft}>

          <View style={styles.headerAccent} />

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerSub}>MUNDIAL 2026</Text>
            <Text style={styles.headerTitle}>
              {isOwnProfile ? 'Perfil' : 'Perfil de usuario'}
            </Text>
          </View>

        </View>

        {isOwnProfile && (
          <Pressable onPress={logout} hitSlop={8}>
            <Text style={styles.logout}>Cerrar sesión</Text>
          </Pressable>
        )}

      </View>
      <View style={styles.userBox}>
        {usuario ? (
          <>
            <Text style={styles.line}>{usuario.nombreCompleto}</Text>
            <Text style={styles.line}>Edad: {usuario.edad ?? '-'}</Text>
            <Text style={styles.line}>{usuario.mail}</Text>
            <Text style={styles.line}>{usuario.direccion}</Text>
          </>
        ) : loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.error}>{error || 'No se pudo cargar el usuario.'}</Text>
        )}
      </View>

      <Text style={styles.section}>{isOwnProfile ? 'Mis Figuritas' : 'Figuritas publicadas'}</Text>

      <FlatList
        data={publicaciones}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <FiguritaCard
            figurita={item.figurita}
            cantidad={item.cantidad}
            onPerfil = {isOwnProfile}
            onDelete = {() => handleDelete(item.id)}
          />  
        </View>
      )}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>
              {error ? `Error: ${error}` : (isOwnProfile ? 'No tenés figuritas publicadas.' : 'Este usuario no tiene publicaciones.')}
            </Text>
          ) : null
        }
      />

      <Text style={styles.footer}>Figuritas disponibles: {totalDisponibles}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: NAVY },
  logout: { fontSize: 13, color: GOLD, borderWidth: 1, borderColor: 'rgba(212,175,55,0.30)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, overflow: 'hidden'},
  userBox: { backgroundColor: '#132238', borderWidth: 1, borderColor: 'rgba(212,175,55,0.25)', borderRadius: 24, padding: 20, marginBottom: 20,
},
  line: { fontSize: 14, marginVertical: 2, color: LIGHT },
  section: {fontSize: 24, fontWeight: '700', color: GOLD, extAlign: 'center', marginBottom: 18},
  footer: { textAlign: 'right', marginTop: 10, marginBottom: 12, fontSize: 14, color: MUTED},
  empty: { textAlign: 'center', marginTop: 24, color: '#666' },
  error: { color: '#a00' },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, marginBottom: 18 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 18, gap: 10 },
  headerTextWrap: { gap: 1 },
  headerSub: { fontSize: 10, fontWeight: '700', color: GOLD, letterSpacing: 2.5 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: LIGHT, letterSpacing: 0.3 },
  headerAccent: { width: 4, height: 44, borderRadius: 4, backgroundColor: GOLD },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10},
});
