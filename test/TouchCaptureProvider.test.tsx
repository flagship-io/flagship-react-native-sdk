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

function sleep(time: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

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

    it('renders children correctly', () => {
        const { getByText } = render(
            <TouchCaptureProvider>
                <View>
                    <Text>Child Component</Text>
                </View>
            </TouchCaptureProvider>
        );
        expect(getByText('Child Component')).toBeTruthy();
    });

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

    it('calls sendTouchPathEvent on touch move', async () => {
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

        await act(() => {
            fireEvent(getByTestId('test-view'), 'touchStart', {
                nativeEvent: { pageX: 100, pageY: 200 }
            });
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
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(2);
                expect(mockSendEaiVisitorEvent).toHaveBeenNthCalledWith(2, {
                    customerAccountId: 'testEnvId',
                    visitorId: 'testVisitorId',
                    currentUrl: '',
                    clickPath: expect.stringMatching(
                        /^(?:\d{3},\d{3},\d{5};)+$/
                    ),
                    screenSize: '1080,1920;'
                });
            },
            { timeout: 100 }
        );
    });

    it('does not attach touch handlers when not collecting EAI data', async () => {
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

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(0);
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );
    });
});

describe('TouchCaptureProvider with undefined visitor', () => {
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

    it('renders children correctly', async () => {
        (Flagship.getVisitor as jest.Mock).mockReturnValue(undefined);
        let onEAICollectStatusChange: ((status: boolean) => void) | undefined;
        mockOnEAICollectStatusChange.mockImplementation((fn) => {
            onEAICollectStatusChange = fn;
        });

        const { getByText } = render(
            <TouchCaptureProvider>
                <View>
                    <Text>Child Component</Text>
                </View>
            </TouchCaptureProvider>
        );

        await waitFor(() => {
            expect(mockOnEAICollectStatusChange).toHaveBeenCalledTimes(0);
        });
    });

    it('touch start', async () => {
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

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(0);
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );
    });

    it('touch move', async () => {
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

        await waitFor(
            () => {
                expect(mockSendEaiVisitorEvent).toHaveBeenCalledTimes(0);
            },
            { timeout: TIMEOUT_DURATION + 100 }
        );
    });
});
