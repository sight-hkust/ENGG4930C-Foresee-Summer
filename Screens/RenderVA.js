import React, { Component, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Defs, Stop, Circle, Rect, G, Path } from "react-native-svg";
import { scaleLinear, scaleTime } from "d3-scale";
import moment from "moment";
import { RenderDateDots } from "../helpers/VAline";
const BackArrow = require("../assets/images/BackArrow.png");
const NextArrow = require("../assets/images/NextArrow.png");

export const RenderVA = (props) => {
  const { data, dateArr } = props;
  const [selectedIndex, setIndex] = useState(dateArr.length - 1);
  const curData = data[selectedIndex];
  const L_VAData = [];
  const R_VAData = [];
  for (const item in data) {
    //console.log("ind", data[item].L_VA);
    L_VAData.push(data[item].L_VA);
    R_VAData.push(data[item].R_VA);
  }

  return (
    <View>
      <RenderDatesButton dateArr={dateArr} L_VAData={L_VAData} R_VAData={R_VAData} />

      {/*
       <==Need to change state 
      <RenderVAChart curData={curData} />
      <RenderContent curData={curData} />
      <RenderDateDots L_VAData={L_VAData} dateArr={dateArr} selected={selectedIndex} /> 
      */}
    </View>
  );
};

export const RenderDatesButton = (props) => {
  const { dateArr, L_VAData, R_VAData } = props;
  const [index, setIndex] = useState(dateArr.length - 1);
  //console.log(dateArr.length - 1);
  const GetNext = () => {
    const length = dateArr.length;
    const value = (index + 1) % length;
    setIndex(value);
  };

  const GetBack = () => {
    if (index == 0) {
      const length = dateArr.length - 1;
      setIndex(length);
    } else {
      const value = index;
      setIndex(value - 1);
    }
  };

  return (
    <>
      <RenderDateDots L_VAData={L_VAData} R_VAData={R_VAData} dateArr={dateArr} selected={index} />
      <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 5 }}>
        <TouchableOpacity onPress={GetBack}>
          <Image source={BackArrow} />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 18, paddingLeft: 15, paddingRight: 15 }}>{dateArr[index]}</Text>
        <TouchableOpacity onPress={GetNext}>
          <Image source={NextArrow} />
        </TouchableOpacity>
      </View>
    </>
  );
};
