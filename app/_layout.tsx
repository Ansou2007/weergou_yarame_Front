import { Tabs, useRouter } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';
import { AuthProvider, AuthContext } from '@/context/AuthContext';

function TabsWithAuth() {
  const colorScheme = useColorScheme();
  const { userToken } = useContext(AuthContext);
  const router = useRouter();

  // Redirection si non connecté
  // useEffect(() => {
  //   if (!userToken) {
  //     router.replace('/connexion_inscription/LoginScreen');
  //   }
  // }, [userToken]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="accueil/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="house.fill" color="#38B674" />,
        }}
      />

      <Tabs.Screen
        name="pharmacies/localisation"
        options={{
          title: 'Localisation',
          tabBarIcon: ({ color }) => <Feather name="map-pin" size={30} color="#38B674" />,
        }}
      />

      <Tabs.Screen
        name="pharmacies/test"
        options={{
          title: 'Pharmacies',
          tabBarIcon: ({ color }) => <MaterialIcons name="local-pharmacy" size={30} color="#38B674" />,
        }}
      />

      <Tabs.Screen
        name="accueil/parametre"
        options={{
          title: 'Parametre',
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={30} color="#38B674" />,
        }}
      />

      {/* Écrans sans onglets visibles */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="connexion_inscription/SignupScreen" options={{ href: null }} />
      <Tabs.Screen name="connexion_inscription/LoginScreen" options={{ href: null }} />
      <Tabs.Screen name="evenements/explore" options={{ href: null }} />
      <Tabs.Screen name="partie_pharmaciens/edit_garde" options={{ href: null }} />
      <Tabs.Screen name="partie_pharmaciens/edit_pharmacie" options={{ href: null }} />
      <Tabs.Screen name="partie_pharmaciens/edit_profile" options={{ href: null }} />
      <Tabs.Screen name="partie_pharmaciens/accueil_page_pharmaciens" options={{ href: null }} />
      <Tabs.Screen name="partie_pharmaciens/liste_pharmacies" options={{ href: null }} />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <AuthProvider>
      <TabsWithAuth />
    </AuthProvider>
  );
}
