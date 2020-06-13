
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterOptions from './RegisterOptions';
import { Styles } from '../../../Styles/styles';
import AppColors from '../../../Styles/colors';
import { RegisterForm } from './RegisterForm';

const RegistrationStack = createStackNavigator();


function Register() {
    return (
        <RegistrationStack.Navigator
            initialRouteName="RegisterOptions"
        >
            <RegistrationStack.Screen
                name='Registration Form'
                component={RegisterForm}
                options={{
                    title: '建立帳戶',
                    headerStyle: Styles.headerStyle,
                    headerTintColor: AppColors.headerTintWhite,
                    headerTitleStyle: Styles.headerTitleStyle,
                }}
                initialParams={{}} />
            <RegistrationStack.Screen name='Register Options' component={RegisterOptions} />
        </RegistrationStack.Navigator>
    )
}


export default Register;
