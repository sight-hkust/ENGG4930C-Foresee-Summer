import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterOptions from "./RegisterOptions/RegisterOptions";
import { RegistrationForm } from "./RegistrationForm/RegistrationForm";
import { LinkExistingUserInfo } from "./LinkUserInfo/LinkExistingUserInfo";
import { RegisterWithPhoneNumber } from "./LinkUserInfo/RegisterWithPhoneNumber";
import { RegisterExisting } from "./LinkUserInfo/RegisterExisting";

const RegistrationStack = createStackNavigator();

export const RegisterRouter = (props) => {
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
          headerShown: false,
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
