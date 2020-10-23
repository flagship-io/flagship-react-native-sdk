import {
    FlagshipProvider as ReactFlagshipProvider,
    useFlagship,
    useFsActivate,
    useFsModifications
} from '@flagship.io/react-sdk';

import { renderHook, act } from '@testing-library/react-hooks';

import { hitTransaction } from '../__mocks__/Hit/Hits';

import { fsRequestModif } from '../__mocks__/FSRequest/requestModification';

// Tests for hooks

describe('Hooks Suite Tests', () => {
    it('should useFsModifications work correctly', () => {
        const { result } = renderHook(() => useFsModifications(fsRequestModif));
        expect(result.current.redColor).toBe('red');
        expect(result.current.greenColor).toBe('green');
        expect(result.current.blueColor).toBe('blue');
    });

    it('should useFsActivate work correctly', () => {
        const { result } = renderHook(() => useFsActivate(['key1', 'key2']));
    });

    it('should useFlagship work correctly', () => {
        const { result } = renderHook(() => useFlagship());

        expect(typeof result.current.getModificationInfo).toBe('function');

        expect(typeof result.current.synchronizeModifications).toBe('function');

        expect(typeof result.current.startBucketingPolling).toBe('function');

        expect(typeof result.current.stopBucketingPolling).toBe('function');

        expect(typeof result.current.hiwt).toBeDefined();

        expect(typeof result.current.status).toBeDefined();

        const hitTest = result.current.hit;

        hitTest.send(hitTransaction);
    });
});
