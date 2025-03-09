import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

const pharmacies = [
    { id: '1', name: 'Pharmacie Centrale', address: '123 Avenue de la Santé', lat: 14.6928, lng: -17.4467 },
    { id: '2', name: 'Pharmacie du Centre', address: '45 Rue des Hôpitaux', lat: 14.6932, lng: -17.4480 },
    { id: '3', name: 'Pharmacie Médicale', address: '78 Boulevard des Médecins', lat: 14.6915, lng: -17.4455 },
    { id: '4', name: 'Pharmacie de la Garde', address: '10 Rue des Urgences', lat: 14.6900, lng: -17.4440 },
];

// GET request for remote image in node.js
// axios({
//     method: 'get',
//     url: 'https://wergouyaram.ctu.sn/api/pharmacies/',
//   })
//     .then(function (response) {
//       response.data
//     });

// // 

const openLocation = (lat, lng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
};

export default function ListePharmacies() {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');

    // Filtrage des pharmacies en fonction du texte de recherche
    const filteredPharmacies = pharmacies.filter(pharma =>
        pharma.name.toLowerCase().includes(searchText.toLowerCase()) ||
        pharma.address.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liste des Pharmacies</Text>

            {/* Barre de recherche */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher une pharmacie..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* Liste des pharmacies */}
            <FlatList
                data={filteredPharmacies}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.pharmacyCard}>
                        <View style={styles.pharmacyInfo}>
                            <Text style={styles.pharmacyName}>{item.name}</Text>
                            <Text style={styles.pharmacyAddress}>{item.address}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.locationButton}
                            onPress={() => openLocation(item.lat, item.lng)}
                        >
                            <Icon name="map-pin" size={20} color="#fff" />
                            <Text style={styles.locationText}>Voir sur la carte</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Bouton Retour */}
            <TouchableOpacity onPress={() => router.push('/accueil_page_pharmaciens')} style={styles.backButton}>
                <Text style={styles.backText}>Retour</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        marginBottom: 16,
    },
    icon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
    },
    pharmacyCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    pharmacyInfo: {
        flex: 1,
    },
    pharmacyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    pharmacyAddress: {
        fontSize: 14,
        color: '#666',
    },
    locationButton: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#38B674',
        borderRadius: 5,
        justifyContent: 'center',
    },
    locationText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
    },
    backText: {
        color: '#007AFF',
        fontSize: 16,
    },
});
