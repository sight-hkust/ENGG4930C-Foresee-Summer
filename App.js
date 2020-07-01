import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import GetEducatedScreen from './src/components/Education/GetEducated';
import EyeExercise from './src/components/Education/EyeExercise';
import ArticleDetailScreen from './src/components/Education/ArticleDetail';
import PostQuestion from './src/components/AskAnExpert/PostQuestionScreen';
import AskAnExpertMainScreen from './src/components/AskAnExpert/AskAnExpertMainScreen';

import RecordsScreen from './Screens/RecordsScreen';
import AddRecordScreen from './Screens/AddRecordScreen';
import OverviewScreen from './Screens/OverviewScreen';

import { Login } from './src/components/Login/Login';
import { Register } from './src/components/Registration/Register';
import { Profile } from './src/components/Profile/Profile';
import { QRCodeScannerScreen } from './src/components/QRCodeScannerScreen/QRCodeScannerScreen';

import { auth } from './src/config/config';

import ProfMainMenu from './src/components/Professional/ProfMainMenu';
import ProfPatientViewScreen from './src/components/Professional/ProfPatientViewScreen';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import WelcomeScreen from './Screens/WelcomeScreen';

import SettingScreen from './src/components/Setting/Setting';
import PrivacyPolicy from './src/components/Policy/PrivacyPolicy';
import TermsAndCondition from './src/components/Policy/TermsAndCondition';
import { set } from 'react-native-reanimated';
import { auth } from './src/config/config';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

global.realName = '';
global.email = '';
global.password = '';
global.apiUrl = '';

/** Normal User Screens */
function UserScreen({ navigation, route }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          fontSize: 31,
          color: '#E1EDFF',
          fontWeight: '700',
        },
        headerRight: () => <SettingButton navigation={navigation} />,
      }}
    >
      <Stack.Screen name="RecordsScreen" component={RecordsScreen} />
      <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
      <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} />
      <Stack.Screen name="EyeExercise" component={EyeExercise} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ title: '設定' }} />
    </Stack.Navigator>
  );
}

//Article list and detailed article
function Education({ navigation, route }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          fontSize: 31,
          color: '#E1EDFF',
          fontWeight: '700',
        },
        headerRight: () => <SettingButton navigation={navigation} />,
      }}
    >
      <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
}

function ProfessionalScreen({ navigation, route }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          fontSize: 31,
          color: '#E1EDFF',
          fontWeight: '700',
        },
        headerRight: () => <SettingButton navigation={navigation} />,
      }}
    >
      <Stack.Screen name="ProfMainMenu" component={ProfMainMenu} options={{ title: '病人名單' }} />
      <Stack.Screen name="ProfPatientViewScreen" component={ProfPatientViewScreen} options={{ title: '' }} />
      <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} options={{ title: '新增資料' }} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ title: '設定' }} />
    </Stack.Navigator>
  );
}

function ArticleScreen({ navigation, route }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          fontSize: 31,
          color: '#E1EDFF',
          fontWeight: '700',
        },
        headerRight: () => <SettingButton navigation={navigation} />,
      }}
    >
      <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} options={{ title: '護眼秘笈' }} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function ExerciseScreen({ navigation, route }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      headerTitleAlign="left"
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          color: '#E1EDFF',
          fontSize: 30,
        },
        headerRight: () => <SettingButton navigation={navigation} />,
      }}
    >
      <Stack.Screen name="RecordsScreen" component={RecordsScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation, route }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      headerTitleAlign="left"
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          color: '#E1EDFF',
          fontSize: 30,
        },
        headerRight: () => <SettingButton navigation={navigation} />,
      }}
    >
      <Stack.Screen name="OverViewScreen" component={OverviewScreen} options={{ title: '' }} />
      <Stack.Screen name="RecordsScreen" component={RecordsScreen} options={{ title: '' }} />
      <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} options={{ title: '新增資料' }} />
    </Stack.Navigator>
  );
}

