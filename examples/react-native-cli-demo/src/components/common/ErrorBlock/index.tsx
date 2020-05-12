import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';

interface Props {
  error: string;
}

const ErrorBlock: React.SFC<Props> = ({error}) => {
  return (
    <View style={[s.f2, s.flex, s.aic]} cls="bg-red">
      <View>
        <Text style={[s.f3, s.pv3]} cls="white">
          ⚠️ Error ⚠️
        </Text>
      </View>
      <View>
        <Text style={[s.f5, s.pb3]} cls="white">
          {error}
        </Text>
      </View>
    </View>
  );
};

export default NativeTachyons.wrap(ErrorBlock);
