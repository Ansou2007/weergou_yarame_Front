import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

export default function PharmacieProche() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log("Permission Status:", status); // 🔍 Debug

            if (status !== 'granted') {
                setErrorMsg("Permission refusée. Activez la localisation.");
                setLoading(false);
                return;
            }

            try {
                let userLocation = await Location.getCurrentPositionAsync({});
                console.log("Localisation récupérée :", userLocation); // 🔍 Debug
                setLocation(userLocation.coords);
            } catch (error) {
                console.error("Erreur lors de la récupération de la localisation :", error);
                setErrorMsg("Impossible de récupérer la localisation.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#38B674" />
            </View>
        );
    }

    if (errorMsg) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
        );
    }

    const googleMapsUrl = `https://www.google.com/maps/search/pharmacie/@${location.latitude},${location.longitude},15z`;

    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ uri: googleMapsUrl }} />
        </View>
    );
}

const styles = {
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
};
