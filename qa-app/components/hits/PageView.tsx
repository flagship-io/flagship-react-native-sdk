import { HitType, IPage } from '@flagship.io/react-native-sdk';
import React, { useCallback, useState } from 'react';
import LineContainerInputText from '../LineContainerInputText';
import Common from './Common';

type Props = {
    type: HitType;
};
function PageView({ type }: Props) {
    const [page, setPage] = useState<IPage>({ type } as any);
    return (
        <>
            <LineContainerInputText
                label={'documentLocation *'}
                value={page.documentLocation}
                onChangeText={useCallback(
                    (text) => {
                        setPage((prev) => ({
                            ...prev,
                            documentLocation: text
                        }));
                    },
                    [page.documentLocation]
                )}
                placeHolder={'documentLocation'}
            />
            <Common hit={page} />
        </>
    );
}

export default PageView;
