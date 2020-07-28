import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { database, auth } from "../src/config/config";
import LineChart from "../helpers/line-chart";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import BottomModal from "../Utils/BottomModal";
import DisplayRecords from "../src/components/Utils/DisplayRecord";
const Open = require("../assets/images/open.png");
const Close = require("../assets/images/close.png");
const BackArrow = require("../assets/images/BackArrow.png");
const NextArrow = require("../assets/images/NextArrow.png");
import { ScreenWidth, ScreenHeight } from "../constant/Constant";
import { RenderContent } from "../Screens/RenderDescription";
import { RenderVA } from "../Screens/RenderVA";
import MenuScreen from "../Utils/MenuScreen";

//const patient_id = auth.currentUser.uid;
//const patient_id = "002";
/* var patient_id;
auth.onAuthStateChanged((user) => {
  if (user != null) {
    patient_id = user.uid;
  }
}); */
//const UpperDisplayLimit = 3; //3 for testing, real is 4
const UpperDisplayLimit = 4;

export default class RecordsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      Leye: false,
      dates: [],
      refractive: "3", //0:myopia, 1:hyperopia
      index: 0,
      firstIndexToShow: 0,
      selectedDate: "0",
      username: "", //first name last name
      isModalVisible: false,
    };
  }

  componentDidMount() {
    const { patient_id } = this.props.route.params;
    let ref = database.ref("users/" + patient_id);

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
        firstIndexToShow: Math.max(0, tempDate.length - UpperDisplayLimit),
      });
    });

    ref.child("info/name").once("value", (snapshot) => {
      //currently not in use, for family account
      this.setState({ username: snapshot.val() });
    });
  }

  render() {
    const { patient_id } = this.props.route.params;
    const data = this.state.data;
    const pressHandler = () => {
      this.props.navigation.navigate("AddRecordScreen", {
        isProfessional: false,
        professional_id: -1,
        patient_id: patient_id,
        refractive: this.state.refractive,
      });
    };

    const GetFITS = (value) => {
      const fits = this.state.firstIndexToShow;
      if (value < fits) return value;
      else if (value >= fits + UpperDisplayLimit)
        return value - UpperDisplayLimit + 1;
      else return fits;
    };

    const GetNext = () => {
      const length = this.state.dates.length;
      const value = (this.state.index + 1) % length;
      this.setState({
        index: value,
        selectedDate: this.state.dates[value],
        firstIndexToShow: GetFITS(value),
      });
    };

    const GetBack = () => {
      const length = this.state.dates.length;
      const value = (this.state.index + length - 1) % length;
      this.setState({
        index: value,
        selectedDate: this.state.dates[value],
        firstIndexToShow: GetFITS(value),
      });
    };

    const NextButton = (props) => {
      return (
        <TouchableOpacity onPress={GetNext}>
          <Icon
            name="swapright"
            type="antdesign"
            size={(ScreenHeight / 35) * 1.8}
            color={props.isVA ? "white" : "#2D9CDB"}
          />
        </TouchableOpacity>
      );
    };

    const BackButton = (props) => {
      return (
        <TouchableOpacity onPress={GetBack}>
          <Icon
            name="swapleft"
            type="antdesign"
            size={(ScreenHeight / 35) * 1.8}
            color={props.isVA ? "white" : "#2D9CDB"}
          />
        </TouchableOpacity>
      );
    };

    const calSubArray = () => {
      const dateArr = this.state.dates;
      const fits = this.state.firstIndexToShow;
      if (dateArr.length < UpperDisplayLimit) {
        return dateArr;
      } else return dateArr.slice(fits, fits + UpperDisplayLimit);
    };

    return (
      <MenuScreen>
        <View style={RecordScreenStyle.header}>
          <Text style={RecordScreenStyle.title}>
            {this.state.refractive == "0"
              ? "近視度數"
              : this.state.refractive == "1"
              ? "遠視度數"
              : this.state.refractive == "2"
              ? "散光度數"
              : "視力"}
            趨勢
          </Text>
        </View>

        <View style={RecordScreenStyle.secondaryContainer}>
          <View style={RecordScreenStyle.refractiveMenu}>
            <TouchableOpacity
              onPress={() => this.setState({ refractive: "3" })}
            >
              <View >
              <Text
                style={ 
                  this.state.refractive == "3"
                    ? RecordScreenStyle.selectedMenuText
                    : RecordScreenStyle.unselectedMenuText
                }
              >
                視力
              </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ refractive: "1" })}
            >
              <View>
              <Text
                style={
                  this.state.refractive == "1"
                    ? RecordScreenStyle.selectedMenuText
                    : RecordScreenStyle.unselectedMenuText
                }
              >
                遠視
              </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ refractive: "0" })}
            >
               <View >
              <Text
                style={
                  this.state.refractive == "0"
                    ? RecordScreenStyle.selectedMenuText
                    : RecordScreenStyle.unselectedMenuText
                }
              >
                近視
              </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ refractive: "2" })}
            >
              <View>
              <Text
                style={
                  this.state.refractive == "2"
                    ? RecordScreenStyle.selectedMenuText
                    : RecordScreenStyle.unselectedMenuText
                }
              >
                散光
              </Text>
              </View>
            </TouchableOpacity>
          </View>
          {data != null && this.state.refractive == "3" && (
            <View>
              <RenderVA
                data={data}
                dateArr={this.state.dates}
                NextButton={NextButton}
                BackButton={BackButton}
                index={this.state.index}
                subArray={calSubArray()}
              />
            </View>
          )}
          <View style={RecordScreenStyle.linechart}>
            <RenderLineChart
              dataArr={data}
              dateArr={this.state.dates}
              refractive={this.state.refractive}
              isLeft={this.state.Leye}
              subArray={calSubArray()}
              selectedIndex={this.state.index}
              fits={this.state.firstIndexToShow}
            />

            {data != null && this.state.refractive != "3" && (
              <View style={RecordScreenStyle.contentContainer}>
                <View style={RecordScreenStyle.eyesButton}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.setState({ Leye: true })}
                  >
                    <Image
                      source={this.state.Leye ? Open : Close}
                      style={{
                        height: ScreenHeight / 10,
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.setState({ Leye: false })}
                    style={{ paddingLeft: 40 }}
                  >
                    <Image
                      source={this.state.Leye ? Close : Open}
                      style={{
                        height: ScreenHeight / 10,
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={RecordScreenStyle.datesButton}>
                  <BackButton isVA={false} />
                  <Text style={RecordScreenStyle.dateText}>
                    {this.state.selectedDate}
                  </Text>
                  <NextButton isVA={false} />
                </View>

                <View style={RecordScreenStyle.content}>
                  <RenderContent
                    isLeft={this.state.Leye}
                    ddlValue={this.state.refractive}
                    data={data}
                    selectedDate={this.state.selectedDate}
                    index={this.state.index}
                    dateArr={this.state.dates}
                  />
                </View>
              </View>
            )}

            <View style={RecordScreenStyle.buttonGroup}>
              {data != null && (
                <DetailButton
                  data={data}
                  selectedDate={this.state.selectedDate}
                  isAdj={false}
                  refractive={this.state.refractive}
                />
              )}

              <Button
                icon={
                  <Icon name="add" size={ScreenHeight / 20} color="#2D9CDB" />
                }
                onPress={pressHandler}
                buttonStyle={{
                  backgroundColor: "white",
                  width: ScreenHeight / 15,
                  height: ScreenHeight / 15,
                  borderRadius: 24,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
                TouchableComponent={TouchableOpacity}
              />
              {data != null && (
                <DetailButton
                  data={data}
                  selectedDate={this.state.selectedDate}
                  isAdj={true}
                  refractive={this.state.refractive}
                />
              )}

              {/* <RenderIncreaseWarning data={data} dateArr={this.state.dates} index={this.state.index} refractive={this.state.refractive} isLeft={true}/> */}
            </View>
          </View>
        </View>
      </MenuScreen>
    );
  }
}

export const DetailButton = (props) => {
  const { data, selectedDate, isAdj, refractive } = props;

  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        icon={
          <Icon
            name={isAdj ? "eyeglass" : "dehaze"}
            type={isAdj ? "simple-line-icon" : ""}
            size={22}
            color="#2D9CDB"
          />
        }
        onPress={toggleModal}
        buttonStyle={{
          backgroundColor: "white",
          width: ScreenHeight / 15,
          height: ScreenHeight / 15,
          borderRadius: 24,
          paddingLeft: 0,
          paddingRight: 0,
        }}
        TouchableComponent={TouchableOpacity}
      />
      <Text
        style={{
          color: "white",
          fontSize: ScreenHeight / 40,
        }}
      >
        {isAdj ? "調整度數" : "真實度數"}
      </Text>
      <RenderModal
        data={data}
        selectedDate={selectedDate}
        isVisible={isVisible}
        toggleModal={toggleModal}
        isAdj={isAdj}
      />
    </View>
  );
};

