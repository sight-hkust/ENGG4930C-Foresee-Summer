import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";
//import { ScrollView } from "react-native-gesture-handler";
import { RenderDateDots } from "../helpers/VAline";
import BottomModal from "../Utils/BottomModal";
const BackArrow = require("../assets/images/BackArrow.png");
const NextArrow = require("../assets/images/NextArrow.png");
const VAChart = require("../assets/images/VAChart.png");
const Tutorial = require("../assets/images/VATutorial.png");
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
      <RenderDatesButton
        dateArr={dateArr}
        L_VAData={L_VAData}
        R_VAData={R_VAData}
        data={data}
      />
    </View>
  );
};

export const RenderDatesButton = (props) => {
  const { dateArr, L_VAData, R_VAData, data } = props;
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
  var L_output = [];
  var R_output = [];

  const calSubArray = () => {
    var end = 0;
    var start = 0;
    if (dateArr.length < 4) {
      return dateArr;
    } else if (index > dateArr.length - 4) {
      return dateArr.slice(-4);
    } else if (index <= dateArr.length - 4) {
      start = index;
      end = index + 4;
      return dateArr.slice(start, end);
    }
  };
  for (const date of calSubArray()) {
    L_output.push(data[date].L_VA);
    R_output.push(data[date].R_VA);
  }
  console.log(data[dateArr[1]].L_VA);
  return (
    <>
      <RenderDateDots
        data={data}
        dateArr={dateArr}
        selected={index}
        subArray={calSubArray()}
        L_output={L_output}
        R_output={R_output}
      />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginTop: ScreenHeight / 50,
          marginBottom: ScreenHeight / 60,
        }}
      >
        <TouchableOpacity onPress={GetBack}>
          <Image source={BackArrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          {dateArr[index]}
        </Text>
        <TouchableOpacity onPress={GetNext}>
          <Image source={NextArrow} />
        </TouchableOpacity>
      </View>

      <RenderContent data={data} index={index} dateArr={dateArr} />
    </>
  );
};

export const RenderContent = (props) => {
  const { data, index, dateArr } = props;
  //console.log(index);
  return (
    <View
      style={{
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.9)",
        height: ScreenHeight / 3.9,
        width: ScreenWidth / 1.25,
        borderRadius: 20,
        marginTop: ScreenHeight / 50,
      }}
    >
      <Text style={RenderVAStyle.VAText}>
        右眼矯正視力：{data[dateArr[index]].R_VA}
      </Text>
      <RenderRating VA={data[dateArr[index]].R_VA} />

      <Text style={RenderVAStyle.VAText}>
        左眼矯正視力：{data[dateArr[index]].L_VA}
      </Text>
      <RenderRating VA={data[dateArr[index]].L_VA} />
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
    marginTop: ScreenHeight / 40,
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
