import React from "react";
import AsyncStorage from '@react-native-community/async-storage';




export const getCacheFromPhone = ()=>{
    console.log("get cache from phone");

    try {
        const value = await AsyncStorage.getItem('@storage_fsModifications')
        if(value !== null) {
          // value previously stored
          
          console.log(value)
          return value
        }
      } catch(e) {
        // error reading value
      }
}



export const setCacheFromPhone = (fsModifications)=>{
    console.log("set cache from phone");
    console.log(fsModifications)
    try {
        const jsonValue = JSON.stringify(fsModifications)
        await AsyncStorage.setItem('@storage_fsModifications', jsonValue)
      } catch (e) {
        // saving error
      }

}