import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterOptions from "./RegisterOptions/RegisterOptions";
import { RegistrationForm } from "./RegistrationForm/RegistrationForm";
import { LinkExistingUserInfo } from "./LinkUserInfo/LinkExistingUserInfo";
import { RegisterWithPhoneNumber } from "./LinkUserInfo/RegisterWithPhoneNumber";
import { RegisterExisting } from "./LinkUserInfo/RegisterExisting";
import { BackButton } from "../Utils/BackButton";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native";

const RegistrationStack = createStackNavigator();

export const RegisterNavigator = ({ navigation, route }) => {
  return (
    <RegistrationStack.Navigator initialRouteName="Register Options">
      <RegistrationStack.Screen
        name="Register Options"
        component={RegisterOptions}
        options={{
          headerShown: false,
        }}
      />
      <RegistrationStack.Screen
        name="Link Exisiting UserInfo"
        component={LinkExistingUserInfo}
        options={{
          headerShown: false,
        }}
      />
      <RegistrationStack.Screen
        name="Registration Form"
        component={RegistrationForm}
        options={{
          headerTransparent: true,
          headerLeft: () => (
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerTintColor: "white",
          title: null,
        }}
      />
      <RegistrationStack.Screen
        name="Register With Phone Number"
        component={RegisterWithPhoneNumber}
        options={{
          headerShown: false,
        }}
      />
      <RegistrationStack.Screen
        name="RegisterExisting"
        component={RegisterExisting}
        options={{
          headerShown: false,
        }}
      />
    </RegistrationStack.Navigator>
  );
};
