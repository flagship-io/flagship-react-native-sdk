import AsyncStorage from "@react-native-async-storage/async-storage"
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";

class SyncStorage {
  data: Map<string, string>;

  loading: boolean = true;

  constructor(){
      this.data = new Map()
  }

  async init(): Promise<readonly KeyValuePair[]> {
    const keys = await AsyncStorage.getAllKeys();
    const data = await AsyncStorage.multiGet([...keys])
    data.forEach(item => this.saveItem(item));
    return data;
  }

  get(key: string) {
    return this.data.get(key);
  }

  set(key: string, value: string): Promise<void> {
    this.data.set(key, value);
    return AsyncStorage.setItem(key, value);
  }

  remove(key: string): Promise<void> {
    this.data.delete(key);
    return AsyncStorage.removeItem(key);
  }

  saveItem(item: KeyValuePair) {
    this.data.set(item[0], item[1]||"");
    this.loading = false;
  }

  getAllKeys() {
    return Array.from(this.data.keys());
  }
}

const syncStorage = new SyncStorage();

syncStorage.init()

export default syncStorage;