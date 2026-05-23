import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PerfilScreen from '../views/PerfilScreen';
import MarketplaceScreen from '../views/MarketplaceScreen';
import PublicarScreen from '../views/PublicarScreen';

const Tab = createBottomTabNavigator();

const ICONS = {
  Perfil: 'person-circle-outline',
  Marketplace: 'apps-outline',
  Publicar: 'add-circle-outline',
};

export default function AppNavigator() {
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
