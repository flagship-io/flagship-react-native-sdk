import { Flagship, IVisitorEvent } from "@flagship.io/react-sdk";
import React, { useRef } from "react";
import {
  View,
  GestureResponderEvent,
  StyleSheet,
  Dimensions,
} from "react-native";

interface TouchCaptureProviderProps {
  children: React.ReactNode;
}

const TouchCaptureProvider: React.FC<TouchCaptureProviderProps> = ({
  children,
}) => {
  const lastTapEvent = useRef<GestureResponderEvent | null>(null);
  const lastTapEventTime = useRef<number | null>(null);
  const visitor = Flagship.getVisitor();


  function sendTapEvent(event: GestureResponderEvent) {
    if (!visitor) {
      return null;
    }
  
    const { pageX, pageY } = event.nativeEvent;
    console.log("sendTapEvent", pageX, pageY);
    const screen = Dimensions.get("screen");
    const timestamp = Date.now().toString().slice(-5)
    const visitorEvent: IVisitorEvent = {
      customerAccountId: Flagship.getConfig().envId as string,
      visitorId: visitor.visitorId as string,
      currentUrl: "",
      clickPosition: `${pageY},${pageX},${timestamp},0;`,
      screenSize:`${screen.width},${screen.height};`,
    };

    (visitor as any).sendEaiVisitorEvent(visitorEvent);

  }

  function sendMoveEvent(event: GestureResponderEvent) {
    const { pageX, pageY } = event.nativeEvent;
    console.log("sendMoveEvent", pageX, pageY);
    // Add your move handling logic here
  }

  function handleTouchStart(event: GestureResponderEvent) {
    if (lastTapEvent.current) {
      sendTapEvent(lastTapEvent.current);
    }
    lastTapEventTime.current = Date.now();
    lastTapEvent.current = event;
  }

  function handleTouchMove(event: GestureResponderEvent) {
    if (
      lastTapEventTime.current &&
      Date.now() - lastTapEventTime.current < 500
    ) {
      lastTapEventTime.current = null;
      lastTapEvent.current = null;
    }
    sendMoveEvent(event);
  }

  return (
    <View
      style={styles.container}
      pointerEvents="box-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute", // Overlay on top
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent", // Ensure it's transparent
    zIndex: 10000, // Ensure it's on top
  },
});

export default TouchCaptureProvider;
