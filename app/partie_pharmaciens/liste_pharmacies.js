import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';

export default function ListePharmacies() {
  const router = useRouter();
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
        const response = await fetch("https://wergouyaram.ctu.sn/api/pharmacies");
        const data = await response.json();

        console.log("Données reçues depuis l'API :", data);

        // Vérifie si "member" existe bien et contient des pharmacies
        if (data.member) {
            setPharmacies(data.member);
            console.log("Liste des pharmacies :", data.member);
        } else {
            console.warn("Aucune pharmacie trouvée dans 'member'");
        }

    } catch (error) {
        console.error("Erreur lors de la récupération des pharmacies :", error);
    }
};



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Pharmacies</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#38B674" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={pharmacies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.pharmacyCard}>
              <Text style={styles.pharmacyName}>{item.nom}</Text>
              <Text style={styles.pharmacyText}>📍 {item.adresse}</Text>
              <Text style={styles.pharmacyText}>📞 {item.telephone}</Text>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => Linking.openURL(item.maps)}
              >
                <Text style={styles.mapButtonText}>Voir sur la carte</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

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
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  pharmacyCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    elevation: 3,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#38B674',
  },
  pharmacyText: {
    fontSize: 14,
    marginBottom: 3,
    color: '#333',
  },
  mapButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#38B674',
    borderRadius: 5,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
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
