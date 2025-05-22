import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '@/context/AuthContext'; // 👈 Assure-toi que le chemin est correct

const pharmacies = [
    { id: '1', name: 'Pharmacie Centrale', address: '123 Avenue de la Santé', lat: 14.6928, lng: -17.4467 },
    { id: '2', name: 'Pharmacie du Centre', address: '45 Rue des Hôpitaux', lat: 14.6932, lng: -17.4480 },
    { id: '3', name: 'Pharmacie Médicale', address: '78 Boulevard des Médecins', lat: 14.6915, lng: -17.4455 },
    { id: '4', name: 'Pharmacie de la Garde', address: '10 Rue des Urgences', lat: 14.6900, lng: -17.4440 },
];

const additionalCards = [
    { id: '9', title: 'Éditer sa garde', icon: 'edit-calendar', route: 'partie_pharmaciens/edit_garde' },
    { id: '10', title: 'Voir la liste des pharmacies', icon: 'list-alt', route: 'partie_pharmaciens/liste_pharmacies' },
    { id: '11', title: 'Éditer sa pharmacie', icon: 'edit', route: 'partie_pharmaciens/edit_pharmacie' },
    { id: '12', title: 'Éditer son profil', icon: 'person-outline', route: 'partie_pharmaciens/edit_profile' },
];

const openLocation = (lat, lng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
};

export default function HomeScreen() {
    const [searchText, setSearchText] = useState('');
    const { user } = useContext(AuthContext); // ✅ Correct

    return (
        <View style={styles.container}>
            {/* En-tête */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: "https://www.institutmontaigne.org/ressources/images/Portraits/Babacar_Ndiaye.jpg" }}
                        style={styles.userPhoto}
                    />
                    {/* <Text style={styles.Name}>{Name ?? 'Bienvenue !'}</Text> */}
                    <Text style={styles.Name}>Bienvenue, {user?.name}</Text>
                </View>
                <TouchableOpacity onPress={() => alert("Notifications")}>
                    <Icon name="bell" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Barre de recherche */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* Section Catégories */}
            <Text style={styles.sectionTitle}>Catégories</Text>
            <View style={styles.categoryRow}>
                {additionalCards.map((item) => (
                    <Link key={item.id} href={item.route} style={styles.categoryCard}>
                        <MaterialIcon name={item.icon} size={35} color="#fff" style={styles.categoryIcon} /> {"\n"}
                        <Text style={styles.cardText}>{item.title}</Text>
                    </Link>
                ))}
            </View>

            {/* Liste des pharmacies */}
            <Text style={styles.sectionTitle}>Pharmacies disponibles</Text>
            <FlatList
                data={pharmacies}
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
                            <Text style={styles.locationText}>Localisation</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    Name: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    icon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
    },
    sectionTitle: {
        marginTop: 15,
        fontSize: 18,
        color: '#38B674',
        fontWeight: "bold",
        marginBottom: 10,
    },
    pharmacyCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        width: 340,
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
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '23%',
        alignItems: 'center',
        backgroundColor: '#38B674',
        padding: 10,
        borderRadius: 8,
    },
    categoryIcon: {
        marginBottom: 5,
        textAlign: 'center',
    },
    cardText: {
        fontSize: 9,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
});
