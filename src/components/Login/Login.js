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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Logo from '../Logo/Logo';
import { auth } from '../../config/config';
import { useEffect } from 'react';
import { StyledInput } from '../../../Utils/StyleInput';
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground';

export const Login = ({ navigation, route }) => {
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('Profile')
            }
        })
    })

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const handleSubmit = () => {
        auth.signInWithEmailAndPassword(emailInput, passwordInput)
            .catch(function onFailure(err) {
                console.log(err.code, err.message);
            })
    }

    const emailIcon = <MaterialCommunityIcon
        name='email-outline'
        color='#FFFFFF'
        size={30} />

    const keyIcon = <FeatherIcon
        name='key'
        color='#FFFFFF'
        size={30} />


    return (
        <LinearGradientBackground>
            <KeyboardAvoidingView
                behavior={"position"}
            >
                <Logo />
                <View style={styles.loginContainer}>
                    <StyledInput
                        placeholder='電子郵件'
                        icon={emailIcon}
                        defaultValue={emailInput}
                        setValue={setEmailInput} />
                    <StyledInput
                        placeholder='密碼'
                        icon={keyIcon}
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
        </LinearGradientBackground>
    )
};