/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NativeTachyons from 'react-native-style-tachyons';
import {StyleSheet} from 'react-native';
import {startNetworkLogging} from 'react-native-network-logger';

startNetworkLogging();
AppRegistry.registerComponent(appName, () => {
  NativeTachyons.build(
    {
      /* REM parameter is optional, default is 16 */
      rem: 16,
      /* fontRem parameter is optional to allow adjustment in font-scaling. default falls back to rem */
      fontRem: 20,
    },
    StyleSheet,
  );
  return App;
});
