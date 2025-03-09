import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";


const HomeScreen = () => {
  const router = useRouter(); // Utilisation du routeur pour la navigation;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, [navigation]);

  return (

    <View style={styles.container}>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Bienvenue</Text>
      </View>

      <View>
        <Image source={require('@/assets/images/Logo.png')} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.textPresentation}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci, quis labore veniam eos quasi quas accusamus voluptatem, vero magni quod.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.loginButtonContainer, { backgroundColor: "#38B674" }]} onPress={() => router.push("/accueil")}>
          <Text style={styles.loginButton}>Je suis particulier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonContainer} onPress={() => router.push("/connexion_inscription/LoginScreen")}>
          <Text style={styles.signupButton}>Je suis pharmacie</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}
export default HomeScreen
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  logo: {
    marginTop: 50,
    height: 180,
    width: 250,

  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 70,
    borderWidth: 2,
    borderColor: "#38B674",
    width: "90 %",
    height: 60,
    borderRadius: 100,

  },

  loginButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",

    borderRadius: 100,
  },

  loginButton: {
    backgroundColor: "#38B674",
    color: "white",
    fontSize: 18,
    fontFamily: "Semibold",

  },
  signupButton: {

    color: "#38B674",
    fontSize: 18,
    fontFamily: "Semibold",

  },
  helloContainer: {
    marginTop: 100,
  },
  textPresentation: {
    marginTop: 50,
  },
  helloText: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "400",
    color: "#38B674",
  },
});
