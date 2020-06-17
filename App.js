import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Image } from 'react-native'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
const Tab = createBottomTabNavigator();

const Icon = require('./assets/images/Icon_solid.png');

global.realName = '';
global.email = '';
global.password = '';
global.apiUrl = '';


// function MyStack() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator
//                 screenOptions={{
//                     headerShown: false,
//                 }}
//             >
//                 <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
//                 <Stack.Screen name="Login" component={Login} />
//                 <Stack.Screen name="Register" component={Register} />
//                 <Stack.Screen name="MainScreen" component={MainScreen} />
//                 <Stack.Screen name="RecordsScreen" component={RecordsScreen} />
//                 <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} />
//                 <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
//                 <Stack.Screen name="AskAnExpertScreen" component={AskAnExpertScreen} />
//                 <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} />
//                 <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }


/** Login & Register Stacks */
function LoginAndRegisterScreen({ navigation, route }) {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
}

/** Normal User Screens */
function UserScreen({ navigation, route }) {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator headerMode="none">
            <Stack.Screen name="MainScreen" component={MainScreen} initialParams={{isProfessional: true}}/>
            <Stack.Screen name="RecordsScreen" component={RecordsScreen} />
            <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} />
            <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
            <Stack.Screen name="AskAnExpertScreen" component={AskAnExpertScreen} />
            <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} />
            <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />
      </Stack.Navigator>
    );
}

/** Professional User Screen */
function ProfessionalScreen({ navigation, route }) {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator headerMode="none">
            <Stack.Screen name="ProfMainMenu" component={ProfMainMenu} />
            <Stack.Screen name="ProfPatientViewScreen" component={ProfPatientViewScreen} />
            <Stack.Screen name="ProfSearchResultScreen" component={ProfSearchResultScreen} />
      </Stack.Navigator>
    );
}
  

export default class Main extends Component {

    constructor(props) {
      super(props)
    }

    render() {
      
      return (
          <NavigationContainer >
            <Tab.Navigator tabBarOptions={{
                activeTintColor: '#e91e63', 
                style: {      
                    backgroundColor:'transparent',
                },
                tabStyle: {
                    backgroundColor:'transparent',
                    color: 'red'
                }, 
                labelStyle: {
                    backgroundColor:'transparent',
                    color: 'red'
                },
      
                removeClippedSubviews: true,
                indicatorStyle: {
                    backgroundColor:'transparent',
                    color: 'red'
                },
                inactiveBackgroundColor: 'transparent'

            
            }}    
            >
              <Tab.Screen name="User" component={UserScreen} />
              <Tab.Screen name="Prof" component={ProfessionalScreen} />
              <Tab.Screen name="Vin" component={ProfPatientViewScreen}               
                options={{
                tabBarIcon: ({ color, size }) => (
                    <Image source={Icon} style={{width: 60, height: 60, marginBottom: 150}}/>
                    ),
                }}/>
              <Tab.Screen name="login&reg" component={LoginAndRegisterScreen} />
              <Tab.Screen name="+record" component={AddRecordScreen} initialParams={{isProfessional: false}}/>
              {/* <Tab.Screen name="record" component={RecordsScreen} initialParams={{isProfessional: false}}/>        */}
            </Tab.Navigator>
          </NavigationContainer>
      );
    }
  }
