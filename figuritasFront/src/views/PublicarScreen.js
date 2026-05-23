import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FiguritaController from '../controllers/FiguritaController';
import PublicacionController from '../controllers/PublicacionController';
import { useAuth } from '../contexts/AuthContext';

export default function PublicarScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [nro, setNro] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [figurita, setFigurita] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // Busca la figurita por nro_figurita mientras el usuario tipea
  useEffect(() => {
    if (!nro.trim()) {
      setFigurita(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const results = await FiguritaController.search(nro.trim());
        if (cancelled) return;
        const exact = results.find(
          (f) => f.nroFigurita.toLowerCase() === nro.trim().toLowerCase()
        );
        setFigurita(exact || results[0] || null);
      } catch (e) {
        if (!cancelled) console.warn(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 350);
    return () => { cancelled = true; clearTimeout(t); };
  }, [nro]);

  const enviar = async () => {
    if (!figurita) {
      Alert.alert('Falta figurita', 'Ingresá un número de figurita válido.');
      return;
    }
    const cant = parseInt(cantidad, 10);
    if (!cant || cant <= 0) {
      Alert.alert('Cantidad inválida', 'Ingresá una cantidad mayor a cero.');
      return;
    }
    if (!currentUser) {
      Alert.alert('Sesión inválida', 'Volvé a iniciar sesión.');
      return;
    }
    setSending(true);
    try {
      await PublicacionController.create({
        figuritaId: figurita.id,
        usuarioId: currentUser.id,
        cantidad: cant,
      });
      Alert.alert('Publicación enviada', `${figurita.jugador} x${cant}`);
      setNro('');
      setCantidad('');
      setFigurita(null);
      navigation.navigate('Perfil');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.formBox}>
        <TextInput
          style={styles.input}
          placeholder="NroFigurita"
          value={nro}
          onChangeText={setNro}
          autoCapitalize="characters"
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          keyboardType="number-pad"
          value={cantidad}
          onChangeText={setCantidad}
        />
      </View>

      <View style={styles.preview}>
        {loading ? (
          <ActivityIndicator />
        ) : figurita ? (
          <View style={styles.previewRow}>
            <View style={styles.miniCard}>
              {figurita.imagenUrl ? (
                <Image
                  source={{ uri: figurita.imagenUrl }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              ) : (
                <>
                  <Text style={styles.miniText}>{figurita.pais}</Text>
                  <Text style={styles.miniText}>Número{'\n'}camiseta</Text>
                </>
              )}
            </View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.jugador} numberOfLines={1}>{figurita.jugador}</Text>
              <Text>{figurita.pais}</Text>
              <Text>#{figurita.nroFigurita}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.placeholder}>Ingresá un número para ver la figurita.</Text>
        )}
      </View>

      <Pressable
        style={({ pressed }) => [styles.btn, (sending || pressed) && { opacity: 0.7 }]}
        onPress={enviar}
        disabled={sending}
      >
        <Text style={styles.btnText}>{sending ? 'Enviando...' : 'Enviar'}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fafafa' },
  formBox: {
    borderWidth: 1, borderColor: '#222', borderRadius: 18, padding: 12, marginTop: 24,
  },
  input: {
    borderWidth: 1, borderColor: '#222', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 10, marginVertical: 6,
    backgroundColor: '#fff',
  },
  preview: {
    borderWidth: 1, borderColor: '#222', borderRadius: 18, padding: 16,
    marginTop: 16, minHeight: 110, justifyContent: 'center',
  },
  previewRow: { flexDirection: 'row', alignItems: 'center' },
  miniCard: {
    width: 84, height: 84, borderRadius: 14, borderWidth: 1, borderColor: '#222',
    alignItems: 'center', justifyContent: 'center', padding: 4, overflow: 'hidden',
  },
  previewImage: { width: '100%', height: '100%', borderRadius: 12 },
  miniText: { fontSize: 10, textAlign: 'center' },
  jugador: { fontSize: 20, fontWeight: '700' },
  placeholder: { textAlign: 'center', color: '#666' },
  btn: {
    marginTop: 32, backgroundColor: '#5fa9ff', padding: 16, borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
