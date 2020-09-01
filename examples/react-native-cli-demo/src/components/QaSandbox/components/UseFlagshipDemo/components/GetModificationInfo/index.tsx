import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'react-native';
import {RootStackParamList} from '../../../stackContainer';
import {useFlagship} from '@flagship.io/react-native-sdk';

interface Props {
  // Nothing
}

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GetModificationsDemo'
>;

interface Props {
  navigation: ScreenNavigationProp;
}

const GetModificationInfo: React.SFC<Props> = ({navigation}) => {
  const {getModificationInfo: fsGetInfo} = useFlagship();

  const [key, setKey] = useState('');
  // campaignId
  const [campaignId, setCampaignId] = useState('-------------');
  const [variationGroupId, setVariationGroupId] = useState('-------------');
  const [variationId, setVariationId] = useState('-------------');

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.Title}>Enter the key for modification</Text>

        <TextInput
          style={styles.input}
          value={key}
          onChangeText={(txt) => setKey(txt)}
          onEndEditing={() => {
            if (fsGetInfo != null) {
              fsGetInfo(key)
                .then((infos) => {
                  if (infos === null) {
                    setVariationGroupId('null');
                    setCampaignId('null');
                    setVariationId('null');
                  } else {
                    /// set the varriation group id
                    setVariationGroupId(infos.variationGroupId);
                    /// set the campaig id
                    setCampaignId(infos.campaignId);
                    /// set the variation id
                    setVariationId(infos.variationId);
                  }
                })
                .catch((error) => {
                  setVariationGroupId('error: ' + error);
                  setCampaignId('-----------');
                  setVariationId('-----------');
                  console.log(error);
                  return;
                });
            } else {
              setVariationGroupId('getModificationInfo is null');
              setCampaignId('-----------');
              setVariationId('-----------');
            }
          }}
        />

        <Text style={styles.label}>
          variationId is: <Text style={styles.labelBis}>{variationId}</Text>
        </Text>

        <Text style={styles.label}>
          CampaignId is: <Text style={styles.labelBis}>{campaignId}</Text>
        </Text>

        <Text style={styles.label}>
          VariationGroupId is:{' '}
          <Text style={styles.labelBis}>{variationGroupId}</Text>
        </Text>
        <View style={[s.mv3]}>
          <Button
            title="Go back"
            onPress={() => {
              navigation.navigate('QaSandbox');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 10,
  },

  label: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 5,
    fontStyle: 'normal',
  },
  labelBis: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 5,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },

  Title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 20,
  },
});

export default NativeTachyons.wrap(GetModificationInfo);

this.defaultProps = {
  initialeValue: {
    title: '',
    content: '',
  },
};
