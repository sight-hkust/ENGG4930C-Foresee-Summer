import React, { Component, useState } from "react";
import {
  StyleSheet,
  Keyboard,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Slider,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Formik } from "formik";
import moment from "moment";
import { TextInput } from "react-native-gesture-handler";
import { database } from "../src/config/config";
import { number, object, string } from "yup";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements";

import { RadioButton } from "react-native-paper"; //<--------temp

const Setting = require("../assets/images/setting.png");
const DropDown = require("../assets/images/DropDown.png");

const ReviewSchema = object({
  L_SPH: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test(
      "divisible by 25",
      "球面度數(SPH)應為0或以00, 25, 50或75作尾",
      (value) => value % 25 == 0
    ),
  R_SPH: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test(
      "divisible by 25",
      "球面度數(SPH)應為0或以00, 25, 50或75作尾",
      (value) => value % 25 == 0
    ),
  L_VA: number()
    .test(
      "range",
      "視力(Visual Acuity)應在 0 和 1 之間",
      (value) => value >= 0 || value <= 1 || value == null
    )
    .max(1.0, "視力(Visual Acuity)應在 0 和 1 之間"),
  R_VA: number()
    .test(
      "range",
      "視力(Visual Acuity)應在 0 和 1 之間",
      (value) => value >= 0 || value <= 1 || value == null
    )
    .max(1.0, "視力(Visual Acuity)應在 0 和 1 之間"),
  L_CYL: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test(
      "divisible by 25",
      "散光度數(CYL)應為0或以00, 25, 50或75作尾",
      (value) => value % 25 == 0
    ),
  R_CYL: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test(
      "divisible by 25",
      "散光度數(CYL)應為0或以00, 25, 50或75作尾",
      (value) => value % 25 == 0
    ),
  L_Axis: string().when("L_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test(
        "between 0 and 180",
        "散光軸度(Axis)應在 0 和 180 之間",
        (value) => value >= 0 && value <= 180
      )
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  R_Axis: string().when("L_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test(
        "between 0 and 180",
        "散光軸度(Axis)應在 0 和 180 之間",
        (value) => value >= 0 && value <= 180
      )
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  PD: string()
    .matches("^[0-9]*$", "請輸入大於0的整數")
    .max(3, "瞳孔距離(PD)超出合理範圍"),
});

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: true }; //true: slider mode ; false: input box mode
  }

  render() {
    const mode = this.state.mode;
    const {
      isProfessional,
      professional_id,
      patient_id,
    } = this.props.route.params;

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
          <ScrollView keyboardShouldPersistTaps="always">
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 10,
                paddingTop: 85,
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity onPress={() => this.setState({ mode: true })}>
                <Text
                  style={
                    mode
                      ? AddRecordScreen.selectedMode
                      : AddRecordScreen.unselectedMode
                  }
                >
                  Slider
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ mode: false })}>
                <Text
                  style={
                    !mode
                      ? AddRecordScreen.selectedMode
                      : AddRecordScreen.unselectedMode
                  }
                >
                  TextInputBox
                </Text>
              </TouchableOpacity>
            </View>

            <Formik
              initialValues={{
                date: moment().format("YYYY-MM-DD"),
                L_SPH: "",
                Lsymbol: true, //true: +, false: -
                R_SPH: "",
                Rsymbol: true,
                L_VA: "0",
                R_VA: "0",
                L_CYL: "",
                R_CYL: "",
                L_Axis: "",
                R_Axis: "",
                PD: "0",
                L_Myopia: "0",
                R_Myopia: "0",
                L_Hyperopia: "0",
                R_Hyperopia: "0",
              }}
              validationSchema={ReviewSchema}
              onSubmit={(values) => {
                let data = {
                  L_Myopia: 0,
                  R_Myopia: 0,
                  L_Hyperopia: 0,
                  R_Hyperopia: 0,
                  L_VA: parseFloat(values.L_VA),
                  R_VA: parseFloat(values.R_VA),
                  L_CYL: parseInt(values.L_CYL),
                  R_CYL: parseInt(values.R_CYL),
                  L_Axis: values.L_Axis,
                  R_Axis: values.R_Axis,
                  PD: parseInt(values.PD),
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
                if (isProfessional) {
                  database
                    .ref(
                      "professionals/" +
                        professional_id +
                        "/patients/" +
                        patient_id +
                        "/records/" +
                        values.date
                    )
                    .set(data)
                    .catch((error) => console.log(error));
                } else {
                  database
                    .ref("users/" + patient_id + "/records/" + values.date)
                    .set(data)
                    .catch((error) => console.log(error));
                  this.props.navigation.navigate("RecordsScreen");
                }
              }}
            >
              {({
                handleSubmit,
                values,
                setFieldValue,
                handleChange,
                errors,
              }) => (
                <View style={AddRecordScreen.formContainer}>
                  <DateSelect values={values} setFieldValue={setFieldValue} />
                  {console.log("L_symbol: ", values.Lsymbol)}

                  <SPHInput
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    isLeft={true}
                    error={errors.L_SPH}
                    mode={mode}
                  />
                  <SPHInput
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    isLeft={false}
                    error={errors.R_SPH}
                    mode={mode}
                  />

                  <CYLInput
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    isLeft={true}
                    errorA={errors.L_CYL}
                    errorB={errors.L_Axis}
                    mode={mode}
                  />
                  <CYLInput
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    isLeft={false}
                    errorA={errors.R_CYL}
                    errorB={errors.R_Axis}
                    mode={mode}
                  />

                  <VAInput
                    handleChange={handleChange}
                    isLeft={true}
                    error={errors.L_VA}
                  />
                  <VAInput
                    handleChange={handleChange}
                    isLeft={false}
                    error={errors.R_VA}
                  />

                  <PDInput handleChange={handleChange} error={errors.PD} />

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
                      disabled={Object.keys(errors).length > 0}
                    />
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

export const SPHInputB = (props) => {
  const { setFieldValue, isLeft } = props;
  const [symbol, Togglesymbol] = useState(true); //true = positive
  const [sliderValue, setSliderValue] = useState(0);

  const setToTrue = () => {
    Togglesymbol(true);
    if (isLeft) setFieldValue("Lsymbol", true, false);
    else setFieldValue("Rsymbol", true, false);
  };

  const setToFalse = () => {
    Togglesymbol(false);
    if (isLeft) setFieldValue("Lsymbol", false, false);
    else setFieldValue("Rsymbol", false, false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}球面度數(SPH)
      </Text>

      <View>
        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
          <View style={{ flexDirection: "row", marginRight: 15 }}>
            <Text style={{ fontSize: 20, color: "white" }}>+</Text>
            <RadioButton
              color="white"
              uncheckedColor="white"
              value="+"
              status={symbol == true ? "checked" : "unchecked"}
              onPress={setToTrue}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              −
            </Text>
            <RadioButton
              color="white"
              uncheckedColor="white"
              value="-"
              status={symbol == false ? "checked" : "unchecked"}
              onPress={setToFalse}
            />
          </View>
        </View>

        <Text
          style={{
            color: "white",
            fontSize: 18,
            alignSelf: "center",
            fontWeight: "bold",
            backgroundColor: "#47CDBD",
            paddingHorizontal: 10,
            borderRadius: 6,
            paddingBottom: 2,
          }}
        >
          {symbol ? "+" : "−"} {sliderValue}
        </Text>

        <Slider
          style={{ width: 300, paddingTop: 30 }}
          minimumValue={0}
          maximumValue={500}
          step={25}
          thumbTintColor={"#47CDBD"}
          minimumTrackTintColor={"white"}
          maximumTrackTintColor={"#B8CAE4"}
          onValueChange={(value) => setSliderValue(value)}
          onSlidingComplete={(value) =>
            setFieldValue(isLeft ? "L_SPH" : "R_SPH", value, false)
          }
        />
      </View>
    </View>
  );
};

export const DateSelect = (props) => {
  const { values, setFieldValue } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setFieldValue("date", moment(date).format("YYYY-MM-DD"), false);
  };

  return (
    <View>
      <Text style={AddRecordScreen.questionText}>日期</Text>

      <View>
        <TouchableOpacity
          onPress={showDatePicker}
          style={AddRecordScreen.answerContainer}
        >
          <View style={AddRecordScreen.dropDownButton}>
            <Image source={DropDown} />
          </View>
          <Text style={AddRecordScreen.answerText}>
            {moment(values.date).format("YYYY-MM-DD")}
          </Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={moment(values.date).toDate()}
        maximumDate={new Date()}
      />
    </View>
  );
};

export const SPHInput = (props) => {
  const { handleChange, setFieldValue, isLeft, error, mode } = props;

  if (mode) {
    return (
      <SPHInputB
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        isLeft={isLeft}
      />
    );
  }

  const [symbol, Togglesymbol] = useState(true); //true = positive
  const pressHandler = () => {
    Togglesymbol(!symbol);
    if (isLeft) {
      setFieldValue("Lsymbol", !symbol, false);
    } else {
      setFieldValue("Rsymbol", !symbol, false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}球面度數(SPH) (e.g. 125)
      </Text>
      {error != undefined && (
        <Text style={AddRecordScreen.errortext}>{error}</Text>
      )}

      <View style={AddRecordScreen.answerContainer}>
        <TouchableOpacity
          style={AddRecordScreen.answerContainer}
          onPress={pressHandler}
        >
          <View style={AddRecordScreen.dropDownButton}>
            <Image source={DropDown} />
          </View>
          <Text style={AddRecordScreen.answerText}>{symbol ? "+" : "-"}</Text>
        </TouchableOpacity>
        <TextInput
          onChangeText={handleChange(isLeft ? "L_SPH" : "R_SPH")}
          keyboardType="numeric"
          style={AddRecordScreen.answerInputBox}
        />
      </View>
    </View>
  );
};

export const CYLInputB = (props) => {
  const { setFieldValue, isLeft } = props;

  const [isable, setIsable] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}散光度數(CYL)
      </Text>

      <View>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            alignSelf: "center",
            fontWeight: "bold",
            backgroundColor: "#47CDBD",
            paddingHorizontal: 10,
            borderRadius: 6,
            paddingBottom: 2,
          }}
        >
          −{sliderValue}
        </Text>
        <Slider
          style={{ width: 300, paddingTop: 30 }}
          minimumValue={0}
          maximumValue={500}
          step={25}
          thumbTintColor={"#47CDBD"}
          minimumTrackTintColor={"white"}
          maximumTrackTintColor={"#B8CAE4"}
          onValueChange={(value) => setSliderValue(value)}
          onSlidingComplete={(value) => {
            setFieldValue(isLeft ? "L_CYL" : "R_CYL", value, false);
            if (value > 0) {
              setIsable(true);
            } else {
              setIsable(false);
            }
          }}
        />
      </View>

      <View>
        {isable && <AxisInputB setFieldValue={setFieldValue} isLeft={isLeft} />}
      </View>
    </View>
  );
};

