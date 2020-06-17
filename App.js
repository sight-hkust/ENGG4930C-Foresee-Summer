import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './Screens/WelcomeScreen'
import LoginScreen from './Screens/LoginScreen';
import GetEducatedScreen from './Screens/GetEducated';
import RecordsScreen from './Screens/RecordsScreen';
import ArticleDetailScreen from './Screens/ArticleDetail';
import AskAnExpertScreen from './Screens/AskAnExpertScreen';
import AddRecordScreen from './Screens/AddRecordScreen';
import DoctorsScreen from './Screens/Doctors';


import ProfMainMenu from './Screens/ProfMainMenu'
import ProfPatientViewScreen from './Screens/ProfPatientViewScreen'
import ProfSearchResultScreen from './Screens/ProfSearchResultScreen'
import { Login } from './src/components/Login/Login';
import { Register } from './src/components/Registration/Register';
import MainScreen from './Screens/MainScreen';

const Stack = createStackNavigator();

global.realName = '';
global.email = '';
global.password = '';
global.apiUrl = '';


function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="MainScreen" component={MainScreen} />
                <Stack.Screen name="RecordsScreen" component={RecordsScreen} />
                <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} />
                <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
                <Stack.Screen name="AskAnExpertScreen" component={AskAnExpertScreen} />
                <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} />
                <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />
                <Stack.Screen name="ProfPatientViewScreen" component={ProfPatientViewScreen} />
                <Stack.Screen name="ProfSearchResultScreen" component={ProfSearchResultScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {

    return MyStack()
};
