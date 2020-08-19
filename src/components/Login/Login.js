import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginWithEmailAndPassword } from "./LoginWithEmailAndPassword";
import { LoginWithPhone } from "./LoginWithPhone";

const LoginStack = createStackNavigator();

export const Login = (props) => {
  return (
    <LoginStack.Navigator initialRouteName="Login With Email And Password">
      <LoginStack.Screen name="Login With Phone" component={LoginWithPhone} options={{ headerShown: false }} />
      <LoginStack.Screen name="Login With Email And Password" component={LoginWithEmailAndPassword} options={{ headerShown: false }} />
    </LoginStack.Navigator>
  );
};
