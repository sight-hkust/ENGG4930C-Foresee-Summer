import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    TextInput,
    ImageBackground,
    Button,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import React, { Component, useState } from 'react';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import FonistoIcon from 'react-native-vector-icons/Fontisto';
import Logo from '../Logo/Logo';
import TextFieldBorder from '../../../assets/images/TextFieldBorder.png'
import { auth } from '../../../constant/Config';


const StyledInput = ({ placeholder, icon, defaultValue, setValue }) => {
    return (
        <>
            <ImageBackground
                source={TextFieldBorder}
                style={styles.textFieldBorder}
                resizeMethod="resize"
                resizeMode="contain">
                <View style={styles.textInputContainer}>
                    <View style={styles.textInputIcon}>
                        <FonistoIcon name={icon} size={30} color={'white'} />
                    </View>
                    <TextInput style={styles.textInputField}
                        placeholder={placeholder}
                        placeholderTextColor={'white'}
                        defaultValue={defaultValue}
                        onChangeText={value => setValue(value)}
                    />

                </View>
            </ImageBackground>
        </>
    )
}

export const Login = ({ navigation, route }) => {
    /* constructor(props) {
        super(props);
        this.state = { isDoctorLogin: false, email: '', password: '' };
    }

    ChangeLoginState() {
        this.setState({ isDoctorLogin: !this.state.isDoctorLogin });
    } */

    const login = () => {
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

    auth.onAuthStateChanged((user) => {
        if (user) {
            navigation.navigate('Dmain')
        }
    })

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const handleSubmit = () => {
        auth.signInWithEmailAndPassword(emailInput, passwordInput)
            .catch(function onFailure(err) {
                console.log(err.code, err.message);
            })
    }

    return (
        <SafeAreaView>
            <LinearGradient
                colors={['#2D9CDB', '#48B3BA', '#0ED984']}
                start={[0, 0.3]}
                end={[1, 1]}
                locations={[0.25, 0.5, 1]}
                style={{
                    height: '100%',
                }}
            >
                <KeyboardAvoidingView
                    behavior={"position"}
                >
                    <Logo />
                    <View style={styles.loginContainer}>
                        <StyledInput
                            placeholder='電子郵件'
                            icon='email'
                            defaultValue={emailInput}
                            setValue={setEmailInput} />
                        <StyledInput
                            placeholder='密碼'
                            icon='key'
                            defaultValue={passwordInput}
                            setValue={setPasswordInput} />
                        <TouchableOpacity style={{ zIndex: 2, }} onPress={handleSubmit}>
                            <View style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>登入</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.registrationNav}>
                            <Text style={styles.registrationNavText}>未有用戶? </Text>
                            <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                                <Text style={[styles.registrationNavText, { color: "#FFFFFF" }]}>登記</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>

            </LinearGradient>
        </SafeAreaView>
    )
};