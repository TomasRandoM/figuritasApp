import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import PerfilScreen from '../views/PerfilScreen';
import MarketplaceScreen from '../views/MarketplaceScreen';
import PublicarScreen from '../views/PublicarScreen';
import LoginScreen from '../views/LoginScreen';
import RegisterScreen from '../views/RegisterScreen';
import { useAuth } from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NAVY   = '#0D1B2A';
const GOLD   = '#D4AF37';
const MUTED  = 'rgba(212,175,55,0.30)';

const ICONS = {
  Perfil:      'person-circle-outline',
  Marketplace: 'apps-outline',
  Publicar:    'add-circle-outline',
};

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Perfil"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: NAVY,
          borderTopWidth: 1,
          borderTopColor: 'rgba(212,175,55,0.20)',
          height: 68,
          paddingBottom: 8,
          paddingTop: 6,
        },

        tabBarActiveTintColor:   GOLD,
        tabBarInactiveTintColor: MUTED,

        tabBarIcon: ({ color, focused }) => {
          const isPublicar = route.name === 'Publicar';

          if (isPublicar) {
            return (
              <View style={[styles.fabWrap, focused && styles.fabWrapActive]}>
                <Ionicons name="add" size={22} color={focused ? NAVY : GOLD} />
              </View>
            );
          }

          return (
            <View style={styles.iconWrap}>
              <Ionicons name={ICONS[route.name]} size={26} color={color} />
              {/* Punto indicador bajo el ícono activo */}
              {focused && <View style={styles.dot} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Perfil"      component={PerfilScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Publicar"    component={PublicarScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { currentUser } = useAuth();

  return (
    <Stack.Navigator>
      {currentUser ? (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserProfile"
            component={PerfilScreen}
            options={{
              title: 'Perfil de usuario',
              headerStyle:            { backgroundColor: NAVY },
              headerTintColor:        GOLD,
              headerTitleStyle:       { fontWeight: '700' },
              headerShadowVisible:    false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login"    component={LoginScreen}    options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: GOLD,
  },

  fabWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: GOLD,
    backgroundColor: 'rgba(212,175,55,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabWrapActive: {
    backgroundColor: GOLD,
    borderColor: GOLD,
  },
});