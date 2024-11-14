import React, { useRef } from "react";
import {
  View,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";

interface TouchCaptureProviderProps {
  children: React.ReactNode;
}

const TouchCaptureProvider: React.FC<TouchCaptureProviderProps> = ({
  children,
}) => {
  const lastTapEvent = useRef<GestureResponderEvent | null>(null);
  const lastTapEventTime = useRef<number | null>(null);

  function sendTapEvent(event: GestureResponderEvent) {
    const { pageX, pageY } = event.nativeEvent;
    console.log("sendTapEvent", pageX, pageY);
    // Add your tap handling logic here
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
