import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Image, Dimensions, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import GetEducatedScreen from "./src/components/Education/GetEducated";
import EyeExerciseScreen from "./src/components/Education/EyeExercise";
import ArticleDetailScreen from "./src/components/Education/ArticleDetail";
import PostQuestion from "./src/components/AskAnExpert/PostQuestionScreen";
import AskAnExpertMainScreen from "./src/components/AskAnExpert/AskAnExpertMainScreen";

import RecordsScreen from "./Screens/RecordsScreen";
import AddRecordScreen from "./Screens/AddRecordScreen";
import OverviewScreen from "./Screens/OverviewScreen";

import { Login } from "./src/components/Login/Login";
import { Register } from "./src/components/Registration/Register";
import { Profile } from "./src/components/Profile/Profile";
import { QRCodeScannerScreen } from "./src/components/QRCodeScannerScreen/QRCodeScannerScreen";

import { auth } from "./src/config/config";

import ProfMainMenu from "./src/components/Professional/ProfMainMenu";
import ProfPatientViewScreen from "./src/components/Professional/ProfPatientViewScreen";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import WelcomeScreen from "./Screens/WelcomeScreen";

import SettingScreen from "./src/components/Setting/Setting";
import PrivacyPolicy from "./src/components/Policy/PrivacyPolicy";
import TermsAndCondition from "./src/components/Policy/TermsAndCondition";
import { set } from "react-native-reanimated";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ArticleScreen({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={{ ...headerConfig, headerRight: () => <SettingButton navigation={navigation} /> }}>
      <Stack.Screen name="GetEducatedScreen" component={GetEducatedScreen} options={{ title: "護眼秘笈" }} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function ExerciseScreen({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={{ ...headerConfig, headerRight: () => <SettingButton navigation={navigation} /> }}>
      <Stack.Screen name="EyeExerciseScreen" component={EyeExerciseScreen} options={{ title: "護眼操" }} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={{ ...headerConfig, headerRight: () => <SettingButton navigation={navigation} /> }}>
      <Stack.Screen name="OverViewScreen" component={OverviewScreen} options={{ title: "" }} />
      <Stack.Screen name="RecordsScreen" component={RecordsScreen} options={{ title: "" }} />
      <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} options={{ title: "新增資料" }} />
    </Stack.Navigator>
  );
}

function FaqScreen({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={{ ...headerConfig, headerRight: () => <SettingButton navigation={navigation} /> }}>
      <Stack.Screen name="AskAnExpertMainScreen" component={AskAnExpertMainScreen} options={{ title: "專家解答" }} />
      <Stack.Screen name="PostQuestion" component={PostQuestion} options={{ title: "撰寫問題" }} />
    </Stack.Navigator>
  );
}

function ProfessionalScreen({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={{ ...headerConfig, headerRight: () => <SettingButton navigation={navigation} /> }}>
      <Stack.Screen name="ProfMainMenu" component={ProfMainMenu} options={{ title: "病人名單" }} />
      <Stack.Screen name="ProfPatientViewScreen" component={ProfPatientViewScreen} options={{ title: "" }} />
      <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} options={{ title: "新增資料" }} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ title: "設定" }} />
    </Stack.Navigator>
  );
}

function SettingButton({ route, navigation }) {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          auth.currentUser.displayName == "professional" ? navigation.navigate("SettingScreen") : navigation.navigate("SettingScreen");
        }}
        style={{ marginRight: 20 }}
      >
        <Icon name={auth.currentUser.displayName == "professional" ? "questioncircleo" : "setting"} type={"antdesign"} color="white" size={30} />
      </TouchableOpacity>
    </>
  );
}

function Main({ route, navigation }) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#003973",
        inactiveTintColor: "#2D9CDB",
        style: {
          backgroundColor: "#BED8FF",
          height: Dimensions.get("window").height * 0.1,
          paddingHorizontal: auth.currentUser.displayName == "professional" ? 100 : 30,
          borderTopWidth: 0,
          borderTopColor: "transparent",

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
      {auth.currentUser.displayName == "professional" ? (
        <>
          <Tab.Screen
            name="ProfessionalScreen"
            component={ProfessionalScreen}
            options={{
              tabBarIcon: () => <Image source={require("./assets/images/Icon_solid.png")} style={{ ...styles.icon, ...{ width: 55, height: 55 } }} />,
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
              tabBarIcon: () => <Image source={require("./assets/images/Articles_dark.png")} style={styles.icon} />,
            }}
          />

          <Tab.Screen
            name="ExerciseScreen"
            component={ExerciseScreen}
            options={{
              tabBarLabel: "護眼操",
              tabBarIcon: () => <Image source={require("./assets/images/Exercise_dark.png")} style={styles.icon} />,
            }}
          />

          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarLabel: "主頁",
              tabBarIcon: () => <Image source={require("./assets/images/Icon_solid.png")} style={{ ...styles.icon, ...{ width: 55, height: 55 } }} />,
            }}
          />

          <Tab.Screen
            name="FaqScreen"
            component={FaqScreen}
            options={{
              tabBarLabel: "專家解答",
              tabBarIcon: () => <Image source={require("./assets/images/Qna_dark.png")} style={styles.icon} />,
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: "個人檔案",
              tabBarIcon: () => <Image source={require("./assets/images/Profile.png")} style={styles.icon} />,
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
              <Stack.Screen name="Terms" component={TermsAndCondition} options={{ title: "條款及細則" }} />
              <Stack.Screen name="Policy" component={PrivacyPolicy} options={{ title: "私隱政策" }} />
              <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ title: "設定" }} />
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
    color: "#E1EDFF",
    fontSize: 25,
    fontWeight: "bold",
  },
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    //elevation: 10,

    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 2,
    },
    shadowRadius: 3,
  },
});
