import React, { Component, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Slider, Alert, Animated } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { TextInput } from "react-native-gesture-handler";
import Collapsible from "react-native-collapsible";
import MultiSelect from "react-native-multiple-select";
const DropDown = require("../assets/images/DropDown.png");
import { ListItem, Input, Overlay, Icon, Button } from "react-native-elements";
import { ScreenWidth } from "../constant/Constant";
import { setMode } from "react-native-sound";
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
      <Text style={FormItemStyle.questionText}>日期 時間</Text>

      <View>
        <TouchableOpacity onPress={showDatePicker} style={FormItemStyle.answerContainer}>
          <View style={FormItemStyle.dropDownButton}>
            <Image source={DropDown} />
          </View>
          <Text style={FormItemStyle.answerText}>{moment(values.date).format("YYYY-MM-DD HH:mm")}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal isVisible={isDatePickerVisible} mode="datetime" onConfirm={handleConfirm} onCancel={hideDatePicker} date={moment(values.date).toDate()} maximumDate={new Date()} />
    </View>
  );
};

export const RenderCollapseAdj = (props) => {
  const { handleChange, setFieldValue, error, mode, refractive, isAdj } = props;
  const [isCollapse, toggleisCollapse] = useState(true);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          toggleisCollapse(!isCollapse);
        }}
        style={FormItemStyle.collapseButton}
      >
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入調整度數</Text>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={false} error={error} mode={mode} refractive={refractive} isAdj={isAdj} />
          <CYLInputB handleChange={handleChange} setFieldValue={setFieldValue} isLeft={false} isAdj={isAdj} />

          <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={true} error={error} mode={mode} refractive={refractive} isAdj={isAdj} />
          <CYLInputB handleChange={handleChange} setFieldValue={setFieldValue} isLeft={true} isAdj={isAdj} />
        </View>
      </Collapsible>
    </View>
  );
};

export const RenderCollapsePD = (props) => {
  const { handleChange, error } = props;
  const [isCollapse, toggleisCollapse] = useState(true);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          toggleisCollapse(!isCollapse);
        }}
        style={FormItemStyle.collapseButton}
      >
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入瞳孔距離</Text>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <PDInput handleChange={handleChange} error={error} isLeft={false} />
          <PDInput handleChange={handleChange} error={error} isLeft={true} />
        </View>
      </Collapsible>
    </View>
  );
};

export const RenderCollapseVA = (props) => {
  const { handleChange, setFieldValue, error, mode } = props;
  const [isCollapse, toggleisCollapse] = useState(true);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          toggleisCollapse(!isCollapse);
        }}
        style={FormItemStyle.collapseButton}
      >
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入視力(VA)</Text>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <VAInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={false} error={error} mode={mode} />
          <VAInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={true} error={error} mode={mode} />
        </View>
      </Collapsible>
    </View>
  );
};

