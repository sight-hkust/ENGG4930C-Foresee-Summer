import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { ScreenHeight } from '../../../../constant/Constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Surface } from 'react-native-paper';

export default function GameQuestionMiniCard() {
  return (
    <Surface style={miniCardStyles.container}>
      <Swiper containerStyle={{ borderRadius: 20, width: '90%', height: '50%' }}>
        <View style={miniCardStyles.slide1}>
          <Text style={miniCardStyles.text}>Hello Swiper</Text>
        </View>
        <View style={miniCardStyles.slide1}>
          <Text style={miniCardStyles.text}>Beautiful</Text>
        </View>
        <View style={miniCardStyles.slide1}>
          <Text style={miniCardStyles.text}>And simple</Text>
        </View>
      </Swiper>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    elevation: 12,
  },
});

const miniCardStyles = StyleSheet.create({
  container: {
    height: wp('90%'),
    width: wp('90%'),
    borderRadius: 20,
    alignItems: 'center',
    elevation: 12,
    alignSelf: 'center',
  },
  slide1: {
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
