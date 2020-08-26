import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Grid, Col, Row } from "react-native-easy-grid";
import moment from "moment";

import { ScreenWidth, ScreenHeight } from "../../../constant/Constant";
import MenuScreen from "../../../Utils/MenuScreen";

import { auth, database } from "../../config/config";
import { connect, useSelector } from "react-redux";
import FamilyListPicker from "../FamilyListPicker/FamilyListPicker";
import { decryptData } from "../../utils/encryptData";
import { watchUserInfoUpdate } from "../../reducers/user";
import { RoundButton } from "../../../Utils/RoundButton";
import { displayName } from "../../utils/displayName";

const Profile = ({ navigation, route, userStore }) => {
  const { type } = route.params; //type: "user", "professional";
  const { user } = userStore;
  console.log(user);
  const familyMembers = useSelector((state) => state.familyMembers);
  const [userData, setUserData] = useState(null);
  const updateUserData = (uid) => {
    database
      .ref("users/" + uid)
      .once("value")
      .then((snap) => {
        const userData = snap.val();
        if (userData["dataEncrypted"]) {
          setUserData(decryptData(userData));
        } else {
          setUserData(userData);
        }
      });
  };

  useEffect(() => {
    if (!userData && type == "user") {
      updateUserData(familyMembers[0].uid);
    }
  }, [familyMembers]);

  const updateSelectedFamilyMember = (member) => {
    const { uid } = member;
    updateUserData(uid);
  };

  useEffect(() => {
    if (!userData && type == "professional") {
      setUserData(user);
    }
  });

  useEffect(() => {
    if (userData && userData.uid == user.uid && type == "professional") {
      setUserData(user);
      console.log("LINE 52:", user);
    }
  }, [user]);

  return (
    <MenuScreen>
      <View style={styles.container}>
        {userData && (
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
                    <Text style={styles.name}>{userData.lastName != "" ? userData.lastName[0] : userData.givenName[0]}</Text>
                  </View>
                </Row>
                <Row style={styles.qrCodeIconContainer}>
                  {type == "user" && (
                    <Icon type="antdesign" name="qrcode" size={40} containerStyle={{ marginRight: 15, marginTop: 10 }} onPress={() => navigation.navigate("QrCode", { id: userData.uid })} />
                  )}
                </Row>

                {type == "user" ? (
                  <Row style={[styles.titleContainer]}>
                    <FamilyListPicker
                      containerStyle={{
                        width: "100%",
                        justifyContent: "center",
                      }}
                      textStyle={{
                        fontSize: ScreenHeight * 0.045,
                        color: "#1772A6",
                      }}
                      onSelectionUpdate={updateSelectedFamilyMember}
                    />
                  </Row>
                ) : (
                  <Row style={styles.titleContainer}>
                    <Text style={user.lastName != "" ? styles.title : styles.titleEnglish}>{displayName(user)}</Text>
                  </Row>
                )}

                <Row style={{ ...styles.titleContainer, ...{ marginBottom: 7.5 } }}>
                  {type == "user" ? <Text style={styles.subtitle}>{userData.birthday.split("T")[0]}</Text> : <Text style={styles.subtitle}>{user.role == "optometrist" ? "視光師" : "眼科醫生"}</Text>}
                </Row>
                <Row style={{ height: 47.5 }}>
                  <Col style={styles.iconContainer}>
                    <Icon type="font-awesome" name="hourglass-o" size={40} containerStyle={{}} />
                  </Col>
                  <Col style={styles.iconContainer}>
                    <Icon type="fontisto" name="email" size={40} containerStyle={{}} />
                  </Col>
                  <Col style={styles.iconContainer}>
                    <Icon type="feather" name="phone" size={40} containerStyle={{}} />
                  </Col>
                </Row>
                <Row style={{ height: 20 }}>
                  <Col>
                    <View style={styles.verticalLine} />
                  </Col>
                  <Col>
                    <View style={{ ...styles.verticalLine, ...{ height: "250%" } }} />
                  </Col>
                  <Col>
                    <View style={styles.verticalLine} />
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.infoContainer}>
                    {type == "user" ? (
                      <Text style={styles.info}>
                        <Text style={{ fontSize: ScreenHeight * 0.038 }}>{moment.duration(moment().diff(userData.birthday, "YYYY")).years()}</Text>歲
                      </Text>
                    ) : (
                      <Text style={styles.info}>{user.part == "part1" ? "第一部分" : user.part == "part2" ? "第二部分" : user.part == "part3" ? "第三部分" : "第四部分"}</Text>
                    )}
                  </Col>
                  <Col style={styles.infoContainer}>
                    <Text
                      style={{
                        ...styles.info,
                        ...{
                          position: "absolute",
                          top: ScreenHeight * 0.05,
                          width: ScreenWidth,
                          textAlign: "center",
                        },
                      }}
                    >
                      {user["dataEncrypted"] ? user.email : user.email}
                    </Text>
                  </Col>
                  <Col style={styles.infoContainer}>
                    <Text style={styles.info}>{user["dataEncrypted"] ? user.phone : user.phone}</Text>
                  </Col>
                </Row>
                <Row style={{ alignItems: "center", justifyContent: "center" }}>
                  <RoundButton
                    title="更改密碼"
                    onPress={() => navigation.navigate("ChangePassword")}
                    buttonStyle={{ width: ScreenWidth * 0.28, backgroundColor: "#2D9CDB" }}
                    textStyle={{ color: "#FFFFFF" }}
                  />
                </Row>
              </Grid>
            </View>
            <View style={styles.bottomMenu}>
              <Button
                title="詳細設定"
                type="clear"
                containerStyle={styles.bottomMenuItemContainer}
                titleStyle={styles.bottomMenuItemText}
                TouchableComponent={TouchableOpacity}
                onPress={() => navigation.navigate("SettingScreen")}
              />
              <Button
                title="程式教學"
                type="clear"
                containerStyle={styles.bottomMenuItemContainer}
                titleStyle={styles.bottomMenuItemText}
                TouchableComponent={TouchableOpacity}
                onPress={() => navigation.navigate("Tutorial")}
              />
              {type == "user" && (
                <Button
                  title="創建子帳戶"
                  type="clear"
                  containerStyle={styles.bottomMenuItemContainer}
                  titleStyle={styles.bottomMenuItemText}
                  TouchableComponent={TouchableOpacity}
                  onPress={() =>
                    navigation.navigate("Register", {
                      isProfessional: false,
                      registerChild: true,
                    })
                  }
                />
              )}
              <Button
                title="變更個人資料"
                type="clear"
                containerStyle={styles.bottomMenuItemContainer}
                titleStyle={styles.bottomMenuItemText}
                TouchableComponent={TouchableOpacity}
                onPress={() => navigation.navigate("UpdateProfile", { user: userData, type: type })}
              />

              <Button
                title="登出"
                type="clear"
                containerStyle={styles.bottomMenuItemContainer}
                titleStyle={styles.bottomMenuItemText}
                onPress={() => {
                  auth.signOut();
                }}
              />
            </View>
          </>
        )}
      </View>
    </MenuScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    userStore: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  dispatch(watchUserInfoUpdate());
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: ScreenHeight * 0.45,
    width: ScreenHeight * 0.45,
    borderRadius: ScreenHeight * 0.06,
    backgroundColor: "#fff",
    marginTop: ScreenHeight * 0.16,
  },
  nameContainer: {
    width: ScreenWidth * 0.2,
    height: ScreenWidth * 0.2,
    backgroundColor: "#BED8FF",
    borderRadius: ScreenWidth * 0.1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  name: {
    fontSize: ScreenWidth * 0.1,
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
    height: ScreenHeight * 0.05,
  },
  title: {
    color: "#24559E",
    fontSize: ScreenHeight * 0.05,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  titleEnglish: {
    color: "#24559E",
    fontSize: ScreenHeight * 0.04,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  subtitle: {
    color: "#1772A6",
    fontSize: ScreenHeight * 0.025,
    textAlign: "center",
    textAlignVertical: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: ScreenHeight * 0.07,
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
    top: 0,
    color: "#1772A6",
    fontWeight: "bold",
    fontSize: ScreenHeight * 0.026,
  },
  bottomMenu: {
    borderTopWidth: 1,
    marginVertical: ScreenHeight * 0.025,
    borderTopColor: "#8BB5F4",
    width: ScreenWidth * 0.75,
  },
  bottomMenuItemContainer: {
    height: ScreenHeight * 0.06,
  },
  bottomMenuItemText: {
    color: "#fff",
    fontSize: 16.5,
  },
});