export const CYLInput = (props) => {
  const { handleChange, setFieldValue, isLeft, errorA, errorB, mode } = props;

  if (mode) {
    return (
      <CYLInputB
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        isLeft={isLeft}
      />
    );
  }

  const [isable, setIsable] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}散光度數(CYL) (e.g. 125)
      </Text>
      {errorA != undefined && (
        <Text style={AddRecordScreen.errortext}>{errorA}</Text>
      )}
      <View style={AddRecordScreen.answerContainer}>
        <Text style={AddRecordScreen.answerText}>−</Text>

        <TextInput
          onChangeText={(text) => {
            if (isLeft) {
              setFieldValue("L_CYL", text);
              if (text > 0) {
                setIsable(true);
              } else {
                setIsable(false);
              }
            } else {
              setFieldValue("R_CYL", text);
              if (text > 0) {
                setIsable(true);
              } else {
                setIsable(false);
              }
            }
          }}
          keyboardType="numeric"
          style={AddRecordScreen.answerInputBox}
        />
      </View>
      <View>
        {isable && (
          <AxisInput
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            isLeft={isLeft}
            error={errorB}
          />
        )}
      </View>
    </View>
  );
};

export const AxisInputB = (props) => {
  const { setFieldValue, isLeft } = props;
  const [sliderValue, setSliderValue] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}散光軸度(Axis)
      </Text>

      <View>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            alignSelf: "center",
            fontWeight: "bold",
            backgroundColor: "#47CDBD",
            paddingHorizontal: 10,
            borderRadius: 6,
            paddingBottom: 2,
          }}
        >
          {sliderValue}
        </Text>
        <Slider
          style={{ width: 300, paddingTop: 30 }}
          minimumValue={0}
          maximumValue={180}
          step={1}
          thumbTintColor={"#47CDBD"}
          minimumTrackTintColor={"white"}
          maximumTrackTintColor={"#B8CAE4"}
          onValueChange={(value) => setSliderValue(value)}
          onSlidingComplete={(value) => {
            setFieldValue(isLeft ? "L_Axis" : "R_Axis", value, false);
          }}
        />
      </View>
    </View>
  );
};

