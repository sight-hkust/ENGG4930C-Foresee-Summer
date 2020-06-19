import { StyleSheet } from "react-native";
import { FontScale, ScreenWidth, ScreenHeight } from "../../../../constant/Constant";

export const styles = StyleSheet.create({
    content: {
        marginTop: ScreenHeight * 0.15,
    },
    optionsContainer: {
        marginTop: ScreenHeight * 0.1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: FontScale * 25,
        fontFamily: 'Roboto',
        color: 'white',
    },
    button: {
        margin: ScreenHeight * 0.03,
        borderColor: 'white',
        borderRadius: ScreenWidth * 0.07,
        borderWidth: 1,
        width: ScreenWidth * 0.45,
        height: ScreenHeight * 0.07,
        shadowRadius: ScreenWidth * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: FontScale * 18
    },


    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
});
