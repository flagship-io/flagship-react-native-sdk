import { IPageView, IVisitorEvent, Visitor, ABTastyQAEventBus } from "@flagship.io/react-sdk";

export type VisitorAugmented =  typeof Visitor & {
  sendEaiPageView: (pageView: IPageView) => void;
  sendEaiVisitorEvent: (visitorEvent: IVisitorEvent) => void;
}

export interface ABTastyQA {
  ABTastyQAEventBus: typeof ABTastyQAEventBus;
  isQAModeEnabled?: boolean;
  envId?: string;
  apiKey?: string;
}