export const RenderModal = (props) => {
  const { data, selectedDate, isVisible, toggleModal, isAdj } = props;
  const curRecord = data[selectedDate];

  return (
    <BottomModal
      isVisible={isVisible}
      toggleModal={toggleModal}
      style={{ backgroundColor: "#FFFFFF", height: 350 }}
    >
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
      <DisplayRecords curRecord={curRecord} isAdj={isAdj} />
    </BottomModal>
  );
};

export const RenderLineChart = (props) => {
  const {
    dataArr,
    dateArr,
    refractive,
    isLeft,
    subArray,
    selectedIndex,
    fits,
  } = props;

  if (dataArr == null) {
    return (
      <Text style={RecordScreenStyle.noDataText}>
        暫無數據，請按“+”輸入資料
      </Text>
    );
  }
  if (refractive == "3") {
    return null;
  }
  var output = [];
  //console.log(selectedIndex)

  switch (refractive) {
    case "0": {
      for (const date of subArray) {
        output.push(isLeft ? dataArr[date].L_Myopia : dataArr[date].R_Myopia);
        //console.log("@RecordsScreen: ", dataArr);
      }
      break;
    }

    case "1": {
      for (const date of subArray) {
        output.push(
          isLeft ? dataArr[date].L_Hyperopia : dataArr[date].R_Hyperopia
        );
      }
      break;
    }
    case "2": {
      for (const date of subArray) {
        output.push(isLeft ? dataArr[date].L_CYL : dataArr[date].R_CYL);
      }
      break;
    }
    case "3": {
      return null; //VA no need generate line chart
    }
  }

  if (output.length > 0) {
    return (
      <LineChart
        data={output}
        dateArr={subArray}
        full_dateArr={dateArr}
        selectedIndex={selectedIndex}
        refractive={refractive}
      />
    );
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
    paddingTop: 38,
    marginLeft: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },
  secondaryContainer: {
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
    backgroundColor: "white",
    overflow:'hidden',
    borderRadius:10,
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
    borderBottomWidth:1,
    borderBottomColor:"white",
    overflow:'hidden'
  },

  eyesButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: ScreenHeight / 40,
    //alignSelf: "center",
  },
  datesButton: {
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: 2,
  },
  dateText: {
    color: "#2D9CDB",
    fontSize: ScreenHeight / 35,
    paddingHorizontal: ScreenWidth / 70,
  },
  contentContainer: {
    alignSelf: "center",
    backgroundColor: "white",
    width: ScreenWidth / 1.25,
    borderRadius: 20,
    marginTop: ScreenHeight / 4 + 5,
    paddingBottom: ScreenHeight / 40,
  },
  content: {
    alignSelf: "center",
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
  },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    //justifyContent: "flex-start",
    paddingTop: ScreenHeight / 50,
    paddingLeft: 0,
    paddingRight: 0,
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
