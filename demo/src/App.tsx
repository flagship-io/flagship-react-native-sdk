import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {FlagshipProvider} from '@flagship.io/react-sdk';
import {Item} from './Item';
import {VipSwitch} from './VipSwitch';

function App() {
  const [isVip, setIsVip] = useState(false);
  return (
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
        }}>
        <Item />
      </FlagshipProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Adjust as needed
  },
});

export default App;
