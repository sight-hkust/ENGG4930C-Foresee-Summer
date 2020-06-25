import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import WelcomeScreen from './Screens/WelcomeScreen';
import LoginScreen from './Screens/LoginScreen';
import GetEducatedScreen from './Screens/GetEducated';
import RecordsScreen from './Screens/RecordsScreen';
import ArticleDetailScreen from './Screens/ArticleDetail';
import AskAnExpertScreen from './Screens/AskAnExpertScreen';
import AddRecordScreen from './Screens/AddRecordScreen';
import DoctorsScreen from './Screens/Doctors';
import EyeExercise from './Screens/EyeExercise';

import ProfMainMenu from './Screens/ProfMainMenu';
import ProfPatientViewScreen from './Screens/ProfPatientViewScreen';
import ProfSearchResultScreen from './Screens/ProfSearchResultScreen';
import { Login } from './src/components/Login/Login';
import { Register } from './src/components/Registration/Register';
import MainScreen from './Screens/MainScreen';
import { Profile } from './src/components/Profile/Profile';

const Tab = createMaterialBottomTabNavigator();

global.realName = '';
global.email = '';
global.password = '';
global.apiUrl = '';

/** Login & Register Stacks */
function LoginAndRegisterScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

/** Normal User Screens */
function UserScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        initialParams={{ isProfessional: true }}
      />
      <Stack.Screen name="RecordsScreen" component={RecordsScreen} />
      <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} />
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
      <Stack.Screen name="AskAnExpertScreen" component={AskAnExpertScreen} />
      <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} />
      <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />
      <Stack.Screen name="EyeExercise" component={EyeExercise} />
    </Stack.Navigator>
  );
}

//Article list and detailed article
function Education({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          color: '#E1EDFF',
          fontSize: 30,
        },
        headerRight: () => (
          <Image
            source={require('./assets/images/setting.png')}
            style={{ marginRight: 20 }}
          />
        ),
      }}
    >
      <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} />
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * Professionl Screen
 * Todo: linking with Register
 */
function ProfessionalScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          color: '#E1EDFF',
          fontSize: 30,
        },
        headerRight: () => <SettingButton />,
      }}
    >
      <Stack.Screen
        name="ProfMainMenu"
        component={ProfMainMenu}
        options={{ title: '病人名單' }}
      />
      <Stack.Screen
        name="ProfPatientViewScreen"
        component={ProfPatientViewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfSearchResultScreen"
        component={ProfSearchResultScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * Article Screen : GetEducated -> ArticleDetail
 */

function ArticleScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          color: '#E1EDFF',
          fontSize: 30,
        },
        headerRight: () => (
          <Image
            source={require('./assets/images/setting.png')}
            style={{ marginRight: 20 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="GetEducatedScreen"
        component={GetEducatedScreen}
        options={{ title: '護眼秘笈' }}
      />
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * Home Screen : Record Data -> Add Record
 */
function HomeScreen({ navigation, route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          color: '#E1EDFF',
          fontSize: 30,
        },
        headerRight: () => (
          <Image
            source={require('./assets/images/setting.png')}
            style={{ marginRight: 20 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="RecordsScreen"
        component={RecordsScreen}
        options={{ title: '視力趨勢' }}
      />
      <Stack.Screen
        name="AddRecordScreen"
        component={AddRecordScreen}
        options={{ title: '新增資料' }}
      />
    </Stack.Navigator>
  );
}

/**
 *
 *  Top Right Corner Setting Button : button -> SettingScreen / Calling Drawer
 *
 *  To-do: Not yet linked to SettingScreen
 *
 */
const SettingButton = ({ route, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => console.log('settingButton')}
      style={{ marginRight: 15 }}
    >
      <Image source={require('./assets/images/setting.png')} />
    </TouchableOpacity>
  );
};

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="GetEducated"
          shifting={false}
          barStyle={{
            backgroundColor: '#BED8FF',
            height: Dimensions.get('window').height * 0.1,
            paddingHorizontal: 30,
          }}
          labeled={false}
        >
          <Tab.Screen
            name="GetEducated"
            showLabel={false}
            component={ArticleScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('./assets/images/Articles_dark.png')}
                  style={{ width: 40, height: 40 }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="TestScreen"
            showLabel={false}
            component={UserScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('./assets/images/Exercise_dark.png')}
                  style={{ width: 40, height: 40 }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="HomeScreen"
            showLabel={false}
            component={HomeScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('./assets/images/Icon_solid.png')}
                  style={{ width: 40, height: 40 }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="d"
            showLabel={false}
            component={UserScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('./assets/images/Qna_dark.png')}
                  style={{ width: 40, height: 40 }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="ProfessionalScreen"
            showLabel={false}
            component={ProfessionalScreen}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('./assets/images/Achievement_dark.png')}
                  style={{ width: 40, height: 40 }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
