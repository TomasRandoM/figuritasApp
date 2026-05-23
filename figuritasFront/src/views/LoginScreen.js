import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!mail.trim() || !password) {
      Alert.alert('Faltan datos', 'Ingresá tu mail y tu contraseña.');
      return;
    }
    setSubmitting(true);
    try {
      await login(mail.trim(), password);
    } catch (e) {
      Alert.alert('No se pudo iniciar sesión', e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <View style={styles.formBox}>
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
      </View>

      <Pressable
        style={({ pressed }) => [styles.btn, (submitting || pressed) && { opacity: 0.7 }]}
        onPress={onSubmit}
        disabled={submitting}
      >
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Entrar</Text>}
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Register')} style={styles.linkWrap}>
        <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
      </Pressable>
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
