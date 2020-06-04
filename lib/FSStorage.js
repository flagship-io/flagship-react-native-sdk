import React from "react";
import AsyncStorage from '@react-native-community/async-storage';




export const getCacheFromPhone = ()=>{

     return getStoredModifications();
}


export const setCacheFromPhone = (fsModifications)=>{
    storeModifications(fsModifications);
}




const storeModifications = async (fsModifications) => {
     
     error
    try {
      const jsonValue = JSON.stringify(fsModifications)
      console.log(jsonValue);
      console.log("AsyncStorage - set Modifs cache from phone");
      await AsyncStorage.setItem('@storage_fsModifications', jsonValue)
    } catch (e) {
      console.log("AsyncStorage - set Error" + e);
    }
  }



getStoredModifications = async () => {
    try {
    console.log("AsyncStorage - get cache from phone");

      const value = await AsyncStorage.getItem('@storage_fsModifications')
      if(value !== null) {

        console.log("AsyncStorage - Getting fsModifications : " + value);
        return value
      }
    } catch(e) {
      console.log("AsyncStorage - Get Error" + e);
    }
  }

