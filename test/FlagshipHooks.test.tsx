import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react-native';
import { useFlagship } from '../src/FlagshipHooks';
import { useFlagship as useFs, Flagship } from '@flagship.io/react-sdk';

// src/FlagshipHooks.test.ts

jest.mock('@flagship.io/react-sdk', () => ({
    useFlagship: jest.fn(),
    Flagship: {
        getVisitor: jest.fn(),
        getConfig: jest.fn()
    }
}));

jest.mock('react-native', () => ({
    Dimensions: {
        get: jest.fn().mockReturnValue({ width: 375, height: 812 })
    },
    PixelRatio: {
        get: jest.fn().mockReturnValue(2)
    },
    Platform: {
        OS: 'ios'
    }
}));

describe('useFlagship', () => {
    const mockSendEaiPageView = jest.fn();
    const mockCollectEAIDataAsync = jest.fn();
    const mockVisitor = {
        sendEaiPageView: mockSendEaiPageView
    };
    const mockConfig = {
        envId: 'env123'
    };

    beforeEach(() => {
        (Flagship.getVisitor as jest.Mock).mockReturnValue(mockVisitor);
        (Flagship.getConfig as jest.Mock).mockReturnValue(mockConfig);
        (useFs as jest.Mock).mockReturnValue({
            context: { someContext: true },
            visitorId: 'visitor123',
            collectEAIEventsAsync: mockCollectEAIDataAsync
            // other properties if needed
        });
        jest.clearAllMocks();
    });

    it('should return collectEAIDataAsync and sendEaiPageView functions', () => {
        const { result } = renderHook(() => useFlagship());
        expect(result.current.collectEAIEventsAsync).toBeInstanceOf(Function);
        expect(result.current.sendEaiPageViewAsync).toBeInstanceOf(Function);
    });

    it('sendEaiPageView should call Flagship.getVisitor().sendEaiPageView with correct pageView', () => {
        const { result } = renderHook(() => useFlagship());
        act(() => {
            result.current.sendEaiPageViewAsync('HomeScreen');
        });

        expect(Flagship.getVisitor).toHaveBeenCalled();
        expect(mockSendEaiPageView).toHaveBeenCalledWith({
            visitorId: 'visitor123',
            customerAccountId: 'env123',
            currentUrl: 'HomeScreen',
            hasAdBlocker: false,
            screenDepth: '24',
            screenSize: '375,812;',
            doNotTrack: 'unspecified',
            fonts: '[]',
            hasFakeBrowserInfos: false,
            hasFakeLanguageInfos: false,
            hasFakeOsInfos: false,
            hasFakeResolutionInfos: false,
            userLanguage: 'en',
            deviceCategory: 'iphone',
            pixelRatio: 2,
            viewportSize: '[375,812]',
            touchSupport: '[5, true, true]',
            userAgent: 'React Native',
            documentReferer: '',
            eventCategory: 'click tunnel auto',
            timezoneOffset: expect.any(Number)
        });
    });

    it('collectEAIDataAsync should call fsCollectEAIDataAsync with correct pageView', async () => {
        const { result } = renderHook(() => useFlagship());
        await act(async () => {
            await result.current.collectEAIEventsAsync('ProfileScreen');
        });

        expect(mockCollectEAIDataAsync).toHaveBeenCalledWith({
            visitorId: 'visitor123',
            customerAccountId: 'env123',
            currentUrl: 'ProfileScreen',
            hasAdBlocker: false,
            screenDepth: '24',
            screenSize: '375,812;',
            doNotTrack: 'unspecified',
            fonts: '[]',
            hasFakeBrowserInfos: false,
            hasFakeLanguageInfos: false,
            hasFakeOsInfos: false,
            hasFakeResolutionInfos: false,
            userLanguage: 'en',
            deviceCategory: 'iphone',
            pixelRatio: 2,
            viewportSize: '[375,812]',
            touchSupport: '[5, true, true]',
            userAgent: 'React Native',
            documentReferer: '',
            eventCategory: 'click tunnel auto',
            timezoneOffset: expect.any(Number)
        });
    });

    it('sendEaiPageView should not call sendEaiPageView when fs.context is undefined', () => {
        (useFs as jest.Mock).mockReturnValue({
            context: undefined,
            visitorId: 'visitor123',
            collectEAIDataAsync: mockCollectEAIDataAsync
            // other properties if needed
        });

        const { result } = renderHook(() => useFlagship());
        act(() => {
            result.current.sendEaiPageViewAsync('HomeScreen');
        });

        expect(mockSendEaiPageView).not.toHaveBeenCalled();
    });

    it('collectEAIDataAsync should not call fsCollectEAIDataAsync when fs.context is undefined', async () => {
        (useFs as jest.Mock).mockReturnValue({
            context: undefined,
            visitorId: 'visitor123',
            collectEAIEventsAsync: mockCollectEAIDataAsync
            // other properties if needed
        });

        const { result } = renderHook(() => useFlagship());
        await act(async () => {
            await result.current.collectEAIEventsAsync('ProfileScreen');
        });

        expect(mockCollectEAIDataAsync).not.toHaveBeenCalled();
    });
});
