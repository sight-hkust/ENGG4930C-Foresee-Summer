import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements";

export const RegisterMehtod = ({ navigation, route }) => {
    return (<View>
        <LinearGradient
            colors={['#2D9CDB', '#48B3BA', '#0ED984']}
            start={[0, 0.3]}
            end={[1, 1]}
            locations={[0.25, 0.5, 1]}
            style={{
                height: '100%',
            }}
        >
        </LinearGradient>
    </View>)
}