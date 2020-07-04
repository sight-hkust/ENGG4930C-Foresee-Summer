import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export const RenderContent = (props) => {
  const { isLeft, ddlValue, data, selectedDate, index, dateArr } = props;

  if (data == null) {
    return <Text style={DescriptionStyle.contentText}>暫無數據</Text>;
  }

  switch (ddlValue) {
    case "0":
      if (isLeft) {
        if (data[selectedDate].L_Myopia != "0") {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>{data[selectedDate].L_Myopia}度</Text>

              <RenderWarning degree={data[selectedDate].L_Myopia} refractive={"M"} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        } else {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>你的左眼沒有近視</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        }
      } else {
        if (data[selectedDate].R_Myopia != "0") {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>{data[selectedDate].R_Myopia}度</Text>
              <RenderWarning degree={data[selectedDate].R_Myopia} refractive={"M"} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        } else {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>你的右眼沒有近視</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        }
      }

    case "1":
      if (isLeft) {
        if (data[selectedDate].L_Hyperopia != "0") {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>{data[selectedDate].L_Hyperopia}度</Text>
              <RenderWarning degree={data[selectedDate].L_Hyperopia} refractive={"H"} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        } else {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>你的左眼沒有遠視</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        }
      } else {
        if (data[selectedDate].R_Hyperopia != "0") {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>{data[selectedDate].R_Hyperopia}度</Text>
              <RenderWarning degree={data[selectedDate].R_Hyperopia} refractive={"H"} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        } else {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>你的右眼沒有遠視</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        }
      }

    case "2":
      if (isLeft) {
        if (data[selectedDate].L_CYL != "0") {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>{data[selectedDate].L_CYL}度</Text>
              <RenderWarning degree={data[selectedDate].L_CYL} refractive={"A"} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        } else {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>你的左眼沒有散光</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        }
      } else {
        if (data[selectedDate].R_CYL != "0") {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>{data[selectedDate].R_CYL}度</Text>
              <RenderWarning degree={data[selectedDate].R_CYL} refractive={"A"} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        } else {
          return (
            <View>
              <Text style={DescriptionStyle.degreeText}>你的右眼沒有散光</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          );
        }
      }
    case "3": {
      return null;
    }
  }
};

export const RenderWarning = (props) => {
  const { degree, refractive } = props;
  switch (refractive) {
    case "M":
      if (degree < 100) {
        return (
          <View>
            <Text style={DescriptionStyle.contentText}>您有很淺的近視</Text>
            <Text style={DescriptionStyle.contentText}>距離淺近視還有{100 - degree}度</Text>
          </View>
        );
      }
      if (degree < 300) {
        return (
          <View>
            <Text style={DescriptionStyle.contentText}>您有淺近視</Text>
            <Text style={DescriptionStyle.contentText}>距離中度近視還有{300 - degree}度</Text>
          </View>
        );
      } else if (degree < 575) {
        return (
          <View>
            <Text style={DescriptionStyle.contentText}>您有中度近視</Text>
            <Text style={DescriptionStyle.contentText}>距離深近視還有{575 - degree}度</Text>
          </View>
        );
      } else {
        return <Text style={DescriptionStyle.contentText}>您有深近視</Text>;
      }

    case "H":
      if (degree < 200) {
        return (
          <View>
            <Text style={DescriptionStyle.contentText}>您有淺遠視</Text>
            <Text style={DescriptionStyle.contentText}>距離中度遠視還有{200 - degree}度</Text>
          </View>
        );
      } else if (degree < 500) {
        return (
          <View>
            <Text style={DescriptionStyle.contentText}>您有中度遠視</Text>
            <Text style={DescriptionStyle.contentText}>距離深遠視還有{500 - degree}度</Text>
          </View>
        );
      } else {
        <View>
          <Text style={DescriptionStyle.contentText}>您有深遠視</Text>
        </View>;
      }
    case "A":
      if (degree < 75) {
        return (
          <View>
            <Text style={DescriptionStyle.contentText}>您有淺散光</Text>
            <Text style={DescriptionStyle.contentText}>距離中度散光還有{75 - degree}度</Text>
          </View>
        );
      } else if (degree < 175) {
        return (
          <View>
            <Text style={DescriptionStyle.contentText}>您有中度散光</Text>
            <Text style={DescriptionStyle.contentText}>距離深散光還有{175 - degree}度</Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text style={DescriptionStyle.contentText}>您有深散光</Text>
          </View>
        );
      }
  }
};

export const RenderAmblyopiaWarning = (props) => {
  const { Ldegree, Rdegree } = props;
  if (Math.abs(Ldegree - Rdegree) >= 300) {
    return <Text style={DescriptionStyle.warningText}>雙眼近視度數偏差超過300度，有形成弱視的風險! </Text>;
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
    if (diff > 0) {
      return "淺了" + diff + "度，";
    } else if (diff < 0) {
      return "深了" + Math.abs(diff) + "度，";
    } else return "度數不變。";
  };

  if (isLeft) {
    switch (refractive) {
      case "0": //myopia
        return <Text style={DescriptionStyle.contentText}>對比上次紀錄: 近視{calDiff(curData.L_Myopia, prevData.L_Myopia)}</Text>;
      case "1": //hyperopia
        return (
          <Text style={DescriptionStyle.contentText}>
            對比上次紀錄: 遠視
            {calDiff(curData.L_Hyperopia, prevData.L_Hyperopia)}
          </Text>
        );
      case "2": //astigmatism
        return <Text style={DescriptionStyle.contentText}>對比上次紀錄: 散光{calDiff(curData.L_CYL, prevData.L_CYL)}</Text>;
    }
  } else {
    switch (refractive) {
      case "0": //myopia
        return <Text style={DescriptionStyle.contentText}>對比上次紀錄: 近視{calDiff(curData.R_Myopia, prevData.R_Myopia)}</Text>;
      case "1": //hyperopia
        return (
          <Text style={DescriptionStyle.contentText}>
            對比上次紀錄: 遠視
            {calDiff(curData.R_Hyperopia, prevData.R_Hyperopia)}
          </Text>
        );
      case "2": //astigmatism
        return <Text style={DescriptionStyle.contentText}>對比上次紀錄: 散光{calDiff(curData.R_CYL, prevData.R_CYL)}</Text>;
    }
  }
};

const DescriptionStyle = StyleSheet.create({
  degreeText: {
    color: "#2D9CDB",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentText: {
    textAlign: "center",
    color: "#2D9CDB",
    fontSize: 16,
  },
  warningText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    color: "#FE7171",
    textAlign: "center",
  },
});
