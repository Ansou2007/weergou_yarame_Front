import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function EditPharmacie() {
    const router = useRouter();

    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [telephone, setTelephone] = useState('');
    const [ville, setVille] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Éditer la Pharmacie</Text>

           <View>
            <Text style={styles.texte}>Nom de la pharmacie</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom de la pharmacie"
                value={nom}
                onChangeText={setNom}
            />
           </View>
           

           <View>
           <Text style={styles.texte}>Nom de la pharmacie</Text>
            <TextInput
                style={styles.input}
                placeholder="Adresse"
                value={adresse}
                onChangeText={setAdresse}
            />
           </View>


           <View>
           <Text style={styles.texte}>Nom de la pharmacie</Text>
            <TextInput
                style={styles.input}
                placeholder="Téléphone"
                keyboardType="phone-pad"
                value={telephone}
                onChangeText={setTelephone}
            />
            </View>

            <View>
            <Text style={styles.texte}>Nom de la pharmacie</Text>
            <TextInput
                style={styles.input}
                placeholder="Ville"
                value={ville}
                onChangeText={setVille}
            />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => alert('Pharmacie mise à jour')}>
                <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
  <TouchableOpacity onPress={() => router.push('partie_pharmaciens/accueil_page_pharmaciens')} style={styles.backButton}>
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
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        marginTop:15,
        backgroundColor: '#38B674',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    backText: {
        color: '#007AFF',
        fontSize: 16,
    },

    texte :{
        marginBottom:10,
        marginTop: 15,
        fontSize: 16,
    },
});
