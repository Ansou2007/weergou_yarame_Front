import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useRouter } from "expo-router";
// import { AuthContext } from './AuthContext';
import { AuthContext } from '@/context/AuthContext';


const LoginScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const { login } = useContext(AuthContext); // Pour appeler la méthode login du contexte

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({ tabBarStyle: { display: "none" } });
    }, [navigation]);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez entrer votre email et mot de passe.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://wergouyaram.ctu.sn/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur de connexion.");
            }

            login(data.token); // Stocke le token dans le contexte
            Alert.alert("Succès", "Connexion réussie !");
            router.replace("/partie_pharmaciens/accueil_page_pharmaciens");

        } catch (error) {
            Alert.alert("Erreur", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topImageContainer}>
                <Image source={require('@/assets/images/topVector.png')} style={styles.topImage} />
            </View>

            <View style={styles.helloContainer}>
                <Text style={styles.helloText}>Bienvenue</Text>
            </View>

            <Text style={styles.signInText}>Connectez-vous à votre compte</Text>

            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Mot de passe" 
                    secureTextEntry 
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <Text style={styles.forgetPasswordText}>Mot de passe oublié ?</Text>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Se connecter</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.SignButtonContainer} onPress={() => router.push("/connexion_inscription/SignupScreen")}>
                <Text style={styles.inscrire}>S'inscrire</Text>
            </TouchableOpacity>

            <View style={styles.LeftvectorContainer}>
                <Image source={require('@/assets/images/Vector.png')} style={styles.LeftvectorImage} />
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
    },
    topImageContainer: {},
    topImage: {
        width: "100%",
        height: 130,
    },
    helloContainer: {},
    helloText: {
        textAlign: "center",
        fontSize: 70,
        fontWeight: "500",
        color: "#262626",
    },
    signInText: {
        textAlign: "center",
        fontSize: 18,
        color: "#262626",
        marginBottom: 30,
    },
    inputContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        borderRadius: 20,
        marginHorizontal: 40,
        elevation: 10,
        marginVertical: 20,
        alignItems: "center",
        height: 50,
    },
    inputIcon: {
        marginLeft: 15,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
    },
    forgetPasswordText: {
        color: "#BEBEBE",
        textAlign: "right",
        width: "90%",
        fontSize: 15,
    },
    inscrire: {
        color: '#38B674',
        fontSize: 20,
        marginLeft: 260,
    },
    button: {
        backgroundColor: "#38B674",
        borderRadius: 20,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 40,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    LeftvectorContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    LeftvectorImage: {
        height: 150,
        width: 100,
    }
});
