import { IHit, useFlagship } from '@flagship.io/react-native-sdk';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import LineContainerInputText from '../LineContainerInputText';
import { Button, Text } from '../Themed';

type Props = {
    hit: IHit;
};
function Common({ hit: hitPros }: Props) {
    const [hit, setHit] = useState<IHit>({} as any);
    const [isLoading, setIsLoading] = useState(false);

    const fs = useFlagship();

    const onPressSend = () => {
        setIsLoading(true);
        fs.hit.send({ ...hit, ...hitPros }).finally(() => {
            setIsLoading(false);
        });
    };
    return (
        <>
            <Text style={styles.title}>Hit common optional parameters</Text>
            <LineContainerInputText
                label={'locale'}
                value={hit.locale}
                onChangeText={useCallback(
                    (text) => {
                        setHit((prev) => ({ ...prev, locale: text }));
                    },
                    [hit.locale]
                )}
                placeHolder={'locale'}
            />
            <LineContainerInputText
                label={'screenResolution'}
                value={hit.screenResolution}
                onChangeText={useCallback(
                    (text) => {
                        setHit((prev) => ({ ...prev, screenResolution: text }));
                    },
                    [hit.screenResolution]
                )}
                placeHolder={'screenResolution'}
            />
            <LineContainerInputText
                label={'user Ip'}
                value={hit.userIp}
                onChangeText={useCallback(
                    (text) => {
                        setHit((prev) => ({ ...prev, userIp: text }));
                    },
                    [hit.userIp]
                )}
                placeHolder={'userIp'}
            />
            <LineContainerInputText
                label={'sessionNumber'}
                value={hit.sessionNumber}
                onChangeText={useCallback(
                    (text) => {
                        setHit((prev) => ({ ...prev, sessionNumber: text }));
                    },
                    [hit.sessionNumber]
                )}
                placeHolder={'sessionNumber'}
            />
            <Button
                style={styles.btn}
                isLoading={isLoading}
                title="Send"
                onPress={onPressSend}
            />
        </>
    );
}

export default Common;

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    btn: {
        marginTop: 20,
        marginBottom: 30,
        width: '100%'
    }
});
