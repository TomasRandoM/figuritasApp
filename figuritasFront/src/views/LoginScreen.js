import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../contexts/AuthContext';

const NAVY     = '#0D1B2A';
const NAVY_MID = '#0f2236';
const GOLD     = '#D4AF37';
const WHITE    = '#FFFFFF';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [mail, setMail]           = useState('');
  const [password, setPassword]   = useState('');
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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      
      <View style={styles.glowTop}    pointerEvents="none" />
      <View style={styles.glowBottom} pointerEvents="none" />

      {/* Logo / título */}
      <View style={styles.heroWrap}>
        <View style={styles.emblem}>
          <Text style={styles.emblemText}>⚽</Text>
        </View>
        <Text style={styles.worldCup}>MUNDIAL 2026</Text>
        <Text style={styles.title}>Figuritas</Text>
        <View style={styles.titleUnderline} />
      </View>

      {/* Formulario */}
      <View style={styles.formBox}>
        <Text style={styles.fieldLabel}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@mail.com"
          placeholderTextColor="rgba(212,175,55,0.35)"
          value={mail}
          onChangeText={setMail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <View style={styles.divider} />
        <Text style={styles.fieldLabel}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="rgba(212,175,55,0.35)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Botón principal */}
      <Pressable
        style={({ pressed }) => [styles.btn, (submitting || pressed) && styles.btnPressed]}
        onPress={onSubmit}
        disabled={submitting}
      >
        {submitting
          ? <ActivityIndicator color={NAVY} />
          : <Text style={styles.btnText}>Entrar</Text>
        }
      </Pressable>

      {/* Link registro */}
      <Pressable onPress={() => navigation.navigate('Register')} style={styles.linkWrap}>
        <Text style={styles.link}>¿No tenés cuenta? <Text style={styles.linkBold}>Registrate</Text></Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  /* Resplandores */
  glowTop: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(212,175,55,0.06)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -80,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(212,175,55,0.04)',
  },

  /* Hero */
  heroWrap: {
    alignItems: 'center',
    marginBottom: 36,
  },
  emblem: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: GOLD,
    backgroundColor: 'rgba(212,175,55,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emblemText: {
    fontSize: 32,
  },
  worldCup: {
    fontSize: 10,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 3,
    marginBottom: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: WHITE,
    letterSpacing: 0.5,
  },
  titleUnderline: {
    marginTop: 8,
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: GOLD,
  },

  /* Formulario */
  formBox: {
    backgroundColor: NAVY_MID,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.20)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  input: {
    backgroundColor: NAVY,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.30)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: WHITE,
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(212,175,55,0.12)',
    marginVertical: 14,
  },

  /* Botón */
  btn: {
    backgroundColor: GOLD,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnPressed: {
    opacity: 0.75,
  },
  btnText: {
    color: NAVY,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  /* Link */
  linkWrap: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: 'rgba(212,175,55,0.55)',
    fontSize: 14,
  },
  linkBold: {
    color: GOLD,
    fontWeight: '700',
  },
});