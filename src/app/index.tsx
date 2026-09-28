import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MyButton } from "../components";

export default function HomeScreen() {
  const router = useRouter();
  
  const handleLoginPress = () => {
    router.push("/login");
  };

  const handleRegisterPress = () => {
    router.push("/register");
  };

  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>
        <Image
          style={styles.imgStyle}
          source={require('@/assets/images/welcome.png')}
        />
        <View>
          <Text style={styles.textTitle}>Discover Your</Text>
          <Text style={styles.textTitle}>Dream Job here</Text>
        </View>
        
        <Text style={styles.textDesc}>
          Explore all the existing job roles based on your interest and study major
        </Text>

        <View style={styles.buttonContainer}>
          <MyButton
            text="Login"
            btnType='Primary'
            action={handleLoginPress}/>

          <MyButton
            text="Register"
            btnType='Secondary'
            action={handleRegisterPress}/>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body:{
    backgroundColor:'white'
  },
  container: {
    flex: 1,
    margin: 20,
    flexDirection: 'column',
    gap: 3
  },
  imgStyle:{
    height: 370
  },
  textTitle:{
    color: '#1F41BB',
    fontSize: 35,
    fontWeight: 600,
    textAlign: 'center'
  },
  textDesc:{
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },
  buttonContainer:{
    display:'flex',
    flexDirection:'row',
    gap: 2,
    marginTop: 20
  }
});
