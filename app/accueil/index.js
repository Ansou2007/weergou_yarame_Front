import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import * as Location from 'expo-location'; // Importer Expo Location
import { FontAwesome5, MaterialIcons, Ionicons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/Feather';

const additionalCards = [
    { id: '9', title: 'Pharmacie de garde', route: './pharmacies/test', icon: <FontAwesome5 name="hospital" size={60} color="white" marginTop = '40' left='11'/> },
    { id: '10', title: 'Liste des pharmacies', route: '/partie_pharmaciens/liste_pharmacies', icon: <MaterialIcons name="local-pharmacy" size={60} color="white" marginTop = '40' left='11' /> },
    { id: '11', title: 'Je suis pharmacien', route: './connexion_inscription/LoginScreen', icon: <Ionicons name="person-circle-outline" size={60} color="white" marginTop = '40' left='11'/> },
    { id: '12', title: 'Événement de santé gratuit', route: '/hopital', icon: <FontAwesome5 name="hand-holding-medical" size={60} color="white" marginTop = '40' left='11'/> },
];

export default function HomeScreen() {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.Events}>BIENVENUE SEN WEERGOU YARAME</Text>

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

            {/* Grille de catégories avec navigation */}
            <View style={styles.grid}>
                {additionalCards.map((item) => (
                    <Link key={item.id} href={item.route} style={styles.additionalCard}>
                        <View style={styles.cardContent}>
                            {item.icon}
                            <Text style={styles.cardText}>{item.title}</Text>
                        </View>
                    </Link>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    Events: {
        fontSize: 16,
        color: '#38B674',
        fontWeight: "bold",
        marginTop: 45,
        marginBottom: 16,
        textAlign: "center",
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
        marginTop: 10,
        marginBottom: 16,
    },
    icon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    additionalCard: {
        width: '48%', // Deux colonnes
        height: 190, // Augmenter la hauteur
        backgroundColor: '#38B674',
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: {
        alignItems: 'center', // Centre les icônes et le texte
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        left:11,
        marginTop: 20, // Ajoute un espace entre l'icône et le texte
    },
});
