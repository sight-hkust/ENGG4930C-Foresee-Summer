import React, { Component, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Animated } from "react-native";

import { Formik } from "formik";
import moment from "moment";

import { database } from "../src/config/config";
import { SchemaRecords } from "../Screens/SchemaRecords";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements";

import { DateSelect, RenderNoraml, SPHInputB, CYLInputB, RenderCollapseAdj, RemarksInput, DiseasesInput, RenderCollapseVA, RenderCollapsePD } from "../Screens/RecordFormComponents";

export default class Form extends Component {
  yScroll = new Animated.Value(0);
  constructor(props) {
    super(props);
    this.state = { mode: true, selectedLabel: "" }; //true: slider mode ; false: input box mode
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRightContainerStyle: {
        position: "absolute",
        top: this.yScroll.interpolate({
          inputRange: [0, 80],
          outputRange: [0, -200],
          extrapolate: "clamp",
        }),
      },
      headerTitleStyle: {
        position: "absolute",
        top: this.yScroll.interpolate({
          inputRange: [0, 80],
          outputRange: [-20, -120],
          extrapolate: "clamp",
        }),
        fontSize: 31,
        color: "#E1EDFF",
        fontWeight: "700",
        overflow: "hidden",
      },
      headerLeftContainerStyle: {
        position: "absolute",
        top: this.yScroll.interpolate({
          inputRange: [0, 80],
          outputRange: [0, -200],
          extrapolate: "clamp",
        }),
      },
    });
  }

  render() {
    const mode = this.state.mode;
    const { isProfessional, professional_id, patient_id, refractive } = this.props.route.params;

    return (
      <View style={AddRecordScreen.background}>
        <LinearGradient
          colors={["#1872a7", "#5a74d1", "#a676ff"]}
          start={[0, 0.9]}
          end={[1, 0.1]}
          locations={[0, 0.5, 1]}
          style={{
            height: "100%",
          }}
        >
          <ScrollView
            keyboardShouldPersistTaps="always"
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.yScroll,
                  },
                },
              },
            ])}
            scrollEventThrottle={1}
          >
            <Formik
              initialValues={{
                date: moment().format("YYYY-MM-DD HH:mm"),
                L_SPH: "0",
                Lsymbol: true, //true: +, false: -
                R_SPH: "0",
                Rsymbol: true,
                L_Myopia: "0",
                R_Myopia: "0",
                L_Hyperopia: "0",
                R_Hyperopia: "0",

                L_CYL: "0",
                R_CYL: "0",
                L_Axis: "0",
                R_Axis: "0",

                Adj_L_SPH: "0",
                Adj_R_SPH: "0",
                Adj_Lsymbol: true,
                Adj_Rsymbol: true,
                Adj_L_CYL: "0",
                Adj_R_CYL: "0",
                Adj_L_Axis: "0",
                Adj_R_Axis: "0",

                L_VA: "20/20",
                R_VA: "20/20",

                L_PD: "0",
                R_PD: "0",
                remarks: "",
                disease: [],
              }}
              initialStatus={{
                L_SPH_errors: "",
                R_SPH_errors: "",
                Adj_L_SPH_errors: "",
                Adj_R_SPH_errors: "",

                L_CYL_errors: "",
                R_CYL_errors: "",
                Adj_L_CYL_errors: "",
                Adj_R_CYL_errors: "",
              }}
              //validationSchema={SchemaRecords}
              onSubmit={(values) => {
                var exist = false;
                database.ref("users/" + patient_id + "/records/" + values.date).once("value", (snap) => {
                  exist = snap.val() !== null;
                  //console.log(exist);
                });

                let data = {
                  L_Myopia: 0,
                  R_Myopia: 0,
                  L_Hyperopia: 0,
                  R_Hyperopia: 0,
                  //L_VA: parseFloat(values.L_VA),
                  //R_VA: parseFloat(values.R_VA),
                  L_VA: values.L_VA,
                  R_VA: values.R_VA,
                  L_CYL: parseInt(values.L_CYL),
                  R_CYL: parseInt(values.R_CYL),
                  L_Axis: values.L_Axis,
                  R_Axis: values.R_Axis,

                  Adj_L_Myopia: 0,
                  Adj_R_Myopia: 0,
                  Adj_L_Hyperopia: 0,
                  Adj_R_Hyperopia: 0,
                  Adj_L_CYL: parseInt(values.Adj_L_CYL),
                  Adj_R_CYL: parseInt(values.Adj_R_CYL),
                  Adj_L_Axis: values.Adj_L_Axis,
                  Adj_R_Axis: values.Adj_R_Axis,

                  L_PD: values.L_PD,
                  R_PD: values.R_PD,
                  remarks: values.remarks,
                  disease: values.disease,
                };

                if (values.Lsymbol) {
                  //true: plus: hyper
                  data.L_Hyperopia = parseInt(values.L_SPH);
                } else {
                  data.L_Myopia = parseInt(values.L_SPH);
                }
                if (values.Rsymbol) {
                  data.R_Hyperopia = parseInt(values.R_SPH);
                } else {
                  data.R_Myopia = parseInt(values.R_SPH);
                }
                if (values.L_CYL == 0) {
                  data.L_Axis = 0;
                }
                if (values.R_CYL == 0) {
                  data.R_Axis = 0;
                }

                if (values.Adj_Lsymbol) {
                  //true: plus: hyper
                  data.Adj_L_Hyperopia = parseInt(values.Adj_L_SPH);
                } else {
                  data.Adj_L_Myopia = parseInt(values.Adj_L_SPH);
                }
                if (values.Adj_Rsymbol) {
                  data.Adj_R_Hyperopia = parseInt(values.Adj_R_SPH);
                } else {
                  data.Adj_R_Myopia = parseInt(values.Adj_R_SPH);
                }
                if (values.Adj_L_CYL == 0) {
                  data.Adj_L_Axis = 0;
                }
                if (values.Adj_R_CYL == 0) {
                  data.Adj_R_Axis = 0;
                }

                if (isProfessional) {
                  //change, need to also add to users/patient_id/records, but what if the patient doesnt exist? will it automatically create one entry for the patient?
                  // database
                  //   .ref(
                  //     "professionals/" +
                  //     professional_id +
                  //     "/patients/" +
                  //     patient_id +
                  //     "/records/" +
                  //     values.date
                  //   )
                  //   .set(data)
                  //   .catch((error) => console.log(error));
                  var uid;
                  database.ref("userInfo/" + patient_id).once("value", (snap) => {
                    uid = snap.val().uid;
                  });

                  database
                    .ref("users/" + uid + "/records/" + values.date)
                    .set(data)
                    .catch((error) => console.log(error));
                  this.props.navigation.goBack();
                }
                if (!exist) {
                  //no existed record
                  database
                    .ref("users/" + patient_id + "/records/" + values.date)
                    .set(data)
                    .catch((error) => console.log(error));
                  this.props.navigation.goBack();
                } else {
                  Alert.alert(
                    "注意！",
                    "數據庫已存在" + values.date + "的資料，再按提交將會覆蓋舊的資料。",
                    [
                      {
                        text: "取消",
                        style: "cancel",
                      },
                      {
                        text: "提交",
                        onPress: () => {
                          database
                            .ref("users/" + patient_id + "/records/" + values.date)
                            .set(data)
                            .catch((error) => console.log(error));
                          this.props.navigation.navigate("RecordsScreen");
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                }
              }}
            >
              {({ handleSubmit, values, setFieldValue, handleChange, setStatus, status }) => (
                <View style={AddRecordScreen.formContainer}>
                  <DateSelect values={values} setFieldValue={setFieldValue} />

                  <RenderNoraml handleChange={handleChange} setFieldValue={setFieldValue} refractive={refractive} setStatus={setStatus} status={status} />

                  <RenderCollapseAdj handleChange={handleChange} setFieldValue={setFieldValue} refractive={refractive} setStatus={setStatus} status={status} />
                  <RenderCollapseVA setFieldValue={setFieldValue} />
                  <RenderCollapsePD handleChange={handleChange} />

                  <RemarksInput handleChange={handleChange} />
                  {isProfessional && <DiseasesInput setFieldValue={setFieldValue} />}

                  <View style={{ paddingTop: 24 }}>
                    <Button
                      title="提交"
                      buttonStyle={AddRecordScreen.submitButton}
                      titleStyle={{ color: "#3CA1B7", fontSize: 18 }}
                      containerStyle={{
                        alignItems: "center",
                        paddingBottom: 30,
                      }}
                      onPress={handleSubmit}
                      disabled={
                        status.L_SPH_errors == "error" ||
                        status.R_SPH_errors == "error" ||
                        status.Adj_L_SPH_errors == "error" ||
                        status.Adj_R_SPH_errors == "error" ||
                        status.L_SPH_errors == "empty" ||
                        status.R_SPH_errors == "empty" ||
                        status.Adj_L_SPH_errors == "empty" ||
                        status.Adj_R_SPH_errors == "empty"
                      }
                    />
                    {console.log("@AddRecordScreen submit button errors", status)}
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const AddRecordScreen = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: "white",
  },
  selectModeMenu: {
    paddingTop: 100,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectedMode: {
    fontSize: 18,
    color: "#3CA1B7",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  unselectedMode: {
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
  formContainer: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 100,
  },
  submitButton: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 120,
  },
});
