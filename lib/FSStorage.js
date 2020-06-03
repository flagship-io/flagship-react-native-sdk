import React from "react";
import AsyncStorage from '@react-native-community/async-storage';




export const getCacheFromPhone = ()=>{
    getData();
}


export const setCacheFromPhone = (fsModifications)=>{
    storeData(fsModifications);
}


const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log("AsyncStorage - set cache from phone");
      await AsyncStorage.setItem('@storage_fsModifications', jsonValue)
    } catch (e) {
      // saving error
      console.log("AsyncStorage - set error");

    }
  }



getData = async () => {
    try {
    console.log("AsyncStorage - get cache from phone");

      const value = await AsyncStorage.getItem('@storage_fsModifications')
      if(value !== null) {

      }
    } catch(e) {
      // error reading value

      console.log("AsyncStorage -  get error");
    }
  }

