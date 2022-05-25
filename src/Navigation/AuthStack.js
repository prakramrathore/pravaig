
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {View, Text, Button, StyleSheet, Alert} from "react-native";

import { LoginScreen } from "../screens/LoginScreen/LoginScreen";
import { CreateAccountScreen } from "../screens/CreateAccount/CreateAccountScreen";

const AuthStack = createNativeStackNavigator();
export function AuthScreenStack(){
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen name = "Login" component ={LoginScreen}/>
      <AuthStack.Screen name = "CreateAccount" component ={CreateAccountScreen}/>

    </AuthStack.Navigator>
  )
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
      }
});