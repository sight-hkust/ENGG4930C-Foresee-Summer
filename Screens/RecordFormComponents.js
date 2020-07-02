import React, { Component, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Slider, Alert, Animated } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import Collapsible from "react-native-collapsible";
import MultiSelect from "react-native-multiple-select";
const DropDown = require("../assets/images/DropDown.png");

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

    setFieldValue("date", moment(date).format("YYYY-MM-DD HH:mm"), false);
  };

  return (
    <View>
      <Text style={AddRecordScreen.questionText}>日期 時間</Text>

      <View>
        <TouchableOpacity onPress={showDatePicker} style={AddRecordScreen.answerContainer}>
          <View style={AddRecordScreen.dropDownButton}>
            <Image source={DropDown} />
          </View>
          <Text style={AddRecordScreen.answerText}>{moment(values.date).format("YYYY-MM-DD HH:mm")}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal isVisible={isDatePickerVisible} mode="datetime" onConfirm={handleConfirm} onCancel={hideDatePicker} date={moment(values.date).toDate()} maximumDate={new Date()} />
    </View>
  );
};

export const SPHInputB = (props) => {
  const { setFieldValue, isLeft, refractive, isAdj } = props;
  const [symbol, Togglesymbol] = useState(refractive != 0 ? true : false); //true = positive = hyperopia

  const [sliderValue, setSliderValue] = useState(0);

  const setToTrue = () => {
    Togglesymbol(true);
    if (isLeft) {
      setFieldValue(isAdj ? "Adj_Lsymbol" : "L_symbol", true, false);
    } else {
      setFieldValue(isAdj ? "Adj_Rsymbol" : "R_symbol", true, false);
    }
  };

  const setToFalse = () => {
    Togglesymbol(false);
    if (isLeft) {
      setFieldValue(isAdj ? "Adj_Lsymbol" : "L_symbol", false, false);
    } else {
      setFieldValue(isAdj ? "Adj_Rsymbol" : "R_symbol", false, false);
    }
  };

  const SliderHandler = (value) => {
    if (isAdj) {
      setFieldValue(isLeft ? "Adj_L_SPH" : "Adj_R_SPH", value, false);
      setFieldValue(isLeft ? "Adj_Lsymbol" : "Adj_Rsymbol", symbol, false);
    } else {
      setFieldValue(isLeft ? "L_SPH" : "R_SPH", value, false);
      setFieldValue(isLeft ? "Lsymbol" : "Rsymbol", symbol, false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}
        {isAdj ? "調整" : ""}球面度數(SPH)
      </Text>

      <View>
        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", marginRight: 20 }}
            onPress={() => {
              setToFalse();
            }}
          >
            <View style={!symbol ? AddRecordScreen.selectedRadioButton : AddRecordScreen.unselectedRadioButton} />
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>−</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              setToTrue();
            }}
          >
            <View style={symbol ? AddRecordScreen.selectedRadioButton : AddRecordScreen.unselectedRadioButton} />
            <Text style={{ fontSize: 20, color: "white", paddingRight: 10 }}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={AddRecordScreen.sliderText}>
          {symbol ? "+" : "−"}
          {sliderValue}
        </Text>

        <Slider
          style={{ width: 300, paddingTop: 30 }}
          minimumValue={0}
          maximumValue={700}
          step={25}
          thumbTintColor={"#47CDBD"}
          minimumTrackTintColor={"white"}
          maximumTrackTintColor={"#B8CAE4"}
          onValueChange={(value) => setSliderValue(value)}
          onSlidingComplete={(value) => SliderHandler(value)}
        />
      </View>
    </View>
  );
};

