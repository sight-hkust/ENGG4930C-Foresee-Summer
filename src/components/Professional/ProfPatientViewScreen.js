import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { database, auth } from "../../config/config";
import { Col, Row, Grid } from "react-native-easy-grid";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Icon } from "react-native-elements";
import DisplayRecords from "../../../helpers/displayRecord";
import moment from "moment";
import { RoundButton } from "../../../Utils/RoundButton";

export default class ProfPatientViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        birthday: moment().toJSON(),
      },
      records: [],
      recordsIndex: -1,
      isAdj: true,
    };
  }

  componentDidMount() {
    const { key, inactive } = this.props.route.params;
    console.log(key);

    let userInfo = database.ref("users/" + key);
    let recordViewRef = database.ref("/users/" + key + "/records");

    //For temp use with patient no account
    if (inactive) {
      recordViewRef = database.ref("/userInfo/" + key + "/records");
      userInfo = database.ref("userInfo/" + key);
    }
    userInfo.once("value").then((snapshot) => {
      this.setState({
        info: snapshot.val(),
      });
    });

    recordViewRef
      .orderByKey()
      .once("value")
      .then((snapshot) => {
        let records = [];
        let curRecord = {};
        snapshot.forEach((child) => {
          const year = child.key.split("-")[0];
          curRecord = child.val();
          curRecord.date = child.key;
          records.push(curRecord);
        });
        return records;
      })
      .then((data) => this.setRecords(data));
  }

  setRecords = (records) => {
    this.setState({
      records: records,
      recordsIndex: records.length - 1,
    });
  };

  render() {
    const { key, inactive } = this.props.route.params;
    const { info } = this.state;
    const records = this.state.records;
    const recordsLen = records.length;
    const recordsIndex = this.state.recordsIndex;
    const curRecord = records[recordsIndex];

    return (
      <View style={styles.fullscreen}>
        <LinearGradient
          colors={["#1872a7", "#5a74d1", "#a676ff"]}
          start={[0, 0.9]}
          end={[1, 0.1]}
          locations={[0, 0.5, 1]}
          style={{
            height: "100%",
          }}
        >
          <>
            <View style={styles.header}>
              <Text style={styles.title}>
                {info.lastName}
                {info.firstName}
              </Text>
            </View>
            <ScrollView
              style={{ flex: 1, marginVertical: 20, marginHorizontal: 30 }}
            >
              <Text style={styles.profileText}>
                年齡: {Math.abs(moment(info.birthday).diff(moment(), "years"))}
              </Text>
              <Text style={styles.profileText}>職業: {info.job}</Text>
              <Text style={styles.profileText}>家族病史:</Text>
              {info.history != "" ? (
                <Text style={[styles.profileText, { paddingLeft: 20 }]}>
                  {info.history}
                </Text>
              ) : (
                <></>
              )}
              <Text style={styles.profileText}>已知眼疾:</Text>
              {info.disease != "" ? (
                <Text style={[styles.profileText, { paddingLeft: 20 }]}>
                  {info.disease}
                </Text>
              ) : (
                <></>
              )}
            </ScrollView>
          </>
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              paddingHorizontal: 30,
              paddingTop: 0,
              paddingBottom: 15,
              alignItems: "center",
            }}
          >
            <View style={styles.boxes}>
              {recordsLen == 0 ? (
                <Text style={styles.noDataText}>
                  {"暫無數據\n請按 + 輸入資料"}
                </Text>
              ) : (
                <View style={{ height: "100%" }}>
                  <View style={styles.datesButton}>
                    {recordsLen == 1 ? (
                      <Icon
                        name="swapleft"
                        type="antdesign"
                        size={36}
                        color="rgba(45, 156, 259, 0.2)"
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            recordsIndex:
                              (recordsIndex + recordsLen - 1) % recordsLen,
                          })
                        }
                      >
                        <Icon
                          name="swapleft"
                          type="antdesign"
                          size={36}
                          color="#2D9CDB"
                        />
                      </TouchableOpacity>
                    )}
                    <Text style={styles.dateText}>{curRecord.date}</Text>
                    {recordsLen == 1 ? (
                      <Icon
                        name="swapright"
                        type="antdesign"
                        size={36}
                        color="rgba(45, 156, 259, 0.2)"
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            recordsIndex: (recordsIndex + 1) % recordsLen,
                          })
                        }
                      >
                        <Icon
                          name="swapright"
                          type="antdesign"
                          size={36}
                          color="#2D9CDB"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <DisplayRecords
                    curRecord={curRecord}
                    isAdj={this.state.isAdj}
                  />
                  <RoundButton
                    buttonStyle={{ backgroundColor: "#2D9CDB" }}
                    textStyle={{ color: "white" }}
                    title={this.state.isAdj ? "查看真實度數" : "查看調整度數"}
                    onPress={() => this.setState({ isAdj: !this.state.isAdj })}
                  />
                </View>
              )}
            </View>

            <View style={{ height: 15 }} />

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AddRecordScreen", {
                  isProfessional: true,
                  professional_id: auth.currentUser.uid,
                  patient_id: key,
                  inactive: inactive,
                });
              }}
              style={{
                backgroundColor: "white",
                width: 48,
                height: 48,
                borderRadius: 24,
                justifyContent: "center",
              }}
            >
              <Icon name="add" size={25} color="#2D9CDB" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullscreen: {
    height: "100%",
    width: "100%",
  },
  header: {
    paddingTop: 31,
    paddingLeft: 57,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 31,
    color: "#E1EDFF",
    fontWeight: "700",
  },
  profileText: {
    textAlign: "left",
    fontSize: 20,
    color: "white",
  },
  centreText: {
    textAlign: "center",
  },
  boxes: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    padding: 10,
    paddingBottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
  gridText: {
    color: "#2D9CDB",
    textAlign: "center",
    fontSize: 20,
  },
  gridHeader: {
    color: "#2D9CDB",
    textAlign: "left",
    fontSize: 20,
    paddingLeft: 30,
    fontWeight: "bold",
  },
  datesButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    color: "#2D9CDB",
    fontSize: 24,
    paddingHorizontal: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  noDataText: {
    fontSize: 25,
    textAlign: "center",
    color: "#2D9CDB",
  },
});
