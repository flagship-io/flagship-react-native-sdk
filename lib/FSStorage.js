import React from "react";
import AsyncStorage from '@react-native-community/async-storage';

/// Read
export const getCacheFromPhone = ()=> {
  getStoredModifications()
}

/// Write
export const setCacheFromPhone = (fsModifications)=>{
    storeModifications(fsModifications);
}



/// Save the modifications in device
const storeModifications = async (fsModifications) => {
    try {
      const jsonValue = JSON.stringify(fsModifications)
      console.log("/n/n################### store Modifications #################### : /n/n")
      console.log(fsModifications)
      console.log("/n/n####################################### /n/n")

      await AsyncStorage.setItem('@storage_fsModifications', jsonValue)
    } catch (e) {
      console.log("AsyncStorage SET - " + e);
    }
  }


/// Get the stored modifications from device
 const getStoredModifications = async () => {
    try {
    console.log("/n/n################### Get Modifications ####################@ /n/n")
    const jsonValue = await AsyncStorage.getItem('@storage_fsModifications');
      if(jsonValue !== null) {
        console.log("\n\n Modifications : " + jsonValue )
       return jsonValue != null ? JSON.parse(jsonValue).fsModifications:null
      }
    } catch(e) {
      console.log("AsyncStorage GET - " + e)
      return null
    }
  }