import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../contexts/AuthContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  const onSubmit = async () => {
    if (!nombre.trim() || !apellido.trim() || !mail.trim() || !password) {
      Alert.alert('Faltan datos', 'Nombre, apellido, mail y contraseña son obligatorios.');
      return;
    }
    setSubmitting(true);
    try {
      await register({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        mail: mail.trim(),
        password,
        fechaNacimiento: fechaNacimiento.trim() || null,
        direccion: direccion.trim() || null,
      });
      // Tras el registro queda autenticado automáticamente.
    } catch (e) {
      Alert.alert('No se pudo crear la cuenta', e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 24 }}
        >
        <Text style={styles.title}>Crear cuenta</Text>

        <View style={styles.formBox}>
          <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
          <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
          <TextInput
            style={styles.input}
            placeholder="Mail"
            value={mail}
            onChangeText={setMail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha de nacimiento (YYYY-MM-DD)"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            autoCapitalize="none"
          />
          <GooglePlacesAutocomplete
            placeholder="Buscar dirección"
            fetchDetails={true}
            debounce={400}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            minLength={2}
            onPress={(data, details = null) => {
              setDireccion(data.description);
            }}
            onFail={(error) => {
              console.log("GOOGLE ERROR:", error);
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: 'es',
              components: 'country:ar',
            }}
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                borderWidth: 1,
                borderColor: '#222',
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 10,
                marginVertical: 6,
                backgroundColor: '#fff',
              },
              listView: {
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#ccc',
                zIndex: 9999,
                elevation: 5,
              },
            }}
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.btn, (submitting || pressed) && { opacity: 0.7 }]}
          onPress={onSubmit}
          disabled={submitting}
        >
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Crear cuenta</Text>}
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Login')} style={styles.linkWrap}>
          <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fafafa' },
  title: { fontSize: 26, fontWeight: '700', textAlign: 'center', marginTop: 24, marginBottom: 16 },
  formBox: {
    borderWidth: 1, borderColor: '#222', borderRadius: 18, padding: 12, marginTop: 12,
  },
  input: {
    borderWidth: 1, borderColor: '#222', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 10, marginVertical: 6,
    backgroundColor: '#fff',
  },
  btn: {
    marginTop: 24, backgroundColor: '#5fa9ff', padding: 16, borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  linkWrap: { marginTop: 18, alignItems: 'center' },
  link: { color: '#1e6fd9', textDecorationLine: 'underline', fontSize: 14 },
});
