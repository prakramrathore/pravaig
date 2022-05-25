import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from "react-native";
import { supabase } from "../../../supabase-service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {ErrorAlert, ErrorText } from "../../utils/utils";

//React hook form
import * as yup from "yup";

const accountSchema = yup.object().shape({
  email:yup
  .string()
  .email("Invalid Email Format")
  .required("Email is a Required Field"),
  first:yup.string().required("First Name is a Required Field"),
  last:yup.string().required("Last Name is a Required Field"),
  password:yup.string().required("Password is a Required Field"),
});

export function CreateAccountScreen({ navigation }) {

  const {
    register, setValue, getValues, handleSubmit,
    // control,
    // reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      password: ""
    },
  });

  useEffect(() => {
    register("first");
    register("last");
    register("email");
    register("password");
  }, []);
  /** 
  * @param {*} userData
  * @returns
  * */

  async function doCreateAccount(userData) {
    console.log(userData);
    const {email,password, first, last} = userData;
    //SIGN UP USER
    //https://supabase.io/docs/reference/javascript/auth-signup#sign-up
    const response = await supabase.auth.signUp({email,password});

    if (response?.error) {
      //render error
      console.log(response?.error?.message);
      ErrorAlert({ title: "Error Creating User", message: response?.error?.message });
      return;
    }


    // ADD USER PROFILE TO TABLE
    //https://supabase.io/docs/reference/javascript/upsert
    try{
    const {data,error} = await supabase.from("profiles").insert([
      
      {
        id: response.user?.id,
        first,
        last,
        updated_at: new Date(),
        username:email,
      },
    ]);
  
  }catch (e){
    console.log(e);
  }
    if (error) {
      //render error
      console.log(error?.message);
      ErrorAlert({ title: "Error Creating User: Writing Profile Information", message: error?.message });
      return;
    }

  }



  return (
    <View style={styles.container}>

      <StatusBar style="auto" />

      <View style={{ width: "80%" }}>
        <Text>First Name</Text>
        <TextInput
          id="first"
          textContentType="emailAddress"
          autoCapitalize="none"
          style={styles.labelInput}
          onChangeText={(text) => setValue("first", text)}
        ></TextInput>
        <ErrorText name="first" errors={errors} />

      </View>

      <View style={{ width: "80%" }}>
        <Text>Last Name</Text>
        <TextInput
          id="last"
          textContentType="emailAddress"
          autoCapitalize="none"
          style={styles.labelInput}
          onChangeText={(text) => setValue("last", text)}
        ></TextInput>
        <ErrorText name="last" errors={errors} />

      </View>

      <View style={{ width: "80%" }}>
        <Text>Email Address</Text>
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
        <ErrorText name="password" errors={errors}/>

      </View>

      <View style={{ width: "80%", paddingTop: 18, padding: 12 }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(doCreateAccount)}>
          <Text style={styles.buttonTitle}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")} s>
          <Text style={styles.buttonTitle}>Cancel</Text>

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
  },
  
});