export const SPHInput = (props) => {
  const { handleChange, setFieldValue, isLeft, error, mode, refractive, isAdj } = props;

  if (mode) {
    return <SPHInputB handleChange={handleChange} setFieldValue={setFieldValue} isLeft={isLeft} refractive={refractive} isAdj={isAdj} />;
  }

  const [symbol, Togglesymbol] = useState(refractive == "0" ? false : true); //true = positive = hyperopia
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
      <Text style={AddRecordScreen.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}球面度數(SPH) (e.g. 125)</Text>
      {error != undefined && <Text style={AddRecordScreen.errortext}>{error}</Text>}

      <View style={AddRecordScreen.answerContainer}>
        <TouchableOpacity style={AddRecordScreen.answerContainer} onPress={pressHandler}>
          <View style={AddRecordScreen.dropDownButton}>
            <Image source={DropDown} />
          </View>
          <Text style={AddRecordScreen.answerText}>{symbol ? "+" : "-"}</Text>
        </TouchableOpacity>
        <TextInput onChangeText={handleChange(isLeft ? "L_SPH" : "R_SPH")} keyboardType="numeric" style={AddRecordScreen.answerInputBox} />
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
      <Text style={AddRecordScreen.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}散光度數(CYL)</Text>

      <View>
        <Text style={AddRecordScreen.sliderText}>−{sliderValue}</Text>
        <Slider
          style={{ width: 300, paddingTop: 30 }}
          minimumValue={0}
          maximumValue={600}
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

      <View>{isable && <AxisInputB setFieldValue={setFieldValue} isLeft={isLeft} />}</View>
    </View>
  );
};

export const CYLInput = (props) => {
  const { handleChange, setFieldValue, isLeft, errorA, errorB, mode } = props;

  if (mode) {
    return <CYLInputB handleChange={handleChange} setFieldValue={setFieldValue} isLeft={isLeft} />;
  }

  const [isable, setIsable] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}散光度數(CYL) (e.g. 125)</Text>
      {errorA != undefined && <Text style={AddRecordScreen.errortext}>{errorA}</Text>}
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
      <View>{isable && <AxisInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={isLeft} error={errorB} />}</View>
    </View>
  );
};

export const AxisInputB = (props) => {
  const { setFieldValue, isLeft } = props;
  const [sliderValue, setSliderValue] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}散光軸度(Axis)</Text>

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
      <Text style={AddRecordScreen.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}散光軸度(Axis)</Text>
      {error != undefined && <Text style={AddRecordScreen.errortext}>{error}</Text>}
      <TextInput onChangeText={handleChange(isLeft ? "L_Axis" : "R_Axis")} keyboardType="numeric" style={AddRecordScreen.answerInputBox} />
    </View>
  );
};

export const VAInputB = (props) => {
  const { setFieldValue, isLeft } = props;
  const [mode, SetMode] = useState("A"); //A = 20/20, B=6/6, C = decimal

  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)</Text>

      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
        <TouchableOpacity
          style={{ flexDirection: "row", marginRight: 15 }}
          onPress={() => {
            SetMode("A");
          }}
        >
          <View style={mode == "A" ? AddRecordScreen.selectedRadioButton : AddRecordScreen.unselectedRadioButton} />
          <Text style={{ fontSize: 18, color: "white", paddingRight: 10 }}>20/20</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", marginRight: 15 }}
          onPress={() => {
            SetMode("B");
          }}
        >
          <View style={mode == "B" ? AddRecordScreen.selectedRadioButton : AddRecordScreen.unselectedRadioButton} />
          <Text style={{ fontSize: 18, color: "white", paddingRight: 10 }}>6/6</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            SetMode("C");
            setFieldValue(isLeft ? "L_VA" : "R_VA", "0", false);
          }}
        >
          <View style={mode == "C" ? AddRecordScreen.selectedRadioButton : AddRecordScreen.unselectedRadioButton} />
          <Text style={{ fontSize: 18, color: "white" }}>1.0</Text>
        </TouchableOpacity>
      </View>

      {mode == "A" ? (
        <VA20Slider setFieldValue={setFieldValue} isLeft={isLeft} />
      ) : mode == "B" ? (
        <VA6Slider setFieldValue={setFieldValue} isLeft={isLeft} />
      ) : (
        <VAdecimalSlider setFieldValue={setFieldValue} isLeft={isLeft} />
      )}
    </View>
  );
};

export const VA20Slider = (props) => {
  const { setFieldValue, isLeft } = props;
  const [sliderValue, setSliderValue] = useState(0);
  const VA20Arr = ["20/200", "20/100", "20/80", "20/60", "20/50", "20/40", "20/30", "20/25", "20/20"];
  return (
    <>
      <Text style={AddRecordScreen.sliderText}>{VA20Arr[sliderValue]}</Text>
      <Slider
        style={{ width: 300, paddingTop: 30 }}
        minimumValue={0}
        maximumValue={VA20Arr.length - 1}
        step={1}
        thumbTintColor={"#47CDBD"}
        minimumTrackTintColor={"white"}
        maximumTrackTintColor={"#B8CAE4"}
        onValueChange={(value) => setSliderValue(value)}
        onSlidingComplete={(value) => {
          setFieldValue(isLeft ? "L_VA" : "R_VA", VA20Arr[value].toString(), false);
        }}
      />
    </>
  );
};

