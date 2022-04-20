import {
    EventCategory,
    HitType,
    ITransaction
} from '@flagship.io/react-native-sdk';
import React, { useCallback, useState } from 'react';
import LineContainerInputText from '../LineContainerInputText';
import Common from './Common';

function TransactionView() {
    const [transaction, setTransaction] = useState<ITransaction>({
        type: HitType.TRANSACTION,
        category: EventCategory.ACTION_TRACKING
    } as any);

    return (
        <>
            <LineContainerInputText
                label={'transactionId *'}
                value={transaction.transactionId}
                onChangeText={useCallback(
                    (text) => {
                        setTransaction((prev) => ({
                            ...prev,
                            transactionId: text
                        }));
                    },
                    [transaction.transactionId]
                )}
                placeHolder={'transactionId'}
            />
            <LineContainerInputText
                label={'affiliation *'}
                value={transaction.affiliation}
                onChangeText={useCallback(
                    (text) => {
                        setTransaction((prev) => ({
                            ...prev,
                            affiliation: text
                        }));
                    },
                    [transaction.affiliation]
                )}
                placeHolder={'affiliation'}
            />
            <LineContainerInputText
                label={'taxes'}
                value={transaction.taxes?.toString()}
                onChangeText={useCallback(
                    (text) => {
                        setTransaction((prev) => ({
                            ...prev,
                            taxes: Number(text) || undefined
                        }));
                    },
                    [transaction.taxes]
                )}
                placeHolder={'taxes'}
            />

            <LineContainerInputText
                label={'currency'}
                value={transaction.currency}
                onChangeText={useCallback(
                    (text) => {
                        setTransaction((prev) => ({
                            ...prev,
                            currency: text
                        }));
                    },
                    [transaction.currency]
                )}
                placeHolder={'currency'}
            />

            <LineContainerInputText
                label={'couponCode'}
                value={transaction.couponCode}
                onChangeText={useCallback(
                    (text) => {
                        setTransaction((prev) => ({
                            ...prev,
                            couponCode: text
                        }));
                    },
                    [transaction.couponCode]
                )}
                placeHolder={'couponCode'}
            />

            <LineContainerInputText
                label={'itemCount'}
                value={transaction.itemCount?.toString()}
                onChangeText={useCallback(
                    (text) => {
                        setTransaction((prev) => ({
                            ...prev,
                            itemCount: Number(text) || undefined
                        }));
                    },
                    [transaction.itemCount]
                )}
                placeHolder={'itemCount'}
            />

            <LineContainerInputText
                label={'shippingMethod'}
                value={transaction.shippingMethod}
                onChangeText={useCallback(
                    (text) => {
                        setTransaction((prev) => ({
                            ...prev,
                            shippingMethod: text
                        }));
                    },
                    [transaction.shippingMethod]
                )}
                placeHolder={'shippingMethod'}
            />

            <LineContainerInputText
                label={'paymentMethod'}
                value={transaction.paymentMethod}
                onChangeText={useCallback(
                    (text) => {
                        setTransaction((prev) => ({
                            ...prev,
                            paymentMethod: text
                        }));
                    },
                    [transaction.paymentMethod]
                )}
                placeHolder={'paymentMethod'}
            />

            <LineContainerInputText
                label={'totalRevenue'}
                value={transaction.totalRevenue?.toString()}
                onChangeText={useCallback(
                    (text) => {
                        setTransaction((prev) => ({
                            ...prev,
                            totalRevenue: Number(text) || undefined
                        }));
                    },
                    [transaction.totalRevenue]
                )}
                placeHolder={'totalRevenue'}
            />

            <LineContainerInputText
                label={'shippingCosts'}
                value={transaction.shippingCosts?.toString()}
                onChangeText={useCallback(
                    (text) => {
                        setTransaction((prev) => ({
                            ...prev,
                            shippingCosts: Number(text) || undefined
                        }));
                    },
                    [transaction.shippingCosts]
                )}
                placeHolder={'shippingCosts'}
            />

            <Common hit={transaction} />
        </>
    );
}

export default TransactionView;
