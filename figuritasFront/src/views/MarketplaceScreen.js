import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PublicacionController from '../controllers/PublicacionController';
import FiguritaCard from '../components/FiguritaCard';

const NAVY       = '#0D1B2A';
const NAVY_MID   = '#0f2236';
const GOLD       = '#D4AF37';
const GOLD_DIM   = 'rgba(212,175,55,0.18)';
const WHITE      = '#FFFFFF';

export default function MarketplaceScreen({ navigation }) {
  const [query, setQuery]     = useState('');
  const [pubs, setPubs]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const load = useCallback(async (q) => {
    setLoading(true);
    setError(null);
    try {
      const data = q
        ? await PublicacionController.search(q)
        : await PublicacionController.getAll();
      setPubs(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(''); }, [load]);

  useEffect(() => {
    const t = setTimeout(() => load(query.trim()), 350);
    return () => clearTimeout(t);
  }, [query, load]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      {/* Fondo decorativo: círculo difuso arriba */}
      <View style={styles.bgGlow} pointerEvents="none" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerAccent} />
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerSub}>MUNDIAL 2026</Text>
          <Text style={styles.headerTitle}>Marketplace</Text>
        </View>
      </View>

      {/* Buscador */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.search}
          placeholder="Jugador, país o número..."
          placeholderTextColor="rgba(212,175,55,0.45)"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
      </View>

      {/* Lista */}
      <FlatList
        data={pubs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FiguritaCard
            figurita={item.figurita}
            cantidad={item.cantidad}
            usuario={item.usuario}
            onUserPress={() =>
              navigation.navigate('UserProfile', { userId: item.usuario.id })
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => load(query)}
            tintColor={GOLD}
            colors={[GOLD]}
          />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyIcon}>⚽</Text>
              <Text style={styles.empty}>
                {error ? `Error: ${error}` : 'Sin resultados'}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
    paddingHorizontal: 16,
  },

  /* Resplandor decorativo de fondo */
  bgGlow: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(212,175,55,0.06)',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 18,
    gap: 10,
  },
  headerAccent: {
    width: 4,
    height: 44,
    borderRadius: 4,
    backgroundColor: GOLD,
  },
  headerTextWrap: {
    gap: 1,
  },
  headerSub: {
    fontSize: 10,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 2.5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: WHITE,
    letterSpacing: 0.3,
  },

  /* Buscador */
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAVY_MID,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.35)',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    gap: 8,
  },
  searchIcon: {
    fontSize: 15,
  },
  search: {
    flex: 1,
    fontSize: 14,
    color: WHITE,
    padding: 0,
  },

  /* Lista */
  listContent: {
    paddingBottom: 32,
    paddingTop: 4,
  },

  /* Empty state */
  emptyWrap: {
    alignItems: 'center',
    marginTop: 60,
    gap: 10,
  },
  emptyIcon: {
    fontSize: 40,
  },
  empty: {
    textAlign: 'center',
    color: 'rgba(212,175,55,0.5)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});