import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NAVY = '#0D1B2A';
const GOLD = '#D4AF37';
const WHITE = '#FFFFFF';

export default function FiguritaCard({ figurita, cantidad, usuario, onUserPress, onPerfil, onDelete}) {
  return (
    <View style={styles.card}>
      {onPerfil && (
        <Pressable style={styles.deleteButton} onPress={onDelete}>
          <Ionicons name="trash" size={18} color="#fff" />
        </Pressable>
      )}
      {/* Rayas decorativas de fondo */}
      <View style={styles.stripeContainer} pointerEvents="none">
        {[60, 95, 130, 165, 200].map((left, i) => (
          <View key={i} style={[styles.stripe, { left }]} />
        ))}
      </View>

      <View style={styles.topAccent} />

      <View style={styles.innerRow}>
        <View style={styles.stickerWrapper}>
          <View style={styles.stickerBorder}>
            <View style={styles.miniCard}>
              {figurita.imagenUrl ? (
                <Image
                  source={{ uri: figurita.imagenUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <>
                  <Text style={styles.miniPais}>{figurita.pais}</Text>
                  <Text style={styles.miniJugador} numberOfLines={2}>
                    {figurita.jugador}
                  </Text>
                </>
              )}
            </View>
          </View>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>#{figurita.nroFigurita}</Text>
          </View>
        </View>

        {/* Info central */}
        <View style={styles.info}>
          <Text style={styles.jugador} numberOfLines={1}>
            {figurita.jugador}
          </Text>
          <Text style={styles.pais}>{figurita.pais}</Text>
          {usuario &&
            (onUserPress ? (
              <Pressable onPress={onUserPress} hitSlop={6} style={styles.usuarioBadge}>
                <Text style={styles.usuarioText} numberOfLines={1}>
                  @{usuario.nombre}
                </Text>
              </Pressable>
            ) : (
              <View style={styles.usuarioBadge}>
                <Text style={styles.usuarioText} numberOfLines={1}>
                  @{usuario.nombre}
                </Text>
              </View>
            ))}
        </View>

        {/* Cantidad */}
        {cantidad != null && (
          <View style={styles.cantidadBadge}>
            <Text style={styles.cantidadX}>x</Text>
            <Text style={styles.cantidadNum}>{cantidad}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: NAVY,
    borderRadius: 20,
    marginVertical: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1e3a5f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  topAccent: {
    height: 3,
    backgroundColor: GOLD,
  },
  stripeContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  stripe: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: WHITE,
    opacity: 0.035,
    transform: [{ skewX: '-18deg' }],
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingTop: 10,
    gap: 14,
  },
  stickerWrapper: {
    alignItems: 'center',
    gap: 5,
  },
  stickerBorder: {
    padding: 2.5,
    borderRadius: 14,
    backgroundColor: GOLD,
  },
  miniCard: {
    width: 68,
    height: 68,
    borderRadius: 11,
    backgroundColor: '#162640',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 4,
  },
  image: { width: '100%', height: '100%', borderRadius: 10 },
  miniPais: {
    fontSize: 9,
    color: GOLD,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  miniJugador: {
    fontSize: 9,
    color: WHITE,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 2,
  },
  numberBadge: {
    backgroundColor: GOLD,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 2,
  },
  numberText: {
    fontSize: 11,
    fontWeight: '800',
    color: NAVY,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  jugador: {
    fontSize: 17,
    fontWeight: '800',
    color: WHITE,
    letterSpacing: 0.2,
  },
  pais: {
    fontSize: 11,
    fontWeight: '700',
    color: GOLD,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  usuarioBadge: {
    backgroundColor: 'rgba(212,175,55,0.10)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.30)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  usuarioText: {
    fontSize: 10,
    color: GOLD,
    fontWeight: '600',
  },
  cantidadBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212,175,55,0.08)',
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 42,
  },
  cantidadX: {
    fontSize: 10,
    color: GOLD,
    fontWeight: '500',
  },
  cantidadNum: {
    fontSize: 22,
    fontWeight: '800',
    color: GOLD,
    lineHeight: 24,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 20,
    backgroundColor: '#b00020',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});