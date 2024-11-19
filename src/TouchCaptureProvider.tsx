import {
    Flagship,
    IVisitorEvent,
    FlagshipContext
} from '@flagship.io/react-sdk';
import React, { useContext, useRef } from 'react';
import {
    View,
    GestureResponderEvent,
    StyleSheet,
    Dimensions
} from 'react-native';
import { MAX_CLICK_PATH_LENGTH } from './Constant';

interface TouchCaptureProviderProps {
    children: React.ReactNode;
}

const TouchCaptureProvider: React.FC<TouchCaptureProviderProps> = ({
    children
}) => {
    const lastTapEvent = useRef<GestureResponderEvent | null>(null);
    const lastTapEventTime = useRef<number | null>(null);
    const clickPath = useRef<string>('');
    const clickPathTimeoutId = useRef<NodeJS.Timeout | null>(null);
    const { state } = useContext(FlagshipContext);

    function sendTouchPositionEvent(event: GestureResponderEvent) {
        const visitor = Flagship.getVisitor();
        if (!visitor) {
            return null;
        }

        const { pageX, pageY } = event.nativeEvent;
        const screen = Dimensions.get('screen');
        const timestamp = Date.now().toString().slice(-5);
        const visitorEvent: IVisitorEvent = {
            customerAccountId: Flagship.getConfig().envId as string,
            visitorId: visitor.visitorId as string,
            currentUrl: '',
            clickPosition: `${pageY},${pageX},${timestamp},0;`,
            screenSize: `${screen.width},${screen.height};`
        };

        (visitor as any).sendEaiVisitorEvent(visitorEvent);
    }

    function sendTouchPathEvent(): void {
        const screen = Dimensions.get('screen');
        const visitor = Flagship.getVisitor();
        const visitorId = visitor?.visitorId as string;
        const visitorEvent: IVisitorEvent = {
            visitorId,
            customerAccountId: Flagship.getConfig().envId as string,
            clickPath: clickPath.current,
            screenSize: `${screen.width},${screen.height};`,
            currentUrl: ''
        };
        clickPath.current = '';
        (visitor as any).sendEaiVisitorEvent(visitorEvent);
    }

    function processMoveEvent(event: GestureResponderEvent) {
        const { pageX, pageY } = event.nativeEvent;

        console.log('sendMoveEvent', pageX, pageY);

        if (clickPathTimeoutId.current) {
            clearTimeout(clickPathTimeoutId.current);
        }
        clickPath.current += `${pageY},${pageX},${Date.now()
            .toString()
            .slice(-5)};`;

        if (clickPath.current.length > MAX_CLICK_PATH_LENGTH) {
            sendTouchPathEvent();
        }

        clickPathTimeoutId.current = setTimeout(() => {
            sendTouchPathEvent();
        }, 500);
    }

    function handleTouchStart(event: GestureResponderEvent) {
        if (lastTapEvent.current) {
            sendTouchPositionEvent(lastTapEvent.current);
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
        processMoveEvent(event);
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 10000
    }
});

export default TouchCaptureProvider;
