import { jest } from '@jest/globals';
import React from 'react';
import {
    render,
    fireEvent,
    act,
    waitFor
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

function sleep(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

describe('TouchCaptureProvider - Basic Rendering', () => {
    const mockSendEaiVisitorEvent = jest.fn();
    const mockOnEAICollectStatusChange =
        jest.fn<(fn: (status: boolean) => void) => void>();

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

    it('should render children correctly within the provider', () => {
        const { getByText } = render(
            <TouchCaptureProvider>
                <View>
                    <Text>Child Component</Text>
                </View>
            </TouchCaptureProvider>
        );
        expect(getByText('Child Component')).toBeTruthy();
    });

    it('should not register EAI callback when visitor is undefined', async () => {
        (Flagship.getVisitor as jest.Mock).mockReturnValue(undefined);

        render(
            <TouchCaptureProvider>
                <View>
                    <Text>Test</Text>
                </View>
            </TouchCaptureProvider>
        );

        await waitFor(() => {
            expect(mockOnEAICollectStatusChange).not.toHaveBeenCalled();
        });
    });

    it('should not register EAI callback when onEAICollectStatusChange is not available', async () => {
        const mockVisitor = {
            visitorId: 'testVisitorId',
            sendEaiVisitorEvent: mockSendEaiVisitorEvent
            // onEAICollectStatusChange is missing
        };
        (Flagship.getVisitor as jest.Mock).mockReturnValue(mockVisitor);

        render(
            <TouchCaptureProvider>
                <View>
                    <Text>Test</Text>
                </View>
            </TouchCaptureProvider>
        );

        await waitFor(() => {
            expect(mockOnEAICollectStatusChange).not.toHaveBeenCalled();
        });
    });
});

describe('TouchCaptureProvider - Touch Position Events', () => {
    const mockSendEaiVisitorEvent = jest.fn();
    const mockOnEAICollectStatusChange =
        jest.fn<(fn: (status: boolean) => void) => void>();

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

    it('should send touch position event after timeout when touch starts', async () => {
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
    });

    it('should send previous touch position immediately when new touch starts', async () => {
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

        // First touch
        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 100, pageY: 200 }
            });
        });

        await sleep(100); // Wait less than timeout

        // Second touch - should trigger immediate send of first touch
        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 102, pageY: 201 }
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
            { timeout: 100 }
        );

        // Wait for second touch timeout
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
            { timeout: TIMEOUT_DURATION + 100 }
        );
    });

    it('should not send touch position event when visitor is unavailable', async () => {
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

        (Flagship.getVisitor as jest.Mock).mockReturnValue(undefined);

        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 100, pageY: 200 }
            });
        });

        await sleep(TIMEOUT_DURATION + 100);

        expect(mockSendEaiVisitorEvent).not.toHaveBeenCalled();
    });

    it('should not send touch position event when sendEaiVisitorEvent method is not available', async () => {
        let onEAICollectStatusChange: ((status: boolean) => void) | undefined;
        mockOnEAICollectStatusChange.mockImplementation((fn) => {
            onEAICollectStatusChange = fn;
        });

        const mockVisitorWithoutMethod = {
            visitorId: 'testVisitorId',
            onEAICollectStatusChange: mockOnEAICollectStatusChange
            // sendEaiVisitorEvent is missing
        };
        (Flagship.getVisitor as jest.Mock).mockReturnValue(mockVisitorWithoutMethod);

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

        await sleep(TIMEOUT_DURATION + 100);

        expect(mockSendEaiVisitorEvent).not.toHaveBeenCalled();
    });

    it('should cleanup timeouts when component unmounts', async () => {
        let onEAICollectStatusChange: ((status: boolean) => void) | undefined;
        mockOnEAICollectStatusChange.mockImplementation((fn) => {
            onEAICollectStatusChange = fn;
        });

        const { getByTestId, unmount } = render(
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
            fireEvent(getByTestId('test-view'), 'touchMove', {
                nativeEvent: { pageX: 150, pageY: 250 }
            });
        });

        // Unmount immediately - this tests cleanup logic runs without errors
        unmount();
        
        // No assertion needed - test passes if no errors occur during cleanup
    });
});

