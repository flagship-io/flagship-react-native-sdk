import { StyleSheet } from "react-native"

const defaultHeight = 40
const defaultFontSize = 15

export default StyleSheet.create({
    textInput:{
        height: defaultHeight,
        paddingLeft:5, 
        paddingEnd:5,
        borderRadius: 5,
        fontSize:defaultFontSize
    },
    label:{
        textAlignVertical: 'center',
        fontSize:defaultFontSize
    }
})