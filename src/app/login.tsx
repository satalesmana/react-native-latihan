import { MyButton, MyTextInput } from "@/components";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Login here</Text>
          <Text style={styles.textDesc}>Welcome back you've been missed!</Text>
        </View>

        <View style={styles.inputContainer}>
          <MyTextInput
            placeholder="Email"
            onChangeText={onChangeEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <MyTextInput
            placeholder="Password"
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          <MyButton
            text="Sign in"
            btnType='Primary'
            action={() => console.log("Login pressed")}/>

          <MyButton
            text="Create new account"
            btnType='Secondary'
            action={() => console.log("Sign up pressed")}/>
        </View>

        <View style={styles.buttonBottomContainer}>
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.orButtonContainer}>
            <MyButton
              text="Google"
              btnType='Secondary'
              action={() => console.log("Google pressed")}/>

            <MyButton
              text="Facebook"
              btnType='Secondary'
              action={() => console.log("Facebook pressed")}/>

            <MyButton
              text="Apple"
              btnType='Secondary'
              action={() => console.log("Apple pressed")}/>
          </View>
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
    margin: 25,
    flexDirection: 'column',
    gap: 3
  },
  titleContainer:{
    flexDirection: 'column',
    gap: 2,
    marginTop: 80,
    alignItems: 'center'
  },
  textTitle:{
    fontSize: 30,
    color: '#1F41BB',
    textAlign: 'center'
  },
  textDesc:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 200
  },
  inputContainer:{
    flexDirection: 'column',
    marginTop: 20
  },
  buttonContainer:{
    display:'flex',
    flexDirection:'column',
    gap: 2,
    marginTop: 20,
  },
  forgotPasswordText:{
    color: '#1F41BB',
    textAlign: 'right',
    marginBottom: 10
  },
  buttonBottomContainer:{
    display:'flex',
    flexDirection:'column',
    gap: 2,
    marginTop: 50,
  },
  orText:{
    color: '#1F41BB',
    textAlign: 'center',
    marginBottom: 10
  },
  orButtonContainer:{
    display:'flex',
    flexDirection:'row',
    gap: 10,
  }
});
