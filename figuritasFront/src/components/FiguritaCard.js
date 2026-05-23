import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FiguritaCard({ figurita, cantidad, usuario }) {
  return (
    <View style={styles.card}>
      <View style={styles.miniCard}>
        <Text style={styles.miniText}>{figurita.pais}</Text>
        <Text style={styles.miniText}>Número{'\n'}figurita</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.jugador} numberOfLines={1}>{figurita.jugador}</Text>
        <Text style={styles.detail}>{figurita.pais}</Text>
        <Text style={styles.detail}>#{figurita.nroFigurita}</Text>
      </View>

      <View style={styles.right}>
        {cantidad != null && <Text style={styles.cantidad}>x{cantidad}</Text>}
        {usuario && <Text style={styles.usuario} numberOfLines={1}>{usuario.nombre}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 22,
    padding: 12,
    marginVertical: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  miniCard: {
    width: 72,
    height: 72,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    padding: 4,
  },
  miniText: { fontSize: 10, textAlign: 'center' },
  info: { flex: 1 },
  jugador: { fontSize: 18, fontWeight: '700' },
  detail: { fontSize: 13, color: '#333' },
  right: { alignItems: 'flex-end', marginLeft: 8, minWidth: 60 },
  cantidad: { fontSize: 16, fontWeight: '600' },
  usuario: { fontSize: 12, color: '#666', marginTop: 2 },
});
