import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradientBackground } from '../Utils/LinearGradientBackground';
import { auth } from '../../config/config';
import Logo from '../Utils/Logo';
import { ScreenHeight, ScreenWidth } from '../../../constant/Constant';

export const SplashScreen = () => {
  return (
    <LinearGradientBackground>
      <View style={styles.container}>
        <Logo
          style={{
            height: ScreenHeight * 0.25,
            width: ScreenWidth * 0.55,
          }}
          iconStyle={{ flex: 1 }}
          hideText={true}
        />
        <Text style={styles.title}>ForeSee</Text>
        <Text style={styles.description}>準確追蹤{'\n'}你的眼睛健康走勢</Text>
      </View>
    </LinearGradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: ScreenHeight * 0.15,
    marginHorizontal: ScreenWidth * 0.15,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 105,
    width: 240,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: '800',
  },
  description: {
    marginTop: 55,
    textAlign: 'center',
    fontSize: 28,
    color: 'white',
    fontWeight: '800',
  },
  button: {
    width: 10,
    borderRadius: 100,
  },
});
