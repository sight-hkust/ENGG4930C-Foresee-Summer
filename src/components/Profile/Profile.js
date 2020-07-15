import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Grid, Col, Row } from "react-native-easy-grid";
import moment from "moment";

import { ScreenWidth, ScreenHeight } from "../../../constant/Constant";
import MenuScreen from "../../../Utils/MenuScreen";

import { connect } from "react-redux";
import { watchUserInfoUpdate } from "../../reducers/user";
import { TouchableOpacity } from "react-native-gesture-handler";

const Profile = ({ navigation, route, userInfoStore }) => {
  const [loading, setLoading] = useState(true);

  const { user } = userInfoStore;

  useEffect(() => {
    if (user != undefined) {
      setLoading(false);
    }
  }, [user]);

  return (
    <MenuScreen>
      <View style={styles.container}>
        {!loading && (
          <>
            <View style={styles.card}>
              <Grid>
                <Row
                  style={{
                    height: 0.1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{user.lastName}</Text>
                  </View>
                </Row>
                <Row style={styles.qrCodeIconContainer}>
                  <Icon
                    type="antdesign"
                    name="qrcode"
                    size={40}
                    containerStyle={{ marginRight: 15, marginTop: 10 }}
                    onPress={() => navigation.navigate("QrCode")}
                  />
                </Row>

                <Row style={styles.titleContainer}>
                  <Text style={styles.title}>
                    {" "}
                    {user.lastName + user.firstName}{" "}
                  </Text>
                </Row>

                <Row
                  style={{ ...styles.titleContainer, ...{ marginBottom: 7.5 } }}
                >
                  <Text style={styles.subtitle}>
                    {" "}
                    {user.birthday.split("T")[0]}{" "}
                  </Text>
                </Row>
                <Row style={{ height: 47.5 }}>
                  <Col style={styles.iconContainer}>
                    <Icon
                      type="font-awesome"
                      name="hourglass-o"
                      size={40}
                      containerStyle={{}}
                    />
                  </Col>
                  <Col style={styles.iconContainer}>
                    <Icon
                      type="fontisto"
                      name="email"
                      size={40}
                      containerStyle={{}}
                    />
                  </Col>
                  <Col style={styles.iconContainer}>
                    <Icon
                      type="feather"
                      name="phone"
                      size={40}
                      containerStyle={{}}
                    />
                  </Col>
                </Row>

                <Row style={{ height: 20 }}>
                  <Col>
                    <View style={styles.verticalLine} />
                  </Col>
                  <Col>
                    <View
                      style={{ ...styles.verticalLine, ...{ height: "250%" } }}
                    />
                  </Col>
                  <Col>
                    <View style={styles.verticalLine} />
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.infoContainer}>
                    <Text style={styles.info}>
                      <Text style={{ fontSize: 30 }}>
                        {moment
                          .duration(moment().diff(user.birthday, "YYYY"))
                          .years()}
                      </Text>
                      歲
                    </Text>
                  </Col>
                  <Col style={styles.infoContainer}>
                    <Text
                      style={{
                        ...styles.info,
                        ...{
                          position: "absolute",
                          top: 50,
                          width: ScreenWidth,
                          textAlign: "center",
                        },
                      }}
                    >
                      {user.email}
                    </Text>
                  </Col>
                  <Col style={styles.infoContainer}>
                    <Text style={styles.info}>{user.phone}</Text>
                  </Col>
                </Row>
              </Grid>
            </View>
            <View style={styles.bottomMenu}></View>
            <Button
              title="詳細設定"
              type="clear"
              titleStyle={styles.bottomMenuItem}
              TouchableComponent={TouchableOpacity}
              onPress={() => navigation.navigate("SettingScreen")}
            />
            <Button
              title="程式教學"
              type="clear"
              titleStyle={styles.bottomMenuItem}
              TouchableComponent={TouchableOpacity}
              onPress={() => navigation.navigate("Tutorial")}
            />
            <Button
              title="創建子帳戶"
              type="clear"
              titleStyle={styles.bottomMenuItem}
              TouchableComponent={TouchableOpacity}
              onPress={() =>
                navigation.navigate("Register", {
                  isProfessional: false,
                  registerChild: true,
                })
              }
            />
            <Button
              title="變更個人資料"
              type="clear"
              titleStyle={styles.bottomMenuItem}
              TouchableComponent={TouchableOpacity}
            />
          </>
        )}
      </View>
    </MenuScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: ScreenWidth * 0.8,
    width: ScreenWidth * 0.8,
    borderRadius: 35,
    backgroundColor: "#fff",
    marginTop: ScreenHeight * 0.16,
  },
  nameContainer: {
    width: ScreenWidth * 0.22,
    height: ScreenWidth * 0.22,
    backgroundColor: "#BED8FF",
    borderRadius: ScreenWidth * 0.11,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  name: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  qrCodeIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: ScreenHeight * 0.08,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
  },
  title: {
    color: "#24559E",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#1772A6",
    fontSize: 15,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  verticalLine: {
    borderRightWidth: 2,
    width: "50%",
    borderRightColor: "#24559E",
    height: "100%",
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    position: "absolute",
    top: 4,
    color: "#1772A6",
    fontWeight: "bold",
    fontSize: 18,
  },
  bottomMenu: {
    borderTopWidth: 1,
    marginTop: 20,
    borderTopColor: "#8BB5F4",
    width: 250,
  },
  bottomMenuItem: {
    color: "#fff",
    fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  return {
    userInfoStore: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(watchUserInfoUpdate());
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
