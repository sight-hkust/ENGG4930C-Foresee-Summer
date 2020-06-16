
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterOptions from './RegisterOptions/RegisterOptions';
import { Styles } from '../../../Styles/styles';
import AppColors from '../../../Styles/colors';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';

const RegistrationStack = createStackNavigator();


function Register() {
    return (
        <RegistrationStack.Navigator
            initialRouteName="Register Options">
            <RegistrationStack.Screen
                name='Patient Register'
                component={RegistrationForm}
                options={{
                    title: '建立帳戶',
                    headerStyle: Styles.headerStyle,
                    headerTintColor: AppColors.headerTintWhite,
                    headerTitleStyle: Styles.headerTitleStyle,
                }}
            />

            <RegistrationStack.Screen
                name='Professional Register'
                component={RegistrationForm}
                options={{
                    title: '建立專業帳戶',
                    headerStyle: Styles.headerStyle,
                    headerTintColor: AppColors.headerTintWhite,
                    headerTitleStyle: Styles.headerTitleStyle,
                }}
            />
            <RegistrationStack.Screen name='Register Options'
                component={RegisterOptions}
                options={{ headerShown: false }}
            />
        </RegistrationStack.Navigator>
    )
}


export default Register;
