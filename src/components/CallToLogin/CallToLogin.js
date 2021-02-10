import React, {Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image, Button} from "react-native";
import {Audio} from "expo-av";
import {ScreenHeight, ScreenWidth} from "../../../constant/Constant";
import FABView from "../../../Utils/FAB";
import MenuScreen from "../../../Utils/MenuScreen";
import {useIsFocused} from "@react-navigation/native";


class CallToL extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <MenuScreen>
                <View style={styles.background}>
                    <View style={styles.secondaryContainer}>
                        <View style={styles.textContain}>
                            <Text style={styles.text}>{"請登入以獲得觀看權限"}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: "center"}}>
                            <TouchableOpacity
                                style={styles.boxes}
                                onPress={() => {
                                    this.props.navigation.navigate("Login");
                                }}
                            >
                                <Text style={styles.buttonText}>登錄</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <FABView/>
            </MenuScreen>
        );
    }
}

export default function CallToLogin(props) {
    const isFocused = useIsFocused();
    return <CallToL {...props} isFocused={isFocused}/>;
}

const styles = StyleSheet.create({
    background: {
        height: "100%",
    },
    secondaryContainer: {
        flex: 1,
        marginHorizontal: 30,
        marginTop: 90,
        marginBottom: 30,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "white",
    },
    textContain: {
        flex: 4,
        justifyContent: "center",
    },
    text: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: ScreenWidth / 16,
        fontWeight: "bold",
        lineHeight: (ScreenWidth / 16) * 1.2,
        color: "white",
    },
    boxes: {
        height: (ScreenWidth / 16) * 2,
        width: (ScreenWidth / 16) * 5,
        borderRadius: ScreenWidth / 16,
        backgroundColor: "white",
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: ScreenWidth / 16,
        color: "#3CA1B7",
    },
});
