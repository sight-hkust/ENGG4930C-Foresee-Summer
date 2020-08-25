import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Icon, Overlay, Button } from "react-native-elements";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";
import Modal from "react-native-modal";

export default function HeaderRightButton({
    navigation,
    route,
    type,
    content,
}) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            {type == "question" ? (
                <>
                    <Icon
                        name={"questioncircleo"}
                        type={"antdesign"}
                        color="white"
                        size={20}
                        Component={TouchableOpacity}
                        containerStyle={styles.container}
                        onPress={() => setIsVisible(!isVisible)}
                    />
                    <Modal
                        isVisible={isVisible}
                        animationIn="slideInDown"
                        onBackdropPress={() => setIsVisible(false)}
                    >
                        <View style={styles.contentContainer}>
                            <Button
                                icon={
                                    <Icon
                                        name="swapleft"
                                        type="antdesign"
                                        color="#4674C4"
                                        size={40}
                                    />
                                }
                                type="clear"
                                TouchableComponent={TouchableOpacity}
                                onPress={() => setIsVisible(false)}
                                containerStyle={{
                                    position: "absolute",
                                    left: 20,
                                }}
                            />
                            <View style={styles.tutorialContainer}>
                                {content()}
                            </View>
                        </View>
                    </Modal>
                </>
            ) : (
                <Icon
                    name={"setting"}
                    type={"antdesign"}
                    color="white"
                    size={30}
                    Component={TouchableOpacity}
                    containerStyle={styles.container}
                    onPress={() => navigation.navigate("SettingScreen")}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
    },
    overlayContainer: {
        backgroundColor: "black",
        width: ScreenWidth * 0.7,
        height: ScreenHeight * 0.7,
    },
    contentContainer: {
        backgroundColor: "#fff",
        width: ScreenWidth * 0.9,
        height: ScreenHeight * 0.8,
        borderRadius: 20,
    },
    tutorialContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "90%",
        overflow: "hidden",
        alignContent: "center",
        textAlign: "center",
    },
});
