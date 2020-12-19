import React, { Component, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";

import i18n from 'i18n-js';
import {useLocalization} from "../src/strings/Strings";

const severity = {
  M: { light: 100, medium: 300, severe: 575, chi: "近視" },
  H: { light: 0, medium: 200, severe: 500, chi: "遠視" },
  A: { light: 0, medium: 75, severe: 175, chi: "散光" },
};

export const RenderDescription = (props) => {
  useLocalization();
  const { isLeft, ddlValue, data, selectedDate, index, dateArr } = props;
  if (data == null) return <Text style={DescriptionStyle.contentText}>{i18n.t('renderDesc1')}</Text>;
  if (ddlValue == "3") return null;
  let refractivechar, datatoshow;
  switch (ddlValue) {
    case "0":
      refractivechar = "M";
      datatoshow = isLeft ? data[selectedDate].L_Myopia : data[selectedDate].R_Myopia;
      break;
    case "1":
      refractivechar = "H";
      datatoshow = isLeft ? data[selectedDate].L_Hyperopia : data[selectedDate].R_Hyperopia;
      break;
    case "2":
      refractivechar = "A";
      datatoshow = isLeft ? data[selectedDate].L_CYL : data[selectedDate].R_CYL;
      break;
  }
  let sev = severity[refractivechar];

  if (datatoshow != "0") {
    return (
      <View>
        <Text style={DescriptionStyle.degreeText}>{datatoshow}{i18n.t('renderDesc2')}</Text>
        <RenderWarning degree={datatoshow} refractive={refractivechar} />
        <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
      </View>
    );
  } else {
    return (
      <View>
        <Text style={DescriptionStyle.degreeText}>{i18n.t('renderDesc3')}{sev.chi}</Text>
        <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
      </View>
    );
  }
};

export const RenderWarning = (props) => {
  useLocalization();
  const { degree, refractive } = props;
  const sev = severity[refractive];
  //console.log(sev);
  if (degree < sev.light) {
    return (
      <View>
        <Text style={DescriptionStyle.contentText}>{i18n.t('renderDesc4')}{sev.chi}</Text>
        <Text style={DescriptionStyle.contentText}>
          {i18n.t('renderDesc5')}{sev.chi}{i18n.t('renderDesc6')}{sev.light - degree}{i18n.t('renderDesc7')}
        </Text>
      </View>
    );
  } else if (degree < sev.medium) {
    return (
      <View>
        <Text style={DescriptionStyle.contentText}>{i18n.t("renderDesc8")}{sev.chi}</Text>
        <Text style={DescriptionStyle.contentText}>
          {i18n.t("renderDesc9")}{sev.chi}{i18n.t("renderDesc6")}{sev.medium - degree}{i18n.t("renderDesc11")}
        </Text>
      </View>
    );
  } else if (degree < sev.severe) {
    return (
      <View>
        <Text style={DescriptionStyle.contentText}>{i18n.t('renderDesc12')}{sev.chi}</Text>
        <Text style={DescriptionStyle.contentText}>
          {i18n.t('renderDesc13')}{sev.chi}{i18n.t('renderDesc6')}{sev.severe - degree}{i18n.t('renderDesc11')}
        </Text>
      </View>
    );
  } else return <Text style={DescriptionStyle.contentText}>{i18n.t('renderDesc14')}{sev.chi}</Text>;
};

export const RenderAmblyopiaWarning = (props) => {
  useLocalization();
  const { Ldegree, Rdegree } = props;
  if (Math.abs(Ldegree - Rdegree) >= 300) {
    return <Text style={DescriptionStyle.warningText}>{i18n.t('renderDesc15')}</Text>;
  } else return null;
};

export const RenderIncreaseWarning = (props) => {
  useLocalization();
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
        return <Text style={DescriptionStyle.contentText}>{i18n.t('renderDesc16')} {i18n.t('renderDesc17')}{calDiff(curData.L_Myopia, prevData.L_Myopia)}</Text>;
      case "1": //hyperopia
        return <Text style={DescriptionStyle.contentText}>{i18n.t('renderDesc16')} {i18n.t('renderDesc18')}{calDiff(curData.L_Hyperopia, prevData.L_Hyperopia)}</Text>;
      case "2": //astigmatism
        return <Text style={DescriptionStyle.contentText}>{i18n.t('renderDesc16')} {i18n.t('renderDesc19')}{calDiff(curData.L_CYL, prevData.L_CYL)}</Text>;
    }
  } else {
    switch (refractive) {
      case "0": //myopia
        return <Text style={DescriptionStyle.contentText}>{i18n.t('renderDesc16')} {i18n.t('renderDesc17')}{calDiff(curData.R_Myopia, prevData.R_Myopia)}</Text>;
      case "1": //hyperopia
        return <Text style={DescriptionStyle.contentText}>{i18n.t('renderDesc16')} {i18n.t('renderDesc18')}{calDiff(curData.R_Hyperopia, prevData.R_Hyperopia)}</Text>;
      case "2": //astigmatism
        return <Text style={DescriptionStyle.contentText}>{i18n.t('renderDesc16')} {i18n.t('renderDesc19')}{calDiff(curData.R_CYL, prevData.R_CYL)}</Text>;
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