export const AxisInput = (props) => {
  const { handleChange, setFieldValue, isLeft, error, mode } = props;
  if (mode) {
    return <AxisInputB setFieldValue={setFieldValue} isLeft={isLeft} />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}散光軸度(Axis)
      </Text>
      {error != undefined && (
        <Text style={AddRecordScreen.errortext}>{error}</Text>
      )}
      <TextInput
        onChangeText={handleChange(isLeft ? "L_Axis" : "R_Axis")}
        keyboardType="numeric"
        style={AddRecordScreen.answerInputBox}
      />
    </View>
  );
};

export const VAInput = (props) => {
  const { handleChange, isLeft, error } = props;
  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)(e.g. 1.0)
      </Text>
      {error != undefined && (
        <Text style={AddRecordScreen.errortext}>{error}</Text>
      )}
      <TextInput
        onChangeText={handleChange(isLeft ? "L_VA" : "R_VA")}
        keyboardType="numeric"
        style={AddRecordScreen.answerInputBox}
      />
    </View>
  );
};

export const PDInput = (props) => {
  const { handleChange, error } = props;

  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>
        請輸入兩眼瞳孔距離(Pupillary Distance)(mm)
      </Text>
      {error != undefined && (
        <Text style={AddRecordScreen.errortext}>{error}</Text>
      )}
      <TextInput
        onChangeText={handleChange("PD")}
        keyboardType="numeric"
        style={AddRecordScreen.answerInputBox}
      />
    </View>
  );
};

const AddRecordScreen = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: "white",
  },
  selectedMode: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  unselectedMode: {
    color: "#B8CAE4",
    fontSize: 18,
    fontWeight: "normal",
  },
  header: {
    paddingTop: 25,
    marginRight: 18,
    marginLeft: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "600",
  },
  formContainer: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 5,
  },
  questionText: {
    color: "white",
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 5,
  },
  answerContainer: {
    flexDirection: "row",
  },
  answerText: {
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 2,
    color: "white",
    fontSize: 17,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: "white",
    marginRight: 15,
    fontWeight: "bold",
  },
  answerInputBox: {
    width: 70,
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 2,
    paddingTop: 0,
    color: "white",
    fontSize: 18,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: "white",
    marginRight: 15,
  },
  dropDownButton: {
    paddingTop: 10,
    paddingLeft: 5,
    marginRight: 15,
  },

  errortext: {
    fontSize: 14,
    color: "#9AFF98",
    paddingBottom: 5,
  },
  submitButton: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 120,
  },
});
