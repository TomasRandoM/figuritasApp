import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PublicacionController from '../controllers/PublicacionController';
import FiguritaCard from '../components/FiguritaCard';

export default function MarketplaceScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [pubs, setPubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (q) => {
    setLoading(true);
    setError(null);
    try {
      const data = q ? await PublicacionController.search(q) : await PublicacionController.getAll();
      setPubs(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(''); }, [load]);

  // debounce-light: busca al dejar de tipear durante 350ms
  useEffect(() => {
    const t = setTimeout(() => load(query.trim()), 350);
    return () => clearTimeout(t);
  }, [query, load]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.headerTitle}>MarketPlace Figuritas</Text>

      <TextInput
        style={styles.search}
        placeholder="Buscar jugador/país/numero figurita"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
      />

      <FlatList
        data={pubs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FiguritaCard
            figurita={item.figurita}
            cantidad={item.cantidad}
            usuario={item.usuario}
            onUserPress={() => navigation.navigate('UserProfile', { userId: item.usuario.id })}
          />
        )}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => load(query)} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>
              {error ? `Error: ${error}` : 'Sin resultados.'}
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fafafa' },
  headerTitle: { fontSize: 14, color: '#666', marginBottom: 8 },
  search: {
    borderWidth: 1, borderColor: '#222', borderRadius: 24,
    paddingHorizontal: 16, paddingVertical: 10, marginBottom: 12,
    backgroundColor: '#fff',
  },
  empty: { textAlign: 'center', marginTop: 24, color: '#666' },
});
