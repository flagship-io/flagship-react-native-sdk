//
export const modificationAnswer = {
    fsModifications: [
        {
            id: 'bqjhehmirtfg026713ig',
            variationGroupId: 'bqjhehmirtfg026713jg',
            variation: {
                id: 'bqjhehmirtfg026713kg',
                modifications: {
                    type: 'JSON',
                    value: {
                        RNBackGroundColor: 'pink',
                        RN_btn_title: 'Save blog',
                        RN_label_content: 'Content of post',
                        RN_label_title: 'Title of post',
                        btnTitle: 'Shop'
                    }
                },
                reference: false
            }
        }
    ],
    config: {
        fetchNow: true,
        activateNow: false,
        enableConsoleLogs: true,
        enableErrorLayout: false,
        enableSafeMode: false,
        nodeEnv: 'production',
        flagshipApi: 'https://decision-api.flagship.io/v1/',
        apiKey: null,
        initialModifications: null
    }
};

export const emptyModificationAnswer = {
    fsModifications: []
};
