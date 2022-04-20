import { HitType, IItem } from '@flagship.io/react-native-sdk';
import React, { useCallback, useState } from 'react';
import LineContainerInputText from '../LineContainerInputText';
import Common from './Common';

function ItemView() {
    const [item, setItem] = useState<IItem>({
        type: HitType.TRANSACTION
    } as any);

    return (
        <>
            <LineContainerInputText
                label={'transactionId *'}
                value={item.transactionId}
                onChangeText={useCallback(
                    (text) => {
                        setItem((prev) => ({
                            ...prev,
                            transactionId: text
                        }));
                    },
                    [item.transactionId]
                )}
                placeHolder={'transactionId'}
            />
            <LineContainerInputText
                label={'productName *'}
                value={item.productName}
                onChangeText={useCallback(
                    (text) => {
                        setItem((prev) => ({
                            ...prev,
                            productName: text
                        }));
                    },
                    [item.productName]
                )}
                placeHolder={'productName'}
            />
            <LineContainerInputText
                label={'productSku *'}
                value={item.productSku}
                onChangeText={useCallback(
                    (text) => {
                        setItem((prev) => ({
                            ...prev,
                            productSku: text
                        }));
                    },
                    [item.productSku]
                )}
                placeHolder={'productSku'}
            />
            <LineContainerInputText
                label={'itemPrice'}
                value={item.itemPrice?.toString()}
                onChangeText={useCallback(
                    (text) => {
                        setItem((prev) => ({
                            ...prev,
                            itemPrice: Number(text) || undefined
                        }));
                    },
                    [item.itemPrice]
                )}
                placeHolder={'itemPrice'}
            />

            <LineContainerInputText
                label={'itemQuantity'}
                value={item.itemQuantity?.toString()}
                onChangeText={useCallback(
                    (text) => {
                        setItem((prev) => ({
                            ...prev,
                            itemQuantity: Number(text) || undefined
                        }));
                    },
                    [item.itemQuantity]
                )}
                placeHolder={'itemQuantity'}
            />

            <LineContainerInputText
                label={'itemCategory'}
                value={item.itemCategory}
                onChangeText={useCallback(
                    (text) => {
                        setItem((prev) => ({
                            ...prev,
                            itemCategory: text
                        }));
                    },
                    [item.itemCategory]
                )}
                placeHolder={'itemCategory'}
            />

            <Common hit={item} />
        </>
    );
}

export default ItemView;
