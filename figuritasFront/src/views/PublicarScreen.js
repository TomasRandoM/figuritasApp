import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FiguritaController from "../controllers/FiguritaController";
import PublicacionController from "../controllers/PublicacionController";
import { useAuth } from "../contexts/AuthContext";

const NAVY = "#0D1B2A";
const NAVY_MID = "#0f2236";
const GOLD = "#D4AF37";
const WHITE = "#FFFFFF";

export default function PublicarScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [nro, setNro] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [figurita, setFigurita] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

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
          (f) => f.nroFigurita.toLowerCase() === nro.trim().toLowerCase(),
        );
        setFigurita(exact || results[0] || null);
      } catch (e) {
        if (!cancelled) console.warn(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [nro]);

  const enviar = async () => {
    if (!figurita) {
      Alert.alert("Falta figurita", "Ingresá un número de figurita válido.");
      return;
    }
    const cant = parseInt(cantidad, 10);
    if (!cant || cant <= 0) {
      Alert.alert("Cantidad inválida", "Ingresá una cantidad mayor a cero.");
      return;
    }
    if (!currentUser) {
      Alert.alert("Sesión inválida", "Volvé a iniciar sesión.");
      return;
    }
    setSending(true);
    try {
      await PublicacionController.create({
        figuritaId: figurita.id,
        usuarioId: currentUser.id,
        cantidad: cant,
      });
      Alert.alert("Publicación enviada", `${figurita.jugador} x${cant}`);
      setNro("");
      setCantidad("");
      setFigurita(null);
      navigation.navigate("Perfil");
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.bgGlow} pointerEvents="none" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerAccent} />
        <View>
          <Text style={styles.headerSub}>MUNDIAL 2026</Text>
          <Text style={styles.headerTitle}>Publicar</Text>
        </View>
      </View>

      {/* Formulario */}
      <View style={styles.formBox}>
        <Text style={styles.fieldLabel}>Figurita</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 07 o Messi"
          placeholderTextColor="rgba(212,175,55,0.35)"
          value={nro}
          onChangeText={setNro}
          autoCapitalize="words"
        />
        <Text style={styles.hint}>
          Podés buscar por número o nombre del jugador
        </Text>
        <View style={styles.divider} />
        <Text style={styles.fieldLabel}>Cantidad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 2"
          placeholderTextColor="rgba(212,175,55,0.35)"
          keyboardType="number-pad"
          value={cantidad}
          onChangeText={setCantidad}
        />
      </View>

      {/* Preview */}
      <View style={styles.preview}>
        {loading ? (
          <ActivityIndicator color={GOLD} />
        ) : figurita ? (
          <View style={styles.previewRow}>
            <View style={styles.stickerBorder}>
              <View style={styles.miniCard}>
                {figurita.imagenUrl ? (
                  <Image
                    source={{ uri: figurita.imagenUrl }}
                    style={styles.previewImage}
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
            <View style={styles.previewInfo}>
              <Text style={styles.jugador} numberOfLines={1}>
                {figurita.jugador}
              </Text>
              <Text style={styles.previewPais}>{figurita.pais}</Text>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>#{figurita.nroFigurita}</Text>
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.placeholder}>
            Ingresá un número para ver la figurita.
          </Text>
        )}
      </View>

      {/* Botón */}
      <Pressable
        style={({ pressed }) => [
          styles.btn,
          (sending || pressed) && styles.btnPressed,
        ]}
        onPress={enviar}
        disabled={sending}
      >
        <Text style={styles.btnText}>
          {sending ? "Enviando..." : "Publicar figurita"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
    paddingHorizontal: 16,
  },

  bgGlow: {
    position: "absolute",
    top: -80,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(212,175,55,0.06)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 22,
    gap: 10,
  },
  headerAccent: {
    width: 4,
    height: 44,
    borderRadius: 4,
    backgroundColor: GOLD,
  },
  headerSub: {
    fontSize: 10,
    fontWeight: "700",
    color: GOLD,
    letterSpacing: 2.5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: WHITE,
    letterSpacing: 0.3,
  },

  /* Formulario */
  formBox: {
    backgroundColor: NAVY_MID,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.20)",
    borderRadius: 20,
    padding: 16,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: GOLD,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  input: {
    backgroundColor: NAVY,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.30)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: WHITE,
    fontSize: 15,
  },
  hint: {
    fontSize: 10,
    color: "rgba(212,175,55,0.40)",
    marginTop: 5,
    marginLeft: 4,
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(212,175,55,0.12)",
    marginVertical: 14,
  },

  /* Preview */
  preview: {
    backgroundColor: NAVY_MID,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.20)",
    borderRadius: 20,
    padding: 16,
    marginTop: 14,
    minHeight: 110,
    justifyContent: "center",
  },
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  stickerBorder: {
    padding: 2.5,
    borderRadius: 14,
    backgroundColor: GOLD,
  },
  miniCard: {
    width: 72,
    height: 72,
    borderRadius: 11,
    backgroundColor: "#162640",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: 4,
  },
  previewImage: { width: "100%", height: "100%", borderRadius: 9 },
  miniPais: {
    fontSize: 9,
    color: GOLD,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  miniJugador: {
    fontSize: 9,
    color: WHITE,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 2,
  },
  previewInfo: {
    flex: 1,
    gap: 4,
  },
  jugador: {
    fontSize: 18,
    fontWeight: "800",
    color: WHITE,
  },
  previewPais: {
    fontSize: 11,
    fontWeight: "700",
    color: GOLD,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  numberBadge: {
    backgroundColor: GOLD,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  numberText: {
    fontSize: 11,
    fontWeight: "800",
    color: NAVY,
  },
  placeholder: {
    textAlign: "center",
    color: "rgba(212,175,55,0.40)",
    fontSize: 13,
    fontWeight: "600",
  },

  /* Botón */
  btn: {
    marginTop: 24,
    backgroundColor: GOLD,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  btnPressed: {
    opacity: 0.75,
  },
  btnText: {
    color: NAVY,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
