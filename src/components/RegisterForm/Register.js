
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PatientRegisterForm } from './RegisterForm/PatientRegisterForm';
import RegisterOptions from './RegisterOptions';

const RegistrationStack = createStackNavigator();


function Register() {
    return (
        <RegistrationStack.Navigator>
            <RegistrationStack.Screen name='Registration Form' component={PatientRegisterForm} initialParams={{}} />
            <RegistrationStack.Screen name='Register Options' component={RegisterOptions} />
        </RegistrationStack.Navigator>
    )
}


export default Register;
