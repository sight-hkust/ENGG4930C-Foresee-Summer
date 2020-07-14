import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Swiper from "react-native-swiper";
import { ScreenHeight, ScreenWidth } from "../../../constant/Constant";

const IMAGE_0 = require("../../../assets/images/tutorial_0.png");
const IMAGE_1 = require("../../../assets/images/tutorial_1.png");
const IMAGE_2 = require("../../../assets/images/tutorial_2.png");
const IMAGE_3 = require("../../../assets/images/tutorial_3.png");
const IMAGE_4 = require("../../../assets/images/tutorial_4.png");
const IMAGE_5 = require("../../../assets/images/tutorial_5.png");

const tutorialContent = [
  {
    image: IMAGE_0,
    subject: "如何看不同日期的記錄?",
    content: "按下白色圓形切換至不同日期的記錄\n按下箭咀看前一次或後一次的紀錄",
  },
  {
    image: IMAGE_1,
    subject: "如何切換不同眼睛的紀錄?",
    content: "按下眼睛圖像切換左右眼睛\n打開的眼睛代表現正顯示的紀錄",
  },
  {
    image: IMAGE_2,
    subject: "顏色代表甚麼?",
    content: "視力趨勢圖中不同顏色\n代表視力的深淺",
  },
  {
    image: IMAGE_3,
    subject: "數字代表甚麼?",
    content:
      "負數代表近視 正數代表遠視\n數字(排除正負號)越大\n眼屈光不正程度越嚴重",
  },
  {
    image: IMAGE_4,
    subject: "斜度代表什麼?",
    content: "斜度代表度數上升速度",
  },
  {
    image: IMAGE_5,
    subject: "底部圖案代表甚麼功能?",
    content: "中央的眼睛是視力趨勢主頁\n其他是護眼學堂的四種活動",
  },
];

const Tutorial = ({ route, navigation }) => {
  return (
    <Swiper
      loop={false}
      paginationStyle={{ marginBottom: ScreenHeight * 0.05 }}
      dot={
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.2)",
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 8,
          }}
        />
      }
      activeDot={
        <View
          style={{
            backgroundColor: "#007aff",
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 8,
          }}
        />
      }
    >
      {tutorialContent.map((item, index) => {
        return (
          <View style={styles.slide1}>
            <Image
              style={[
                styles.image,
                index % 2
                  ? { marginRight: ScreenWidth / 7 }
                  : { marginLeft: ScreenWidth / 7 },
              ]}
              source={item.image}
            />
            <View
              style={{ height: ScreenHeight * 0.12, justifyContent: "center" }}
            >
              <Text style={styles.title}>{item.subject}</Text>
            </View>
            <Text style={styles.content}>{item.content}</Text>
            {index == tutorialContent.length - 1 && (
              <View
                style={{
                  position: "absolute",
                  width: ScreenWidth,
                  bottom: ScreenHeight * 0.14,
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Button
                  buttonStyle={{
                    borderWidth: 1,
                    borderColor: "#8BB5F4",
                    borderRadius: 18,
                    height: 36,
                    paddingHorizontal: 18,
                    justifyContent: "center",
                  }}
                  titleStyle={{ fontSize: 14 }}
                  type="clear"
                  title="開始使用"
                  onPress={() => navigation.navigate("Main")}
                />
              </View>
            )}
          </View>
        );
      })}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: ScreenHeight * 0.15,
  },
  image: {
    height: (ScreenWidth * 5) / 7,
    width: (ScreenWidth * 6) / 7,
  },
  title: {
    color: "#1772A6",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    textAlign: "center",
    color: "#2D9CDB",
    fontSize: 18,
    fontWeight: "bold",
    height: ScreenHeight * 0.18,
  },
});

export default Tutorial;
