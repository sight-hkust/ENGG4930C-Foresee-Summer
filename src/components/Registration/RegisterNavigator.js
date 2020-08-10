import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterOptions from "./RegisterOptions/RegisterOptions";
import { RegistrationForm } from "./RegistrationForm/RegistrationForm";
import { LinkExistingUserInfo } from "./LinkUserInfo/LinkExistingUserInfo";
import { RegisterWithPhoneNumber } from "./LinkUserInfo/RegisterWithPhoneNumber";
import { RegisterExisting } from "./LinkUserInfo/RegisterExisting";
import { BackButton } from "../Utils/BackButton";
import { NavigationActions } from "react-navigation";

const RegistrationStack = createStackNavigator();

export const RegisterNavigator = () => {
  return (
    <RegistrationStack.Navigator
      initialRouteName="Registration Form"
      screenOptions={({ navigation, route }) => ({
        headerTransparent: true,
        headerTintColor: "white",
        title: null,
        headerLeft: () => (
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      })}
    >
      <RegistrationStack.Screen name="Register Options" component={RegisterOptions} />
      <RegistrationStack.Screen name="Registration Form" initialParams={{ isProfessional: false, registerPatient: false }} component={RegistrationForm} />
      <RegistrationStack.Screen name="Link Exisiting UserInfo" component={LinkExistingUserInfo} />
      <RegistrationStack.Screen name="Register With Phone Number" component={RegisterWithPhoneNumber} />
      <RegistrationStack.Screen name="RegisterExisting" component={RegisterExisting} />
    </RegistrationStack.Navigator>
  );
};
