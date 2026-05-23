import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator, Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import UsuarioController from '../controllers/UsuarioController';
import PublicacionController from '../controllers/PublicacionController';
import FiguritaCard from '../components/FiguritaCard';
import { useAuth } from '../contexts/AuthContext';

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

  const totalDisponibles = publicaciones.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{isOwnProfile ? 'Perfil' : 'Perfil de usuario'}</Text>
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
          <FiguritaCard figurita={item.figurita} cantidad={item.cantidad} />
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
  container: { flex: 1, padding: 16, backgroundColor: '#fafafa' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  headerTitle: { fontSize: 14, color: '#666' },
  logout: { fontSize: 13, color: '#a00', textDecorationLine: 'underline' },
  userBox: {
    borderWidth: 1, borderColor: '#222', borderRadius: 18, padding: 16, marginBottom: 12,
  },
  line: { fontSize: 14, marginVertical: 2 },
  section: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginVertical: 12 },
  footer: { textAlign: 'right', marginTop: 8, fontSize: 13 },
  empty: { textAlign: 'center', marginTop: 24, color: '#666' },
  error: { color: '#a00' },
});
