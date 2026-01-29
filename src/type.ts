import { IPageView, IVisitorEvent, Visitor } from "@flagship.io/react-sdk";

export type VisitorAugmented =  typeof Visitor & {
  sendEaiPageView: (pageView: IPageView) => void;
  sendEaiVisitorEvent: (visitorEvent: IVisitorEvent) => void;
}