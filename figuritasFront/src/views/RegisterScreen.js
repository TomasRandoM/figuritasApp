import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getPlaces, getPlaceDetails } from "../services/api";
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const [direccion, setDireccion] = useState('');
  const [places, setPlaces] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const searchPlaces = async (text) => {
    setDireccion(text);

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

  const onSubmit = async () => {
    if (!nombre || !apellido || !mail || !password) {
      Alert.alert('Faltan datos');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        nombre,
        apellido,
        mail,
        password,
        fechaNacimiento: fechaNacimiento || null,

        direccion: selectedLocation?.direccion || direccion || null,
        latitud: selectedLocation?.latitud || null,
        longitud: selectedLocation?.longitud || null,
        maps_link: selectedLocation?.maps_link || null,
      });
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#fafafa' }}>
      <ScrollView keyboardShouldPersistTaps="handled">

        <Text style={{
          fontSize: 26,
          fontWeight: '700',
          textAlign: 'center',
          marginTop: 24,
          marginBottom: 16
        }}>
          Crear cuenta
        </Text>

        <View style={{
          borderWidth: 1,
          borderColor: '#222',
          borderRadius: 18,
          padding: 12,
          marginTop: 12
        }}>

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#222',
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 10,
              marginVertical: 6,
              backgroundColor: '#fff'
            }}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#222',
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 10,
              marginVertical: 6,
              backgroundColor: '#fff'
            }}
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#222',
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 10,
              marginVertical: 6,
              backgroundColor: '#fff'
            }}
            placeholder="Mail"
            value={mail}
            onChangeText={setMail}
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#222',
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 10,
              marginVertical: 6,
              backgroundColor: '#fff'
            }}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#222',
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 10,
              marginVertical: 6,
              backgroundColor: '#fff'
            }}
            placeholder="Fecha nacimiento"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
          />

          {/* DIRECCIÓN */}
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#222',
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 10,
              marginVertical: 6,
              backgroundColor: '#fff'
            }}
            placeholder="Buscar dirección"
            value={direccion}
            onChangeText={searchPlaces}
          />

          {/* RESULTADOS */}
          {places.map((item) => (
            <Pressable
              key={item.place_id}
              onPress={async () => {
                try {
                  const data = await getPlaceDetails(item.place_id);
                  const result = data.result;

                  setDireccion(result.formatted_address);

                  setSelectedLocation({
                    direccion: result.formatted_address,
                    latitud: result.geometry.location.lat,
                    longitud: result.geometry.location.lng,
                    maps_link: `https://www.google.com/maps?q=${result.geometry.location.lat},${result.geometry.location.lng}`
                  });

                  setPlaces([]);
                } catch (e) {
                  console.log("DETAILS ERROR:", e);
                }
              }}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: '#ddd',
                backgroundColor: '#fff'
              }}
            >
              <Text>{item.description}</Text>
            </Pressable>
          ))}

        </View>

        <Pressable
          style={{
            marginTop: 24,
            backgroundColor: '#5fa9ff',
            padding: 16,
            borderRadius: 12,
            alignItems: 'center'
          }}
          onPress={onSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
              Crear cuenta
            </Text>
          )}
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}