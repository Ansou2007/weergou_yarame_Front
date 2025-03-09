import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

const pharmaciesParRegion = {
  Dakar: [
    { name: 'Pharmacie Médina', address: 'Rue 23, Médina, Dakar', phone: '33 823 45 67', maps: 'https://goo.gl/maps/X1v7a' },
    { name: 'Pharmacie Sacré-Cœur', address: 'Sacré-Cœur 3, Dakar', phone: '33 844 56 78', maps: 'https://goo.gl/maps/Y2w9b' },
    { name: 'Pharmacie Rufisque', address: 'Marché Central, Rufisque', phone: '33 877 89 01', maps: 'https://goo.gl/maps/B5y2e' },
    { name: 'Pharmacie Médina', address: 'Rue 23, Médina, Dakar', phone: '33 823 45 67', maps: 'https://goo.gl/maps/X1v7a' },
    { name: 'Pharmacie Sacré-Cœur', address: 'Sacré-Cœur 3, Dakar', phone: '33 844 56 78', maps: 'https://goo.gl/maps/Y2w9b' },
  ],
  Thiès: [
    { name: 'Pharmacie Thiès Centre', address: 'Avenue Blaise Diagne, Thiès', phone: '33 812 34 56', maps: 'https://goo.gl/maps/Z5x8c' },
    { name: 'Pharmacie Médina', address: 'Rue 23, Médina, Dakar', phone: '33 823 45 67', maps: 'https://goo.gl/maps/X1v7a' },
    { name: 'Pharmacie Sacré-Cœur', address: 'Sacré-Cœur 3, Dakar', phone: '33 844 56 78', maps: 'https://goo.gl/maps/Y2w9b' },
  ],
  SaintLouis: [
    { name: 'Pharmacie Saint-Louis', address: 'Quartier Nord, Saint-Louis', phone: '33 845 67 89', maps: 'https://goo.gl/maps/A9x1d' },
    { name: 'Pharmacie Pikine Centre', address: 'Route Nationale 1, Pikine', phone: '33 866 78 90', maps: 'https://goo.gl/maps/A4x1d' },
  ],
  Kaolack: [
    { name: 'Pharmacie Kaolack', address: 'Boulevard de la République, Kaolack', phone: '33 822 45 78', maps: 'https://goo.gl/maps/B7y2e' },
  ],
};



export default function ListePharmaciesParRegion() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('');

  return (
    <View style={styles.container}>

      {/* Sélection de la région */}
      <Text style={styles.label}>Sélectionnez votre région :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedRegion}
          onValueChange={(value) => setSelectedRegion(value)}
          style={styles.picker}
        >
          <Picker.Item label="Choisir une région" value="" />
          {Object.keys(pharmaciesParRegion).map((region) => (
            <Picker.Item key={region} label={region} value={region} />
          ))}
        </Picker>
      </View>

      {/* Liste des pharmacies */}
      {selectedRegion && pharmaciesParRegion[selectedRegion] && (
        <>
          <Text style={styles.label}>Pharmacies de garde:</Text>
          <FlatList
            data={pharmaciesParRegion[selectedRegion]}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.pharmacyCard}>
                <Text style={styles.pharmacyName}>{item.name}</Text>
                <Text style={styles.pharmacyText}>📍 {item.address}</Text>
                <Text style={styles.pharmacyText}>📞 {item.phone}</Text>
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => Linking.openURL(item.maps)}
                >
                  <Text style={styles.mapButtonText}>Voir sur la carte</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
  },
  picker: {
    height: 50,
    width: '100%',
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
