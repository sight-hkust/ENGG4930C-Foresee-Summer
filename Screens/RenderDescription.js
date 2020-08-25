import React, { Component, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";

const severity = {
    M: { light: 100, medium: 300, severe: 575, chi: "近視" },
    H: { light: 0, medium: 200, severe: 500, chi: "遠視" },
    A: { light: 0, medium: 75, severe: 175, chi: "散光" },
};

export const RenderDescription = (props) => {
    const { isLeft, ddlValue, data, selectedDate, index, dateArr } = props;
    if (data == null)
        return <Text style={DescriptionStyle.contentText}>暫無數據</Text>;
    if (ddlValue == "3") return null;
    let refractivechar, datatoshow;
    switch (ddlValue) {
        case "0":
            refractivechar = "M";
            datatoshow = isLeft
                ? data[selectedDate].L_Myopia
                : data[selectedDate].R_Myopia;
            break;
        case "1":
            refractivechar = "H";
            datatoshow = isLeft
                ? data[selectedDate].L_Hyperopia
                : data[selectedDate].R_Hyperopia;
            break;
        case "2":
            refractivechar = "A";
            datatoshow = isLeft
                ? data[selectedDate].L_CYL
                : data[selectedDate].R_CYL;
            break;
    }
    let sev = severity[refractivechar];

    if (datatoshow != "0") {
        return (
            <View>
                <Text style={DescriptionStyle.degreeText}>{datatoshow}度</Text>
                <RenderWarning
                    degree={datatoshow}
                    refractive={refractivechar}
                />
                <RenderIncreaseWarning
                    data={data}
                    dateArr={dateArr}
                    index={index}
                    refractive={ddlValue}
                    isLeft={isLeft}
                />
            </View>
        );
    } else {
        return (
            <View>
                <Text style={DescriptionStyle.degreeText}>
                    你的左眼沒有{sev.chi}
                </Text>
                <RenderIncreaseWarning
                    data={data}
                    dateArr={dateArr}
                    index={index}
                    refractive={ddlValue}
                    isLeft={isLeft}
                />
            </View>
        );
    }
};

export const RenderWarning = (props) => {
    const { degree, refractive } = props;
    const sev = severity[refractive];
    //console.log(sev);
    if (degree < sev.light) {
        return (
            <View>
                <Text style={DescriptionStyle.contentText}>
                    您有很淺的{sev.chi}
                </Text>
                <Text style={DescriptionStyle.contentText}>
                    距離淺{sev.chi}還有{sev.light - degree}度
                </Text>
            </View>
        );
    } else if (degree < sev.medium) {
        return (
            <View>
                <Text style={DescriptionStyle.contentText}>
                    您有淺{sev.chi}
                </Text>
                <Text style={DescriptionStyle.contentText}>
                    距離中度{sev.chi}還有{sev.medium - degree}度
                </Text>
            </View>
        );
    } else if (degree < sev.severe) {
        return (
            <View>
                <Text style={DescriptionStyle.contentText}>
                    您有中度{sev.chi}
                </Text>
                <Text style={DescriptionStyle.contentText}>
                    距離深{sev.chi}還有{sev.severe - degree}度
                </Text>
            </View>
        );
    } else
        return (
            <Text style={DescriptionStyle.contentText}>您有深{sev.chi}</Text>
        );
};

export const RenderAmblyopiaWarning = (props) => {
    const { Ldegree, Rdegree } = props;
    if (Math.abs(Ldegree - Rdegree) >= 300) {
        return (
            <Text style={DescriptionStyle.warningText}>
                雙眼近視度數偏差超過300度，有形成弱視的風險!{" "}
            </Text>
        );
    } else return null;
};

export const RenderIncreaseWarning = (props) => {
    const { data, dateArr, index, isLeft, refractive } = props;
    //對比上次紀錄: 近視深了25度，升幅正常/過大。散光度數不變
    if (data == null || index <= 0) {
        return null;
    }

    const curData = data[dateArr[index]];
    const prevData = data[dateArr[index - 1]];

    const calDiff = (cur, prev) => {
        const diff = prev - cur;
        if (diff > 0) return "淺了" + diff + "度";
        else if (diff < 0) return "深了" + Math.abs(diff) + "度";
        else return "度數不變";
    };

    if (isLeft) {
        switch (refractive) {
            case "0": //myopia
                return (
                    <Text style={DescriptionStyle.contentText}>
                        對比上次紀錄: 近視
                        {calDiff(curData.L_Myopia, prevData.L_Myopia)}
                    </Text>
                );
            case "1": //hyperopia
                return (
                    <Text style={DescriptionStyle.contentText}>
                        對比上次紀錄: 遠視
                        {calDiff(curData.L_Hyperopia, prevData.L_Hyperopia)}
                    </Text>
                );
            case "2": //astigmatism
                return (
                    <Text style={DescriptionStyle.contentText}>
                        對比上次紀錄: 散光
                        {calDiff(curData.L_CYL, prevData.L_CYL)}
                    </Text>
                );
        }
    } else {
        switch (refractive) {
            case "0": //myopia
                return (
                    <Text style={DescriptionStyle.contentText}>
                        對比上次紀錄: 近視
                        {calDiff(curData.R_Myopia, prevData.R_Myopia)}
                    </Text>
                );
            case "1": //hyperopia
                return (
                    <Text style={DescriptionStyle.contentText}>
                        對比上次紀錄: 遠視
                        {calDiff(curData.R_Hyperopia, prevData.R_Hyperopia)}
                    </Text>
                );
            case "2": //astigmatism
                return (
                    <Text style={DescriptionStyle.contentText}>
                        對比上次紀錄: 散光
                        {calDiff(curData.R_CYL, prevData.R_CYL)}
                    </Text>
                );
        }
    }
};

const DescriptionStyle = StyleSheet.create({
    degreeText: {
        color: "#2D9CDB",
        fontSize: ScreenWidth / 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    contentText: {
        textAlign: "center",
        color: "#2D9CDB",
        fontSize: ScreenWidth / 25,
    },
    warningText: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        color: "#FE7171",
        textAlign: "center",
    },
});
