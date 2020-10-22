import { checkValidityPatternForEnvId, maFct } from '../lib/FSTools';

import { generateFlagshipId, maFctBis } from '../lib/FSTools';

describe('Tools Suite Tests', () => {
    it('should validate True for envId', () => {
        expect(
            checkValidityPatternForEnvId('bkk9glocmjcg0vtmdlng')
        ).toBeTruthy();
    });

    it('should return invalidate for envId', () => {
        expect(checkValidityPatternForEnvId('bkk9glocmjcg0vlng')).toBeFalsy();
    });

    it('should generate flagship id', () => {
        expect(generateFlagshipId()).toBeDefined();
    });
});
