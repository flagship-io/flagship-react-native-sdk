import {
    FlagshipProvider as ReactFlagshipProvider,
    useFlagship,
    useFsActivate,
    useFsModifications
} from '@flagship.io/react-sdk';

import { renderHook, act } from '@testing-library/react-hooks';

//// test hooks

test('useFsModifications', () => {
    const fsRequestModif = [
        {
            key: 'redColor',
            defaultValue: 'red',
            activate: true
        },
        {
            key: 'greenColor',
            defaultValue: 'green',
            activate: true
        },
        {
            key: 'blueColor',
            defaultValue: 'blue',
            activate: true
        }
    ];

    const { result } = renderHook(() => useFsModifications(fsRequestModif));
    expect(result.current.redColor).toBe('red');
    expect(result.current.greenColor).toBe('green');
    expect(result.current.blueColor).toBe('blue');
});

test('useFsModifications', () => {
    const { result } = renderHook(() => useFsActivate(['key1', 'key2']));
});

test('useFlagship', () => {
    const { result } = renderHook(() => useFlagship());

    expect(typeof result.current.getModificationInfo).toBe('function');

    expect(typeof result.current.synchronizeModifications).toBe('function');

    expect(typeof result.current.startBucketingPolling).toBe('function');

    expect(typeof result.current.stopBucketingPolling).toBe('function');

    expect(typeof result.current.hiwt).toBeDefined();

    expect(typeof result.current.status).toBeDefined();

    const hitTest = result.current.hit;

    const mockHit = {
        type: 'Transaction',
        data: {
            transactionId: '12451342423',
            affiliation: 'myAffiliation',
            totalRevenue: 999,
            shippingCost: 888,
            shippingMethod: 'myShippingMethod',
            currency: 'myCurrency',
            taxes: 1234444,
            paymentMethod: 'myPaymentMethod',
            itemCount: 2,
            couponCode: 'myCOUPON',
            documentLocation:
                'http%3A%2F%2Fabtastylab.com%2F60511af14f5e48764b83d36ddb8ece5a%2F',
            pageTitle: 'myScreen'
        }
    };
    hitTest.send(mockHit);
});
