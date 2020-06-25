import React, { useState, useEffect } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Permissions } from 'react-native-unimodules'
import { Camera } from 'expo-camera';
import { Text, Button, View, StyleSheet, SafeAreaView, Animated } from "react-native";
import { ScreenWidth, ScreenHeight, FontScale } from "../../../constant/Constant";
import { RoundButton } from '../../../Utils/RoundButton'
import { database } from "../../config/config";


export const QRCodeScannerScreen = ({ navigation, route }) => {

    const [hasCameraPermission, setCameraPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [animationLineHeight, setAnimationLineHeight] = useState(0);
    const [focusLineAnimation, setFocusLineAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        if (!scanned) {
            animateLine()
        }
    })

    useEffect(() => {
        getPermissionAsync()
        const unsubscribe = navigation.addListener('blur', () => {
            setScanned(false)
        })
        return unsubscribe;
    }, [navigation])



    const getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setCameraPermission(status === 'granted');
    }

    const animateLine = () => {
        Animated.loop(Animated.sequence([
            Animated.timing(focusLineAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(focusLineAnimation, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ])).start()
    }

    const handleQRCodeScanned = ({ type, data, ...rest }) => {
        setScanned(true);
        database.ref('users').once('value').then((snap) => {
            if (snap.child(data).exists()) {
                database.ref('/professionals/test/patients/' + data)
                    .set(true).then(
                        alert('Patient was registered successfully.')
                    )
            }
            else {
                alert('no such patient');
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {hasCameraPermission === null ? <View>
                <Text>{'Requesting for camera permission.'}</Text>
            </View> : <View style={styles.container}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleQRCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View style={styles.unfocusedContainer} />
                    <View style={styles.middleContainer} >
                        <View style={styles.unfocusedContainer} />
                        <View
                            onLayout={e => setAnimationLineHeight(e.nativeEvent.layout.height)}
                            style={styles.focusedContainer}>
                            {!scanned && (<>
                                <Animated.View
                                    style={[styles.animationLineStyle, {
                                        transform: [{
                                            translateY: focusLineAnimation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0, animationLineHeight]
                                            })
                                        }]
                                    }]}
                                />
                            </>)}
                        </View>
                        <View style={styles.unfocusedContainer} />
                    </View>
                    <View style={[styles.unfocusedContainer, { flex: 2 }]}>
                        <Text style={styles.instruction}>{'請掃描病人\n帳戶上的QR Code'}</Text>
                        <RoundButton
                            onPress={() => navigation.navigate('GetEducated')}
                            containerStyle={{ flex: 2 }}
                            buttonStyle={styles.button} title={'返回'} />
                    </View>
                </View>}
        </SafeAreaView >)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    unfocusedContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
    middleContainer: {
        flexDirection: 'row',
        flex: 2.5,
    },
    focusedContainer: {
        flex: 7,
    },
    animationLineStyle: {
        width: '100%',
        height: 2,
        backgroundColor: '#FFFFFF'
    },
    instruction: {
        flex: 2,
        color: 'white',
        fontFamily: 'Roboto',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: FontScale * 20
    },
    button: {
        width: '50%'
    }

})