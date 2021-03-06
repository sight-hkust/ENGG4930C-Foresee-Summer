import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { Image, Dimensions, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Icon } from "react-native-elements";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import GetEducatedScreen from "./src/components/Education/GetEducated";
import DashboardScreen from "./src/components/Education/EducationGame/DashboardScreen";
import EyeExerciseScreen from "./src/components/Education/EyeExercise";
import ArticleDetailScreen from "./src/components/Education/ArticleDetail";
import PostQuestion from "./src/components/AskAnExpert/PostQuestionScreen";
import AskAnExpertMainScreen from "./src/components/AskAnExpert/AskAnExpertMainScreen";

import RecordsScreen from "./Screens/RecordsScreen";
import AddRecordScreen from "./Screens/AddRecordScreen";
import ProfAddRecord from "./src/components/Professional/ProfAddRecord";
import OverviewScreen from "./Screens/OverviewScreen";

import CallToLogin from "./src/components/CallToLogin/CallToLogin";
import { Login } from "./src/components/Login/Login";
import Profile from "./src/components/Profile/Profile";
import { QRCodeScannerScreen } from "./src/components/QRCodeScannerScreen/QRCodeScannerScreen";

import { auth } from "./src/config/config";

import ProfMainMenu from "./src/components/Professional/ProfMainMenu";
import { createStore, applyMiddleware } from "redux";
import { Provider as StoreProvider, useDispatch } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import rootReducer from "./src/reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

import SettingScreen from "./src/components/Setting/Setting";
import PrivacyPolicy from "./src/components/Policy/PrivacyPolicy";
import TermsAndCondition from "./src/components/Policy/TermsAndCondition";

import TutorialScreen from "./src/components/Tutorial/Tutorial";
import QrCode from "./src/components/Profile/QrCode";
import { RegistrationForm } from "./src/components/Registration/RegistrationForm/RegistrationForm";
import { RegisterNavigator } from "./src/components/Registration/RegisterNavigator";
import { SplashScreen } from "./src/components/Splash/SplashScreen";
import HeaderRightButton from "./Utils/HeaderRightButton";
import { RecordTutorial, AddRecordTutorial } from "./src/components/Tutorial/MiniTutorial";
import ProfPatientRecordView from "./src/components/Professional/ProfPatientRecrodView/ProfPatientRecordView";
import { BackButton } from "./src/components/Utils/BackButton";
import { EditUserInfo } from "./src/components/Profile/EditUserInfo";
import { Surface } from "react-native-paper";
import { View } from "react-native-animatable";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import UpdateProfileScreen from "./Screens/UpdateProfileScreen";
import ChangePasswordScreen from "./Screens/ChangePasswordScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ArticleScreen({ navigation, route }) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <Stack.Navigator screenOptions={headerConfig}>
      <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} options={{ title: "護眼秘笈" }} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ title: "成就統計" }} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function ExerciseScreen({ navigation, route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        ...headerConfig,
      }}
    >
      <Stack.Screen name="EyeExerciseScreen" component={EyeExerciseScreen} options={{ title: "護眼運動" }} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={headerConfig}>
      <Stack.Screen
        name="OverViewScreen"
        component={OverviewScreen}
        options={{
          title: "",
          headerRight: () => <HeaderRightButton navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="RecordsScreen"
        component={RecordsScreen}
        options={{
          title: "",
          headerRight: () => <HeaderRightButton navigation={navigation} type="question" content={RecordTutorial} />,
        }}
      />
      <Stack.Screen
        name="AddRecordScreen"
        component={AddRecordScreen}
        options={{
          title: "新增資料",
          headerRight: () => <HeaderRightButton navigation={navigation} type="question" content={AddRecordTutorial} />,
        }}
      />
    </Stack.Navigator>
  );
}

function FaqScreen({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={headerConfig}>
      <Stack.Screen name="AskAnExpertMainScreen" component={AskAnExpertMainScreen} options={{ title: "專家解答" }} />
      <Stack.Screen name="PostQuestion" component={PostQuestion} options={{ title: "撰寫問題" }} />
    </Stack.Navigator>
  );
}

