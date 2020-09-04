import React, { Component, useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Animated, TouchableOpacity } from "react-native";

import { Formik } from "formik";
import moment from "moment";

import { database } from "../../config/config";
import { Button } from "react-native-elements";
import { ReviewSchema } from "../Professional/ProfAddRecordSchema";

import {
  DateSelect,
  RenderNormal,
  RenderCollapseAdj,
  RemarksInput,
  DiseasesInput,
  RenderCollapseVA,
  RenderCollapsePD,
  RenderCollapseCon,
  RenderCollapseFar,
  RenderCollapseMid,
  RenderCollapseNear,
} from "../../components/Professional/ProfRecordFormComponents";

import MenuScreen from "../../../Utils/MenuScreen";

export default class Form extends Component {
  yScroll = new Animated.Value(0);
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRightContainerStyle: {
        position: "absolute",
        transform: [{ translateY: this.yScroll.interpolate({ inputRange: [0, 80], outputRange: [0, -200], extrapolate: "clamp" }) }],
      },
      headerTitleStyle: {
        //position: 'absolute',
        transform: [{ translateY: this.yScroll.interpolate({ inputRange: [0, 80], outputRange: [0, -200], extrapolate: "clamp" }) }],
        fontSize: 28,
        color: "#E1EDFF",
        fontWeight: "700",
        overflow: "hidden",
      },
      headerLeftContainerStyle: {
        position: "absolute",
        transform: [{ translateY: this.yScroll.interpolate({ inputRange: [0, 80], outputRange: [0, -200], extrapolate: "clamp" }) }],
      },
    });
  }

  render() {
    const { isProfessional, professional_id, patient_id } = this.props.route.params; //noneed to consider "inactive"
    return (
      <MenuScreen>
        <ScrollView
          //keyboardShouldPersistTaps="always"
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.yScroll } } }])}
          scrollEventThrottle={1}
        >
          <Formik
            initialValues={{
              date: moment().format("YYYY-MM-DD HH:mm"),
              L_SPH: 0,
              L_symbol: false, //true: +, false: -
              R_SPH: 0,
              R_symbol: false,
              L_Myopia: 0,
              R_Myopia: 0,
              L_Hyperopia: 0,
              R_Hyperopia: 0,
              L_CYL: 0,
              R_CYL: 0,
              L_Axis: 0,
              R_Axis: 0,
              L_PRISM: 0,
              R_PRISM: 0,
              L_ADD: 0,
              R_ADD: 0,

              Adj_L_SPH: 0,
              Adj_R_SPH: 0,
              Adj_L_symbol: false,
              Adj_R_symbol: false,
              Adj_L_CYL: 0,
              Adj_R_CYL: 0,
              Adj_L_Axis: 0,
              Adj_R_Axis: 0,
              Adj_L_PRISM: 0,
              Adj_R_PRISM: 0,
              Adj_L_ADD: 0,
              Adj_R_ADD: 0,

              Far_L_SPH: 0,
              Far_R_SPH: 0,
              Far_L_symbol: false,
              Far_R_symbol: false,
              Far_L_CYL: 0,
              Far_R_CYL: 0,
              Far_L_Axis: 0,
              Far_R_Axis: 0,
              Far_L_PRISM: 0,
              Far_R_PRISM: 0,
              Far_L_ADD: 0,
              Far_R_ADD: 0,

              Mid_L_SPH: 0,
              Mid_R_SPH: 0,
              Mid_L_symbol: false,
              Mid_R_symbol: false,
              Mid_L_CYL: 0,
              Mid_R_CYL: 0,
              Mid_L_Axis: 0,
              Mid_R_Axis: 0,
              Mid_L_PRISM: 0,
              Mid_R_PRISM: 0,
              Mid_L_ADD: 0,
              Mid_R_ADD: 0,
              Mid_dist: 0,

              Near_L_SPH: 0,
              Near_R_SPH: 0,
              Near_L_symbol: false,
              Near_R_symbol: false,
              Near_L_CYL: 0,
              Near_R_CYL: 0,
              Near_L_Axis: 0,
              Near_R_Axis: 0,
              Near_L_PRISM: 0,
              Near_R_PRISM: 0,
              Near_L_ADD: 0,
              Near_R_ADD: 0,
              Near_dist: 0,

              Con_L_SPH: 0,
              Con_R_SPH: 0,
              Con_L_symbol: false,
              Con_R_symbol: false,
              Con_L_CYL: 0,
              Con_R_CYL: 0,
              Con_L_Axis: 0,
              Con_R_Axis: 0,
              Con_L_BC: 0,
              Con_R_BC: 0,
              Con_L_Dia: 0,
              Con_R_Dia: 0,
              Con_expiry_date: moment().format("YYYY-MM-DD"),
              Con_brand: "",

              L_VA: "20/20",
              R_VA: "20/20",
              VA: "20/20",

              L_PD: 0,
              R_PD: 0,
              remarks: "",
              disease: [],
            }}
            validationSchema={ReviewSchema}
            onSubmit={(values) => {
              var exist = false;
              database.ref("users/" + patient_id + "/records/" + values.date).once("value", (snap) => {
                exist = snap.val() !== null;
              });

              let data = {
                L_Myopia: 0,
                R_Myopia: 0,
                L_Hyperopia: 0,
                R_Hyperopia: 0,
                L_CYL: parseInt(values.L_CYL),
                R_CYL: parseInt(values.R_CYL),
                L_Axis: values.L_Axis,
                R_Axis: values.R_Axis,
                L_PRISM: values.L_PRISM,
                R_PRISM: values.R_PRISM,
                L_ADD: values.L_ADD,
                R_ADD: values.R_ADD,

                Adj_L_Myopia: 0,
                Adj_R_Myopia: 0,
                Adj_L_Hyperopia: 0,
                Adj_R_Hyperopia: 0,
                Adj_L_CYL: parseInt(values.Adj_L_CYL),
                Adj_R_CYL: parseInt(values.Adj_R_CYL),
                Adj_L_Axis: values.Adj_L_Axis,
                Adj_R_Axis: values.Adj_R_Axis,
                Adj_L_PRISM: values.Adj_L_PRISM,
                Adj_R_PRISM: values.Adj_R_PRISM,
                Adj_L_ADD: values.Adj_L_ADD,
                Adj_R_ADD: values.Adj_R_ADD,

                Far_L_Myopia: 0,
                Far_R_Myopia: 0,
                Far_L_Hyperopia: 0,
                Far_R_Hyperopia: 0,
                Far_L_CYL: parseInt(values.Far_L_CYL),
                Far_R_CYL: parseInt(values.Far_R_CYL),
                Far_L_Axis: values.Far_L_Axis,
                Far_R_Axis: values.Far_R_Axis,
                Far_L_PRISM: values.Far_L_PRISM,
                Far_R_PRISM: values.Far_R_PRISM,
                Far_L_ADD: values.Far_L_ADD,
                Far_R_ADD: values.Far_R_ADD,

                Mid_L_Myopia: 0,
                Mid_R_Myopia: 0,
                Mid_L_Hyperopia: 0,
                Mid_R_Hyperopia: 0,
                Mid_L_CYL: parseInt(values.Mid_L_CYL),
                Mid_R_CYL: parseInt(values.Mid_R_CYL),
                Mid_L_Axis: values.Mid_L_Axis,
                Mid_R_Axis: values.Mid_R_Axis,
                Mid_L_PRISM: values.Mid_L_PRISM,
                Mid_R_PRISM: values.Mid_R_PRISM,
                Mid_L_ADD: values.Mid_L_ADD,
                Mid_R_ADD: values.Mid_R_ADD,
                Mid_dist: values.Mid_dist,

                Near_L_Myopia: 0,
                Near_R_Myopia: 0,
                Near_L_Hyperopia: 0,
                Near_R_Hyperopia: 0,
                Near_L_CYL: parseInt(values.Near_L_CYL),
                Near_R_CYL: parseInt(values.Near_R_CYL),
                Near_L_Axis: values.Near_L_Axis,
                Near_R_Axis: values.Near_R_Axis,
                Near_L_PRISM: values.Near_L_PRISM,
                Near_R_PRISM: values.Near_R_PRISM,
                Near_L_ADD: values.Near_L_ADD,
                Near_R_ADD: values.Near_R_ADD,
                Near_dist: values.Near_dist,

                Con_L_Myopia: 0,
                Con_R_Myopia: 0,
                Con_L_Hyperopia: 0,
                Con_R_Hyperopia: 0,
                Con_L_CYL: parseInt(values.Con_L_CYL),
                Con_R_CYL: parseInt(values.Con_R_CYL),
                Con_L_Axis: values.Con_L_Axis,
                Con_R_Axis: values.Con_R_Axis,
                Con_L_BC: values.Con_L_BC,
                Con_R_BC: values.Con_R_BC,
                Con_L_Dia: values.Con_L_Dia,
                Con_R_Dia: values.Con_R_Dia,
                Con_expiry_date: values.Con_expiry_date,
                Con_brand: values.Con_brand,

                L_VA: values.L_VA,
                R_VA: values.R_VA,
                VA: values.VA,

                L_PD: values.L_PD,
                R_PD: values.R_PD,
                remarks: values.remarks,
                disease: values.disease,
              };

              //true: plus: hyper
              if (values.L_symbol) data.L_Hyperopia = parseInt(values.L_SPH);
              else data.L_Myopia = parseInt(values.L_SPH);
              if (values.R_symbol) data.R_Hyperopia = parseInt(values.R_SPH);
              else data.R_Myopia = parseInt(values.R_SPH);
              if (values.L_CYL == 0) data.L_Axis = 0;
              if (values.R_CYL == 0) data.R_Axis = 0;

              if (values.Adj_L_symbol) data.Adj_L_Hyperopia = parseInt(values.Adj_L_SPH);
              else data.Adj_L_Myopia = parseInt(values.Adj_L_SPH);
              if (values.Adj_R_symbol) data.Adj_R_Hyperopia = parseInt(values.Adj_R_SPH);
              else data.Adj_R_Myopia = parseInt(values.Adj_R_SPH);
              if (values.Adj_L_CYL == 0) data.Adj_L_Axis = 0;
              if (values.Adj_R_CYL == 0) data.Adj_R_Axis = 0;

              if (values.Con_L_symbol) data.Con_L_Hyperopia = parseInt(values.Con_L_SPH);
              else data.Con_L_Myopia = parseInt(values.Con_L_SPH);
              if (values.Con_R_symbol) data.Con_R_Hyperopia = parseInt(values.Con_R_SPH);
              else data.Con_R_Myopia = parseInt(values.Con_R_SPH);
              if (values.Con_L_CYL == 0) data.Con_L_Axis = 0;
              if (values.Con_R_CYL == 0) data.Con_R_Axis = 0;

              if (values.Far_L_symbol) data.Far_L_Hyperopia = parseInt(values.Far_L_SPH);
              else data.Far_L_Myopia = parseInt(values.Far_L_SPH);
              if (values.Far_R_symbol) data.Far_R_Hyperopia = parseInt(values.Far_R_SPH);
              else data.Far_R_Myopia = parseInt(values.Far_R_SPH);
              if (values.Far_L_CYL == 0) data.Far_L_Axis = 0;
              if (values.Far_R_CYL == 0) data.Far_R_Axis = 0;

              if (values.Mid_L_symbol) data.Mid_L_Hyperopia = parseInt(values.Mid_L_SPH);
              else data.Mid_L_Myopia = parseInt(values.Mid_L_SPH);
              if (values.Mid_R_symbol) data.Mid_R_Hyperopia = parseInt(values.Mid_R_SPH);
              else data.Mid_R_Myopia = parseInt(values.Mid_R_SPH);
              if (values.Mid_L_CYL == 0) data.Mid_L_Axis = 0;
              if (values.Mid_R_CYL == 0) data.Mid_R_Axis = 0;

              if (values.Near_L_symbol) data.Near_L_Hyperopia = parseInt(values.Near_L_SPH);
              else data.Near_L_Myopia = parseInt(values.Near_L_SPH);
              if (values.Near_R_symbol) data.Near_R_Hyperopia = parseInt(values.Near_R_SPH);
              else data.Near_R_Myopia = parseInt(values.Near_R_SPH);
              if (values.Near_L_CYL == 0) data.Near_L_Axis = 0;
              if (values.Near_R_CYL == 0) data.Near_R_Axis = 0;

              if (isProfessional) {
                database
                  .ref("users/" + patient_id)
                  .once("value")
                  .then(function (snapshot) {
                    return snapshot.val()["uid"];
                  })
                  .then((uid) => {
                    database
                      .ref("users/" + uid + "/records/" + values.date)
                      .set(data)
                      .catch((error) => console.log(error));
                    this.props.navigation.goBack();
                  });
              } else {
                //not professional user
                if (!exist) {
                  //no existed record
                  database.ref("users/" + patient_id + "/records/" + values.date).set(data, (err) => console.log(err));
                  this.props.navigation.goBack();
                } else {
                  Alert.alert(
                    "注意！",
                    "數據庫已存在" + values.date + "的資料，再按提交將會覆蓋舊的資料。",
                    [
                      { text: "取消", style: "cancel" },
                      {
                        text: "提交",
                        onPress: () => {
                          database.ref("users/" + patient_id + "/records/" + values.date).set(data, (error) => console.log(error));
                          this.props.navigation.goBack();
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                }
              }
            }}
          >
            {({ handleSubmit, values, setFieldValue, handleChange, errors }) => (
              <View style={AddRecordScreen.formContainer}>
                <DateSelect values={values.date} setFieldValue={setFieldValue} />

                <RenderNormal
                  setFieldValue={setFieldValue}
                  error_L_SPH={errors.L_SPH}
                  error_R_SPH={errors.R_SPH}
                  error_L_CYL={errors.L_CYL}
                  error_R_CYL={errors.R_CYL}
                  error_L_Axis={errors.L_Axis}
                  error_R_Axis={errors.R_Axis}
                  error_L_PRISM={errors.L_PRISM}
                  error_R_PRISM={errors.R_PRISM}
                />

                <RenderCollapseAdj
                  setFieldValue={setFieldValue}
                  error_L_SPH={errors.Adj_L_SPH}
                  error_R_SPH={errors.Adj_R_SPH}
                  error_L_CYL={errors.Adj_L_CYL}
                  error_R_CYL={errors.Adj_R_CYL}
                  error_L_Axis={errors.Adj_L_Axis}
                  error_R_Axis={errors.Adj_R_Axis}
                  error_L_PRISM={errors.Adj_L_PRISM}
                  error_R_PRISM={errors.Adj_R_PRISM}
                />

                <RenderCollapseVA setFieldValue={setFieldValue} error_L_VA={errors.L_VA} error_R_VA={errors.R_VA} />
                <RenderCollapsePD handleChange={handleChange} error_L_PD={errors.L_PD} error_R_PD={errors.R_PD} />

                <RenderCollapseCon
                  handleChange={handleChange}
                  values={values.Con_expiry_date}
                  setFieldValue={setFieldValue}
                  error_L_SPH={errors.Con_L_SPH}
                  error_R_SPH={errors.Con_R_SPH}
                  error_L_CYL={errors.Con_L_CYL}
                  error_R_CYL={errors.Con_R_CYL}
                  error_L_Axis={errors.Con_L_Axis}
                  error_R_Axis={errors.Con_R_Axis}
                />

                <RenderCollapseFar
                  setFieldValue={setFieldValue}
                  error_L_SPH={errors.Far_L_SPH}
                  error_R_SPH={errors.Far_R_SPH}
                  error_L_CYL={errors.Far_L_CYL}
                  error_R_CYL={errors.Far_R_CYL}
                  error_L_Axis={errors.Far_L_Axis}
                  error_R_Axis={errors.Far_R_Axis}
                  error_L_PRISM={errors.Far_L_PRISM}
                  error_R_PRISM={errors.Far_R_PRISM}
                />

                <RenderCollapseMid
                  setFieldValue={setFieldValue}
                  error_L_SPH={errors.Mid_L_SPH}
                  error_R_SPH={errors.Mid_R_SPH}
                  error_L_CYL={errors.Mid_L_CYL}
                  error_R_CYL={errors.Mid_R_CYL}
                  error_L_Axis={errors.Mid_L_Axis}
                  error_R_Axis={errors.Mid_R_Axis}
                  error_L_PRISM={errors.Mid_L_PRISM}
                  error_R_PRISM={errors.Mid_R_PRISM}
                />

                <RenderCollapseNear
                  setFieldValue={setFieldValue}
                  error_L_SPH={errors.Near_L_SPH}
                  error_R_SPH={errors.Near_R_SPH}
                  error_L_CYL={errors.Near_L_CYL}
                  error_R_CYL={errors.Near_R_CYL}
                  error_L_Axis={errors.Near_L_Axis}
                  error_R_Axis={errors.Near_R_Axis}
                  error_L_PRISM={errors.Near_L_PRISM}
                  error_R_PRISM={errors.Near_R_PRISM}
                />

                <RemarksInput handleChange={handleChange} />
                {isProfessional && <DiseasesInput setFieldValue={setFieldValue} />}

                <View style={{ paddingTop: 24 }}>
                  <Button
                    title="提交"
                    buttonStyle={AddRecordScreen.submitButton}
                    titleStyle={{ color: "#3CA1B7", fontSize: 18 }}
                    containerStyle={{
                      alignItems: "center",
                      paddingBottom: 10,
                      marginBottom: 200,
                    }}
                    onPress={handleSubmit}
                    // disabled={
                    //   need
                    // }
                    TouchableComponent={TouchableOpacity}
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </MenuScreen>
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
