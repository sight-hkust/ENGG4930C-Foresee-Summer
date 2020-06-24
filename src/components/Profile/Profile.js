import { View, Text } from "react-native"
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import { auth } from "../../config/config";
import { useEffect } from "react";
import QRCode from 'react-native-qrcode-svg';
import { ScreenHeight, ScreenWidth, FontScale } from "../../../constant/Constant";
import { RoundButton } from "../../../Utils/RoundButton";
import Svg from "react-native-svg";
import { LinearGradientBackground } from "../../../Utils/LinearGradientBackground";

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
            <LinearGradientBackground>
                <View style={{ height: '100%', paddingTop: ScreenHeight * 0.05, marginHorizontal: ScreenWidth * 0.1 }}>
                    <View style={{
                        paddingVertical: ScreenHeight * 0.03,
                        borderRadius: ScreenWidth * 0.02,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white'
                    }}>
                        <QRCode
                            value={auth.currentUser.uid}
                            size={ScreenWidth * 0.75}
                            logoBackgroundColor='transparent'
                            backgroundColor='transparent'
                        />
                    </View>
                    <View style={{ flex: 1, paddingVertical: ScreenHeight * 0.02 }}>
                        <Text style={{
                            fontSize: FontScale * 25,
                            color: '#FFFFFF',
                            fontFamily: 'Roboto',
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            marginBottom: ScreenHeight * 0.02
                        }}>{'請讓眼科醫生/視光師\n掃描QR Code以進行配對'}</Text>
                        <RoundButton title='登出' onPress={handleSignOut} />
                    </View>
                </View>
            </LinearGradientBackground>
        </SafeAreaView>)
}