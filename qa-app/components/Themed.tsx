import React, { Children, useCallback, useEffect, useState } from 'react';
import {
    Text as DefaultText,
    View as DefaultView,
    Button as DefaultButton,
    TextInput as DefaultTextInput,
    Switch as DefaultSwitch,
    TouchableHighlight as DefaultTouchableHighlight,
    ActivityIndicator as DefaultActivityIndicator
} from 'react-native';
import { debounce } from 'lodash';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
    const theme = useColorScheme();
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ButtonProps = ThemeProps &
    DefaultTouchableHighlight['props'] & { title: string; isLoading?: boolean };
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type SwitchProps = ThemeProps & DefaultSwitch['props'];
export type ActivityIndicatorProps = ThemeProps &
    DefaultActivityIndicator['props'];

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        'background'
    );

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Button(props: ButtonProps) {
    const {
        lightColor,
        darkColor,
        style,
        title,
        children,
        isLoading,
        ...otherProps
    } = props;
    const tint = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
    const tint2 = useThemeColor(
        { light: lightColor, dark: darkColor },
        'tint2'
    );

    return (
        <DefaultTouchableHighlight
            underlayColor={tint2}
            style={[
                {
                    backgroundColor: tint,
                    minHeight: 50,
                    minWidth: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5
                },
                style
            ]}
            {...otherProps}
        >
            <DefaultView style={{ flexDirection: 'row' }}>
                <Text>{title}</Text>
                {isLoading && <ActivityIndicator color={'white'} />}
            </DefaultView>
        </DefaultTouchableHighlight>
    );
}

export const TextInput = React.memo((props: TextInputProps) => {
    const [text, setText] = useState<string | undefined>();
    const {
        value,
        onChangeText: propsOnChangeText,
        style,
        lightColor,
        darkColor,
        ...otherPros
    } = props;
    useEffect(() => {
        setText(value);
    }, [value]);

    const TextInputDebounce = useCallback(
        debounce((textValue: string, func: (value: string) => void) => {
            func(textValue.trim());
        }, 300),
        []
    );

    const onChangeText = (textValue: string) => {
        if (propsOnChangeText) {
            setText(textValue);
            TextInputDebounce(textValue, propsOnChangeText);
        }
    };

    const tabIconDefault = useThemeColor(
        { light: lightColor, dark: darkColor },
        'tabIconDefault'
    );
    const textColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        'text'
    );
    const tint = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

    return (
        <DefaultTextInput
            style={[
                {
                    borderColor: tabIconDefault,
                    borderWidth: 1,
                    color: textColor
                },
                style
            ]}
            value={text}
            onChangeText={onChangeText}
            placeholderTextColor={tabIconDefault}
            selectionColor={tint}
            {...otherPros}
        />
    );
});

export const Switch = React.memo((props: SwitchProps) => {
    const { lightColor, darkColor, ...otherPros } = props;
    const tint = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
    const tabIconDefault = useThemeColor(
        { light: lightColor, dark: darkColor },
        'tabIconDefault'
    );
    return (
        <DefaultSwitch
            thumbColor={'white'}
            trackColor={{
                true: tint,
                false: tabIconDefault
            }}
            {...otherPros}
        />
    );
});

export const ActivityIndicator = React.memo((props: ActivityIndicatorProps) => {
    const { lightColor, darkColor, ...otherPros } = props;
    return <DefaultActivityIndicator {...otherPros} />;
});
