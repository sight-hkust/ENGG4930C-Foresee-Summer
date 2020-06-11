import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    TextInput,
} from 'react-native';
import React, {Component} from 'react';
import AppColors from '../Styles/colors';
import {Styles} from '../Styles/styles';
//import Strings from '../Strings';

//import {LineChart} from 'react-native-chart-kit';

export default class AddRecordScreen extends Component {
    componentDidMount() {
        this.setState({});
    }

    constructor(props) {
        super(props);
        this.state = {
            rightEyeMyopia: '',
            leftEyeMyopia: '',
            month: '',
            year: '',
        };
    }

   

    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView style={AddRecordStyles.mainView}>
                    <Text>add record screen</Text>
                </SafeAreaView>
            </View>
        );
    }
}

const AddRecordStyles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    button: {
        borderWidth: 2,
        width: '40%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'gray',
    },
    buttonText: {
        fontSize: 24,
        color: 'gray',
        fontWeight: 'bold',
    },
    nextButton: {
        borderColor: AppColors.primaryDark,
    },
    nextText: {
        color: AppColors.primaryDark,
    },
    textInput: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '80%',
        marginBottom: 50,
    },
    choiceButton: {
        width: '80%',
        height: 80,
        borderWidth: 4,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 50,
    },
    choicesContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    choiceText: {
        fontSize: 24,
        color: 'gray',
        fontWeight: 'bold',
    },
    adviceText: {
        width: '80%',
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor: 'orange',
        marginBottom: 10,
    },
    recordContainer: {
        height: 60,
        width: '100%',
    },
    grayLine: {
        height: 1,
        width: '100%',
        backgroundColor: 'gray',
        marginLeft: 20,
    },
    recordText: {
        textAlign: 'left',
        marginLeft: 20,
        fontSize: 20,
        width: '100%',
        marginBottom: 10,
        marginTop: 20,
    },
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
    logo: {
        width: 200,
        height: 200,
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
});
