import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { useABTastyQA } from '../../src/qaAssistant/hooks';
import { ABTastyQAProvider } from '../../src/qaAssistant/ABTastyQAProvider';
import { ABTastyQAEventBus } from '@flagship.io/react-sdk';

describe('useABTastyQA hook', () => {
    it('should return null when used outside ABTastyQAProvider', () => {
        let contextValue: any;

        const TestComponent = () => {
            contextValue = useABTastyQA();
            return <Text>Test</Text>;
        };

        render(<TestComponent />);

        expect(contextValue).toBeNull();
    });

    it('should return context value when used inside ABTastyQAProvider', () => {
        let contextValue: any;

        const TestComponent = () => {
            contextValue = useABTastyQA();
            return <Text>Test</Text>;
        };

        render(
            <ABTastyQAProvider isQAModeEnabled={true}>
                <TestComponent />
            </ABTastyQAProvider>
        );

        expect(contextValue).not.toBeNull();
        expect(contextValue?.isQAModeEnabled).toBe(true);
    });

    it('should access ABTastyQAEventBus from context', () => {
        let contextValue: any;

        const TestComponent = () => {
            contextValue = useABTastyQA();
            return <Text>Test</Text>;
        };

        render(
            <ABTastyQAProvider>
                <TestComponent />
            </ABTastyQAProvider>
        );

        expect(contextValue?.ABTastyQAEventBus).toBe(ABTastyQAEventBus);
    });

    it('should access all properties from context', () => {
        let contextValue: any;

        const TestComponent = () => {
            contextValue = useABTastyQA();
            return <Text>Test</Text>;
        };

        const testEnvId = 'test-env';
        const testApiKey = 'test-key';

        render(
            <ABTastyQAProvider
                isQAModeEnabled={true}
                envId={testEnvId}
                apiKey={testApiKey}
            >
                <TestComponent />
            </ABTastyQAProvider>
        );

        expect(contextValue?.ABTastyQAEventBus).toBe(ABTastyQAEventBus);
        expect(contextValue?.isQAModeEnabled).toBe(true);
        expect(contextValue?.envId).toBe(testEnvId);
        expect(contextValue?.apiKey).toBe(testApiKey);
    });
});