function FaqScreen({ navigation, route }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {
          color: '#E1EDFF',
          fontSize: 30,
        },
        headerRight: () => <SettingButton navigation={navigation} />,
      }}
    >
      <Stack.Screen name="AskAnExpertMainScreen" component={AskAnExpertMainScreen} options={{ title: '專家解答' }} />
      <Stack.Screen name="PostQuestion" component={PostQuestion} options={{ title: '撰寫問題' }} />
    </Stack.Navigator>
  );
}

function SettingButton({ route, navigation }) {
  return (
    <>
      {auth.currentUser.displayName != null && auth.currentUser.displayName == 'professional' ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SettingScreen');
            //navigation.navigate('ProfessionalScreen', { screen: 'TutorialScreen' });
          }}
          style={{ marginRight: 20 }}
        >
          <Icon name="logout" type="material-community" color="white" size={30} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SettingScreen');
          }}
          style={{ marginRight: 15 }}
        >
          <Image source={require('./assets/images/setting.png')} />
        </TouchableOpacity>
      )}
    </>
  );
}

function Main({ route, navigation }) {
  return (
    <Tab.Navigator
      headerMode="screen"
      labeled={false}
      barStyle={{
        backgroundColor: '#BED8FF',
        height: Dimensions.get('window').height * 0.1,
        paddingHorizontal: auth.currentUser != null && auth.currentUser.displayName == 'professional' ? 100 : 30,
      }}
    >
      {auth.currentUser != null && auth.currentUser.displayName == 'professional' ? (
        <>
          <Tab.Screen
            name="EmptyScreen"
            showLabel={false}
            component={ProfessionalScreen}
            options={{
              tabBarIcon: () => (
                <Icon
                  type="entypo"
                  name="tools"
                  color="white"
                  style={{
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ProfessionalScreen"
            showLabel={false}
            component={ProfessionalScreen}
            options={{
              tabBarIcon: () => <Image source={require('./assets/images/Icon_solid.png')} style={{ width: 40, height: 40 }} />,
            }}
          />
          <Tab.Screen
            name="ProfileScreen"
            showLabel={false}
            component={Profile}
            options={{
              tabBarIcon: () => (
                <Icon
                  type="font-awesome-5"
                  name="user"
                  color="white"
                  style={{
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="GetEducated"
            showLabel={false}
            component={ArticleScreen}
            options={{
              tabBarIcon: () => <Image source={require('./assets/images/Articles_dark.png')} style={{ width: 40, height: 40 }} />,
            }}
          />

          <Tab.Screen
            name="ExerciseScreen"
            showLabel={false}
            component={ExerciseScreen}
            options={{
              tabBarIcon: () => <Image source={require('./assets/images/Exercise_dark.png')} style={{ width: 40, height: 40 }} />,
            }}
          />

          <Tab.Screen
            name="HomeScreen"
            showLabel={false}
            component={HomeScreen}
            options={{
              tabBarIcon: () => <Image source={require('./assets/images/Icon_solid.png')} style={{ width: 40, height: 40 }} />,
            }}
          />

          <Tab.Screen
            name="FaqScreen"
            showLabel={false}
            component={FaqScreen}
            options={{
              tabBarIcon: () => <Image source={require('./assets/images/Qna_dark.png')} style={{ width: 40, height: 40 }} />,
            }}
          />

          <Tab.Screen
            name="ProfessionalScreen"
            showLabel={false}
            component={ProfessionalScreen}
            options={{
              tabBarIcon: () => <Image source={require('./assets/images/Achievement_dark.png')} style={{ width: 40, height: 40 }} />,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

const store = createStore(rootReducer, applyMiddleware(/* logger, */ thunk));

export default App = (props) => {
  const [loggedIn, setLoggedIn] = useState();

  auth.onAuthStateChanged(function (user) {
    user ? setLoggedIn(true) : setLoggedIn(false);
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={headerConfig}>
          {loggedIn ? (
            <>
              <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
              <Stack.Screen name="QR Scan" component={QRCodeScannerScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Terms" component={TermsAndCondition} options={{ title: '條款及細則' }} />
              <Stack.Screen name="Policy" component={PrivacyPolicy} options={{ title: '私隱政策' }} />
              <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ title: '設定' }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            </>
          )}
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const headerConfig = {
  headerTransparent: true,
  headerTitleStyle: {
    color: '#E1EDFF',
    fontSize: 25,
  },
};
