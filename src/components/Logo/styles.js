import { StyleSheet } from "react-native";
import { ScreenWidth, ScreenHeight, FontScale } from '../../../constant/Constant';

export const styles = StyleSheet.create({
    logoContainer: {
        marginTop: ScreenHeight * 0.15,
        flexDirection: "row",
        height: ScreenHeight * 0.225,
        width: ScreenWidth * 0.55,
        left: ScreenWidth * 0.225,
        alignItems: 'center'
    },
    logoText: {
        color: 'white',
        fontWeight: "700",
        textAlignVertical: 'center',
        fontSize: FontScale * 20,
        left: ScreenWidth* 0.03,
        flex: 4
    },
    icon: {
        flex: 4
    }
})