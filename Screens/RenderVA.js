import React, { Component, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";
//import { ScrollView } from "react-native-gesture-handler";
import { RenderDateDots } from "../helpers/VAline";
const BackArrow = require("../assets/images/BackArrow.png");
const NextArrow = require("../assets/images/NextArrow.png");
const VAChart = require("../assets/images/VAChart.png");
export const RenderVA = (props) => {
  const { data, dateArr } = props;
  const L_VAData = [];
  const R_VAData = [];
  for (const item in data) {
    //console.log("ind", data[item].L_VA);
    L_VAData.push(data[item].L_VA);
    R_VAData.push(data[item].R_VA);
  }
  //console.log(data);

  return (
    <View>
      <RenderDatesButton dateArr={dateArr} L_VAData={L_VAData} R_VAData={R_VAData} />

      {/*
      <RenderDatesButton dateArr={dateArr} L_VAData={L_VAData} R_VAData={R_VAData} />
       <RenderVAChart curData={curData} />
       
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
      <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 30, marginBottom: 10 }}>
        <TouchableOpacity onPress={GetBack}>
          <Image source={BackArrow} />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 18, paddingLeft: 15, paddingRight: 15 }}>{dateArr[index]}</Text>
        <TouchableOpacity onPress={GetNext}>
          <Image source={NextArrow} />
        </TouchableOpacity>
      </View>
      <RenderDateDots L_VAData={L_VAData} R_VAData={R_VAData} dateArr={dateArr} selected={index} />
      <RenderContent L_VAData={L_VAData} R_VAData={R_VAData} index={index} />
    </>
  );
};

export const RenderVAChart = (props) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Image source={VAChart} style={{ alignSelf: "center", marginBottom: 160, height: 350, resizeMode: "contain" }} />
        <View style={{ position: "absolute", top: 60, left: 50, backgroundColor: "rgba(91, 192, 173, 0.48)", width: 200, height: 30, borderRadius: 8 }}></View>
      </View>
    </>
  );
};

export const RenderContent = (props) => {
  const { L_VAData, R_VAData, index } = props;
  return (
    <View
      style={{
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.9)",
        height: ScreenHeight / 3.5,
        width: ScreenWidth / 1.25,
        borderRadius: 20,
        marginTop: 20,
        paddingBottom: 10,
      }}
    >
      <Text style={RenderVAStyle.VAText}>左眼矯正視力：{L_VAData[index]}</Text>
      <RenderRating VA={L_VAData[index]} />
      <Text style={RenderVAStyle.VAText}>右眼矯正視力：{R_VAData[index]}</Text>
      <RenderRating VA={R_VAData[index]} />
    </View>
  );
};

export const RenderRating = (props) => {
  const { VA } = props;
  var result = "";
  if (parseInt(VA.substring(0, 1)) == 2) {
    //used 20/20
    const L_backNum = parseInt(VA.substring(3));

    if (L_backNum >= 30) {
      result = "不正常視力";
    } else if (L_backNum >= 25) {
      result = "稍低於正常視力";
    } else {
      result = "正常視力";
    }
  } else if (parseInt(VA.substring(0, 1)) == 6) {
    //used 6/6
    const L_backNum = parseInt(VA.substring(2));

    if (L_backNum >= 9) {
      result = "不正常視力";
    } else if (L_backNum >= 7.5) {
      result = "稍低於正常視力";
    } else {
      result = "正常視力";
    }
  }
  return <Text style={RenderVAStyle.description}>{result}</Text>;
};

const RenderVAStyle = StyleSheet.create({
  VAText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D9CDB",
  },
  description: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 18,
    color: "#2D9CDB",
  },
});
