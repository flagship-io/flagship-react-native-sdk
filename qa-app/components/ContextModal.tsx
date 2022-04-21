import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Layout from '../constants/Layout';
import { generateUUID } from '../utils/helper';
import { Button, TextInput, View } from './Themed';

type Props = {
    context?: Record<string, any>;
    onUpdated: (context: Record<string, any>) => void;
};

type Item = {
    id: string;
    key: string;
    value: string;
};
function ContextModal({ context, onUpdated }: Props) {
    const [currentContext, setCurrentContext] = useState<Item[]>([]);

    useEffect(() => {
        const objectContext: Record<string, string> = context || {};
        const arrayContext = Object.entries(objectContext).map(
            ([key, value]) => {
                return { key, value, id: generateUUID() };
            }
        );
        setCurrentContext(arrayContext);
    }, [context]);

    const onPressUpdate = () => {
        const objectContext: Record<string, string> = {};
        currentContext.forEach((item) => {
            objectContext[item.key] = item.value;
        });
        onUpdated(objectContext);
    };

    const onPressAdd = () => {
        const newContext = [...currentContext];
        newContext.push({
            id: generateUUID(),
            key: '',
            value: ''
        });
        setCurrentContext(newContext);
    };

    const onRenderItemChange = (
        item: Item,
        text: string,
        key: 'key' | 'value'
    ) => {
        const newContext = [...currentContext];
        const itemFind = newContext.find((x) => x.id === item.id);
        if (!itemFind) {
            return;
        }
        itemFind[key] = text;
        setCurrentContext(newContext);
    };
    const onRenderItemRemove = (item: Item) => {
        const newContext = [...currentContext];
        const itemFind = newContext.filter((x) => x.id !== item.id);
        if (!itemFind) {
            return;
        }
        setCurrentContext(itemFind);
    };

    const renderItem = (item: Item) => {
        return (
            <View style={styles.renderContainer}>
                <TextInput
                    style={styles.renderTextInput}
                    value={item.key}
                    placeholder="key"
                    onChangeText={(text) => {
                        onRenderItemChange(item, text, 'key');
                    }}
                />
                <TextInput
                    style={styles.renderTextInput}
                    value={item.value}
                    placeholder="value"
                    onChangeText={(text) => {
                        onRenderItemChange(item, text, 'value');
                    }}
                />
                <FontAwesome
                    style={styles.renderRemoveBtn}
                    size={30}
                    name="remove"
                    color={'white'}
                    onPress={() => {
                        onRenderItemRemove(item);
                    }}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.addBtn}>
                <FontAwesome
                    size={30}
                    name="plus"
                    color={'white'}
                    onPress={onPressAdd}
                />
            </View>
            <View style={styles.flatList}>
                <FlatList
                    data={currentContext}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>
            <View>
                <Button
                    style={styles.updateBtn}
                    title="Update"
                    onPress={onPressUpdate}
                />
            </View>
        </View>
    );
}

export default React.memo(ContextModal);

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 20,
        height: (Layout.window.height * 80) / 100
    },
    renderContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    addBtn: {
        flex: 1,
        justifyContent: 'center'
    },
    flatList: {
        flex: 10
    },
    containerUpdateBtn: {
        flex: 1
    },
    updateBtn: {
        width: '100%'
    },
    renderRemoveBtn: {
        margin: 5
    },
    renderTextInput: {
        flex: 1,
        height: 40,
        fontSize: 20,
        marginBottom: 10
    }
});
