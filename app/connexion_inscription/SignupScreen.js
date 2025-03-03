import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from "react";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect } from "react";
// import { TextInput } from "react-native-web";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SignupScreen = () => {
    const router = useRouter(); // Utilisation du routeur pour la navigation;
    const navigation = useNavigation();

    // ce  code masque les onglet situé en bas du page;
    useEffect(() => {
        navigation.setOptions({ tabBarStyle: { display: "none" } });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.topImageContainer}>
                <Image
                    source={require('@/assets/images/topVector.png')}
                    style={styles.topImage}
                />
            </View>
            <View style={styles.helloContainer}>
                <Text style={styles.helloText}>Creation de compte</Text>
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput style={styles.textInput} placeholder="Nom complet" />

            </View>
            <View style={styles.inputContainer}>

                <MaterialCommunityIcons name="email" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput style={styles.textInput} placeholder="Email" />

            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput style={styles.textInput} placeholder="Mot de pass" secureTextEntry />

            </View>



            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={24} color="#9A9A9A" style={styles.inputIcon} />
                <TextInput style={styles.textInput} placeholder="Mot de pass" secureTextEntry />

            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.SignButtonContainer} onPress={() => router.push("/connexion_inscription/LoginScreen")}>
                <Text style={styles.S_inscrire}>Se connecter</Text>
            </TouchableOpacity>

            <View style={styles.LeftvectorContainer}>
                <Image
                    source={require('@/assets/images/Vector.png')}
                    style={styles.LeftvectorImage}
                />
            </View>
        </View>
    );
};

export default SignupScreen;

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
        fontSize: 30,
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
    },

    forgetPasswordText: {
        color: "#BEBEBE",
        textAlign: "right",
        width: "90 %",
        fontSize: 15,
    },
    S_inscrire: {
        color: '#38B674',
        fontSize: 20,
        marginLeft: 230,

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
        // color: "#38B674",
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


