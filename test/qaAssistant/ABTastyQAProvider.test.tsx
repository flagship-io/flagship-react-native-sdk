import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ABTastyQAProvider } from '../../src/qaAssistant/ABTastyQAProvider';
import { useABTastyQA } from '../../src/qaAssistant/hooks';
import { ABTastyQAEventBus } from '@flagship.io/react-sdk';

describe('ABTastyQAProvider', () => {
    it('should render children correctly', () => {
        const { getByText } = render(
            <ABTastyQAProvider>
                <Text>Test Child</Text>
            </ABTastyQAProvider>
        );

        expect(getByText('Test Child')).toBeTruthy();
    });

    it('should provide context with default values when no props are passed', () => {
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

        expect(contextValue).toBeDefined();
        expect(contextValue?.ABTastyQAEventBus).toBe(ABTastyQAEventBus);
        expect(contextValue?.isQAModeEnabled).toBeUndefined();
        expect(contextValue?.envId).toBeUndefined();
        expect(contextValue?.apiKey).toBeUndefined();
    });

    it('should provide context with isQAModeEnabled when passed', () => {
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

        expect(contextValue?.isQAModeEnabled).toBe(true);
    });

    it('should provide context with envId when passed', () => {
        let contextValue: any;

        const TestComponent = () => {
            contextValue = useABTastyQA();
            return <Text>Test</Text>;
        };

        const testEnvId = 'test-env-id-123';

        render(
            <ABTastyQAProvider envId={testEnvId}>
                <TestComponent />
            </ABTastyQAProvider>
        );

        expect(contextValue?.envId).toBe(testEnvId);
    });

    it('should provide context with apiKey when passed', () => {
        let contextValue: any;

        const TestComponent = () => {
            contextValue = useABTastyQA();
            return <Text>Test</Text>;
        };

        const testApiKey = 'test-api-key-456';

        render(
            <ABTastyQAProvider apiKey={testApiKey}>
                <TestComponent />
            </ABTastyQAProvider>
        );

        expect(contextValue?.apiKey).toBe(testApiKey);
    });

    it('should provide context with all props when passed', () => {
        let contextValue: any;

        const TestComponent = () => {
            contextValue = useABTastyQA();
            return <Text>Test</Text>;
        };

        const testEnvId = 'test-env-id-123';
        const testApiKey = 'test-api-key-456';

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

    it('should memoize the context value correctly', () => {
        const contextValues: any[] = [];

        const TestComponent = () => {
            const value = useABTastyQA();
            contextValues.push(value);
            return <Text>Test</Text>;
        };

        const { rerender } = render(
            <ABTastyQAProvider isQAModeEnabled={true} envId="env1">
                <TestComponent />
            </ABTastyQAProvider>
        );

        // Rerender with same props
        rerender(
            <ABTastyQAProvider isQAModeEnabled={true} envId="env1">
                <TestComponent />
            </ABTastyQAProvider>
        );

        // Should be the same reference
        expect(contextValues[0]).toBe(contextValues[1]);

        // Rerender with different props
        rerender(
            <ABTastyQAProvider isQAModeEnabled={false} envId="env1">
                <TestComponent />
            </ABTastyQAProvider>
        );

        // Should be a different reference
        expect(contextValues[1]).not.toBe(contextValues[2]);
    });
});
