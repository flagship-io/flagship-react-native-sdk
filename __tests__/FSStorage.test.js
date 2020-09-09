
import { getCacheFromPhone, setCacheFromPhone } from "../lib/FSStorage";
import FsLogger from "../lib/FsLogger";
import AsyncStorage  from '@react-native-community/async-storage';

 

/// Data Mock , inspired from real case 
export const dataMock = {
  "fsModifications": [
    {
      "id": "bqjhehmirtfg026713ig",
      "variationGroupId": "bqjhehmirtfg026713jg",
      "variation": {
        "id": "bqjhehmirtfg026713kg",
        "modifications": {
          "type": "JSON",
          "value": {
            "RNBackGroundColor": "pink",
            "RN_btn_title": "Save blog",
            "RN_label_content": "Content of post",
            "RN_label_title": "Title of post",
            "btnTitle": "Shop"
          }
        },
        "reference": false
      }
    }
  ],
  "config": {
    "fetchNow": true,
    "activateNow": false,
    "enableConsoleLogs": true,
    "enableErrorLayout": false,
    "enableSafeMode": false,
    "nodeEnv": "production",
    "flagshipApi": "https://decision-api.flagship.io/v1/",
    "apiKey": null,
    "initialModifications": null
  }
};


export const emptyDataMock = {
  "fsModifications": [
  ]
};




  it('checks getCacheFromPhone', async () => {

    setCacheFromPhone(dataMock,FsLogger.getLogger())

    return getCacheFromPhone(FsLogger.getLogger()).then ( data => {

        expect(AsyncStorage.getItem).toBeCalledWith('@storage_fsModifications')
        
        /// Check if is array 
        expect.arrayContaining(data)

        /// Read first object
        const fsModif = data[0];  /// Hard access , because we know the mock response don't have an empty array
        
        /// VariationGroupId
        expect(fsModif.variationGroupId).toBe('bqjhehmirtfg026713jg');

        /// Read Variation
        const fsVariation = fsModif.variation

        /// Check id
        expect(fsVariation.id).toBe('bqjhehmirtfg026713kg');

        /// Read Modification
        const values = fsVariation.modifications.value

        expect(values.RNBackGroundColor).toBe('pink');
        expect(values.RN_btn_title).toBe('Save blog');
        expect(values.RN_label_content).toBe('Content of post');
        expect(values.RN_label_title).toBe('Title of post');
        expect(values.btnTitle).toBe('Shop');

     });
  })


  it('Test with Empty aaray', async () => {
    
    setCacheFromPhone(emptyDataMock,FsLogger.getLogger())

    return getCacheFromPhone(FsLogger.getLogger()).then ( data => {

        expect.arrayContaining(data)

        expect(data.length).toBe(0)
    });
 
  })


  it('Test with error', async () => {
    
    setCacheFromPhone(null,FsLogger.getLogger())

    return getCacheFromPhone(FsLogger.getLogger()).then ( data => {

        expect(data).toBe(null)
    });
 
  })



 

  