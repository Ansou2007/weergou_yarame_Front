import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function PharmacieProche() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg("Permission refusée. Activez la localisation.");
                setLoading(false);
                return;
            }

            try {
                let userLocation = await Location.getCurrentPositionAsync({});
                setLocation(userLocation.coords);
            } catch (error) {
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

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation={true}
            >
                {/* Marqueur pour la position de l'utilisateur */}
                <Marker
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    title="Votre position"
                    pinColor="blue"
                />

                {/* Pharmacies proches (exemple avec des coordonnées fictives) */}
                <Marker
                    coordinate={{ latitude: location.latitude + 0.002, longitude: location.longitude + 0.002 }}
                    title="Pharmacie A"
                    description="Ouverte 24h/24"
                    pinColor="green"
                />
                <Marker
                    coordinate={{ latitude: location.latitude - 0.002, longitude: location.longitude - 0.002 }}
                    title="Pharmacie B"
                    description="Fermeture à 22h"
                    pinColor="green"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
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
});
