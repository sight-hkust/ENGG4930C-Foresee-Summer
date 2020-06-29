import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Slider,
  Alert,
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
import MultiSelect from "react-native-multiple-select";
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
    .max(3, "瞳孔距離(PD)超出合理範圍")
    .notRequired(),
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
            <View style={AddRecordScreen.selectModeMenu}>
              <TouchableOpacity onPress={() => this.setState({ mode: true })}>
                <Text
                  style={
                    mode
                      ? AddRecordScreen.selectedMode
                      : AddRecordScreen.unselectedMode
                  }
                >
                  簡易輸入
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
                  鍵盤輸入
                </Text>
              </TouchableOpacity>
            </View>

            <Formik
              initialValues={{
                date: moment().format("YYYY-MM-DD"),
                L_SPH: "0",
                Lsymbol: true, //true: +, false: -
                R_SPH: "0",
                Rsymbol: true,
                L_VA: "0",
                R_VA: "0",
                L_CYL: "0",
                R_CYL: "0",
                L_Axis: "0",
                R_Axis: "0",
                PD: "0",
                L_Myopia: "0",
                R_Myopia: "0",
                L_Hyperopia: "0",
                R_Hyperopia: "0",
                remarks: "",
                disease: [],
              }}
              validationSchema={ReviewSchema}
              onSubmit={(values) => {
                var exist = false;
                database
                  .ref("users/" + patient_id + "/records/" + values.date)
                  .once("value", (snap) => {
                    exist = snap.val() !== null;
                    //console.log(exist);
                  });

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
                  PD: values.PD,
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
                  database
                    .ref("userInfo/" + patient_id)
                    .once("value", (snap) => {
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
                    "數據庫已存在" +
                      values.date +
                      "的資料，再按提交將會覆蓋舊的資料。",
                    [
                      {
                        text: "取消",
                        style: "cancel",
                      },
                      {
                        text: "提交",
                        onPress: () => {
                          database
                            .ref(
                              "users/" + patient_id + "/records/" + values.date
                            )
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
              {({
                handleSubmit,
                values,
                setFieldValue,
                handleChange,
                errors,
              }) => (
                <View style={AddRecordScreen.formContainer}>
                  <DateSelect values={values} setFieldValue={setFieldValue} />

                  <SPHInput
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    isLeft={false}
                    error={errors.L_SPH}
                    mode={mode}
                  />
                  <SPHInput
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    isLeft={true}
                    error={errors.R_SPH}
                    mode={mode}
                  />

                  <CYLInput
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    isLeft={false}
                    errorA={errors.L_CYL}
                    errorB={errors.L_Axis}
                    mode={mode}
                  />
                  <CYLInput
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    isLeft={true}
                    errorA={errors.R_CYL}
                    errorB={errors.R_Axis}
                    mode={mode}
                  />

                  <VAInput
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    isLeft={false}
                    error={errors.L_VA}
                    mode={mode}
                  />
                  <VAInput
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    isLeft={true}
                    error={errors.R_VA}
                    mode={mode}
                  />

                  <PDInput handleChange={handleChange} error={errors.PD} />
                  <RemarksInput handleChange={handleChange} />
                  {isProfessional && (
                    <DiseasesInput setFieldValue={setFieldValue} />
                  )}

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

        <Text style={AddRecordScreen.sliderText}>
          {symbol ? "+" : "−"}
          {sliderValue}
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
        <Text style={AddRecordScreen.sliderText}>−{sliderValue}</Text>
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
        <Text style={AddRecordScreen.sliderText}>{sliderValue}</Text>
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

export const VAInputB = (props) => {
  const { setFieldValue, isLeft } = props;
  const [sliderValue, setSliderValue] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)
      </Text>

      <View>
        <Text style={AddRecordScreen.sliderText}>{sliderValue / 10}</Text>
        <Slider
          style={{ width: 280, paddingTop: 30 }}
          minimumValue={0}
          maximumValue={10}
          step={1}
          thumbTintColor={"#47CDBD"}
          minimumTrackTintColor={"white"}
          maximumTrackTintColor={"#B8CAE4"}
          onValueChange={(value) => setSliderValue(value)}
          onSlidingComplete={(value) => {
            setFieldValue(isLeft ? "L_VA" : "R_VA", value / 10, false);
          }}
        />
      </View>
    </View>
  );
};

export const VAInput = (props) => {
  const { handleChange, setFieldValue, isLeft, error, mode } = props;
  if (mode) return <VAInputB setFieldValue={setFieldValue} isLeft={isLeft} />;
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

export const RemarksInput = (props) => {
  const { handleChange } = props;
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <Text style={AddRecordScreen.questionText}>備註</Text>

      <TextInput
        onChangeText={handleChange("remarks")}
        multiline={true}
        style={AddRecordScreen.remarksInputBox}
      />
    </View>
  );
};

export const DiseasesInput = (props) => {
  const { setFieldValue } = props;
  const [selectItems, setitems] = useState([]);
  const items = [
    { id: "弱視", name: "弱視" },
    { id: "斜視", name: "斜視" },
    { id: "青光眼", name: "青光眼" },
    { id: "色盲", name: "色盲" },
    { id: "色弱", name: "色弱" },
    { id: "高眼壓", name: "高眼壓" },
    { id: "角膜弓(老年)", name: "角膜弓(老年)" },
    { id: "角膜弓(青少年)", name: "角膜弓(青少年)" },
    { id: "眼乾症", name: "眼乾症" },
    { id: "淚溢", name: "淚溢" },
    { id: "白內障", name: "白內障" },
    { id: "虹膜炎", name: "虹膜炎 " },
    { id: "翼狀胬肉", name: "翼狀胬肉" },
    { id: "後囊膜", name: "後囊膜" },
    { id: "玻璃體", name: "玻璃體" },
    { id: "黃斑病", name: "黃斑病" },
    { id: "眼簾下垂", name: "眼簾下垂" },
    { id: "瞼裂斑", name: "瞼裂斑" },
  ];
  const onSelectItemChange = (selectedItems) => {
    setitems(selectedItems);
    setFieldValue("disease", selectedItems);
    console.log(selectedItems);
  };

  return (
    <View>
      <Text style={[AddRecordScreen.questionText, { marginBottom: 5 }]}>
        確診眼疾
      </Text>
      <MultiSelect
        items={items}
        uniqueKey="id"
        onSelectedItemsChange={onSelectItemChange}
        selectedItems={selectItems}
        selectText="選擇確診眼疾"
        searchInputPlaceholderText="搜尋..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#FFF"
        styleDropdownMenu={{ width: 270 }}
        styleListContainer={{ width: 270 }}
        styleItemsContainer={{ width: 270 }}
        styleMainWrapper={{ width: 270 }}
        hideSubmitButton={false}
        hideDropdown={true}
        hideTags={true}
        submitButtonText="確定"
      />
    </View>
  );
};

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
  mustFill: {
    color: "#9AFF98",
    fontSize: 16,
    paddingTop: 13,
    paddingLeft: 35,
  },
  formContainer: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 0,
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
  remarksInputBox: {
    width: 270,
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
  sliderText: {
    color: "white",
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    backgroundColor: "#47CDBD",
    paddingHorizontal: 10,
    borderRadius: 6,
    paddingBottom: 2,
    marginTop: 5,
  },
});
