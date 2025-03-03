import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

const data = [
    { id: '1', title: '', image: 'https://www.stademariemarvingt.com/uploads/media/news/0001/03/thumb_2913_news_big.png' },
    { id: '2', title: '', image: 'https://www.hospihub.com/sites/default/files/2024-09/amtc-ci1_0.png' },
    { id: '3', title: '', image: 'https://www.ac-lyon.fr/sites/ac_lyon/files/2024-11/sante-1920x1080-jpg-55618.jpg' },
    { id: '4', title: '', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9b0PUrIsHZaQWNi2Tkd33i6aLiv-kLNoKGQ&s' },
];

const additionalCards = [
    { id: '9', title: 'Pharmacie de garde', image: 'https://via.placeholder.com/100', route: './pharmacies/test' },
    { id: '10', title: 'Hôpital le plus proche', image: 'https://via.placeholder.com/100', route: '/hopital' },
    { id: '11', title: 'Prix ordonnance', image: 'https://via.placeholder.com/100', route: './ordonnace/ordonnace' },
    { id: '12', title: 'Demande aide médicale', image: 'https://via.placeholder.com/100', route: '/aide-medicale' },
];

export default function HomeScreen() {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.container}>
            {/* En-tête avec photo de l'utilisateur */}
            <View style={styles.header}>
                <Image
                    source={{ uri: "https://www.institutmontaigne.org/ressources/images/Portraits/Babacar_Ndiaye.jpg" }}
                    style={styles.userPhoto}
                />
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

            {/* Liste des événements */}
            <Text style={styles.Events}>Événements</Text>
            <FlatList
                data={data}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.cardText}>{item.title}</Text>
                    </View>
                )}
            />

            {/* Grille de catégories avec navigation */}
            <Text style={styles.EvEnts}>Catégories</Text>
            <View style={styles.grid}>
                {additionalCards.map((item) => (
                    <Link key={item.id} href={item.route} style={styles.additionalCard}>
                        <Image source={{ uri: item.image }} style={styles.imageSmall} />
                        <Text style={styles.cardText}>{item.title}</Text>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    Events: {
        fontSize: 18,
        color: '#38B674',
        fontWeight: "bold",
        marginBottom: 16,
    },
    EvEnts: {
        fontSize: 18,
        color: '#38B674',
        fontWeight: "bold",

    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
    card: {
        alignItems: 'center',
        marginRight: 10,
    },
    image: {
        width: 357,
        height: 130,
        borderRadius: 8,
    },
    imageSmall: {
        width: 357,
        height: 120,
        borderRadius: 8,
    },
    cardText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    additionalCard: {
        width: '48%',
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
   
    },
});
