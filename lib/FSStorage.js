import React from "react";
import AsyncStorage from '@react-native-community/async-storage';



/// Read
export const getCacheFromPhone = ()=>{
  return getStoredModifications();
}

/// Write
export const setCacheFromPhone = (fsModifications)=>{
    storeModifications(fsModifications);
}



/// Save the modification in device
const storeModifications = async (fsModifications) => {
    try {
      const jsonValue = JSON.stringify(fsModifications)
      await AsyncStorage.setItem('@storage_fsModifications', jsonValue)
    } catch (e) {
      console.log("AsyncStorage SET - " + e);
    }
  }


/// Get the stored modifications from device
const getStoredModifications = async () => {
    try {
    const jsonValue = await AsyncStorage.getItem('@storage_fsModifications')
      if(jsonValue !== null) {
        console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
        return jsonValue != null ? JSON.parse(jsonValue) : null
             }
    } catch(e) {
      console.log("AsyncStorage GET - " + e)
      return null
    }
  }