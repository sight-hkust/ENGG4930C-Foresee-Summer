import { View } from "react-native"

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import { auth } from "../../config/config";
import { useEffect } from "react";

export const Profile = ({ navigation, route }) => {
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigation.navigate('Login');
            }
        })
    })
    const handleSignOut = () => {
        auth.signOut()
    }
    return (
        <SafeAreaView>
            <Button title='登出' onPress={handleSignOut} />
        </SafeAreaView>)
}