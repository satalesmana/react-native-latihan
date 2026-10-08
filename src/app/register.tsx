import { MyButton, MyTextInput } from "@/components";
import { ScrollView, Text, View } from "react-native";

const RegisterScreen = () => {
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
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <MyTextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
          />

          <MyTextInput
            placeholder="Confirm password"
            autoCapitalize="none"
            secureTextEntry
          />

          
        </View>

        <View className="mt-8 px-8 flex flex-col gap-5">
          <MyButton
            text="Sign up"
            btnType='Primary'
            action={()=>{}}/>

          <MyButton
              text="Already have an account"
              btnType='Secondary'
              action={() => console.log("Sign up pressed")}/>
        </View>

      </View>
    </ScrollView>
  );
};

export default RegisterScreen;