import React from 'react';
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

const ICONS = {
  Perfil: 'person-circle-outline',
  Marketplace: 'apps-outline',
  Publicar: 'add-circle-outline',
};

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Perfil"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 64, paddingTop: 6 },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color }) => (
          <Ionicons name={ICONS[route.name]} size={30} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Publicar" component={PublicarScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { currentUser } = useAuth();

  return (
    <Stack.Navigator>
      {currentUser ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen
            name="UserProfile"
            component={PerfilScreen}
            options={{ title: 'Perfil de usuario' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}
