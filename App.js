
import 'react-native-gesture-handler';

 import React, {useEffect,useState} from 'react';
 import {StatusBar, PermissionsAndroid, Platform} from 'react-native';
 import Geolocation from '@react-native-community/geolocation';
 import { NavigationContainer } from '@react-navigation/native';

 import Router from './src/Navigation/Root';

 navigator.geolocation = require('@react-native-community/geolocation');

 import { supabase } from "./supabase-service";

import HomeScreen from './src/screens/HomeScreen';
import DestinationSearch from './src/screens/DestinationSearch';
import SearhResults from './src/screens/SearchResults';

const App = () => {

  const[auth,setAuth] = useState(false);
  const[loading,setLoading] = useState(true);

  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Pravaig App Location Permission",
          message:
            "Pravaig App needs access to your location " +
            "so you can take awesome rides.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }
  }, [])

  useEffect(()=>{
    setAuth(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event,session)=>{
      console.log(session)
      setAuth(session);
    });
  });

  return (
    <>
      <StatusBar barStyle='dark-content'/>
      {/* <HomeScreen /> */}
      {/* <DestinationSearch /> */}
      {/* <SearhResults/> */}
      <Router auth={auth}/> 
    </>
  );
};



export default App;
