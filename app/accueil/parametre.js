import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Switch, StyleSheet, Alert, Appearance, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { AuthContext } from '@/context/AuthContext';

export default function SettingsScreen() {
    const { logout } = useContext(AuthContext);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const locationSetting = await AsyncStorage.getItem('locationEnabled');
        const notificationSetting = await AsyncStorage.getItem('notificationsEnabled');
        setIsLocationEnabled(locationSetting === 'true');
        setIsNotificationsEnabled(notificationSetting === 'true');
    };

    const toggleLocation = async () => {
        if (!isLocationEnabled) {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission refusée", "Activez la localisation dans les paramètres.");
                return;
            }
        }
        setIsLocationEnabled(!isLocationEnabled);
        await AsyncStorage.setItem('locationEnabled', (!isLocationEnabled).toString());
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleNotifications = async () => {
        if (!isNotificationsEnabled) {
            let { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission refusée", "Activez les notifications dans les paramètres.");
                return;
            }
        }
        setIsNotificationsEnabled(!isNotificationsEnabled);
        await AsyncStorage.setItem('notificationsEnabled', (!isNotificationsEnabled).toString());
    };

    const handleLogout = () => {
        Alert.alert(
            "Déconnexion",
            "Voulez-vous vraiment vous déconnecter ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Se déconnecter",
                    onPress: () => {
                        logout();
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Paramètres</Text>

            <View style={styles.setting}>
                <Text style={isDarkMode ? styles.darkText : styles.lightText}>Activer la localisation</Text>
                <Switch value={isLocationEnabled} onValueChange={toggleLocation} />
            </View>

            <View style={styles.setting}>
                <Text style={isDarkMode ? styles.darkText : styles.lightText}>Mode sombre</Text>
                <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
            </View>

            <View style={styles.setting}>
                <Text style={isDarkMode ? styles.darkText : styles.lightText}>Notifications</Text>
                <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications} />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>

            <View style={styles.about}>
                <Text style={[styles.aboutText, isDarkMode ? styles.darkText : styles.lightText]}>
                    Projet étudiant UNCHK Version : 1.0.0
                </Text>
                <Text style={[styles.aboutText, isDarkMode ? styles.darkText : styles.lightText]}>
                    Développé par Babacar NDIAYE & Ansoumane michel TAMBA 🚀
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    lightContainer: {
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    darkText: {
        color: '#fff',
    },
    lightText: {
        color: '#333',
    },
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 15,
        marginTop: 40,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    about: {
        marginTop: 60,
        alignItems: 'center',
    },
    aboutText: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
    },
});
