import { StyleSheet } from "react-native";
import AppColors from "../../../Styles/colors";
import { ScreenWidth, ScreenHeight, FontScale } from "../../../constant/Constant";

export const styles = StyleSheet.create({
    loginFieldsTextInput: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 30,
    },
    logoContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    contentContainer: {
        flex: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    loginAndRegisterButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '80%',
    },
    registerButton: {
        height: 50,
        width: 150,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeLoginOptionButton: {
        marginTop: 20,
    },
    labelText: {
        width: '80%',
        textAlign: 'left',
        marginBottom: 10,
        fontSize: 24,
        color: 'gray',
        fontWeight: 'bold',
    },
    doctorsLoginTitle: {
        fontSize: 32,
        textAlign: 'center',
        width: '100%',
        fontWeight: 'bold',
        color: AppColors.primaryDark,
        marginBottom: 20,
    },
    loginContainer: {
        marginTop: ScreenWidth * 0.2,
        marginHorizontal: ScreenWidth * 0.2,
    },
    textFieldBorder: {
        width: ScreenWidth * 0.6,
        height: ScreenHeight * 0.1,
        marginBottom: ScreenHeight * 0.02
    },
    textInputContainer: {
        flexDirection: "row",
    },
    textInputIcon: {
        flex: 2,
        alignItems: 'center',
    },
    textInputField: {
        flex: 5,
        textAlignVertical: 'center',
        fontSize: FontScale * 20,
        color: "#fff",
        fontFamily: 'Roboto',
    },
    submitButton: {
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
        borderRadius: ScreenHeight * 0.03,
        width: '80%',
        height: ScreenHeight * 0.06,
        alignSelf: "center",
        elevation: 4,
    },
    submitButtonText: {
        textAlign: "center",
        textAlignVertical: 'center',
        color: '#2D9CDB',
        fontSize: FontScale * 20,
        fontFamily: 'Roboto',
    },
    registrationNav: {
        flexDirection: "row",
        marginTop: ScreenHeight * 0.02,
        alignSelf: 'center'
    },
    registrationNavText: {
        fontSize: FontScale * 18,
        fontFamily: 'Roboto',
        color: '#24559E'
    }

});


