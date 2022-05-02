import {
  VisitorCacheDTO,
  IVisitorCacheImplementation,
} from "@flagship.io/js-sdk";
import syncStorage from "../helper/SyncStorage";

export const VISITOR_PREFIX = "FS_VISITOR_CACHE_";
export class DefaultVisitorCache implements IVisitorCacheImplementation {
  async cacheVisitor(visitorId: string, data: VisitorCacheDTO): Promise<void> {
    await syncStorage.set(
      VISITOR_PREFIX + visitorId,
      JSON.stringify(data)
    );
  }

  lookupVisitor(visitorId: string): VisitorCacheDTO {
    const data = syncStorage.get(VISITOR_PREFIX + visitorId)
    return data ? JSON.parse(data) : null;
  }

  async flushVisitor(visitorId: string): Promise<void> {
    await syncStorage.remove(VISITOR_PREFIX + visitorId);
  }
}