describe('TouchCaptureProvider - Touch Path Events', () => {
    const mockSendEaiVisitorEvent = jest.fn();
    const mockOnEAICollectStatusChange =
        jest.fn<(fn: (status: boolean) => void) => void>();

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

    it('should send touch path event after timeout when touch moves', async () => {
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
            fireEvent(getByTestId('test-view'), 'touchMove', {
                nativeEvent: { pageX: 150, pageY: 250 }
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

    it('should send touch path immediately when path length exceeds maximum', async () => {
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
            // Send enough touch move events to exceed MAX_CLICK_PATH_LENGTH (1900)
            for (let index = 0; index < 136; index++) {
                const pageX = 150 + index;
                const pageY = 250 + index;
                fireEvent(getByTestId('test-view'), 'touchMove', {
                    nativeEvent: { pageX, pageY }
                });
            }
        });

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(1);
                expect(mockSendEaiVisitorEvent).toHaveBeenNthCalledWith(1, {
                    customerAccountId: 'testEnvId',
                    visitorId: 'testVisitorId',
                    currentUrl: '',
                    clickPath: expect.stringMatching(/^(?:\d{3},\d{3},\d{5};)+$/),
                    screenSize: '1080,1920;'
                });
            },
            { timeout: 100 }
        );
    });

    it('should reset touch path timeout on each move event', async () => {
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
            fireEvent(getByTestId('test-view'), 'touchMove', {
                nativeEvent: { pageX: 150, pageY: 250 }
            });
        });

        await sleep(TIMEOUT_DURATION - 100);

        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchMove', {
                nativeEvent: { pageX: 151, pageY: 251 }
            });
        });

        // First event should not have been sent yet
        expect(mockSendEaiVisitorEvent).not.toHaveBeenCalled();

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(1);
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );
    });

    it('should clear touch coordinates when move occurs shortly after touch start', async () => {
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

        // Move quickly after start (within timeout)
        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchMove', {
                nativeEvent: { pageX: 150, pageY: 250 }
            });
        });

        // Wait for path timeout
        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(1);
                // Should only have path event, not position event
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledWith(
                    expect.objectContaining({
                        clickPath: expect.stringMatching(/250,150,[0-9]{5};/)
                    })
                );
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );

        // Wait additional time to ensure no position event was sent
        await sleep(TIMEOUT_DURATION);
        expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(1);
    });

    it('should not send touch path event when visitor is unavailable', async () => {
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

        (Flagship.getVisitor as jest.Mock).mockReturnValue(undefined);

        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchMove', {
                nativeEvent: { pageX: 100, pageY: 200 }
            });
        });

        await sleep(TIMEOUT_DURATION + 100);

        expect(mockSendEaiVisitorEvent).not.toHaveBeenCalled();
    });

    it('should handle missing visitorId and envId with fallback empty strings', async () => {
        let onEAICollectStatusChange: ((status: boolean) => void) | undefined;
        mockOnEAICollectStatusChange.mockImplementation((fn) => {
            onEAICollectStatusChange = fn;
        });

        const mockVisitorWithoutIds = {
            visitorId: null,
            sendEaiVisitorEvent: mockSendEaiVisitorEvent,
            onEAICollectStatusChange: mockOnEAICollectStatusChange
        };
        (Flagship.getVisitor as jest.Mock).mockReturnValue(mockVisitorWithoutIds);
        (Flagship.getConfig as jest.Mock).mockReturnValue({ envId: null });

        const { getByTestId } = render(
            <TouchCaptureProvider>
                <Button testID="test-view" title="button" />
            </TouchCaptureProvider>
        );

        await waitFor(() => {
            onEAICollectStatusChange?.(true);
        });

        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchMove', {
                nativeEvent: { pageX: 150, pageY: 250 }
            });
        });

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledWith({
                    customerAccountId: '',
                    visitorId: '',
                    currentUrl: '',
                    clickPath: expect.any(String),
                    screenSize: '1080,1920;'
                });
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );
    });
});

describe('TouchCaptureProvider - EAI Data Collection Toggle', () => {
    const mockSendEaiVisitorEvent = jest.fn();
    const mockOnEAICollectStatusChange =
        jest.fn<(fn: (status: boolean) => void) => void>();

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

    it('should not capture touch events when EAI data collection is disabled', async () => {
        const { getByTestId } = render(
            <TouchCaptureProvider>
                <Button testID="test-view" title="button" />
            </TouchCaptureProvider>
        );

        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 100, pageY: 200 }
            });

            fireEvent(getByTestId('test-view'), 'touchMove', {
                nativeEvent: { pageX: 150, pageY: 250 }
            });
        });

        await sleep(TIMEOUT_DURATION + 100);

        expect(mockSendEaiVisitorEvent).not.toHaveBeenCalled();
    });

    it('should start capturing touch events when EAI data collection is enabled', async () => {
        let onEAICollectStatusChange: ((status: boolean) => void) | undefined;
        mockOnEAICollectStatusChange.mockImplementation((fn) => {
            onEAICollectStatusChange = fn;
        });

        const { getByTestId } = render(
            <TouchCaptureProvider>
                <Button testID="test-view" title="button" />
            </TouchCaptureProvider>
        );

        // Initially disabled, touch should not be captured
        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 100, pageY: 200 }
            });
        });

        await sleep(100);
        expect(mockSendEaiVisitorEvent).not.toHaveBeenCalled();

        // Enable collection
        await waitFor(() => {
            onEAICollectStatusChange?.(true);
        });

        // Now touch should be captured
        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 100, pageY: 200 }
            });
        });

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalled();
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );
    });

    it('should stop capturing touch events when EAI data collection is disabled after being enabled', async () => {
        let onEAICollectStatusChange: ((status: boolean) => void) | undefined;
        mockOnEAICollectStatusChange.mockImplementation((fn) => {
            onEAICollectStatusChange = fn;
        });

        const { getByTestId } = render(
            <TouchCaptureProvider>
                <Button testID="test-view" title="button" />
            </TouchCaptureProvider>
        );

        // Enable collection
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
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );

        mockSendEaiVisitorEvent.mockClear();

        // Disable collection
        await act(() => {
            onEAICollectStatusChange?.(false);
        });

        // Touch should not be captured anymore
        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 100, pageY: 200 }
            });
        });

        await sleep(TIMEOUT_DURATION + 100);
        expect(mockSendEaiVisitorEvent).not.toHaveBeenCalled();
    });
});
