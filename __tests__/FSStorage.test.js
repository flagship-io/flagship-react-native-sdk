import {
    getCacheFromPhone,
    setModificationsCacheFromPhone
} from '../lib/FSStorage';
import FsLogger from '../lib/FsLogger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    modificationAnswer,
    emptyModificationAnswer
} from '../__mocks__/ApiResponse/apiAnswers';

describe('Local Storage Suite Tests', () => {
    it('should set & get modifications', async () => {
        setModificationsCacheFromPhone(
            modificationAnswer,
            FsLogger.getLogger()
        );

        return getCacheFromPhone(FsLogger.getLogger()).then((data) => {
            expect(AsyncStorage.getItem).toBeCalledWith(
                '@storage_fsModifications'
            );

            // Check if is an array
            expect.arrayContaining(data);

            // Read first object
            const fsModif = data.modifications[0]; // Hard access , because we know the mock response don't have an empty array

            // VariationGroupId
            expect(fsModif.variationGroupId).toBe('bqjhehmirtfg026713jg');

            // Read Variation
            const fsVariation = fsModif.variation;

            // Check id
            expect(fsVariation.id).toBe('bqjhehmirtfg026713kg');

            // Read Modification
            const values = fsVariation.modifications.value;

            expect(values.RNBackGroundColor).toBe('pink');
            expect(values.RN_btn_title).toBe('Save blog');
            expect(values.RN_label_content).toBe('Content of post');
            expect(values.RN_label_title).toBe('Title of post');
            expect(values.btnTitle).toBe('Shop');
        });
    });

    it('should set & get correctly an empty array', async () => {
        setModificationsCacheFromPhone(
            emptyModificationAnswer,
            FsLogger.getLogger()
        );
        return getCacheFromPhone(FsLogger.getLogger()).then((data) => {
            expect.arrayContaining(data.modifications);
            expect(data.modifications.length).toBe(0);
        });
    });

    it('should set & get correctly with null object', async () => {
        setModificationsCacheFromPhone(null, FsLogger.getLogger());
        return getCacheFromPhone(FsLogger.getLogger()).then((data) => {
            expect(data.modifications.length).toBe(0);
        });
    });
});
