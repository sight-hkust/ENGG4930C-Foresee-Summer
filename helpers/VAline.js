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
    const { data, dateArr, selected, subArray, L_output, R_output } = config;
    const height = ScreenHeight / 6;
    const padding = 25;

    return (
        <View>
            <Svg height={(height / 3) * 4} width={ScreenWidth}>
                <Rect width="100%" height="100%" fill="none" />

                <G>
                    <Path
                        key={Math.random()}
                        d={`M${padding} ${height / 3 - 10} H${
                            ScreenWidth - padding
                        } Z`}
                        stroke="rgba(91, 192, 173, 0.9)"
                        strokeWidth={8}
                        strokeLinecap="round"
                    />
                    <Path
                        key={Math.random()}
                        d={`M${padding} ${(height / 3 - 10) * 2} H${
                            ScreenWidth - padding
                        } Z`}
                        stroke="rgba(255, 223, 76, 0.8)"
                        strokeWidth={8}
                        strokeLinecap="round"
                    />
                    <Path
                        key={Math.random()}
                        d={`M${padding} ${(height / 3 - 10) * 3} H${
                            ScreenWidth - padding
                        } Z`}
                        stroke="rgba(255, 103, 108, 0.8)"
                        strokeWidth={8}
                        strokeLinecap="round"
                    />
                </G>
                <G>
                    {renderDots({
                        L_VA: L_output,
                        R_VA: R_output,
                        dateArr: subArray,
                        full_dateArr: dateArr,
                        height: height,
                        selectedIndex: selected,
                        paddingRight: 20,
                    })}
                </G>
            </Svg>
        </View>
    );
};

export const renderDots = (config) => {
    const {
        L_VA,
        R_VA,
        dateArr,
        full_dateArr,
        selectedIndex,
        height,
        paddingRight,
    } = config;
    //console.log("full_dateArr", full_dateArr);
    //console.log("dateArr", dateArr);
    const output = [];
    const x_scale = (val) => {
        const x = scaleTime()
            .domain([
                moment(dateArr[0], "YYYY-MM-DD").toDate(),
                moment(dateArr[dateArr.length - 1], "YYYY-MM-DD").toDate(),
            ])
            .range([paddingRight * 2.5, ScreenWidth - paddingRight * 2.5]);

        return x(val);
    };

    const y_scale = (L_VA_point, R_VA_point) => {
        //console.log(L_VA_point);
        const h = height / 3 - 10;
        if (parseInt(L_VA_point.substring(0, 1)) == 2) {
            //used 20/20
            const L_backNum = parseInt(L_VA_point.substring(3));
            const R_backNum = parseInt(R_VA_point.substring(3));
            if (L_backNum >= 30 || R_backNum >= 30) {
                return h * 3;
            } else if (L_backNum >= 25 || R_backNum >= 25) {
                return h * 2;
            } else {
                return h;
            }
        } else if (parseInt(L_VA_point.substring(0, 1)) == 6) {
            //used 6/6
            const L_backNum = parseInt(L_VA_point.substring(2));
            const R_backNum = parseInt(L_VA_point.substring(2));
            if (L_backNum >= 9 || R_backNum >= 9) {
                return h * 3;
            } else if (L_backNum >= 7.5 || R_backNum >= 7.5) {
                return h * 2;
            } else {
                return h;
            }
        } else if (
            parseInt(
                L_VA_point.substring(0, 1) == 0 ||
                    parseInt(L_VA_point.substring(0, 1) == 1)
            )
        ) {
            //used 1.0
            const L = parseInt(L_VA_point);
            const R = parseInt(R_VA_point);
            if (L < 0.8 || R < 0.8) return h * 3;
            else if (L < 1 || R < 1) return h * 2;
            else return h;
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
        if (item !== full_dateArr[selectedIndex])
            output.push(
                <>
                    <Circle
                        key={Math.random()}
                        cx={cx}
                        cy={cy}
                        r="9"
                        stroke={"#00C2FF"}
                        strokeWidth="2"
                        fill={"white"}
                        opacity={"1"}
                    />
                    <Text
                        x={cx}
                        y={ScreenHeight / 7 + ScreenHeight / 35}
                        textAnchor="middle"
                        fill="white"
                        fontSize={ScreenHeight / 35}
                        fontWeight="bold"
                    >
                        {moment(item).format("YYYY")}
                    </Text>
                </>
            );
    });
    config.dateArr.forEach((item, index) => {
        //console.log("selected index:",full_dateArr[selectedIndex])
        //const cx = paddingRight/2 + (index * (width - paddingRight)) / (data.length-1);
        const cx = x_scale(moment(item, "YYYY-MM-DD").toDate());
        const cy = y_scale(L_VA[index], R_VA[index]);

        //console.log(lastIndex);
        if (item === full_dateArr[selectedIndex])
            output.push(
                <>
                    <Path
                        key={Math.random()}
                        d={`M${cx} ${cy} V${ScreenHeight / 7} Z`}
                        stroke="white"
                        strokeWidth={3}
                        strokeLinecap="round"
                    />
                    <Circle
                        key={Math.random()}
                        cx={cx}
                        cy={cy}
                        r="9"
                        stroke={"white"}
                        strokeWidth="2"
                        fill={"#00C2FF"}
                        opacity={"1"}
                    />
                    <Text
                        x={cx}
                        y={ScreenHeight / 7 + ScreenHeight / 35}
                        textAnchor="middle"
                        fill="white"
                        fontSize={ScreenHeight / 35}
                        fontWeight="bold"
                    >
                        {moment(item).format("YYYY")}
                    </Text>
                    <Text
                        x={cx}
                        y={ScreenHeight / 7 + (ScreenHeight / 35) * 1.75}
                        textAnchor="middle"
                        fontSize={ScreenHeight / 35 / 1.2}
                        fill={"white"}
                    >
                        {moment(item).format("D[/]M")}
                    </Text>
                </>
            );
    });
    return output;
};
