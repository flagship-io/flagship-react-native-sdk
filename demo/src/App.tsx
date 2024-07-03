//start demo
//path: demo/src/App.tsx
import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {FlagshipProvider} from '@flagship.io/react-native-sdk';
import {Item} from './Item';
import {VipSwitch} from './VipSwitch';
import {Loading} from './Loading';

function App() {
  const [isVip, setIsVip] = useState(false);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <VipSwitch isVip={isVip} setIsVip={setIsVip} />
        {/* Step 1: Initialize the SDK with FlagshipProvider */}
        <FlagshipProvider
          envId="<ENV_ID>"
          apiKey="<API_KEY>"
          visitorData={{
            id: 'visitor_id',
            hasConsented: true,
            context: {
              fs_is_vip: isVip,
            },
          }}
          loadingComponent={<Loading />}>
          <Item />
        </FlagshipProvider>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});

export default App;
//end demo
