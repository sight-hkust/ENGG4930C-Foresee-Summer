import {
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import Logo from '../../../Utils/Logo';
import { auth } from '../../config/config';
import { useEffect } from 'react';
import { StyledInput } from '../../../Utils/StyledInput';
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground';
import { RoundButton } from '../../../Utils/RoundButton';
import { ScreenHeight } from '../../../constant/Constant';
import { keyIcon, emailIcon } from '../../utils/icon';




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





    return (
        <LinearGradientBackground>
            <KeyboardAvoidingView
                behavior={"position"}
            >
                <View style={styles.content}>
                    <Logo />
                    <View style={{ marginTop: ScreenHeight * 0.1 }}>
                        <StyledInput
                            containerStyle={{ height: 50 }}
                            placeholder='電子郵件'
                            icon={emailIcon}
                            defaultValue={emailInput}
                            setValue={setEmailInput}
                            hideEmbeddedErrorMessage={true} />
                        <StyledInput
                            containerStyle={{ height: 50 }}
                            placeholder='密碼'
                            icon={keyIcon}
                            defaultValue={passwordInput}
                            setValue={setPasswordInput}
                            secureTextEntry={true}
                            hideEmbeddedErrorMessage />
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