export const SPHInputB = (props) => {
  const { setFieldValue, isLeft, refractive, isAdj } = props;
  const [sliderValue, setSliderValue] = useState(0);
  const [symbol, Togglesymbol] = useState(refractive != 0 ? true : false); //true = positive = hyperopia

  const SliderHandler = () => {
    if (isAdj) {
      console.log("symbol", symbol);
      setFieldValue(isLeft ? "Adj_L_SPH" : "Adj_R_SPH", sliderValue, false);
      setFieldValue(isLeft ? "Adj_Lsymbol" : "Adj_Rsymbol", symbol, false);
    } else {
      setFieldValue(isLeft ? "L_SPH" : "R_SPH", sliderValue, false);
      setFieldValue(isLeft ? "Lsymbol" : "Rsymbol", symbol, false);
    }
  };

  return (
    <View>
      <Text style={FormItemStyle.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}
        {isAdj ? "調整" : ""}球面度數(SPH)
      </Text>
      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
        <TouchableOpacity
          style={{ flexDirection: "row", marginRight: 20 }}
          onPress={() => {
            Togglesymbol(false);
            if (isLeft) {
              setFieldValue(isAdj ? "Adj_Lsymbol" : "L_symbol", false, false);
            } else {
              setFieldValue(isAdj ? "Adj_Rsymbol" : "R_symbol", false, false);
            }
          }}
        >
          <View style={!symbol ? FormItemStyle.selectedRadioButton : FormItemStyle.unselectedRadioButton} />
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            Togglesymbol(true);
            if (isLeft) {
              setFieldValue(isAdj ? "Adj_Lsymbol" : "L_symbol", true, false);
            } else {
              setFieldValue(isAdj ? "Adj_Rsymbol" : "R_symbol", true, false);
            }
          }}
        >
          <View style={symbol ? FormItemStyle.selectedRadioButton : FormItemStyle.unselectedRadioButton} />
          <Text style={{ fontSize: 20, color: "white", paddingRight: 10 }}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={FormItemStyle.sliderText}>
        {symbol ? "+" : "−"}
        {sliderValue}
      </Text>
      <Slider
        style={FormItemStyle.slider}
        minimumValue={0}
        maximumValue={700}
        step={25}
        thumbTintColor={"#47CDBD"}
        minimumTrackTintColor={"white"}
        maximumTrackTintColor={"#B8CAE4"}
        onValueChange={(value) => setSliderValue(value)}
        onSlidingComplete={() => SliderHandler()}
      />
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
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}球面度數(SPH) (e.g. 125)</Text>
      {error != undefined && <Text style={FormItemStyle.errortext}>{error}</Text>}

      <View style={FormItemStyle.answerContainer}>
        <TouchableOpacity style={FormItemStyle.answerContainer} onPress={pressHandler}>
          <View style={FormItemStyle.dropDownButton}>
            <Image source={DropDown} />
          </View>
          <Text style={FormItemStyle.answerText}>{symbol ? "+" : "-"}</Text>
        </TouchableOpacity>
        <TextInput onChangeText={handleChange(isLeft ? "L_SPH" : "R_SPH")} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
      </View>
    </View>
  );
};

export const CYLInputB = (props) => {
  const { setFieldValue, isLeft, isAdj } = props;

  const [isable, setIsable] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <View>
      <Text style={FormItemStyle.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}
        {isAdj ? "調整" : ""}散光度數(CYL)
      </Text>

      <View>
        <Text style={FormItemStyle.sliderText}>−{sliderValue}</Text>
        <Slider
          style={FormItemStyle.slider}
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

      <View>{isable && <AxisInputB setFieldValue={setFieldValue} isLeft={isLeft} isAdj={isAdj} />}</View>
    </View>
  );
};

export const CYLInput = (props) => {
  const { handleChange, setFieldValue, isLeft, errorA, errorB, mode, isAdj } = props;

  if (mode) {
    return <CYLInputB handleChange={handleChange} setFieldValue={setFieldValue} isLeft={isLeft} isAdj={isAdj} />;
  }

  const [isable, setIsable] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Text style={FormItemStyle.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}
        {isAdj ? "調整" : ""}散光度數(CYL) (e.g. 125)
      </Text>
      {errorA != undefined && <Text style={FormItemStyle.errortext}>{errorA}</Text>}
      <View style={FormItemStyle.answerContainer}>
        <Text style={FormItemStyle.answerText}>−</Text>

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
          style={FormItemStyle.answerInputBox}
        />
      </View>
      <View>{isable && <AxisInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={isLeft} error={errorB} isAdj={isAdj} />}</View>
    </View>
  );
};

