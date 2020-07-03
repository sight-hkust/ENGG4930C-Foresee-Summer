import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { database, auth } from "../src/config/config";
import LineChart from "../helpers/line-chart";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import BottomModal from "../Utils/BottomModal";
import DisplayRecords from "../helpers/displayRecord";
const Open = require("../assets/images/open.png");
const Close = require("../assets/images/close.png");
const BackArrow = require("../assets/images/BackArrow.png");
const NextArrow = require("../assets/images/NextArrow.png");
import { ScreenWidth, ScreenHeight } from "../constant/Constant";
import { RenderContent } from "../Screens/RenderDescription";

//const patient_id = auth.currentUser.uid;
//const patient_id = "002";
var patient_id;
auth.onAuthStateChanged((user) => {
  if (user != null) {
    patient_id = user.uid;
  }
});
const UpperDisplayLimit = 3; //3 for testing, real is 4

export default class RecordsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      Leye: false,
      dates: [],
      refractive: "0", //0:myopia, 1:hyperopia
      index: "0",
      selectedDate: "0",
      username: "",
      isModalVisible: false,
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
        dates: tempDate,
        selectedDate: tempDate[tempDate.length - 1],
        index: tempDate.length - 1,
      });
    });

    ref.child("info/name").once("value", (snapshot) => {
      this.setState({ username: snapshot.val() });
    });
  }

  render() {
    const data = this.state.data;

    const pressHandler = () => {
      this.props.navigation.navigate("AddRecordScreen", {
        isProfessional: false,
        professional_id: -1,
        patient_id: patient_id,
        refractive: this.state.refractive,
      });
    };

    const GetNext = () => {
      const length = this.state.dates.length;
      const value = (this.state.index + 1) % length;

      this.setState({ index: value, selectedDate: this.state.dates[value] });
    };

    const GetBack = () => {
      if (this.state.index == 0) {
        const length = this.state.dates.length - 1;
        this.setState({
          index: length,
          selectedDate: this.state.dates[length],
        });
      } else {
        const value = this.state.index;
        this.setState({
          index: value - 1,
          selectedDate: this.state.dates[value - 1],
        });
      }
    };

    return (
      <View style={RecordScreenStyle.background}>
        <LinearGradient
          colors={["#1872a7", "#5a74d1", "#a676ff"]}
          start={[0, 0.9]}
          end={[1, 0.1]}
          locations={[0, 0.5, 1]}
          style={{
            height: "100%",
          }}
        >
          <View style={RecordScreenStyle.header}>
            <Text style={RecordScreenStyle.title}>
              {this.state.refractive == "0" ? "近視" : this.state.refractive == "1" ? "遠視" : "散光"}
              度數趨勢
            </Text>
          </View>

          <View style={RecordScreenStyle.secondaryContainer}>
            <View style={RecordScreenStyle.refractiveMenu}>
              <TouchableOpacity onPress={() => this.setState({ refractive: "1" })}>
                <Text style={this.state.refractive == "1" ? RecordScreenStyle.selectedMenuText : RecordScreenStyle.unselectedMenuText}>遠視</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ refractive: "0" })}>
                <Text style={this.state.refractive == "0" ? RecordScreenStyle.selectedMenuText : RecordScreenStyle.unselectedMenuText}>近視</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ refractive: "2" })}>
                <Text style={this.state.refractive == "2" ? RecordScreenStyle.selectedMenuText : RecordScreenStyle.unselectedMenuText}>散光</Text>
              </TouchableOpacity>
            </View>

            <View style={RecordScreenStyle.linechart}>
              <RenderLineChart dataArr={data} dateArr={this.state.dates} refractive={this.state.refractive} isLeft={this.state.Leye} selectedIndex={this.state.index} />

              {data != null && (
                <View style={RecordScreenStyle.contentContainer}>
                  <View style={RecordScreenStyle.eyesButton}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ Leye: true })}>
                      <Image source={this.state.Leye ? Open : Close} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ Leye: false })} style={{ paddingLeft: 25 }}>
                      <Image source={this.state.Leye ? Close : Open} />
                    </TouchableOpacity>
                  </View>

                  <View style={RecordScreenStyle.datesButton}>
                    <TouchableOpacity onPress={GetBack}>
                      <Image source={BackArrow} />
                    </TouchableOpacity>
                    <Text style={RecordScreenStyle.dateText}>{this.state.selectedDate}</Text>
                    <TouchableOpacity onPress={GetNext}>
                      <Image source={NextArrow} />
                    </TouchableOpacity>
                  </View>

                  <View style={RecordScreenStyle.content}>
                    <RenderContent isLeft={this.state.Leye} ddlValue={this.state.refractive} data={data} selectedDate={this.state.selectedDate} index={this.state.index} dateArr={this.state.dates} />
                  </View>
                </View>
              )}

              <View style={RecordScreenStyle.addRecordButton}>
                {data != null && <DetailButton data={data} selectedDate={this.state.selectedDate} />}

                <Button
                  icon={<Icon name="add" size={25} color="#2D9CDB" />}
                  onPress={pressHandler}
                  buttonStyle={{
                    backgroundColor: "white",
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                />

                {data != null && (
                  <Button
                    icon={<Icon name="eyeglass" type="simple-line-icon" size={22} color="#2D9CDB" />}
                    buttonStyle={{
                      backgroundColor: "white",
                      width: 40,
                      height: 40,
                      borderRadius: 24,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                    containerStyle={{ paddingTop: 5 }}
                  />
                )}
                {/* <RenderIncreaseWarning data={data} dateArr={this.state.dates} index={this.state.index} refractive={this.state.refractive} isLeft={true}/> */}
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export const DetailButton = (props) => {
  const { data, selectedDate } = props;

  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  return (
    <View>
      <Button
        icon={<Icon name="dehaze" size={22} color="#2D9CDB" />}
        onPress={toggleModal}
        buttonStyle={{
          backgroundColor: "white",
          width: 40,
          height: 40,
          borderRadius: 24,
          paddingLeft: 0,
          paddingRight: 0,
        }}
        containerStyle={{ paddingTop: 5 }}
      />
      <RenderModal data={data} selectedDate={selectedDate} isVisible={isVisible} toggleModal={toggleModal} />
    </View>
  );
};

export const RenderModal = (props) => {
  const { data, selectedDate, isVisible, toggleModal } = props;
  const curRecord = data[selectedDate];
  //console.log(curRecord);
  return (
    <BottomModal isVisible={isVisible} toggleModal={toggleModal} style={{ backgroundColor: "#FFFFFF", height: 350 }}>
      <View
        style={{
          backgroundColor: "#1772A6",
          height: 4,
          width: 70,
          alignSelf: "center",
          marginBottom: 10,
        }}
      />
      <Text style={RecordScreenStyle.colHeader}>日期: {selectedDate}</Text>
      <DisplayRecords curRecord={data[selectedDate]} />
    </BottomModal>
  );
};

export const RenderLineChart = (props) => {
  const { dataArr, dateArr, refractive, isLeft, selectedIndex } = props;

  if (dataArr == null) {
    return <Text style={RecordScreenStyle.noDataText}>暫無數據，請按“+”輸入資料</Text>;
  }

  var output = [];
  //console.log(selectedIndex)

  const calSubArray = () => {
    var end = 0;
    var start = 0;
    if (dateArr.length < 4) {
      return dateArr;
    } else if (selectedIndex > dateArr.length - 4) {
      return dateArr.slice(-4);
    } else if (selectedIndex <= dateArr.length - 4) {
      start = selectedIndex;
      end = selectedIndex + 4;
      return dateArr.slice(start, end);
    }
  };

  switch (refractive) {
    case "0": {
      for (const date of calSubArray()) {
        output.push(isLeft ? dataArr[date].L_Myopia : dataArr[date].R_Myopia);
      }
      break;
    }

    case "1": {
      for (const date of calSubArray()) {
        output.push(isLeft ? dataArr[date].L_Hyperopia : dataArr[date].R_Hyperopia);
      }
      break;
    }
    case "2": {
      for (const date of calSubArray()) {
        output.push(isLeft ? dataArr[date].L_CYL : dataArr[date].R_CYL);
      }
      break;
    }
  }

  if (output.length > 0) {
    return <LineChart data={output} dateArr={calSubArray()} full_dateArr={dateArr} selectedIndex={selectedIndex} refractive={refractive} />;
  }

  if (output.length > 0) {
    return <LineChart data={output} dateArr={dateArr} selectedIndex={selectedIndex} refractive={refractive} />;
  } else {
    return null;
  }
};

const RecordScreenStyle = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: "#24559E",
  },
  header: {
    paddingTop: 40,
    marginLeft: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  secondaryContainer: {
    marginLeft: 10,
    marginRight: 10,
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  refractiveMenu: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectedMenuText: {
    fontSize: 18,
    color: "#3CA1B7",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  unselectedMenuText: {
    fontSize: 18,
    color: "#FFFFFF",
    paddingLeft: 1,
    paddingRight: 1,
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomWidth: 1.5,
    borderColor: "#B8CAE4",
  },

  eyesButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 15,
    //alignSelf: "center",
  },
  datesButton: {
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: 2,
  },
  dateText: {
    color: "#2D9CDB",
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
  },
  contentContainer: {
    alignSelf: "center",
    backgroundColor: "white",
    height: ScreenHeight / 3.2,
    width: ScreenWidth / 1.25,
    borderRadius: 20,
    marginTop: ScreenHeight / 3.5,
    paddingBottom: 10,
  },
  content: {
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
  },

  addRecordButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
  },
  linechart: {
    height: "100%",
  },
  noDataText: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
    paddingTop: 175,
  },
  colHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D9CDB",
  },
});
