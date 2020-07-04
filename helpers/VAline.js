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
  const { L_VAData, R_VAData, dateArr, selected } = config;
  const height = ScreenHeight / 6;
  const padding = 25;

  return (
    <View>
      <Svg height={height + 20} width={ScreenWidth}>
        <Rect width="100%" height="100%" fill="none" />

        <G>
          <Path key={Math.random()} d={`M${padding} ${height / 3 - 15} H${ScreenWidth - padding} Z`} stroke="rgba(91, 192, 173, 0.9)" strokeWidth={3} strokeLinecap="round" />
          <Path key={Math.random()} d={`M${padding} ${(height / 3 - 15) * 2} H${ScreenWidth - padding} Z`} stroke="rgba(255, 223, 76, 0.8)" strokeWidth={3} strokeLinecap="round" />
          <Path key={Math.random()} d={`M${padding} ${(height / 3 - 15) * 3} H${ScreenWidth - padding} Z`} stroke="rgba(255, 103, 108, 0.8)" strokeWidth={3} strokeLinecap="round" />
        </G>
        <G>
          {renderDots({
            L_VA: L_VAData,
            R_VA: R_VAData,
            dateArr: dateArr,
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

  const output = [];
  const x_scale = (val) => {
    const x = scaleTime()
      .domain([moment(dateArr[0], "YYYY-MM-DD").toDate(), moment(dateArr[dateArr.length - 1], "YYYY-MM-DD").toDate()])
      .range([ScreenWidth / 5, ScreenWidth - ScreenWidth / 5]);

    return x(val);
  };

  const y_scale = (L_VA, R_VA) => {
    if (L_VA == "20/16" || L_VA == "20/20" || L_VA == "20/25") {
      return height / 3 - 15;
    }
    //["20/800", "20/400", "20/200", "20/100", "20/50", "20/40", "20/30", "20/25", "20/20", "20/16"];
  };

  config.dateArr.forEach((item, index) => {
    //console.log("selected index:",full_dateArr[selectedIndex])
    //const cx = paddingRight/2 + (index * (width - paddingRight)) / (data.length-1);
    const cx = x_scale(moment(item, "YYYY-MM-DD").toDate(), dateArr);
    const cy = y_scale(L_VA[index], R_VA[index]);

    //console.log(lastIndex);
    output.push(
      <>
        {item === full_dateArr[selectedIndex] && <Path key={Math.random()} d={`M${cx} ${cy} V${85} Z`} stroke="white" strokeWidth={3} strokeLinecap="round" />}
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

        <Text x={cx} y={item === full_dateArr[selectedIndex] ? cy + 87 : cy + 75} textAnchor="middle" fill="white" fontSize={item === full_dateArr[selectedIndex] ? "22" : "18"} fontWeight="bold">
          {moment(item).format("YYYY")}
        </Text>
        <Text x={cx} y={cy + 103} textAnchor="middle" fontSize="16" fill={item === full_dateArr[selectedIndex] ? "white" : "none"}>
          {moment(item).format("D[/]M")}
        </Text>
      </>
    );
  });
  return output;
};
