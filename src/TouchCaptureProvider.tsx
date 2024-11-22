import { Flagship, IVisitorEvent, useFlagship } from '@flagship.io/react-sdk';
import React, { useCallback, useEffect, useRef } from 'react';
import {
    View,
    GestureResponderEvent,
    StyleSheet,
    Dimensions
} from 'react-native';
import { MAX_CLICK_PATH_LENGTH, TIMEOUT_DURATION } from './Constant';

interface TouchCaptureProviderProps {
    children: React.ReactNode;
}

type Coordinates = { pageX: number; pageY: number };

function TouchCaptureProviderFunc ({ children }: TouchCaptureProviderProps) {
    const lastTouchCoordinates = useRef<Coordinates | null>(null);
    const lastTouchEventTime = useRef<number | null>(null);
    const touchPath = useRef<string>('');
    const touchPathTimeoutId = useRef<NodeJS.Timeout | null>(null);
    const touchPositionTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const fs = useFlagship();
    const [isEAIDataCollecting, setIsEAIDataCollecting] = React.useState(false);
    const onEAICollectStatusChange = useCallback((status) => {
        setIsEAIDataCollecting(status);
    }, []);

    useEffect(() => {
        const visitor = Flagship.getVisitor() as any;
        if (visitor) {
            visitor.onEAICollectStatusChange(onEAICollectStatusChange);
        }
    }, [fs]);

    const sendTouchPositionEvent = useCallback(
        ({ pageX, pageY }: Coordinates): void => {
            const visitor = Flagship.getVisitor();
            if (!visitor) return;

            const screen = Dimensions.get('screen');
            const timestamp = Date.now().toString().slice(-5);
            const visitorEvent: IVisitorEvent = {
                customerAccountId: Flagship.getConfig()?.envId as string,
                visitorId: visitor.visitorId as string,
                currentUrl: '',
                clickPosition: `${pageY},${pageX},${timestamp},0;`,
                screenSize: `${screen.width},${screen.height};`
            };

            (visitor as any).sendEaiVisitorEvent(visitorEvent);
        },
        []
    );

    const sendTouchPathEvent = useCallback((): void => {
        const visitor = Flagship.getVisitor();
        if (!visitor) return;

        const screen = Dimensions.get('screen');
        const visitorEvent: IVisitorEvent = {
            visitorId: visitor.visitorId || '',
            customerAccountId: Flagship.getConfig()?.envId || '',
            clickPath: touchPath.current,
            screenSize: `${screen.width},${screen.height};`,
            currentUrl: ''
        };
        touchPath.current = '';
        (visitor as any).sendEaiVisitorEvent(visitorEvent);
    }, []);

    const processTouchMoveEvent = useCallback(
        ({ pageX, pageY }: Coordinates): void => {
            if (touchPathTimeoutId.current) {
                clearTimeout(touchPathTimeoutId.current);
            }
            touchPath.current += `${pageY},${pageX},${Date.now()
                .toString()
                .slice(-5)};`;

            if (touchPath.current.length > MAX_CLICK_PATH_LENGTH) {
                sendTouchPathEvent();
            }

            touchPathTimeoutId.current = setTimeout(
                sendTouchPathEvent,
                TIMEOUT_DURATION
            );
        },
        [sendTouchPathEvent]
    );
    const handleTouchStart = useCallback(
        (event: GestureResponderEvent): void => {
            if (touchPositionTimeoutId.current) {
                clearTimeout(touchPositionTimeoutId.current);
            }
            const { pageX, pageY } = event.nativeEvent;
            const coordinates = { pageX, pageY };
            if (lastTouchCoordinates.current) {
                sendTouchPositionEvent(coordinates);
            }
            lastTouchEventTime.current = Date.now();
            lastTouchCoordinates.current = coordinates;

            touchPositionTimeoutId.current = setTimeout(() => {
                if (lastTouchCoordinates.current) {
                    sendTouchPositionEvent(coordinates);
                    lastTouchEventTime.current = null;
                    lastTouchCoordinates.current = null;
                }
            }, TIMEOUT_DURATION);
        },
        [sendTouchPositionEvent]
    );

    const handleTouchMove = useCallback(
        (event: GestureResponderEvent): void => {
            if (
                lastTouchEventTime.current &&
                Date.now() - lastTouchEventTime.current < TIMEOUT_DURATION
            ) {
                lastTouchEventTime.current = null;
                lastTouchCoordinates.current = null;
            }
            const { pageX, pageY } = event.nativeEvent;
            processTouchMoveEvent({ pageX, pageY });
        },
        [processTouchMoveEvent]
    );

    return (
        <View
            style={styles.container}
            pointerEvents="box-none"
            onTouchStart={isEAIDataCollecting? handleTouchStart : undefined}
            onTouchMove={isEAIDataCollecting? handleTouchMove: undefined}
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

export const TouchCaptureProvider = React.memo(TouchCaptureProviderFunc);
