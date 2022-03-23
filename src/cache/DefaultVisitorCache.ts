import {
  VisitorCacheDTO,
  IVisitorCacheImplementation,
} from "@flagship.io/js-sdk";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const VISITOR_PREFIX = "FS_VISITOR_CACHE_";
export class DefaultVisitorCache implements IVisitorCacheImplementation {
  async cacheVisitor(visitorId: string, data: VisitorCacheDTO): Promise<void> {
    await AsyncStorage.setItem(
      VISITOR_PREFIX + visitorId,
      JSON.stringify(data)
    );
  }

  async lookupVisitor(visitorId: string): Promise<VisitorCacheDTO> {
    const data = await AsyncStorage.getItem(VISITOR_PREFIX + visitorId);
    return data ? JSON.parse(data) : null;
  }

  async flushVisitor(visitorId: string): Promise<void> {
    await AsyncStorage.removeItem(VISITOR_PREFIX + visitorId);
  }
}
