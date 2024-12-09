import { jest } from '@jest/globals';
import React from 'react';
import {
    render,
    fireEvent,
    act,
    waitFor,
    userEvent
} from '@testing-library/react-native';
import { TouchCaptureProvider } from '../src/TouchCaptureProvider';
import { Flagship, IVisitorEvent } from '@flagship.io/react-sdk';
import { Dimensions, View, Text, Button, ScaledSize } from 'react-native';
import { TIMEOUT_DURATION } from '../src/Constant';

jest.mock('@flagship.io/react-sdk', () => {
    return {
        Flagship: {
            getVisitor: jest.fn(),
            getConfig: jest.fn(() => ({ envId: 'testEnvId' }))
        },
        useFlagship: jest.fn(() => ({}))
    };
});

describe('TouchCaptureProvider', () => {
    const mockSendEaiVisitorEvent = jest.fn();
    const mockOnEAICollectStatusChange =
        jest.fn<(fn: (status: boolean) => void) => void>();

    const fixedTimestamp = 254889889; // 1978-05-25T11:48:09.889Z

    beforeEach(() => {
        jest.clearAllMocks();
        const mockVisitor = {
            visitorId: 'testVisitorId',
            sendEaiVisitorEvent: mockSendEaiVisitorEvent,
            onEAICollectStatusChange: mockOnEAICollectStatusChange
        };
        (Flagship.getVisitor as jest.Mock).mockReturnValue(mockVisitor);
        Dimensions.get = jest
            .fn<(dim: 'window' | 'screen') => ScaledSize>()
            .mockReturnValue({
                width: 1080,
                height: 1920,
                scale: 1,
                fontScale: 1
            });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    // it('renders children correctly', () => {
    //     const { getByText } = render(
    //         <TouchCaptureProvider>
    //             <View>
    //                 <Text>Child Component</Text>
    //             </View>
    //         </TouchCaptureProvider>
    //     );
    //     expect(getByText('Child Component')).toBeTruthy();
    // });

    it('calls sendTouchPositionEvent on touch start', async () => {
        let onEAICollectStatusChange: ((status: boolean) => void) | undefined;
        mockOnEAICollectStatusChange.mockImplementation((fn) => {
            onEAICollectStatusChange = fn;
        });

        const { getByTestId } = render(
            <TouchCaptureProvider>
                <Button testID="test-view" title="button" />
            </TouchCaptureProvider>
        );

        await waitFor(() => {
            onEAICollectStatusChange?.(true);
        });

        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 100, pageY: 200 }
            });
        });

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(1);
                expect(mockSendEaiVisitorEvent).toHaveBeenNthCalledWith(1, {
                    customerAccountId: 'testEnvId',
                    visitorId: 'testVisitorId',
                    currentUrl: '',
                    clickPosition: expect.stringMatching(/200,100,[0-9]{5},0;/),
                    screenSize: '1080,1920;'
                });
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );

        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 102, pageY: 201 }
            });
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 103, pageY: 202 }
            });
        });

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(2);
                expect(mockSendEaiVisitorEvent).toHaveBeenNthCalledWith(2, {
                    customerAccountId: 'testEnvId',
                    visitorId: 'testVisitorId',
                    currentUrl: '',
                    clickPosition: expect.stringMatching(/201,102,[0-9]{5},0;/),
                    screenSize: '1080,1920;'
                });
            },
            { timeout: 100 }
        );

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(3);
                expect(mockSendEaiVisitorEvent).toHaveBeenNthCalledWith(3, {
                    customerAccountId: 'testEnvId',
                    visitorId: 'testVisitorId',
                    currentUrl: '',
                    clickPosition: expect.stringMatching(/202,103,[0-9]{5},0;/),
                    screenSize: '1080,1920;'
                });
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );
    });

    it('calls sendTouchPathEvent on touch move',async () => {
        let onEAICollectStatusChange: ((status: boolean) => void) | undefined;
        mockOnEAICollectStatusChange.mockImplementation((fn) => {
            onEAICollectStatusChange = fn;
        });

        const { getByTestId } = render(
            <TouchCaptureProvider>
                <Button testID="test-view" title="button" />
            </TouchCaptureProvider>
        );

        await waitFor(() => {
            onEAICollectStatusChange?.(true);
        });

        act(() => {
            fireEvent(getByTestId('test-view'), 'touchMove', {
                nativeEvent: { pageX: 150, pageY: 250 },
            });
        });

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(1);
                expect(mockSendEaiVisitorEvent).toHaveBeenNthCalledWith(1, {
                    customerAccountId: 'testEnvId',
                    visitorId: 'testVisitorId',
                    currentUrl: '',
                    clickPath: expect.stringMatching(/250,150,[0-9]{5};/),
                    screenSize: '1080,1920;'
                });
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );

    });

    // it('does not attach touch handlers when not collecting EAI data', () => {
    //     const { getByTestId } = render(
    //         <TouchCaptureProvider>
    //             <View testId="test-view" />
    //         </TouchCaptureProvider>
    //     );

    //     // Simulate isEAIDataCollecting as false
    //     // This might require modifying the component to accept props for testing
    //     // Alternatively, ensure that the initial state is false and handlers are undefined

    //     const view = getByTestId('test-view');
    //     expect(view.props.onTouchStart).toBeUndefined();
    //     expect(view.props.onTouchMove).toBeUndefined();
    // });

    // it('attaches touch handlers when EAI data is collecting', () => {
    //     const { getByTestId, rerender } = render(
    //         <TouchCaptureProvider>
    //             <View testId="test-view" />
    //         </TouchCaptureProvider>
    //     );

    //     // Simulate isEAIDataCollecting as true
    //     // This might require modifying the component to accept props or mocking the state

    //     // Assuming there is a way to set isEAIDataCollecting to true
    //     // This part may vary based on implementation

    //     // Example:
    //     // setIsEAIDataCollecting(true);
    //     // rerender(...)

    //     // Then check if handlers are attached
    //     // expect(view.props.onTouchStart).toBeDefined();
    //     // expect(view.props.onTouchMove).toBeDefined();
    // });
});
