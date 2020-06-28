import React, { useState, useEffect } from 'react';
import { Permissions } from 'react-native-unimodules';
import Modal from 'react-native-modal';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { Text, View, StyleSheet, SafeAreaView, Animated, Button } from 'react-native';
import { FontScale, Scale, ScreenWidth, ScreenHeight } from '../../../constant/Constant';
import { RoundButton } from '../../../Utils/RoundButton';
import { database } from '../../config/config';

export const QRCodeScannerScreen = ({ navigation, route }) => {
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [animationLineHeight, setAnimationLineHeight] = useState(0);
  const [focusLineAnimation, setFocusLineAnimation] = useState(new Animated.Value(0));
  const [isModalVisible, setModalVisibility] = useState(false);
  const [doesPatientFound, setDoesPatientFound] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!scanned) {
      animateLine();
    }
  });

  useEffect(() => {
    getPermissionAsync();
    const unsubscribe = navigation.addListener('blur', () => {
      setScanned(false);
    });
    return unsubscribe;
  }, [navigation]);

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setCameraPermission(status === 'granted');
  };

  const animateLine = () => {
    Animated.loop(
      Animated.sequence([
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
      ])
    ).start();
  };

  const showModalMessage = (message) => {
    setModalMessage(message);
    setModalVisibility(true);
  };

  const hideModalMessage = () => {
    if (doesPatientFound) {
      navigation.navigate('Main');
    }
    setModalVisibility(false);
  };

  const handleQRCodeScanned = ({ type, data, ...rest }) => {
    setScanned(true);
    const regEx = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    const hasSpecialCharacterOrSpace = regEx.test(data);
    if (hasSpecialCharacterOrSpace) {
      setDoesPatientFound(false);
      showModalMessage('QR Code格式錯誤');
    } else {
      database
        .ref('users')
        .once('value')
        .then((snap) => {
          if (snap.child(data).exists()) {
            database
              .ref('/professionals/' + auth.currentUser.uid + '/patients/' + data)
              .set(true)
              .then(() => {
                setDoesPatientFound(true);
                showModalMessage('已成功登記病人');
              });
          } else {
            setDoesPatientFound(false);
            showModalMessage('未有病人記錄');
          }
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!(isFocused && hasCameraPermission) ? (
        <View>
          <Text>{'Requesting for camera permission.'}</Text>
        </View>
      ) : (
          <View style={StyleSheet.absoluteFillObject}>
            <Camera onBarCodeScanned={scanned ? undefined : handleQRCodeScanned} style={StyleSheet.absoluteFillObject} ratio="16:9" />
            <View style={styles.unfocusedContainer} />
            <View style={styles.middleContainer}>
              <View style={styles.unfocusedContainer} />
              <View onLayout={(e) => setAnimationLineHeight(e.nativeEvent.layout.height)} style={styles.focusedContainer}>
                {!scanned && (
                  <>
                    <Animated.View
                      style={[
                        styles.animationLineStyle,
                        {
                          transform: [
                            {
                              translateY: focusLineAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, animationLineHeight],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  </>
                )}
              </View>
              <View style={styles.unfocusedContainer} />
            </View>
            <View style={[styles.unfocusedContainer, { flex: 2 }]}>
              <Text style={styles.instruction}>{'請掃描病人\n帳戶上的QR Code'}</Text>
              <RoundButton onPress={() => navigation.goBack()} containerStyle={{ flex: 2 }} buttonStyle={styles.button} title={'返回'} />
            </View>
          </View>
        )}
      <Modal isVisible={isModalVisible} onBackdropPress={hideModalMessage}>
        <View style={{ backgroundColor: 'white', height: '20%', borderRadius: Scale * 2, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: FontScale * 18, textAlign: 'center', textAlignVertical: 'center', marginBottom: ScreenHeight * 0.02 }}>{modalMessage}</Text>
          <RoundButton
            onPress={() => hideModalMessage()}
            containerStyle={{ width: '50%' }}
            buttonStyle={{ height: '7%', width: '100%' }}
            textStyle={{ color: 'white' }}
            buttonStyle={{ backgroundColor: '#4287f5' }}
            title={'確定'}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black',
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
    justifyContent: 'center',
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
    backgroundColor: '#FFFFFF',
  },
  instruction: {
    flex: 2,
    color: 'white',
    fontFamily: 'Roboto',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: FontScale * 20,
  },
  button: {
    width: '50%',
  },
});
