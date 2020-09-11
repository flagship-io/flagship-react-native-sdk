import { checkValidityPatternForEnvId, maFct } from '../lib/FSTools';

import { generateFlagshipId, maFctBis } from '../lib/FSTools';

test('Testing with valide checkValidityPatternForEnvId', () => {
    expect(checkValidityPatternForEnvId('bkk9glocmjcg0vtmdlng')).toBeTruthy();
});

test('Testing with invalide checkValidityPatternForEnvId', () => {
    expect(checkValidityPatternForEnvId('bkk9glocmjcg0vlng')).toBeFalsy();
});

test('Testing generateFlagshipId', () => {
    expect(generateFlagshipId()).toBeDefined();
});
