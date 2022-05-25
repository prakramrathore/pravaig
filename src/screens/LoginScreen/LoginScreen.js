import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from "react-native";
import { supabase } from "../../../supabase-service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {ErrorAlert, ErrorText } from "../../utils/utils";

//React hook form
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email:yup
  .string()
  .email("Invalid Email Format")
  .required("Email is a Required Field"),
  password:yup.string().required("Password is a Required Field"),
});

export function LoginScreen({ navigation }) {

  const {
    register, setValue, getValues, handleSubmit,
    // control,
    // reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  useEffect(() => {
    register("email");
    register("password");
  }, []);



  async function doLogin(data) {
    console.log(data);
    const response = await supabase.auth.signIn(data);

    if (response?.error) {
      //render error
      console.log(response?.error?.message);
      ErrorAlert({ title: "Error logging in user", message: response?.error?.message });
      return;
    }
  }



  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <View style={{ width: "80%" }}>
        <Text >Email address</Text>
        <TextInput
          id="email"
          textContentType="emailAddress"
          autoCapitalize="none"
          style={styles.labelInput}
          onChangeText={(text) => setValue("email", text)}
        ></TextInput>
        <ErrorText name="email" errors={errors} />

      </View>
      <View style={{ width: "80%" }}>
        <Text>Password</Text>
        <TextInput
          id="password"
          textContentType="password"
          secureTextEntry={true}
          style={styles.labelInput}
          onChangeText={(text) => setValue("password", text)}
        ></TextInput>
        <ErrorText name="password" errors={errors} />

      </View>

      <View style={{ width: "90%", paddingTop: 18, padding: 12 }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(doLogin)}>
          <Text style={styles.buttonTitle}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateAccount")} s>
          <Text style={styles.buttonTitle}>Create Account</Text>

        </TouchableOpacity>

      </View>
    </View>

  );

}
export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    "modal-container": {
      flex: 1,
      alignItems: "center",
      borderRadius: 18,
    },
    labelInput:{
      borderWidth :1,
      padding :10,
      borderRadius: 15,
      
    },
    button:{
      // padding: 10,
      // borderWidth: 1,
      width:"80%",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      backgroundColor:"#24a0ed",
    }
});
