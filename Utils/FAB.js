import React, { useState } from "react";
import { View, Linking, Text } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";
import BottomModalBox from "../src/utils/BottomModalBox";
import { ContactUs, Feedback } from "../src/components/Setting/Setting";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ScreenHeight, ScreenWidth } from "../constant/Constant";

const FABView = () => {
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    const [showContact, setShowContact] = useState(false);

    const [index, setIndex] = useState(-1);

    const _closeContact = () => {
        setShowContact(false);
    };

    return (
        <>
            <Provider>
                <Portal>
                    <FAB.Group
                        open={open}
                        small
                        icon={open ? "window-close" : "information-variant"}
                        color="#1772A6"
                        actions={[
                            {
                                icon: "file",
                                label: "問卷調查",
                                color: "#1772A6",
                                onPress: () => {
                                    Linking.openURL(
                                        "https://forms.gle/8KRYFCjUquThbCNC6"
                                    );
                                },
                            },
                            {
                                icon: "comment-question-outline",
                                label: "意見回饋",
                                color: "#1772A6",
                                onPress: () => {
                                    setIndex(0);
                                    setShowContact(true);
                                },
                            },
                            {
                                icon: "face-agent",
                                label: "聯絡我們",
                                color: "#1772A6",
                                onPress: () => {
                                    setIndex(1);
                                    setShowContact(true);
                                },
                            },
                        ]}
                        onStateChange={onStateChange}
                        fabStyle={{ backgroundColor: "#fff" }}
                    />
                </Portal>
            </Provider>
            <BottomModalBox
                modalContainerStyle={
                    index === 0
                        ? { height: ScreenHeight * 0.7 }
                        : { height: ScreenHeight * 0.4 }
                }
                isOpen={showContact}
                onClosed={_closeContact}
            >
                <View style={{ width: "100%", height: "100%" }}>
                    {index === 0 ? (
                        <Feedback
                            contentContainerStyle={{
                                borderColor: "#1772A6",
                                height: ScreenHeight * 0.5,
                            }}
                            contentFontColor={{ color: "#1772A6" }}
                            wordCounterFontColor={{ color: "#1772A6" }}
                            buttonColor={{ backgroundColor: "#2D9CDB" }}
                            buttonTitle={{ color: "#fff" }}
                        />
                    ) : (
                        <>
                            <View
                                style={{ marginHorizontal: ScreenWidth * 0.05 }}
                            >
                                <Text
                                    style={{
                                        color: "#1772A6",
                                        fontSize: ScreenHeight * 0.037,
                                    }}
                                >
                                    觀迎聯絡我們:
                                </Text>
                            </View>
                            <ContactUs
                                containerStyle={{
                                    width: "100%",
                                    backgroundColor: "transparent",
                                }}
                                titleColor={{ color: "#1772A6" }}
                            />
                        </>
                    )}
                </View>
            </BottomModalBox>
        </>
    );
};

export default FABView;
