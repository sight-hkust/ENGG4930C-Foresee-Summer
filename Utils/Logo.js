import React from 'react';
import icon from '../assets/images/icon.png';
import { Image, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScreenWidth, ScreenHeight, FontScale } from '../constant/Constant';

export const Logo = ({ style, iconStyle, textStyle, hideText = false }) => {
  return (
    <View style={[styles.logoContainer, style]}>
      <Image style={[styles.icon, iconStyle]} source={icon} resizeMode="contain" />
      {hideText ? null : (
        <View style={{ flex: 4, justifyContent: 'center' }}>
          <Text style={[styles.logoText, textStyle]}>ForeSee</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    height: ScreenHeight * 0.225,
    width: ScreenWidth * 0.55,
    alignSelf: 'center',
  },
  logoText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    left: ScreenWidth * 0.03,
    backgroundColor: 'cyan',
  },
  icon: {
    flex: 3,
    height: '100%',
  },
});

export default Logo;
