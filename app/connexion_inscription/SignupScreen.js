import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useRouter } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '@/context/AuthContext';

const SignupScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, [navigation]);

  const handleSignup = async () => {
  if (!name || !email || !telephone || !password) {
    Alert.alert("Erreur", "Veuillez remplir tous les champs.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('https://wergouyaram.ctu.sn/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, telephone, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de l'inscription.");
    }

    Alert.alert("Succès", "Inscription réussie ! Veuillez vous connecter.");
    router.replace("/connexion_inscription/LoginScreen");

  } catch (error) {
    Alert.alert("Erreur", error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require('@/assets/images/topVector.png')}
          style={styles.topImage}
        />
      </View>

      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Création de compte</Text>
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Nom complet"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email" size={24} color="#9A9A9A" style={styles.inputIcon} />
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
        <FontAwesome name="phone" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Téléphone"
          keyboardType="phone-pad"
          value={telephone}
          onChangeText={setTelephone}
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

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>S'inscrire</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.SignButtonContainer}
        onPress={() => router.push("/connexion_inscription/LoginScreen")}
      >
        <Text style={styles.inscrire}>Se connecter</Text>
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
    inscrire: {
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


