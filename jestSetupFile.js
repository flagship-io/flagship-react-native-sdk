import { jest } from '@jest/globals';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);


// jest.setup.js
import 'setimmediate';