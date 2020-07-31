import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MenuScreen from "../../../Utils/MenuScreen";
import { ScreenHeight, ScreenWidth } from "../../../constant/Constant";
import { Icon, Input } from "react-native-elements";
import { InputTextField } from "../Utils/InputTextField";
import { heightPercentageToDP } from "react-native-responsive-screen";

export const EditUserInfo = ({ route, navigation }) => {
  const { user } = route.params;

  const [fieldEditingState, setFieldsEditingState] = useState({
    lastName: false,
  });

  //console.log("User found: ", user);
  const editIcon = <Icon name="pencil" type="foundation" size={30} color="white" />;

  return (
    <MenuScreen>
      {user && (
        <View style={styles.container}>
          <View style={{ width: ScreenWidth * 0.3 }}>
            {!fieldEditingState["lastName"] ? (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "red",
                }}
              >
                <View style={{ justifyContent: "center", flex: 2 }}>
                  <Text style={{ color: "white", fontSize: ScreenHeight * 0.035 }}>{user.firstName}</Text>
                </View>
                <TouchableOpacity onPress={() => setFieldsEditingState({ lastName: true })}>
                  <View style={{ justifyContent: "center", flex: 2 }}>{editIcon}</View>
                </TouchableOpacity>
              </View>
            ) : (
              <Input
                inputContainerStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  height: heightPercentageToDP("7%"),
                  borderRadius: heightPercentageToDP("3.5%"),
                }}
              />
            )}
          </View>
        </View>
      )}
    </MenuScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
