import {
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
<<<<<<< Updated upstream
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
=======
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Logo from '../../../Utils/Logo';
import { auth } from '../../config/config';
import { useEffect } from 'react';
import { StyledInput } from '../../../Utils/StyleInput';
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground';
import { ScreenHeight } from '../../../constant/Constant';
import { RoundButton } from '../../../Utils/RoundButton';
>>>>>>> Stashed changes

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
            navigation.navigate('MainScreen')
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

<<<<<<< Updated upstream
=======
    const emailIcon = <MaterialCommunityIcon
        name='email-outline'
        color='#FFFFFF'
        size={32} />

    const keyIcon = <FeatherIcon
        name='key'
        color='#FFFFFF'
        size={32} />


>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                <KeyboardAvoidingView
                    behavior={"position"}
                >
                    <Logo />
                    <View style={styles.loginContainer}>
                        <StyledInput
                            placeholder='電子郵件'
                            icon='email'
=======
                <View style={styles.content}>
                    <Logo style={styles.logoContainer} />
                    <View style={{ marginTop: ScreenHeight * 0.1 }}>
                        <StyledInput
                            placeholder='電子郵件'
                            icon={emailIcon}
>>>>>>> Stashed changes
                            defaultValue={emailInput}
                            setValue={setEmailInput} />
                        <StyledInput
                            placeholder='密碼'
<<<<<<< Updated upstream
                            icon='key'
                            defaultValue={passwordInput}
                            setValue={setPasswordInput} />
                        <TouchableOpacity style={{ zIndex: 2, }} onPress={handleSubmit}>
                            <View style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>登入</Text>
                            </View>
=======
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
>>>>>>> Stashed changes
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
