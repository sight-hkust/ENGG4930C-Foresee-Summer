import React, { Component, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Defs, Stop, Circle, Rect, G, Path, Text } from "react-native-svg";
import { scaleLinear, scaleTime } from "d3-scale";
import moment from "moment";

export const RenderDateDots = (config) => {
  const { data, dateArr, selected } = config;
  const height = ScreenHeight / 6;
  const padding = 25;

  var L_output = [];
  var R_output = [];

  const calSubArray = () => {
    var end = 0;
    var start = 0;
    if (dateArr.length < 4) {
      return dateArr;
    } else if (selected > dateArr.length - 4) {
      return dateArr.slice(-4);
    } else if (selected <= dateArr.length - 4) {
      start = selected;
      end = selected + 4;
      return dateArr.slice(start, end);
    }
  };
  for (const date of calSubArray()) {
    L_output.push(data[date].L_VA);
    R_output.push(data[date].R_VA);
  }
  //console.log(L_output);

  return (
    <View>
      <Svg height={height + 15} width={ScreenWidth}>
        <Rect width="100%" height="100%" fill="none" />

        <G>
          <Path key={Math.random()} d={`M${padding} ${height / 3 - 15} H${ScreenWidth - padding} Z`} stroke="rgba(91, 192, 173, 0.9)" strokeWidth={3} strokeLinecap="round" />
          <Path key={Math.random()} d={`M${padding} ${(height / 3 - 15) * 2} H${ScreenWidth - padding} Z`} stroke="rgba(255, 223, 76, 0.8)" strokeWidth={3} strokeLinecap="round" />
          <Path key={Math.random()} d={`M${padding} ${(height / 3 - 15) * 3} H${ScreenWidth - padding} Z`} stroke="rgba(255, 103, 108, 0.8)" strokeWidth={3} strokeLinecap="round" />
        </G>
        <G>
          {renderDots({
            L_VA: L_output,
            R_VA: R_output,
            dateArr: calSubArray(),
            full_dateArr: dateArr,
            height: height,
            selectedIndex: selected,
          })}
        </G>
      </Svg>
    </View>
  );
};

export const renderDots = (config) => {
  const { L_VA, R_VA, dateArr, full_dateArr, selectedIndex, height } = config;
  console.log("full_dateArr", full_dateArr);
  console.log("dateArr", dateArr);
  const output = [];
  const x_scale = (val) => {
    const x = scaleTime()
      .domain([moment(dateArr[0], "YYYY-MM-DD").toDate(), moment(dateArr[dateArr.length - 1], "YYYY-MM-DD").toDate()])
      .range([ScreenWidth / 5, ScreenWidth - ScreenWidth / 5]);

    return x(val);
  };

  const y_scale = (L_VA_point, R_VA_point) => {
    console.log(L_VA_point);
    if (parseInt(L_VA_point.substring(0, 1)) == 2) {
      //used 20/20
      const L_backNum = parseInt(L_VA_point.substring(3));
      const R_backNum = parseInt(R_VA_point.substring(3));
      if (L_backNum >= 30 || R_backNum >= 30) {
        return (height / 3 - 15) * 3;
      } else if (L_backNum >= 25 || R_backNum >= 25) {
        return (height / 3 - 15) * 2;
      } else {
        return height / 3 - 15;
      }
    } else if (parseInt(L_VA_point.substring(0, 1)) == 6) {
      //used 6/6
      const L_backNum = parseInt(L_VA_point.substring(2));
      const R_backNum = parseInt(L_VA_point.substring(2));
      if (L_backNum >= 9 || R_backNum >= 9) {
        return (height / 3 - 15) * 3;
      } else if (L_backNum >= 7.5 || R_backNum >= 7.5) {
        return (height / 3 - 15) * 2;
      } else {
        return height / 3 - 15;
      }
    } else if (parseInt(L_VA_point.substring(0, 1) == 0 || parseInt(L_VA_point.substring(0, 1) == 1))) {
      //used 1.0
      const L = parseInt(L_VA_point);
      const R = parseInt(R_VA_point);
      if (L < 0.8 || R < 0.8) return (height / 3 - 15) * 3;
      else if (L < 1 || R < 1) return (height / 3 - 15) * 2;
      else return height / 3 - 15;
    }

    //[0 => 1.25]
    //["20/800", "20/400", "20/200", "20/100", "20/50", "20/40", "20/30", "20/25", "20/20", "20/16"];
    //["6/240", "6/120", "6/60", "6/30", "6/15", "6/12", "6/9", "6/7.5", "6/6", "6/4.8"];
  };

  config.dateArr.forEach((item, index) => {
    //console.log("selected index:",full_dateArr[selectedIndex])
    //const cx = paddingRight/2 + (index * (width - paddingRight)) / (data.length-1);
    const cx = x_scale(moment(item, "YYYY-MM-DD").toDate());
    const cy = y_scale(L_VA[index], R_VA[index]);

    //console.log(lastIndex);
    output.push(
      <>
        {item === full_dateArr[selectedIndex] && <Path key={Math.random()} d={`M${cx} ${cy} V${ScreenHeight / 9} Z`} stroke="white" strokeWidth={3} strokeLinecap="round" />}
        <Circle
          key={Math.random()}
          cx={cx}
          cy={cy}
          r="9"
          stroke={item === full_dateArr[selectedIndex] ? "white" : "#00C2FF"}
          strokeWidth="2"
          fill={item === full_dateArr[selectedIndex] ? "#00C2FF" : "white"}
          opacity={"1"}
        />

        <Text
          x={cx}
          y={item === full_dateArr[selectedIndex] ? ScreenHeight / 6.5 : ScreenHeight / 7.3}
          textAnchor="middle"
          fill="white"
          fontSize={item === full_dateArr[selectedIndex] ? ScreenHeight / 26 : ScreenHeight / 35}
          fontWeight="bold"
        >
          {moment(item).format("YYYY")}
        </Text>
        <Text x={cx} y={ScreenHeight / 6.6 + ScreenHeight / 35} textAnchor="middle" fontSize={ScreenHeight / 38} fill={item === full_dateArr[selectedIndex] ? "white" : "none"}>
          {moment(item).format("D[/]M")}
        </Text>
      </>
    );
  });
  return output;
};
