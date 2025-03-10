import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_URL_GARDES = "https://wergouyaram.ctu.sn/api/v1/gardes";
const API_URL_PHARMACIES = "https://wergouyaram.ctu.sn/api/pharmacies";

// Liste des villes en dur
const villes = [
    { id: 1, nom: "Dakar" },
    { id: 2, nom: "Thiès" },
    { id: 3, nom: "Saint-Louis" },
    { id: 4, nom: "Kaolack" },
    { id: 4, nom: "Medina plateau" },
    { id: 5, nom: "Ziguinchor" }
];

export default function PharmaciesDeGarde() {
    const [pharmaciesGarde, setPharmaciesGarde] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVille, setSelectedVille] = useState(""); // Ville sélectionnée

    useEffect(() => {
        const fetchPharmaciesDeGarde = async () => {
            try {
                setLoading(true);

                // 1️⃣ Récupérer la liste des pharmacies de garde
                const response = await fetch(API_URL_GARDES);
                const gardes = await response.json();

                // 2️⃣ Récupérer les détails de chaque pharmacie
                const promises = gardes.map(async (garde) => {
                    const pharmacieResponse = await fetch(`${API_URL_PHARMACIES}/${garde.pharmacie_id}`);
                    const pharmacieDetails = await pharmacieResponse.json();
                    return { ...garde, ...pharmacieDetails };
                });

                const pharmaciesAvecDetails = await Promise.all(promises);
                setPharmaciesGarde(pharmaciesAvecDetails);
            } catch (error) {
                console.error("Erreur lors de la récupération des pharmacies :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPharmaciesDeGarde();
    }, []);

    // Filtrer les pharmacies par ville sélectionnée
    const filteredPharmacies = selectedVille
        ? pharmaciesGarde.filter((pharmacie) => pharmacie.ville === selectedVille)
        : pharmaciesGarde;

    if (loading) {
        return <ActivityIndicator size="large" color="#38B674" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pharmacies de Garde</Text>

            {/* Liste déroulante pour sélectionner une ville */}
            <Picker
                selectedValue={selectedVille}
                onValueChange={(itemValue) => setSelectedVille(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Toutes les villes" value="" />
                {villes.map((ville) => (
                    <Picker.Item key={ville.id} label={ville.nom} value={ville.nom} />
                ))}
            </Picker>

            <FlatList
                data={filteredPharmacies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.pharmacyContainer}>
                        <Text style={styles.pharmacyName}>{item.nom}</Text>
                        <Text style={styles.pharmacyText}>📍 {item.adresse}</Text>
                        <Text style={styles.pharmacyText}>📞 {item.telephone}</Text>
                        <Text style={styles.pharmacyText}>🏙️ Ville : {item.ville}</Text>
                        <Text style={styles.pharmacyText}>🕒 Garde : {item.type} ({item.date_debut} - {item.date_fin})</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
    },
    pharmacyContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 3,
    },
    pharmacyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#38B674',
    },
    pharmacyText: {
        fontSize: 14,
        marginTop: 3,
        color: '#333',
    },
});
