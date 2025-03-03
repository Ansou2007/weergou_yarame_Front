import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';


export default function TabLayout() {
  const colorScheme = useColorScheme();



  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>

      <Tabs.Screen
        name="accueil/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="house.fill" color="#38B674" />,
        }}
      />

      <Tabs.Screen
        name="ordonnace/ordonnace"
        options={{
          title: 'Ordonnaces',
          tabBarIcon: ({ color }) => <Fontisto name="prescription" size={30} color="#38B674" />,
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
        name="evenements/explore"
        options={{
          title: 'Parametre',
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={30} color="#38B674" />,
        }}
      />
      <Tabs.Screen
        name="index"

        options={{ href: null }}

      />


      <Tabs.Screen
        name="explore"

        options={{ href: null }}

      />

      <Tabs.Screen
        name="connexion_inscription/LoginScreen"

        options={{ href: null }}

      />
      <Tabs.Screen
        name="connexion_inscription/SignupScreen"

        options={{ href: null }}

      />

{/* <Tabs.Screen
        name="partie_pharmaciens/accueil_page_pharmaciens"

        options={{ href: null }}

      /> */}







    </Tabs>
  );
}
