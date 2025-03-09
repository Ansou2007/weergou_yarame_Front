import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function EditGarde() {
    const router = useRouter();
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    // Fonction pour ouvrir le sélecteur de date
    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            mode: 'date',
            display: 'calendar',
            onChange: (event, selectedDate) => {
                if (selectedDate) setDate(selectedDate);
            },
        });
    };

    // Fonction pour ouvrir le sélecteur d'heure
    const showTimePicker = (setTime) => {
        DateTimePickerAndroid.open({
            value: new Date(),
            mode: 'time',
            is24Hour: true,
            display: 'clock',
            onChange: (event, selectedTime) => {
                if (selectedTime) setTime(selectedTime);
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Éditer la Garde</Text>

           <View>
             {/* Sélecteur de date */}
             <Text style={styles.texte}>Date de debut</Text>
            <TouchableOpacity style={styles.input} onPress={showDatePicker}>
                <Icon name="calendar-today" size={20} color="#666" />
                <Text style={styles.text}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            </View>
            
            <View>
             {/* Sélecteur de date */}
             <Text style={styles.texte} >Date de fin</Text>
             <TouchableOpacity style={styles.input} onPress={showDatePicker}>
                <Icon name="calendar-today" size={20} color="#666" />
                <Text style={styles.text}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            </View>

            <View>
            <Text style={styles.texte}>Heure de debut</Text>
            {/* Sélecteur de l'heure de début */}
            <TouchableOpacity style={styles.input} onPress={() => showTimePicker(setStartTime)}>
                <Icon name="access-time" size={20} color="#666" />
                <Text style={styles.text}>{startTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            </View>

            <View>
            <Text style={styles.texte}>Heure de fin</Text>
            {/* Sélecteur de l'heure de fin */}
            <TouchableOpacity style={styles.input} onPress={() => showTimePicker(setEndTime)}>
                <Icon name="access-time" size={20} color="#666" />
                <Text style={styles.text}>{endTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            </View>

            {/* Bouton Enregistrer */}
            <TouchableOpacity style={styles.button} onPress={() => alert('Garde mise à jour')}>
                <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>

            {/* Bouton Retour */}
            {/* <TouchableOpacity onPress={() => router.back()} style={styles.backButton}> */}
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
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
    },
    button: {
        marginTop: 15,
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
    texte:{
        marginBottom:15,
        fontSize: 18,
    }
});

