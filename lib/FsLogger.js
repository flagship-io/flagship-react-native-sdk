import FlagshipLogger from '@flagship.io/js-sdk-logs';

const FsLogger = {
    getLogger: (config = { enableConsoleLogs: false, nodeEnv: 'unknown' }) => {
        return FlagshipLogger.getLogger(config, 'Flagship RN SDK');
    }
};

export default FsLogger;
