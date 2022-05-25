import React from "react";
import { View, Text, Alert} from "react-native";
export const ErrorText = ({name,errors})=>{
    return(
      <View style = {{paddingLeft:8,color:"red"}}>
        {errors[name]&&(
          <Text style ={{color:"red"}}>{errors?.[name]?.message}</Text>
        )}
      </View>
    );
  };
  
  export const ErrorAlert = ({title,message})=>
    Alert.alert(title,message,[
      {text:"OK",onPress:()=>console.log("OK Pressed")},
    ]);