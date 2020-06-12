import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import React, { Component } from 'react';
import { Styles } from '../Styles/styles';
import AppColors from '../Styles/colors';

//import Strings from '../Strings';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { isDoctorLogin: false, email: '', password: '' };
    }

    ChangeLoginState() {
        this.setState({ isDoctorLogin: !this.state.isDoctorLogin });
    }

    login() {
        /*
        fetch(global.apiUrl + 'login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.status === 'OK') {
                    global.realName = json.user.real_name;
                    global.email = json.user.email;
                    global.password = json.user.password;
                    this.props.navigation.navigate('MainScreen', {});
                } else {
                    Alert.alert('Email or Password is wrong!');
                }
            })
            .catch(error => {
                console.error(error);
            });
            */
    }

    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={LoginStyles.mainView}>
                    <View style={LoginStyles.logoContainer}>

                    </View>
                    <View style={LoginStyles.contentContainer}>
                        <Text style={LoginStyles.doctorsLoginTitle}>
                            {this.state.isDoctorLogin ? 'Doctor\'s Login' : ''}
                        </Text>
                        <Text style={LoginStyles.labelText}>email</Text>
                        <TextInput style={LoginStyles.loginFieldsTextInput}
                            onChangeText={(event) => this.setState({ email: event })} />
                        <Text style={LoginStyles.labelText}>email</Text>
                        <TextInput style={LoginStyles.loginFieldsTextInput}
                            onChangeText={(event) => this.setState({ password: event })}
                            secureTextEntry={true} />

                        <View style={LoginStyles.loginAndRegisterButtonContainer}>
                            <TouchableOpacity
                                style={Styles.smallButton}
                                onPress={() => this.props.navigation.navigate(
                                    'Register',
                                    { screen: 'Register Options' }
                                )}>
                                <Text style={Styles.smallButtonText}>register</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[Styles.smallButton, Styles.aProgressionButton]}
                                onPress={() => this.login()}>
                                <Text style={[Styles.smallButtonText, Styles.aProgressionText]}>
                                    login
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => this.ChangeLoginState()}
                            style={LoginStyles.changeLoginOptionButton}>
                            <Text>
                                {this.state.isDoctorLogin
                                    ? 'Go To Patient Login'
                                    : 'Go To Doctor Login'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const LoginStyles = StyleSheet.create({
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

// TODO: Async storage to store login info
