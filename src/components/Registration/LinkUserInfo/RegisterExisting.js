import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Logo from "../../../../Utils/Logo";
import { Text } from "react-native";
import { LinearGradientBackground } from "../../../../Utils/LinearGradientBackground";

export const RegisterExisting = ({ navigation, route }) => {
  const { uidFound } = route.params;
  return (
    <LinearGradientBackground>
      <ScrollView>
        <Logo />
        <Text>{uidFound}</Text>
      </ScrollView>
    </LinearGradientBackground>
  );
};
