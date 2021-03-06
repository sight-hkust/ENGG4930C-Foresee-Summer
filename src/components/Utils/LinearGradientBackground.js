import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, View } from "react-native";

export const LinearGradientBackground = ({ children, ...props }) => {
  return (
    <View>
      <LinearGradient
        colors={["#2D9CDB", "#48B3BA", "#0ED984"]}
        start={[0, 0.3]}
        end={[1, 1]}
        locations={[0.25, 0.5, 1]}
        style={{
          height: "100%",
        }}
        {...props}
      >
        {children}
      </LinearGradient>
    </View>
  );
};