function ProfileScreen({ navigation, route }) {
  //console.log("here", route.params.type);
  return (
    <Stack.Navigator screenOptions={headerConfig}>
      <Stack.Screen name="ProfileTabMain" component={Profile} options={{ title: "我的檔案" }} initialParams={{ type: auth.currentUser.displayName }} />
      <Stack.Screen name="QrCode" component={QrCode} options={{ headerShown: false }} />
      <Stack.Screen
        name="Register"
        component={RegistrationForm}
        options={{
          headerTransparent: true,
          headerLeft: () => (
            <BackButton
              onPress={() => {
                navigation.navigate("ProfileTabMain");
              }}
            />
          ),
          headerTintColor: "white",
          title: null,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerTransparent: true,
          title: "更改密碼",
          headerLeft: () => (
            <BackButton
              onPress={() => {
                navigation.navigate("ProfileTabMain");
              }}
            />
          ),
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{
          headerTransparent: true,
          title: "更新個人資料",
          headerLeft: () => (
            <BackButton
              onPress={() => {
                navigation.navigate("ProfileTabMain");
              }}
            />
          ),
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

function ProfessionalScreen({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={headerConfig}>
      <Stack.Screen name="ProfMainMenu" component={ProfMainMenu} options={{ title: "病人名單" }} />
      <Stack.Screen name="Patient Record" component={ProfPatientRecordView} options={{ title: "" }} />
      <Stack.Screen name="AddRecordScreen" component={ProfAddRecord} options={{ title: "新增資料" }} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ title: "設定" }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function CallToLoginScreen({ navigation, route }) {
    return (
        <Stack.Navigator
            screenOptions={{
                ...headerConfig,
            }}
        >
            <Stack.Screen name="CallToLoginScreen" component={CallToLogin} options={{ title: "" }} />
        </Stack.Navigator>
    );
}

function Main({ route, navigation }) {
  return (
    <Tab.Navigator
      initialRouteName={auth.currentUser && auth.currentUser.displayName == "professional" ? "ProfessionalScreen" : "HomeScreen"}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: true,
        activeTintColor: "#003973",
        inactiveTintColor: "#2D9CDB",
        style: {
          position: "absolute",
          backgroundColor: "transparent",
          height: Platform.OS === "ios" ? hp("9%") : hp("8%"),
          borderTopWidth: 0,
          borderTopColor: "transparent",
          paddingHorizontal: auth.currentUser.displayName == "professional" ? 80 : 30,
          elevation: 0,
          shadowColor: "#BED8FF",
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
        },
      }}
    >
      {console.log("auth.currentUser.displayName: ", auth.currentUser.displayName)}
      {auth.currentUser.displayName == "professional" ? (
        <>
          <Tab.Screen
            name="Register"
            component={RegistrationForm}
            initialParams={{ isProfessional: true, registerPatient: true }}
            options={{
              tabBarLabel: "登記病人",
              tabBarIcon: () => <Icon name="md-add-circle-outline" type="ionicon" color="#23559E" size={32.5} containerStyle={styles.icon} />,
            }}
          />
          <Tab.Screen
            name="ProfessionalScreen"
            component={ProfessionalScreen}
            options={{
              tabBarLabel: "主頁",
              tabBarIcon: () => <Icon name="target" type="feather" color="#1565c0" size={30} />,
            }}
          />
          {/* <Tab.Screen
            name="SettingScreen"
            component={SettingScreen}
            initialParams={{ isProfessional: true }}
            options={{
              tabBarIcon: () => <Icon name="setting" type="antdesign" color="#23559E" size={32.5} containerStyle={styles.icon} />,
            }}
          /> */}

          <Tab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              tabBarLabel: "個人檔案",
              tabBarIcon: () => (
                <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                    <Icon name="user" type="feather" color="#1565c0" size={30} />
                </TouchableOpacity>
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="GetEducated"
            component={ArticleScreen}
            options={{
              tabBarLabel: "護眼秘笈",
              tabBarIcon: () => (
                <TouchableOpacity onPress={() => navigation.navigate("GetEducated")}>
                    <Icon name="book" type="feather" color="#1565c0" size={30} />
                </TouchableOpacity>
              ),
            }}
          />

          <Tab.Screen
            name="ExerciseScreen"
            component={ExerciseScreen}
            options={{
              tabBarLabel: "護眼運動",
              tabBarIcon: () => (
                <>
                  <TouchableOpacity onPress={() => navigation.navigate("ExerciseScreen")}>
                      <Icon name="clipboard" type="feather" color="#1565c0" size={30} />
                  </TouchableOpacity>
                </>
              ),
            }}
          />

          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarLabel: "眼健康",
              tabBarIcon: () => (
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <Icon name="target" type="feather" color="#1565c0" size={30} />
                </TouchableOpacity>
              ),
            }}
          />

          <Tab.Screen
            name="FaqScreen"
            component={FaqScreen}
            options={{
              tabBarLabel: "專家解答",
              tabBarIcon: () => (
                <TouchableOpacity onPress={() => navigation.navigate("FaqScreen")}>
                    <Icon name="help-circle" type="feather" color="#1565c0" size={30} />
                </TouchableOpacity>
              ),
            }}
          />

          <Tab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              tabBarLabel: "個人檔案",
              tabBarIcon: () => (
                <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                    <Icon name="user" type="feather" color="#1565c0" size={30} />
                </TouchableOpacity>
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

function MainWithoutLogin({ route, navigation }) {
    return (
        <Tab.Navigator
            initialRouteName={"GetEducated"}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: true,
                activeTintColor: "#003973",
                inactiveTintColor: "#2D9CDB",
                style: {
                    position: "absolute",
                    backgroundColor: "transparent",
                    height: Platform.OS === "ios" ? hp("9%") : hp("8%"),
                    borderTopWidth: 0,
                    borderTopColor: "transparent",
                    paddingHorizontal: 30,
                    elevation: 0,
                    shadowColor: "#BED8FF",
                    shadowOpacity: 0,
                    shadowOffset: {
                        height: 0,
                    },
                    shadowRadius: 0,
                },
            }}
        >
                    <Tab.Screen
                        name="GetEducated"
                        component={ArticleScreen}
                        options={{
                            tabBarLabel: "護眼秘笈",
                            tabBarIcon: () => (
                                <TouchableOpacity onPress={() => navigation.navigate("GetEducated")}>
                                    <Icon name="book" type="feather" color="#1565c0" size={30} />
                                </TouchableOpacity>
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="ExerciseScreen"
                        component={ExerciseScreen}
                        options={{
                            tabBarLabel: "護眼運動",
                            tabBarIcon: () => (
                                <>
                                    <TouchableOpacity onPress={() => navigation.navigate("ExerciseScreen")}>
                                        <Icon name="clipboard" type="feather" color="#1565c0" size={30} />
                                    </TouchableOpacity>
                                </>
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="HomeScreen"
                        component={CallToLoginScreen}
                        options={{
                            tabBarLabel: "眼健康",
                            tabBarIcon: () => (
                                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                                    <Icon name="target" type="feather" color="#1565c0" size={30} />
                                </TouchableOpacity>
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="FaqScreen"
                        component={CallToLoginScreen}
                        options={{
                            tabBarLabel: "專家解答",
                            tabBarIcon: () => (
                                <TouchableOpacity onPress={() => navigation.navigate("FaqScreen")}>
                                    <Icon name="help-circle" type="feather" color="#1565c0" size={30} />
                                </TouchableOpacity>
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="ProfileScreen"
                        component={CallToLoginScreen}
                        options={{
                            tabBarLabel: "個人檔案",
                            tabBarIcon: () => (
                                <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                                    <Icon name="user" type="feather" color="#1565c0" size={30} />
                                </TouchableOpacity>
                            ),
                        }}
                    />
        </Tab.Navigator>
    );
}

const store = createStore(rootReducer, applyMiddleware(/* logger, */ thunk));

export default App = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  auth.onAuthStateChanged(function (user) {
    user ? setLoggedIn(true) : setLoggedIn(false);
  });

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <Stack.Navigator screenOptions={headerConfig}>
              {loggedIn ? (
                <>
                  <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
                  <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                  <Stack.Screen name="QR Scan" component={QRCodeScannerScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Terms" component={TermsAndCondition} options={{ title: "條款及細則" }} />
                  <Stack.Screen name="Policy" component={PrivacyPolicy} options={{ title: "私隱政策" }} />
                  <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ title: "設定" }} />
                </>
              ) : (
                <>
                  <Stack.Screen name="MainWithoutLogin" component={MainWithoutLogin} options={{ headerShown: false }} />
                  <Stack.Screen name="Login" component={Login} options={{ headerShown: true, title: "" }} />
                  <Stack.Screen name="Register" component={RegisterNavigator} options={{ headerShown: false }} />
                  <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                </>
              )}
              <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </PaperProvider>
    </StoreProvider>
  );
};

const headerConfig = {
  headerTransparent: true,
  headerTitleStyle: {
    color: "#E1EDFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  headerTitleAlign: "left",
  headerBackTitleVisible: false,
  headerBackImage: () => <Icon name="md-arrow-back" type="ionicon" color="#E1EDFF" size={36} containerStyle={{ marginLeft: 20 }} />,
};

const styles = StyleSheet.create({
  icon: {
    overflow: "visible",
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 3,
  },
});
