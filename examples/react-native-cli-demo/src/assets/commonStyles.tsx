import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';

// ICONS: https://fontawesome.com/icons?d=gallery&q=user&m=free

// I used https://coolors.co/2d2d2a-4c4c47-848fa5-c14953-e5dcc5
export const appColors = {
  dark: '#2D2D2A',
  grey: '#4C4C47',
  blue: '#848FA5',
  green: '#4CAF50',
  red: '#C14953',
  lightWhite: '#E5DCC5',
};

export const themeJsonTree = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#ffff',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

export const commonMenuButtonStyle = {
  containerStyle: [s.mv3],
  buttonStyle: [{height: 60}],
  type: 'outline',
};

export default StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  tDark: {
    color: appColors.dark,
  },
  label: {
    fontSize: 16,
    color: appColors.grey,
  },
});