export const VA6Slider = (props) => {
  const { setFieldValue, isLeft } = props;
  const [sliderValue, setSliderValue] = useState(0);
  const VA6Arr = ["6/60", "6/30", "6/24", "6/18", "6/15", "6/12", "6/9", "6/7.5", "6/6"];
  return (
    <>
      <Text style={AddRecordScreen.sliderText}>{VA6Arr[sliderValue]}</Text>
      <Slider
        style={{ width: 300, paddingTop: 30 }}
        minimumValue={0}
        maximumValue={VA6Arr.length - 1}
        step={1}
        thumbTintColor={"#47CDBD"}
        minimumTrackTintColor={"white"}
        maximumTrackTintColor={"#B8CAE4"}
        onValueChange={(value) => setSliderValue(value)}
        onSlidingComplete={(value) => {
          setFieldValue(isLeft ? "L_VA" : "R_VA", VA6Arr[value].toString(), false);
        }}
      />
    </>
  );
};

export const VAdecimalSlider = (props) => {
  const { setFieldValue, isLeft } = props;
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <>
      <Text style={AddRecordScreen.sliderText}>{(sliderValue / 10).toFixed(1)}</Text>
      <Slider
        style={{ width: 300, paddingTop: 30 }}
        minimumValue={0}
        maximumValue={12}
        step={1}
        thumbTintColor={"#47CDBD"}
        minimumTrackTintColor={"white"}
        maximumTrackTintColor={"#B8CAE4"}
        onValueChange={(value) => setSliderValue(value)}
        onSlidingComplete={(value) => {
          setFieldValue(isLeft ? "L_VA" : "R_VA", (value / 10).toFixed(2), false);
        }}
      />
    </>
  );
};

export const VAInput = (props) => {
  const { handleChange, setFieldValue, isLeft, error, mode } = props;
  if (mode) return <VAInputB setFieldValue={setFieldValue} isLeft={isLeft} />;
  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)(e.g. 1.0)</Text>
      {error != undefined && <Text style={AddRecordScreen.errortext}>{error}</Text>}
      <TextInput onChangeText={handleChange(isLeft ? "L_VA" : "R_VA")} keyboardType="numeric" style={AddRecordScreen.answerInputBox} />
    </View>
  );
};

export const PDInput = (props) => {
  const { handleChange, error, isLeft } = props;

  return (
    <View style={{ flex: 1 }}>
      <Text style={AddRecordScreen.questionText}>請輸入{isLeft ? "左眼" : "右眼"}瞳孔距離(Pupillary Distance)(mm)</Text>
      {error != undefined && <Text style={AddRecordScreen.errortext}>{error}</Text>}
      <TextInput onChangeText={handleChange(isLeft ? "L_PD" : "R_PD")} keyboardType="numeric" style={AddRecordScreen.answerInputBox} />
    </View>
  );
};

export const RemarksInput = (props) => {
  const { handleChange } = props;
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <Text style={AddRecordScreen.questionText}>備註</Text>

      <TextInput onChangeText={handleChange("remarks")} multiline={true} style={AddRecordScreen.remarksInputBox} />
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
  };

  return (
    <View>
      <Text style={[AddRecordScreen.questionText, { marginBottom: 5 }]}>確診眼疾</Text>
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
    backgroundColor: "white",
    color: "#1872a7",
    fontSize: 18,
    borderRadius: 5,
    marginRight: 15,
  },
  remarksInputBox: {
    width: 270,
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 2,
    paddingTop: 0,
    backgroundColor: "white",
    color: "#1872a7",
    fontSize: 18,
    borderRadius: 5,
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

  sliderText: {
    color: "white",
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    backgroundColor: "#47CDBD",
    paddingHorizontal: 10,
    borderRadius: 6,
    paddingBottom: 2,
    marginTop: 15,
  },
  selectedRadioButton: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: "white",
    backgroundColor: "#47CDBD",
    marginTop: 4,
    marginRight: 5,
  },
  unselectedRadioButton: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: "white",
    backgroundColor: "white",
    marginTop: 4,
    marginRight: 5,
  },
});
