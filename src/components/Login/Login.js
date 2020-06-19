import {
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Logo from '../../../Utils/Logo';
import { auth } from '../../config/config';
import { useEffect } from 'react';
import { StyledInput } from '../../../Utils/StyleInput';
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground';
import { RoundButton } from '../../../Utils/RoundButton';
import { ScreenHeight } from '../../../constant/Constant';

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
        size={32} />

    const keyIcon = <FeatherIcon
        name='key'
        color='#FFFFFF'
        size={32} />


    return (
        <LinearGradientBackground>
            <KeyboardAvoidingView
                behavior={"position"}
            >
                <View style={styles.content}>
                    <Logo style={styles.logoContainer} />
                    <View style={{ marginTop: ScreenHeight * 0.1 }}>
                        <StyledInput
                            placeholder='電子郵件'
                            icon={emailIcon}
                            defaultValue={emailInput}
                            setValue={setEmailInput} />
                        <StyledInput
                            placeholder='密碼'
                            icon={keyIcon}
                            defaultValue={passwordInput}
                            setValue={setPasswordInput}
                            secureTextEntry={true}
                        />
                    </View>
                    <RoundButton title={'登入'} onPress={handleSubmit} />
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