export const AxisInputB = (props) => {
  const { setFieldValue, isLeft, isAdj } = props;
  const [sliderValue, setSliderValue] = useState(0);
  return (
    <View>
      <Text style={FormItemStyle.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}
        {isAdj ? "調整" : ""}散光軸度(Axis)
      </Text>

      <View>
        <Text style={FormItemStyle.sliderText}>{sliderValue}</Text>
        <Slider
          style={FormItemStyle.slider}
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
  const { handleChange, setFieldValue, isLeft, error, mode, isAdj } = props;
  if (mode) {
    return <AxisInputB setFieldValue={setFieldValue} isLeft={isLeft} isAdj={isAdj} />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={FormItemStyle.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}
        {isAdj ? "調整" : ""}散光軸度(Axis)
      </Text>
      {error != undefined && <Text style={FormItemStyle.errortext}>{error}</Text>}
      <TextInput onChangeText={handleChange(isLeft ? "L_Axis" : "R_Axis")} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
    </View>
  );
};

export const VAInputB = (props) => {
  const { setFieldValue, isLeft } = props;
  const [mode, SetMode] = useState("A"); //A = 20/20, B=6/6, C = decimal
  const RadioButtonHandler = (value) => {
    setMode(value);
    if (value == "C") {
      setFieldValue(isLeft ? "L_VA" : "R_VA", "0", false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)</Text>

      <View style={{ flexDirection: "row", paddingLeft: 10 }}>
        <TouchableOpacity
          style={{ flexDirection: "row", marginRight: 15 }}
          onPress={() => {
            RadioButtonHandler("A");
          }}
        >
          <View style={mode == "A" ? FormItemStyle.selectedRadioButton : FormItemStyle.unselectedRadioButton} />
          <Text style={{ fontSize: 18, color: "white", paddingRight: 10 }}>20/20</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", marginRight: 15 }}
          onPress={() => {
            RadioButtonHandler("B");
          }}
        >
          <View style={mode == "B" ? FormItemStyle.selectedRadioButton : FormItemStyle.unselectedRadioButton} />
          <Text style={{ fontSize: 18, color: "white", paddingRight: 10 }}>6/6</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            RadioButtonHandler("C");
          }}
        >
          <View style={mode == "C" ? FormItemStyle.selectedRadioButton : FormItemStyle.unselectedRadioButton} />
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
  const SliderHandler = () => {
    setFieldValue(isLeft ? "L_VA" : "R_VA", VA20Arr[sliderValue].toString(), false);
  };
  return (
    <>
      <Text style={FormItemStyle.sliderText}>{VA20Arr[sliderValue]}</Text>
      <Slider
        style={FormItemStyle.slider}
        minimumValue={0}
        maximumValue={VA20Arr.length - 1}
        step={1}
        thumbTintColor={"#47CDBD"}
        minimumTrackTintColor={"white"}
        maximumTrackTintColor={"#B8CAE4"}
        onValueChange={(value) => setSliderValue(value)}
        onSlidingComplete={() => SliderHandler()}
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
      <Text style={FormItemStyle.sliderText}>{VA6Arr[sliderValue]}</Text>
      <Slider
        style={FormItemStyle.slider}
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
      <Text style={FormItemStyle.sliderText}>{(sliderValue / 10).toFixed(1)}</Text>
      <Slider
        style={FormItemStyle.slider}
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
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)(e.g. 1.0)</Text>
      {error != undefined && <Text style={FormItemStyle.errortext}>{error}</Text>}
      <TextInput onChangeText={handleChange(isLeft ? "L_VA" : "R_VA")} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
    </View>
  );
};

export const PDInput = (props) => {
  const { handleChange, error, isLeft } = props;

  return (
    <View style={{ flex: 1 }}>
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼" : "右眼"}瞳孔距離(Pupillary Distance)(mm)</Text>
      {error != undefined && <Text style={FormItemStyle.errortext}>{error}</Text>}
      <TextInput onChangeText={handleChange(isLeft ? "L_PD" : "R_PD")} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
    </View>
  );
};

export const RemarksInput = (props) => {
  const { handleChange } = props;
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <Text style={FormItemStyle.questionText}>備註</Text>

      <TextInput onChangeText={handleChange("remarks")} multiline={true} style={FormItemStyle.remarksInputBox} />
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
      <Text style={[FormItemStyle.questionText, { marginBottom: 5 }]}>確診眼疾</Text>
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

const FormItemStyle = StyleSheet.create({
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
  slider: {
    width: ScreenWidth * 0.8,
    paddingTop: 30,
  },
  collapseTitle: {
    paddingVertical: 5,
    fontSize: 24,
    color: "white",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
  },
  collapseButton: {
    paddingTop: 10,
  },
  collpaseContainer: {
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 10,
    paddingLeft: 8,
    paddingBottom: 15,
    marginTop: 10,
  },
});
