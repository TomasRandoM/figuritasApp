import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { getPlaces, getPlaceDetails } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const NAVY = "#0D1B2A";
const NAVY_MID = "#0f2236";
const GOLD = "#D4AF37";
const WHITE = "#FFFFFF";

const FIELDS = [
  {
    key: "nombre",
    label: "Nombre",
    placeholder: "Juan",
    secure: false,
    keyboard: "default",
  },
  {
    key: "apellido",
    label: "Apellido",
    placeholder: "Pérez",
    secure: false,
    keyboard: "default",
  },
  {
    key: "mail",
    label: "Correo electrónico",
    placeholder: "tu@mail.com",
    secure: false,
    keyboard: "email-address",
  },
  {
    key: "password",
    label: "Contraseña",
    placeholder: "••••••••",
    secure: true,
    keyboard: "default",
  },
  {
    key: "fechaNacimiento",
    label: "Fecha de nacimiento",
    placeholder: "DD/MM/AAAA",
    secure: false,
    keyboard: "default",
  },
];

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    password: "",
    fechaNacimiento: "",
  });
  const [direccion, setDireccion] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (val) => setValues((prev) => ({ ...prev, [key]: val }));

  const searchPlaces = async (text) => {
    setDireccion(text);
    setSelectedLocation(null);
    if (text.length < 3) {
      setPlaces([]);
      return;
    }
    try {
      const data = await getPlaces(text);
      setPlaces(data.predictions || []);
    } catch (err) {
      console.log("ERROR PLACES:", err);
    }
  };

  const pickPlace = async (item) => {
    try {
      const data = await getPlaceDetails(item.place_id);
      const result = data.result;
      setDireccion(result.formatted_address);
      setSelectedLocation({
        direccion: result.formatted_address,
        latitud: result.geometry.location.lat,
        longitud: result.geometry.location.lng,
        maps_link: `https://www.google.com/maps?q=${result.geometry.location.lat},${result.geometry.location.lng}`,
      });
      setPlaces([]);
    } catch (e) {
      console.log("DETAILS ERROR:", e);
    }
  };

  const onSubmit = async () => {
    const { nombre, apellido, mail, password } = values;
    if (!nombre || !apellido || !mail || !password) {
      Alert.alert("Faltan datos", "Completá todos los campos obligatorios.");
      return;
    }
    setSubmitting(true);
    try {
      await register({
        ...values,
        fechaNacimiento: values.fechaNacimiento || null,
        direccion: selectedLocation?.direccion || direccion || null,
        latitud: selectedLocation?.latitud || null,
        longitud: selectedLocation?.longitud || null,
        maps_link: selectedLocation?.maps_link || null,
      });
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.glowTop} pointerEvents="none" />
      <View style={styles.glowBottom} pointerEvents="none" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.heroWrap}>
          <View style={styles.emblem}>
            <Text style={styles.emblemText}>⚽</Text>
          </View>
          <Text style={styles.worldCup}>MUNDIAL 2026</Text>
          <Text style={styles.title}>Crear cuenta</Text>
          <View style={styles.titleUnderline} />
        </View>

        {/* Campos principales */}
        <View style={styles.formBox}>
          {FIELDS.map((f, i) => (
            <React.Fragment key={f.key}>
              <Text style={styles.fieldLabel}>{f.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={f.placeholder}
                placeholderTextColor="rgba(212,175,55,0.35)"
                value={values[f.key]}
                onChangeText={set(f.key)}
                secureTextEntry={f.secure}
                keyboardType={f.keyboard}
                autoCapitalize={
                  f.keyboard === "email-address" ? "none" : "words"
                }
                autoCorrect={false}
              />
              {i < FIELDS.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Dirección */}
        <View style={styles.formBox}>
          <Text style={styles.fieldLabel}>Dirección</Text>
          <View style={styles.addressInputWrap}>
            <Ionicons
              name="location-outline"
              size={16}
              color={GOLD}
              style={{ opacity: 0.7 }}
            />
            <TextInput
              style={styles.addressInput}
              placeholder="Buscar dirección..."
              placeholderTextColor="rgba(212,175,55,0.35)"
              value={direccion}
              onChangeText={searchPlaces}
            />
            {selectedLocation && (
              <Ionicons name="checkmark-circle" size={16} color={GOLD} />
            )}
          </View>

          {places.length > 0 && (
            <View style={styles.placesList}>
              {places.map((item, i) => (
                <React.Fragment key={item.place_id}>
                  <Pressable
                    onPress={() => pickPlace(item)}
                    style={({ pressed }) => [
                      styles.placeItem,
                      pressed && styles.placeItemPressed,
                    ]}
                  >
                    <Ionicons
                      name="location-outline"
                      size={13}
                      color={GOLD}
                      style={{ opacity: 0.6, marginTop: 1 }}
                    />
                    <Text style={styles.placeText} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </Pressable>
                  {i < places.length - 1 && (
                    <View style={styles.placeDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.btn,
            (submitting || pressed) && styles.btnPressed,
          ]}
          onPress={onSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color={NAVY} />
          ) : (
            <Text style={styles.btnText}>Crear cuenta</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={styles.linkWrap}
        >
          <Text style={styles.link}>
            ¿Ya tenés cuenta? <Text style={styles.linkBold}>Iniciá sesión</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
    paddingHorizontal: 24,
  },
  scroll: {
    paddingBottom: 32,
  },

  glowTop: {
    position: "absolute",
    top: -100,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(212,175,55,0.06)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -80,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(212,175,55,0.04)",
  },

  /* Hero */
  heroWrap: {
    alignItems: "center",
    marginTop: 28,
    marginBottom: 28,
  },
  emblem: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: GOLD,
    backgroundColor: "rgba(212,175,55,0.10)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emblemText: { fontSize: 28 },
  worldCup: {
    fontSize: 10,
    fontWeight: "700",
    color: GOLD,
    letterSpacing: 3,
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: WHITE,
    letterSpacing: 0.3,
  },
  titleUnderline: {
    marginTop: 8,
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: GOLD,
  },

  /* Formulario */
  formBox: {
    backgroundColor: NAVY_MID,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.20)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
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
  divider: {
    height: 1,
    backgroundColor: "rgba(212,175,55,0.12)",
    marginVertical: 12,
  },

  /* Dirección */
  addressInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: NAVY,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.30)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 8,
  },
  addressInput: {
    flex: 1,
    color: WHITE,
    fontSize: 15,
    padding: 0,
  },
  placesList: {
    marginTop: 10,
    backgroundColor: NAVY,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.20)",
    borderRadius: 14,
    overflow: "hidden",
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  placeItemPressed: {
    backgroundColor: "rgba(212,175,55,0.08)",
  },
  placeText: {
    flex: 1,
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 18,
  },
  placeDivider: {
    height: 1,
    backgroundColor: "rgba(212,175,55,0.10)",
    marginHorizontal: 12,
  },

  /* Botón */
  btn: {
    backgroundColor: GOLD,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  btnPressed: { opacity: 0.75 },
  btnText: {
    color: NAVY,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  /* Link */
  linkWrap: { alignItems: "center" },
  link: { color: "rgba(212,175,55,0.55)", fontSize: 14 },
  linkBold: { color: GOLD, fontWeight: "700" },
});
