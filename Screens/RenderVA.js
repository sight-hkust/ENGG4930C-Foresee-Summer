import React, { Component, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { ScreenWidth, ScreenHeight } from '../constant/Constant';
//import { ScrollView } from "react-native-gesture-handler";
import { RenderDateDots } from '../helpers/VAline';
import BottomModal from '../Utils/BottomModal';

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
      <Text style={RenderVAStyle.VAText}>右眼矯正視力：{data[dateArr[index]].R_VA}</Text>
      <RenderRating VA={data[dateArr[index]].R_VA} />
      <Text style={RenderVAStyle.VAText}>左眼矯正視力：{data[dateArr[index]].L_VA}</Text>
      <RenderRating VA={data[dateArr[index]].L_VA} />
    </View>
  );
};

export const RenderRating = (props) => {
  const { VA } = props;
  var result = '';
  if (parseInt(VA.substring(0, 1)) == 2) {
    //used 20/20
    const L_backNum = parseInt(VA.substring(3));
    if (L_backNum >= 30) result = '不正常視力';
    else if (L_backNum >= 25) result = '稍低於正常視力';
    else result = '正常視力';
  } else if (parseInt(VA.substring(0, 1)) == 6) {
    //used 6/6
    const L_backNum = parseInt(VA.substring(2));
    if (L_backNum >= 9) result = '不正常視力';
    else if (L_backNum >= 7.5) result = '稍低於正常視力';
    else result = '正常視力';
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
