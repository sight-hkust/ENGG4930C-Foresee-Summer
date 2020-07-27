import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { database, auth } from "../src/config/config";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import moment from "moment";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";
import { connect } from "react-redux";
import { watchFamilyMembersUpdate } from "../src/reducers/familyMembers";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Provider, Portal, Modal } from "react-native-paper";
import { displayName } from "../src/helpers/displayName";
import { getRecordsUpdate } from "../src/reducers/records";

import FABView from "../Utils/FAB";
import MenuScreen from "../Utils/MenuScreen";

var patient_id;
auth.onAuthStateChanged((user) => {
  if (user != null) {
    patient_id = user.uid;
  }
});

class OverviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dateArr: [],
      accountOwner: null,
      isFamilyListModalVisible: false,
      selectedFamily: null,
      familyList: [],
    };
  }

  componentDidMount() {
    const { familyList } = this.state;

    const ref = database.ref("users/" + patient_id);

    ref.child("records").on("value", (snapshot) => {
      var tempDate = [];
      for (var key in snapshot.val()) {
        tempDate.push(key);
      }
      this.setState({
        data: snapshot.toJSON(),
        dateArr: tempDate,
      });
    });

    ref.once("value", (snapshot) => {
      const user = snapshot.val();
      familyList.push({
        firstName: user.firstName,
        lastName: user.lastName,
        surName: user.surName,
        givenName: user.givenName,
        uid: user.uid,
        inactive: false,
      });
      this.setState({ accountOwner: user, selectedFamily: user });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { familyList, accountOwner } = this.state;
    const { familyMembers } = this.props.familyStore;
    if (familyMembers && familyMembers != prevProps.familyStore.familyMembers) {
      familyList.splice(1, familyList.length);
      familyMembers.forEach((member) => familyList.push(member));
    }
    if (familyList.length == 1 && familyMembers) {
      familyMembers.forEach((member) => familyList.push(member));
    }
    if (prevProps.recordStore.records != this.props.recordStore.records && prevProps.recordStore.dateList != this.props.recordStore.dateList) {
      this.setState({
        data: this.props.recordStore.records,
        dateArr: this.props.recordStore.dateList,
      });
    }
  }

  _showFamilyListModal = () => {
    this.setState({ isFamilyListModalVisible: true });
  };
  _hideFamilyListModal = () => {
    this.setState({ isFamilyListModalVisible: false });
  };
  _selectFamily = (member) => {
    const { getRecordsHandler } = this.props;
    this.setState({
      selectedFamily: member,
    });
    const { uid, inactive } = member;
    getRecordsHandler(uid, inactive);
    this._hideFamilyListModal();
  };

  render() {
    const { isFamilyListModalVisible, selectedFamily, familyList } = this.state;
    const calDateDifference = () => {
      if (this.state.dateArr.length < 1) {
        return false;
      }
      const length = this.state.dateArr.length;
      var prev = moment(this.state.dateArr[length - 1]);
      var cur = moment();
      if (cur.diff(prev, "years", true) >= 1) {
        return true;
      }
    };

    return (
      <>
        <MenuScreen>
          <View style={{ height: "100%" }}>
            <View style={{ flex: 3 }}>
              {calDateDifference() ? (
                <View style={OverviewScreenStyle.reminderContainer}>
                  <Icon name="error-outline" color="#24559E" containerStyle={OverviewScreenStyle.iconstyle} />
                  <Text style={OverviewScreenStyle.reminderText}>距離上次驗眼已超過一年，建議盡快預約驗眼</Text>
                </View>
              ) : null}
            </View>
            <View style={{ flexDirection: "row", flex: 10 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View style={OverviewScreenStyle.greetingContainer}>
                  <Text style={OverviewScreenStyle.greetingText}>您好，</Text>
                  <TouchableOpacity
                    style={{
                      width: "110%",
                      flexDirection: "row",
                    }}
                    onPress={this._showFamilyListModal}
                  >
                    {selectedFamily && (
                      <>
                        <Text style={selectedFamily.lastName != "" ? OverviewScreenStyle.userName : OverviewScreenStyle.userNameEnglish}>{displayName(selectedFamily)}</Text>
                        <View
                          style={{
                            marginLeft: ScreenWidth * 0.02,
                            justifyContent: "center",
                          }}
                        >
                          <Icon name="caretdown" type="antdesign" size={ScreenWidth * 0.05} color="black" />
                        </View>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 2.3,
                    alignSelf: "center",
                  }}
                >
                  <View style={OverviewScreenStyle.leftEyeContainer}>
                    <DisplayDegree data={this.state.data} dateArr={this.state.dateArr} isLeft={true} />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  marginTop: ScreenHeight * 0.01,
                }}
              >
                <View style={OverviewScreenStyle.rightEyeContainer}>
                  <DisplayDegree data={this.state.data} dateArr={this.state.dateArr} isLeft={false} />
                </View>
                <View style={OverviewScreenStyle.nextPageContainer}>
                  <Text style={OverviewScreenStyle.nextPageText}>詳細度數趨勢/{"\n"}輸入數據</Text>
                  <Button
                    icon={<Icon name="keyboard-arrow-right" size={40} color="#24559E" />}
                    onPress={() => {
                      this.props.navigation.navigate("RecordsScreen", {
                        patient_id: selectedFamily.uid,
                      });
                    }}
                    buttonStyle={{
                      backgroundColor: "white",
                      width: 45,
                      height: 45,
                      borderRadius: 25,
                      paddingLeft: 2,
                      paddingRight: 0,
                    }}
                    containerStyle={{ alignItems: "center", marginTop: 15 }}
                    TouchableComponent={TouchableOpacity}
                  />
                </View>
              </View>
            </View>
            <View style={OverviewScreenStyle.dateContainer}>
              <Text style={OverviewScreenStyle.dateText}>
                {"最近驗眼日期: "}
                {this.state.dateArr == null ? "" : moment(this.state.dateArr[this.state.dateArr.length - 1]).format("YYYY-MM-DD")}
              </Text>
            </View>
          </View>
          <FABView />
          <Provider>
            <Portal>
              <Modal visible={isFamilyListModalVisible} onDismiss={this._hideFamilyListModal}>
                <View
                  style={{
                    backgroundColor: "white",
                    marginHorizontal: ScreenWidth * 0.12,
                    minHeight: ScreenHeight * 0.2,
                    elevation: 3,
                    borderRadius: ScreenWidth * 0.02,
                    padding: ScreenWidth * 0.03,
                  }}
                >
                  <Text style={{ fontSize: 23 }}>選擇家庭成員</Text>
                  <FlatList
                    data={familyList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                      /* console.log("LINE242:", item.firstName); */
                      return (
                        <TouchableOpacity onPress={() => this._selectFamily(item)}>
                          <View
                            style={{
                              width: "100%",
                              paddingVertical: ScreenHeight * 0.02,
                            }}
                          >
                            <Text style={{ fontSize: 20, textAlign: "center" }}>{displayName(item)}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </Modal>
            </Portal>
          </Provider>
        </MenuScreen>
      </>
    );
  }
}
export const DisplayDegree = (props) => {
  const { data, dateArr, isLeft } = props;
  if (data == null) {
    return (
      <>
        <View style={OverviewScreenStyle.topContainer}>
          <Text style={OverviewScreenStyle.topText}>{isLeft ? "左" : "右"}</Text>
        </View>
        <View>
          <Text style={OverviewScreenStyle.noRecordText}>暫無數據</Text>
        </View>
      </>
    );
  }
  const length = dateArr.length - 1;
  const curData = data[dateArr[length]];

  if (isLeft && curData.L_Myopia == "0" && curData.L_Hyperopia == "0" && curData.L_CYL == "0") {
    return (
      <>
        <View style={OverviewScreenStyle.topContainer}>
          <Text style={OverviewScreenStyle.topText}>{isLeft ? "左" : "右"}</Text>
        </View>
        <View>
          <Text style={OverviewScreenStyle.noRecordText}>沒有屈光不正</Text>
        </View>
      </>
    );
  } else if (!isLeft && curData.R_Myopia == "0" && curData.R_Hyperopia == "0" && curData.R_CYL == "0") {
    return (
      <>
        <View style={OverviewScreenStyle.topContainer}>
          <Text style={OverviewScreenStyle.topText}>{isLeft ? "左" : "右"}</Text>
        </View>
        <View>
          <Text style={OverviewScreenStyle.noRecordText}>沒有屈光不正</Text>
        </View>
      </>
    );
  }

  return (
    <View
      style={{
        paddingTop: 10,
      }}
    >
      <View style={OverviewScreenStyle.topContainer}>
        <Text style={OverviewScreenStyle.topText}>{isLeft ? "左" : "右"}</Text>
      </View>

      {(isLeft ? curData.L_Myopia != 0 : curData.R_Myopia != 0) && <RenderItem degree={isLeft ? curData.L_Myopia : curData.R_Myopia} refractive={"M"} />}

      {(isLeft ? curData.L_Hyperopia != 0 : curData.R_Hyperopia != 0) && <RenderItem degree={isLeft ? curData.L_Hyperopia : curData.R_Hyperopia} refractive={"H"} />}

      {(isLeft ? curData.L_CYL != 0 : curData.R_CYL != 0) && <RenderItem degree={isLeft ? curData.L_CYL : curData.R_CYL} refractive={"A"} />}
    </View>
  );
};

export const RenderItem = (props) => {
  const { degree, refractive } = props;
  return (
    <View style={{ paddingTop: ScreenHeight * 0.025 }}>
      <View style={OverviewScreenStyle.itemContainer}>
        <RenderIndicator degree={degree} refractive={refractive} />
        <Text style={OverviewScreenStyle.degreeText}>{degree}</Text>
        <Text style={OverviewScreenStyle.unitText}>度</Text>
      </View>
    </View>
  );
};

export const RenderIndicator = (props) => {
  const { degree, refractive } = props;
  switch (refractive) {
    case "M":
      return (
        <View style={OverviewScreenStyle.levelTextContatiner}>
          <Text style={OverviewScreenStyle.levelText}>{degree < 300 ? "淺近視" : degree < 575 ? "中度近視" : "深近視"}</Text>
        </View>
      );

    case "H":
      return (
        <View style={OverviewScreenStyle.levelTextContatiner}>
          <Text style={OverviewScreenStyle.levelText}>{degree < 200 ? "淺遠視" : degree < 500 ? "中度遠視" : "深遠視"}</Text>
        </View>
      );
    case "A":
      return (
        <View style={OverviewScreenStyle.levelTextContatiner}>
          <Text style={OverviewScreenStyle.levelText}>{degree < 75 ? "淺散光" : degree < 175 ? "中度散光" : "深散光"}</Text>
        </View>
      );
  }
};

const mapStateToProps = (state) => {
  return {
    familyStore: state.familyMembers,
    recordStore: state.records,
  };
};
const mapDispatchToProps = (dispatch) => {
  dispatch(watchFamilyMembersUpdate());
  return {
    getRecordsHandler: (uid, inactive) => dispatch(getRecordsUpdate(uid, inactive)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewScreen);

const OverviewScreenStyle = StyleSheet.create({
  greetingContainer: {
    flex: 1,
    width: "100%",
    paddingLeft: ScreenWidth * 0.035,
  },
  greetingText: {
    textAlignVertical: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  userName: {
    textAlignVertical: "center",
    fontSize: 46,
    fontWeight: "bold",
    color: "white",
  },
  userNameEnglish: {
    textAlignVertical: "center",
    fontSize: 33,
    fontWeight: "bold",
    color: "white",
  },
  leftEyeContainer: {
    backgroundColor: "#E1EDFF",
    width: ScreenWidth / 2.8,
    height: ScreenHeight / 3,
    marginTop: 60,
    //marginLeft: 30,
    borderRadius: 26,
  },
  rightEyeContainer: {
    backgroundColor: "#E1EDFF",
    width: ScreenWidth / 2.8,
    height: ScreenHeight / 3,
    marginTop: 45,
    //marginLeft: 30,
    borderRadius: 26,
  },
  topContainer: {
    backgroundColor: "#24559E",
    position: "absolute",
    top: -ScreenHeight * 0.045,
    height: ScreenHeight * 0.09,
    width: ScreenHeight * 0.09,
    borderRadius: ScreenHeight * 0.015,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  topText: {
    fontSize: ScreenHeight * 0.05,
    color: "white",
    textAlignVertical: "center",
    textAlign: "center",
    paddingTop: 3,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  levelTextContatiner: {
    width: ScreenWidth * 0.08,
  },
  levelText: {
    fontSize: ScreenHeight * 0.024,
    textAlign: "center",
    color: "#1772A6",
    fontWeight: "bold",
  },
  degreeText: {
    marginLeft: ScreenWidth * 0.01,
    fontSize: ScreenHeight * 0.045, //<=change
    paddingTop: ScreenHeight * 0.02,
    color: "#1772A6",
    fontWeight: "bold",
  },
  unitText: {
    fontSize: ScreenHeight * 0.025,
    paddingTop: ScreenHeight * 0.04,
    color: "#1772A6",
    fontWeight: "bold",
  },
  nextPageContainer: {
    width: ScreenWidth / 2,
    height: ScreenHeight / 6,
    marginTop: 20,
  },
  nextPageText: {
    color: "#FFFFFF",
    fontSize: ScreenHeight * 0.03,
    fontWeight: "bold",
    textAlign: "center",
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    alignSelf: "center",
    fontSize: ScreenHeight * 0.028,
    color: "#FFFFFF",
    textAlignVertical: "center",
  },
  reminderContainer: {
    marginTop: 65,
    height: ScreenHeight / 11,
    width: ScreenWidth / 1.5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "#D9FFD8",
    flexDirection: "row",
  },
  hiddenreminderContainer: {
    marginTop: 65,
    height: ScreenHeight / 11,
    width: ScreenWidth / 1.5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row",
  },
  reminderText: {
    color: "#2D9CDB",
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 9,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  iconstyle: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  noRecordText: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 50,
    color: "#1772A6",
  },
});
