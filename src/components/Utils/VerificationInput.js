import React, { useState, createRef, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    ScreenHeight,
    ScreenWidth,
    FontScale,
} from "../../../constant/Constant";

const CELL_COUNT = new Array(6).fill(0);

export const VerificationInput = ({
    confirmationResult,
    setVerifcationModalState,
}) => {
    useEffect(() => {
        if (code.length === CELL_COUNT.length && confirmationResult !== null) {
            confirmationResult
                .confirm(code)
                .then((result) => {
                    setVerifcationModalState(false);
                })
                .catch((err) => console.log(err));
        }
    });
    const [code, setCode] = useState("");
    const [isCellFocused, setCellFocus] = useState(false);
    const values = code.split("");
    const input = createRef();
    const allFilled = !(values.length < CELL_COUNT.length);
    const selectedIndex =
        values.length < CELL_COUNT.length
            ? values.length
            : CELL_COUNT.length - 1;

    const handlePress = () => {
        if (code.length == CELL_COUNT.length) {
            input.current.clear();
            setCode("");
        }
        input.current.focus();
    };

    const handleChange = (value) => {
        if (code.length <= CELL_COUNT.length) {
            setCode((code + value).slice(0, CELL_COUNT.length));
        }
        if (code.length >= CELL_COUNT.length - 1) {
            input.current.blur();
        }
    };
    const handleKeyPress = (e) => {
        if (e.nativeEvent.key === "Backspace") {
            setCode(code.slice(0, code.length - 1));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={handlePress}>
                <View style={styles.content}>
                    <Text style={styles.title}>請輸入驗證碼</Text>
                    <View style={styles.wrap}>
                        <TextInput
                            value=""
                            ref={input}
                            onFocus={() => setCellFocus(true)}
                            onBlur={() => setCellFocus(false)}
                            onChangeText={handleChange}
                            onKeyPress={handleKeyPress}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            style={[
                                styles.input,
                                { left: selectedIndex * ScreenWidth * 0.14 },
                            ]}
                        />
                        {CELL_COUNT.map((v, index) => {
                            const isLastCell = index === CELL_COUNT.length - 1;
                            return (
                                <View
                                    style={[
                                        styles.cell,
                                        isLastCell ? { marginRight: 0 } : null,
                                    ]}
                                    key={index}
                                >
                                    <Text style={styles.code}>
                                        {values[index] || ""}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        backgroundColor: "white",
        height: ScreenHeight * 0.35,
        width: ScreenWidth * 0.9,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: ScreenHeight * 0.02,
    },
    title: {
        color: "#2D9CDB99",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 28,
    },
    wrap: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    cell: {
        /* backgroundColor: "red", */
        height: ScreenHeight * 0.08,
        width: ScreenWidth * 0.12,
        borderBottomWidth: 0.5,
        marginRight: ScreenWidth * 0.02,
        justifyContent: "center",
    },
    code: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
    },
    input: {
        position: "absolute",
        top: 0,
        bottom: 0,
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
        height: ScreenHeight * 0.08,
        width: ScreenWidth * 0.12,
        borderBottomWidth: 0.5,
        borderBottomColor: "#2D9CDB",
        /* backgroundColor: "blue", */
        zIndex: 1,
    },
});
