import { LoadingUi, MyButton, MyTextInput } from "@/components";
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, ScrollView, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmitRegister=async()=>{
    try{
      setLoading(true)

      if(email.length < 1){
        throw new Error('Email is required')
      }

      if(password.length < 1){
        throw new Error('Password is required')
      }

      if(password != confirmPassword){
        throw new Error('Confirm password does not match')
      }

      const { data: { session }, error} = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) {
        throw new Error(error.message)
      }

      if (!session) Alert.alert(
        'Info',
        'Please check your inbox for email verification!',
        [
          {text: 'OK', onPress: () => router.push('/login')},
        ]
      )

    }catch(error:any){
      console.log('[onSubmitRegister]', error)
      Alert.alert('Error', error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <ScrollView>
      <View className="bg-white min-h-screen">
        <View className="flex flex-col items-center mt-[50px]">
          <Text className="text-[#1F41BB] font-[700] text-[30px]">
            Create Account
          </Text>
          <Text className="text-[14px] font-[700]">
            Create an account so you can explore all the
          </Text>
          <Text className="text-[14px] font-[700]">
            existing jobs
          </Text>
        </View>

        <View className="px-8 mt-[70px]">
          <MyTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <MyTextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
          />

          <MyTextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        <View className="mt-8 px-8 flex flex-col gap-5">
          <MyButton
            text="Sign up"
            btnType='Primary'
            action={onSubmitRegister}/>

          <MyButton
              text="Already have an account"
              btnType='Secondary'
              action={() => console.log("Sign up pressed")}/>
        </View>

      </View>
      <LoadingUi visible={loading} />
    </ScrollView>
  );
};

export default RegisterScreen;