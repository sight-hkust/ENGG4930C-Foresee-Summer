import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { database, auth } from "../src/config/config";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import moment from "moment";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";

//var patient_id = "2igwzwrRiEYReq9HOaDIraVg55V2";
var patient_id;
auth.onAuthStateChanged((user) => {
  if (user != null) {
    patient_id = user.uid;
    console.log(patient_id);
  }
});

export default class OverviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dateArr: [],
      username: "",
    };
  }

  componentDidMount() {
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
      this.setState({
        username: snapshot.val().firstName + snapshot.val().lastName,
      });
    });
  }

  render() {
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
      <View>
        <LinearGradient
          colors={["#1872a7", "#5a74d1", "#a676ff"]}
          start={[0, 0.9]}
          end={[1, 0.1]}
          locations={[0, 0.5, 1]}
          style={{
            height: "100%",
          }}
        >
          {calDateDifference() ? (
            <View style={OverviewScreenStyle.reminderContainer}>
              <Icon name="error-outline" color="#24559E" containerStyle={OverviewScreenStyle.iconstyle} />
              <Text style={OverviewScreenStyle.reminderText}>距離上次驗眼已超過一年，建議盡快預約驗眼</Text>
            </View>
          ) : (
            <View style={OverviewScreenStyle.hiddenreminderContainer}></View>
          )}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: ScreenWidth / 2, alignItems: "center" }}>
              <View style={OverviewScreenStyle.greetingContainer}>
                <Text style={OverviewScreenStyle.greetingText}>您好，</Text>
                <Text style={OverviewScreenStyle.userName}>{this.state.username}</Text>
              </View>
              <View style={OverviewScreenStyle.leftEyeContainer}>
                <DisplayDegree data={this.state.data} dateArr={this.state.dateArr} isLeft={true} />
              </View>
            </View>
            <View style={{ width: ScreenWidth / 2, alignItems: "center" }}>
              <View style={OverviewScreenStyle.rightEyeContainer}>
                <DisplayDegree data={this.state.data} dateArr={this.state.dateArr} isLeft={false} />
              </View>
              <View style={OverviewScreenStyle.nextPageContainer}>
                <Text style={OverviewScreenStyle.nextPageText}>詳細度數趨勢/{"\n"}輸入數據</Text>
                <Button
                  icon={<Icon name="keyboard-arrow-right" size={40} color="#24559E" />}
                  onPress={() => this.props.navigation.navigate("RecordsScreen")}
                  buttonStyle={{
                    backgroundColor: "white",
                    width: 45,
                    height: 45,
                    borderRadius: 25,
                    paddingLeft: 2,
                    paddingRight: 0,
                  }}
                  containerStyle={{ alignItems: "center", marginTop: 15 }}
                />
              </View>
            </View>
          </View>
          <View style={OverviewScreenStyle.dateContainer}>
            <Text style={OverviewScreenStyle.dateText}>最近驗眼日期: {this.state.dateArr == null ? "" : moment(this.state.dateArr[this.state.dateArr.length - 1]).format("YYYY-MM-DD")}</Text>
          </View>
        </LinearGradient>
      </View>
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
    <View style={OverviewScreenStyle.itemContainer}>
      <RenderIndicator degree={degree} refractive={refractive} />
      <Text style={OverviewScreenStyle.degreeText}>{degree}</Text>
      <Text style={OverviewScreenStyle.unitText}>度</Text>
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

const OverviewScreenStyle = StyleSheet.create({
  greetingContainer: {
    paddingTop: 25,
    paddingLeft: 0,
  },
  greetingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  userName: {
    fontSize: 46,
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
    top: -30,
    height: 60,
    width: 60,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 2,
  },
  topText: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
    paddingTop: 3,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    paddingTop: 30,
  },
  levelTextContatiner: {
    width: 16,
  },
  levelText: {
    fontSize: 16,
    color: "#1772A6",
    fontWeight: "bold",
  },
  degreeText: {
    marginLeft: 8,
    fontSize: 36,
    paddingTop: 15,
    color: "#1772A6",
    fontWeight: "bold",
  },
  unitText: {
    fontSize: 14,
    paddingTop: 38,
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
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  dateContainer: {
    marginTop: ScreenHeight / 30,
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    color: "#FFFFFF",
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
