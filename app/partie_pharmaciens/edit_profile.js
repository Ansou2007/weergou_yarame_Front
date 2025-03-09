import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function EditProfil() {
    const router = useRouter();

    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier le Profil</Text>

        <View>
            <Text style={styles.texte}>Nom</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
            />
        </View>
        <View>
        <Text style={styles.texte}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
         </View>
         <View>
         <Text style={styles.texte}>Telephone</Text>

            <TextInput
                style={styles.input}
                placeholder="Téléphone"
                keyboardType="phone-pad"
                value={telephone}
                onChangeText={setTelephone}
            />
            </View>
           <View>
            <Text style={styles.texte}>Nouveau mot de passe</Text>
            <TextInput
                style={styles.input}
                placeholder="Nouveau mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => alert('Profil mis à jour')}>
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
        backgroundColor: '#38B674',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop:18,
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
