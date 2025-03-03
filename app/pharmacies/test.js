import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const regions = {
  Dakar: ['Dakar', 'Guédiawaye', 'Pikine', 'Rufisque'],
  Thiès: ['Thiès', 'Mbour', 'Tivaouane'],
  SaintLouis: ['Saint-Louis', 'Dagana', 'Podor'],
  Diourbel: ['Diourbel', 'Bambey', 'Mbacké'],
  Fatick: ['Fatick', 'Foundiougne', 'Gossas'],
  Kaffrine: ['Birkelane', 'Kaffrine', 'Koungheul', 'Malem-Hodar'],
  Kaolack: ['Kaolack', 'Nioro du Rip', 'Guinguinéo'],
  Kedougou: ['Kédougou', 'Salemata', 'Saraya'],
  Kolda: ['Kolda', 'Médina Yoro Foulah', 'Vélingara'],
  Louga: ['Kébémer', 'Linguère', 'Louga'],
  Matam: ['Kanel', 'Matam', 'Ranérou-Ferlo'],
  Sedhiou: ['Bounkiling', 'Goudomp', 'Sédhiou'],
  Tambacounda: ['Bakel', 'Goudiry', 'Koumpentoum', 'Tambacounda'],
  Ziguinchor: ['Bignona', 'Oussouye', 'Ziguinchor'],
};


const pharmacies = {
  Dakar: [
    { name: 'Pharmacie Médina', address: 'Rue 23, Médina, Dakar', phone: '33 823 45 67', maps: 'https://goo.gl/maps/X1v7a' },
    { name: 'Pharmacie Sacré-Cœur', address: 'Sacré-Cœur 3, Dakar', phone: '33 844 56 78', maps: 'https://goo.gl/maps/Y2w9b' },
    { name: 'Pharmacie Médina', address: 'Rue 23, Médina, Dakar', phone: '33 823 45 67', maps: 'https://goo.gl/maps/X1v7a' },
    { name: 'Pharmacie Sacré-Cœur', address: 'Sacré-Cœur 3, Dakar', phone: '33 844 56 78', maps: 'https://goo.gl/maps/Y2w9b' },
  ],
  Guédiawaye: [
    { name: 'Pharmacie Guédiawaye', address: 'Boulevard du Centenaire, Guédiawaye', phone: '33 855 67 89', maps: 'https://goo.gl/maps/Z3x0c' },
  ],
  Pikine: [
    { name: 'Pharmacie Pikine Centre', address: 'Route Nationale 1, Pikine', phone: '33 866 78 90', maps: 'https://goo.gl/maps/A4x1d' },
  ],
  Rufisque: [
    { name: 'Pharmacie Rufisque', address: 'Marché Central, Rufisque', phone: '33 877 89 01', maps: 'https://goo.gl/maps/B5y2e' },
  ],
};

export default function LocationSelector() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDepartement, setSelectedDepartement] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sélectionnez votre région :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedRegion}
          onValueChange={(itemValue) => {
            setSelectedRegion(itemValue);
            setSelectedDepartement('');
          }}
          style={styles.picker}
        >
          <Picker.Item label="Choisir une région" value="" />
          {Object.keys(regions).map((region) => (
            <Picker.Item key={region} label={region} value={region} />
          ))}
        </Picker>
      </View>

      {selectedRegion && (
        <>
          <Text style={styles.label}>Sélectionnez votre département :</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDepartement}
              onValueChange={(itemValue) => setSelectedDepartement(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Choisir un département" value="" />
              {regions[selectedRegion].map((departement) => (
                <Picker.Item key={departement} label={departement} value={departement} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {selectedDepartement && pharmacies[selectedDepartement] && (
        <>
          <Text style={styles.label}>Pharmacies de garde :</Text>
          <FlatList
            data={pharmacies[selectedDepartement]}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.pharmacyContainer}>
                <Text style={styles.pharmacyName}>{item.name}</Text>
                <Text style={styles.pharmacyText}>📍 {item.address}</Text>
                <Text style={styles.pharmacyText}>📞 {item.phone}</Text>
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => Linking.openURL(item.maps)}
                >
                  <Text style={styles.mapButtonText}>Localisation</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
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
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pharmacyContainer: {
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
});
