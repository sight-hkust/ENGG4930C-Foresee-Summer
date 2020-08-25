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
const IMAGE_6 = require("../../../assets/images/tutorial_6.png");
const IMAGE_7 = require("../../../assets/images/tutorial_7.png");

export const tutorialContent = [
    {
        image: IMAGE_0,
        subject: "歡迎使用ForeSee",
        content: "功能介紹及程式教學",
    },
    {
        image: IMAGE_1,
        subject: "按下底部圖案切換頁面。",
        content: "",
    },
    {
        image: IMAGE_2,
        subject: "護眼秘笈",
        content: "您可以在這裡瀏覽眼科專業人士的訪問\n及其他護眼資訊。",
    },
    {
        image: IMAGE_3,
        subject: "護眼運動",
        content: "您可以在這裡聽著錄音\n做護眼運動放鬆眼睛。",
    },
    {
        image: IMAGE_4,
        subject: "主頁",
        content: "您可以在這裡看到自己\n和家人最近的驗眼數據。",
    },
    {
        image: IMAGE_5,
        subject: "專家解答",
        content: "您可以在這裡向眼科專業人士發問\n及查看其他人的問答。",
    },
    {
        image: IMAGE_6,
        subject: "我的檔案",
        content: "您可以在這裡查看個人資料，設定，\n程式教學及開設子帳戶。",
    },
    {
        image: IMAGE_7,
        subject: "對ForeSee有意見/查詢?",
        content: "按下左下角的白色按鈕即可填寫問卷，\n提交意見或直接聯絡我們。",
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
                            style={{
                                height: ScreenHeight * 0.1,
                                justifyContent: "center",
                            }}
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
                                    buttonStyle={styles.buttonStyle}
                                    titleStyle={{ fontSize: ScreenWidth / 24 }}
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
        fontSize: ScreenWidth / 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    content: {
        textAlign: "center",
        color: "#2D9CDB",
        fontSize: ScreenWidth / 22,
        fontWeight: "bold",
        height: ScreenHeight * 0.2,
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: "#8BB5F4",
        borderRadius: ScreenWidth / 22,
        height: (ScreenWidth / 22) * 2,
        paddingHorizontal: 18,
        justifyContent: "center",
    },
});

export default Tutorial;
