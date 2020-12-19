import React, { Component, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { ScreenWidth, ScreenHeight } from '../constant/Constant';
//import { ScrollView } from "react-native-gesture-handler";
import { RenderDateDots } from '../helpers/VAline';
import BottomModal from '../Utils/BottomModal';
import i18n from 'i18n-js';
import {useLocalization} from "../src/strings/Strings";

export const RenderVA = (props) => {
  const { dateArr, data, NextButton, BackButton, index, subArray } = props;
  var L_output = [];
  var R_output = [];

  for (const date of subArray) {
    L_output.push(data[date].L_VA);
    R_output.push(data[date].R_VA);
  }
  /* console.log(data[dateArr[1]].L_VA); */
  return (
    <View>
      <RenderDateDots data={data} dateArr={dateArr} selected={index} subArray={subArray} L_output={L_output} R_output={R_output} />
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <BackButton isVA={true} />
        <Text style={{ color: 'white', fontSize: ScreenHeight / 35, paddingHorizontal: ScreenWidth / 70 }}>{dateArr[index]}</Text>
        <NextButton isVA={true} />
      </View>
      <RenderContent data={data} index={index} dateArr={dateArr} />
    </View>
  );
};

export const RenderContent = (props) => {
  useLocalization();
  const { data, index, dateArr } = props;
  //console.log(index);
  return (
    <View
      style={{
        alignSelf: 'center',
        backgroundColor: 'white',
        width: ScreenWidth / 1.25,
        borderRadius: 20,
        marginTop: ScreenHeight / 50,
        paddingBottom: ScreenHeight / 40,
      }}
    >
      <Text style={RenderVAStyle.VAText}>{i18n.t('renderVA1')}{data[dateArr[index]].R_VA}</Text>
      <RenderRating VA={data[dateArr[index]].R_VA} />
      <Text style={RenderVAStyle.VAText}>{i18n.t('renderVA2')}{data[dateArr[index]].L_VA}</Text>
      <RenderRating VA={data[dateArr[index]].L_VA} />
    </View>
  );
};

export const RenderRating = (props) => {
  useLocalization();
  const { VA } = props;
  var result = '';
  if (parseInt(VA.substring(0, 1)) == 2) {
    //used 20/20
    const L_backNum = parseInt(VA.substring(3));
    if (L_backNum >= 30) result = i18n.t('renderVA3');
    else if (L_backNum >= 25) result = i18n.t('renderVA4');
    else result = i18n.t('renderVA5');
  } else if (parseInt(VA.substring(0, 1)) == 6) {
    //used 6/6
    const L_backNum = parseInt(VA.substring(2));
    if (L_backNum >= 9) result = i18n.t('renderVA3');
    else if (L_backNum >= 7.5) result = i18n.t('renderVA5');
    else result = i18n.t('renderVA5');
  }
  return <Text style={RenderVAStyle.description}>{result}</Text>;
};

const RenderVAStyle = StyleSheet.create({
  VAText: {
    marginTop: ScreenHeight / 40,
    textAlign: 'center',
    fontSize: ScreenWidth / 20,
    fontWeight: 'bold',
    color: '#2D9CDB',
  },
  description: {
    textAlign: 'center',
    fontSize: ScreenWidth / 22,
    color: '#2D9CDB',
  },
});
