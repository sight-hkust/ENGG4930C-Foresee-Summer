import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Slider } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { TextInput } from "react-native-gesture-handler";
import Collapsible from "react-native-collapsible";
import MultiSelect from "react-native-multiple-select";
const DropDown = require("../assets/images/DropDown.png");
import { ScreenWidth } from "../constant/Constant";

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

export const RenderNoraml = (props) => {
  const { handleChange, setFieldValue, refractive, setStatus, status } = props;
  return (
    <>
      <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={false} refractive={refractive} isAdj={false} setStatus={setStatus} status={status} />
      <CYLInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={false} isAdj={false} setStatus={setStatus} status={status} />

      <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={true} refractive={refractive} isAdj={false} setStatus={setStatus} status={status} />
      <CYLInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={true} isAdj={false} setStatus={setStatus} status={status} />
    </>
  );
};

export const RenderCollapseAdj = (props) => {
  const { handleChange, setFieldValue, refractive, setStatus, status } = props;
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
          <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={false} refractive={refractive} isAdj={true} setStatus={setStatus} status={status} />
          <CYLInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={false} isAdj={true} setStatus={setStatus} status={status} />

          <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={true} refractive={refractive} isAdj={true} setStatus={setStatus} status={status} />
          <CYLInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft={true} isAdj={true} setStatus={setStatus} status={status} />
        </View>
      </Collapsible>
    </View>
  );
};

export const RenderCollapsePD = (props) => {
  const { handleChange } = props;
  const [isCollapse, toggleisCollapse] = useState(true);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          toggleisCollapse(!isCollapse);
        }}
        style={FormItemStyle.collapseButton}
      >
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入瞳孔距離(PD)</Text>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <PDInput handleChange={handleChange} isLeft={false} />
          <PDInput handleChange={handleChange} isLeft={true} />
        </View>
      </Collapsible>
    </View>
  );
};

export const RenderCollapseVA = (props) => {
  const { setFieldValue } = props;
  const [isCollapse, toggleisCollapse] = useState(true);
  const [mode, SetMode] = useState("A");
  const RadioButtonHandler = (value) => {
    if (value == "B") {
      setFieldValue("L_VA", "6/6", false);
      setFieldValue("R_VA", "6/6", false);
    } else if (value == "C") {
      setFieldValue("L_VA", "1.0", false);
      setFieldValue("R_VA", "1.0", false);
    }
    SetMode(value);
  };

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
          <View style={{ flexDirection: "row", paddingTop: 20, justifyContent: "center" }}>
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
          {mode == "A" && (
            <>
              <VA20Slider setFieldValue={setFieldValue} isLeft={false} />
              <VA20Slider setFieldValue={setFieldValue} isLeft={true} />
            </>
          )}
          {mode == "B" && (
            <>
              <VA6Slider setFieldValue={setFieldValue} isLeft={false} />
              <VA6Slider setFieldValue={setFieldValue} isLeft={true} />
            </>
          )}
          {mode == "C" && (
            <>
              <VAdecimalSlider setFieldValue={setFieldValue} isLeft={false} />
              <VAdecimalSlider setFieldValue={setFieldValue} isLeft={true} />
            </>
          )}
        </View>
      </Collapsible>
    </View>
  );
};

export const SPHInput = (props) => {
  const { setFieldValue, isLeft, refractive, isAdj, setStatus, status } = props;
  const [sliderValue, setSliderValue] = useState(0);
  const [symbol, Togglesymbol] = useState(refractive != 0 ? true : false); //true = positive = hyperopia
  const sliderArr = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 300, 400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700, ">700"];
  const SliderHandler = () => {
    if (sliderValue != ">700") {
      //remove error
      if (isAdj) {
        isLeft
          ? setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: "", Adj_R_SPH_errors: status.Adj_R_SPH_errors })
          : setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: "" });
        setFieldValue(isLeft ? "Adj_L_SPH" : "Adj_R_SPH", sliderValue, false);
        setFieldValue(isLeft ? "Adj_Lsymbol" : "Adj_Rsymbol", symbol, false);
      } else {
        isLeft
          ? setStatus({ L_SPH_errors: "", R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: status.Adj_R_SPH_errors })
          : setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: "", Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: status.Adj_R_SPH_errors });
        setFieldValue(isLeft ? "L_SPH" : "R_SPH", sliderValue, false);
        setFieldValue(isLeft ? "Lsymbol" : "Rsymbol", symbol, false);
      }
    } else {
      if (isAdj) {
        //==">700"
        isLeft
          ? setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: "empty", Adj_R_SPH_errors: status.Adj_R_SPH_errors })
          : setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: "empty" });
        setFieldValue(isLeft ? "Adj_Lsymbol" : "Adj_Rsymbol", symbol, false);
      } else {
        isLeft
          ? setStatus({ L_SPH_errors: "empty", R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: status.Adj_R_SPH_errors })
          : setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: "empty", Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: status.Adj_R_SPH_errors });
        setFieldValue(isLeft ? "Lsymbol" : "Rsymbol", symbol, false);
      }
    }
  };
  const TextinputHandler = (value) => {
    if (isAdj) {
      if (value <= 700 || value % 25 != 0) {
        //issue error
        isLeft
          ? setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: "error", Adj_R_SPH_errors: status.Adj_R_SPH_errors })
          : setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: "error" });
      } else {
        //no error
        isLeft
          ? setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: "", Adj_R_SPH_errors: status.Adj_R_SPH_errors })
          : setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: "" });
      }
      setFieldValue(isLeft ? "Adj_L_SPH" : "Adj_R_SPH", value);
    } else {
      if (value <= 700 || value % 25 != 0) {
        isLeft
          ? setStatus({ L_SPH_errors: "error", R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: status.Adj_L_SPH_errors })
          : setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: "error", Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: status.Adj_L_SPH_errors });
      } else {
        isLeft
          ? setStatus({ L_SPH_errors: "", R_SPH_errors: status.R_SPH_errors, Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: status.Adj_L_SPH_errors })
          : setStatus({ L_SPH_errors: status.L_SPH_errors, R_SPH_errors: "", Adj_L_SPH_errors: status.Adj_L_SPH_errors, Adj_R_SPH_errors: status.Adj_L_SPH_errors });
      }
      setFieldValue(isLeft ? "L_SPH" : "R_SPH", value);
    }
  };

  const TooSmallError = () => {
    if (isAdj) {
      return isLeft ? status.Adj_L_SPH_errors == "error" : status.Adj_R_SPH_errors == "error";
    } else {
      return isLeft ? status.L_SPH_errors == "error" : status.R_SPH_errors == "error";
    }
  };

  const EmptyError = () => {
    if (isAdj) {
      return isLeft ? status.Adj_L_SPH_errors == "empty" : status.Adj_R_SPH_errors == "empty";
    } else {
      return isLeft ? status.L_SPH_errors == "empty" : status.R_SPH_errors == "empty";
    }
  };

  return (
    <View style={{ alignSelf: "center" }}>
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
        {sliderValue != ">700" ? (symbol ? "+" : "−") : ""}
        {sliderValue}
      </Text>
      <Slider
        style={FormItemStyle.slider}
        minimumValue={0}
        maximumValue={sliderArr.length - 1}
        step={1}
        thumbTintColor={"#47CDBD"}
        minimumTrackTintColor={"white"}
        maximumTrackTintColor={"#B8CAE4"}
        onValueChange={(value) => setSliderValue(sliderArr[value])}
        onSlidingComplete={() => SliderHandler()}
      />
      {sliderValue == ">700" && (
        <>
          <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 5, paddingVertical: 8 }}>
            <Text style={{ fontSize: 18, color: "white", paddingLeft: 5 }}>請輸入大於700度的度數: </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>{symbol ? "+" : "−"}</Text>

            <TextInput onChangeText={(value) => TextinputHandler(value)} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
          </View>

          {status != undefined && TooSmallError() && <Text style={FormItemStyle.errortext}>應大於700度並以00, 25, 50或75作尾</Text>}
          {status != undefined && EmptyError() && <Text style={FormItemStyle.errortext}>此項必填</Text>}
        </>
      )}
    </View>
  );
};

export const CYLInput = (props) => {
  const { setFieldValue, isLeft, isAdj, handleChange, setStatus, status } = props;

  const [isable, setIsable] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const sliderArr = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 300, 400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700, ">700"];
  const SliderHandler = () => {
    if (sliderValue != ">700") {
      //remove error
      if (isAdj) {
        isLeft
          ? setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: "", Adj_R_CYL_errors: status.Adj_R_CYL_errors })
          : setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: "" });
        setFieldValue(isLeft ? "Adj_L_CYL" : "Adj_R_CYL", sliderValue, false);

        if (sliderValue > 0) {
          setIsable(true);
        } else {
          setIsable(false);
        }
      } else {
        isLeft
          ? setStatus({ L_CYL_errors: "", R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: status.Adj_R_CYL_errors })
          : setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: "", Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: status.Adj_R_CYL_errors });
        setFieldValue(isLeft ? "L_CYL" : "R_CYL", sliderValue, false);

        if (sliderValue > 0) {
          setIsable(true);
        } else {
          setIsable(false);
        }
      }
    } else {
      if (isAdj) {
        //==">700"
        isLeft
          ? setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: "empty", Adj_R_CYL_errors: status.Adj_R_CYL_errors })
          : setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: "empty" });

        setIsable(true);
      } else {
        isLeft
          ? setStatus({ L_CYL_errors: "empty", R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: status.Adj_R_CYL_errors })
          : setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: "empty", Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: status.Adj_R_CYL_errors });

        setIsable(true);
      }
    }
  };

  const TextinputHandler = (value) => {
    if (isAdj) {
      if (value <= 700 || value % 25 != 0) {
        //issue error
        isLeft
          ? setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: "error", Adj_R_CYL_errors: status.Adj_R_CYL_errors })
          : setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: status.Adj_L_CYLerrors, Adj_R_CYL_errors: "error" });
      } else {
        //no error
        isLeft
          ? setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: "", Adj_R_CYL_errors: status.Adj_R_CYL_errors })
          : setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: "" });
      }
      setFieldValue(isLeft ? "Adj_L_CYL" : "Adj_R_CYL", value);
    } else {
      if (value <= 700 || value % 25 != 0) {
        isLeft
          ? setStatus({ L_CYL_errors: "error", R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: status.Adj_L_CYL_errors })
          : setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: "error", Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: status.Adj_L_CYL_errors });
      } else {
        isLeft
          ? setStatus({ L_CYL_errors: "", R_CYL_errors: status.R_CYL_errors, Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: status.Adj_L_CYL_errors })
          : setStatus({ L_CYL_errors: status.L_CYL_errors, R_CYL_errors: "", Adj_L_CYL_errors: status.Adj_L_CYL_errors, Adj_R_CYL_errors: status.Adj_L_CYL_errors });
      }
      setFieldValue(isLeft ? "L_CYL" : "R_CYL", value);
    }
  };

  const TooSmallError = () => {
    if (isAdj) {
      return isLeft ? status.Adj_L_CYL_errors == "error" : status.Adj_R_CYL_errors == "error";
    } else {
      return isLeft ? status.L_CYL_errors == "error" : status.R_CYL_errors == "error";
    }
  };

  const EmptyError = () => {
    if (isAdj) {
      return isLeft ? status.Adj_L_CYL_errors == "empty" : status.Adj_R_CYL_errors == "empty";
    } else {
      return isLeft ? status.L_CYL_errors == "empty" : status.R_CYL_errors == "empty";
    }
  };

  return (
    <View style={{ alignSelf: "center" }}>
      <Text style={FormItemStyle.questionText}>
        請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}
        {isAdj ? "調整" : ""}散光度數(CYL)
      </Text>

      <View>
        <Text style={FormItemStyle.sliderText}>
          {sliderValue != ">700" ? "−" : ""}
          {sliderValue}
        </Text>
        <Slider
          style={FormItemStyle.slider}
          minimumValue={0}
          maximumValue={sliderArr.length - 1}
          step={1}
          thumbTintColor={"#47CDBD"}
          minimumTrackTintColor={"white"}
          maximumTrackTintColor={"#B8CAE4"}
          onValueChange={(value) => setSliderValue(sliderArr[value])}
          onSlidingComplete={() => {
            SliderHandler();
          }}
        />
      </View>
      {sliderValue == ">700" && (
        <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 5, paddingVertical: 8 }}>
          <Text style={{ fontSize: 18, color: "white", paddingLeft: 5 }}>請輸入大於700度的度數: </Text>
          {isAdj ? (
            <TextInput onChangeText={TextinputHandler} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
          ) : (
            <TextInput onChangeText={TextinputHandler} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
          )}
        </View>
      )}
      {status != undefined && TooSmallError() && <Text style={FormItemStyle.errortext}>應大於700度並以00, 25, 50或75作尾</Text>}
      {status != undefined && EmptyError() && <Text style={FormItemStyle.errortext}>此項必填</Text>}
      <View>{isable && <AxisInputB setFieldValue={setFieldValue} isLeft={isLeft} isAdj={isAdj} />}</View>
    </View>
  );
};

export const AxisInputB = (props) => {
  const { setFieldValue, isLeft, isAdj } = props;
  const [sliderValue, setSliderValue] = useState(0);
  const SliderHandler = () => {
    if (isAdj) {
      setFieldValue(isLeft ? "Adj_L_Axis" : "Adj_R_Axis", sliderValue, false);
    } else {
      setFieldValue(isLeft ? "L_Axis" : "R_Axis", sliderValue, false);
    }
  };

  return (
    <View style={{ alignSelf: "center" }}>
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
            SliderHandler();
          }}
        />
      </View>
    </View>
  );
};

export const VA20Slider = (props) => {
  const { setFieldValue, isLeft } = props;
  const [sliderValue, setSliderValue] = useState("20/20");
  const VA20Arr = ["20/800", "20/400", "20/200", "20/100", "20/50", "20/40", "20/30", "20/25", "20/20", "20/16"];
  //const VA20Arr = ["20/16", "20/20", "20/25", "20/30", "20/40", "20/50", "20/100", "20/200", "20/400", "20/800"];
  const SliderHandler = () => {
    setFieldValue(isLeft ? "L_VA" : "R_VA", sliderValue.toString(), false);
  };
  return (
    <View style={{ alignSelf: "center" }}>
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)</Text>
      <Text style={FormItemStyle.sliderText}>{sliderValue}</Text>
      <Slider
        style={FormItemStyle.slider}
        minimumValue={0}
        maximumValue={9}
        step={1}
        value={8}
        thumbTintColor={"#47CDBD"}
        minimumTrackTintColor={"white"}
        maximumTrackTintColor={"#B8CAE4"}
        onValueChange={(value) => setSliderValue(VA20Arr[value])}
        onSlidingComplete={() => SliderHandler()}
      />
    </View>
  );
};

export const VA6Slider = (props) => {
  const { setFieldValue, isLeft } = props;
  const [sliderValue, setSliderValue] = useState("6/6");
  const VA6Arr = ["6/240", "6/120", "6/60", "6/30", "6/15", "6/12", "6/9", "6/7.5", "6/6", "6/4.8"];
  //const VA6Arr = ["6/4.8", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/30", "6/60", "6/120", "6/240"];
  const SliderHandler = () => {
    setFieldValue(isLeft ? "L_VA" : "R_VA", sliderValue.toString(), false);
    console.log(sliderValue.toString());
  };
  return (
    <View style={{ alignSelf: "center" }}>
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)</Text>
      <Text style={FormItemStyle.sliderText}>{sliderValue}</Text>
      <Slider
        style={FormItemStyle.slider}
        minimumValue={0}
        maximumValue={9}
        value={8}
        step={1}
        thumbTintColor={"#47CDBD"}
        minimumTrackTintColor={"white"}
        maximumTrackTintColor={"#B8CAE4"}
        onValueChange={(value) => setSliderValue(VA6Arr[value])}
        onSlidingComplete={() => {
          SliderHandler();
        }}
      />
    </View>
  );
};

export const VAdecimalSlider = (props) => {
  const { setFieldValue, isLeft } = props;
  const [sliderValue, setSliderValue] = useState(10);
  const SliderHandler = () => {
    setFieldValue(isLeft ? "L_VA" : "R_VA", (sliderValue / 10).toFixed(2), false);
  };
  return (
    <View style={{ alignSelf: "center" }}>
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)</Text>
      <Text style={FormItemStyle.sliderText}>{(sliderValue / 10).toFixed(1)}</Text>
      <Slider
        style={FormItemStyle.slider}
        inverted={true}
        minimumValue={0}
        maximumValue={12.5}
        step={1}
        value={10}
        thumbTintColor={"#47CDBD"}
        minimumTrackTintColor={"white"}
        maximumTrackTintColor={"#B8CAE4"}
        onValueChange={(value) => setSliderValue(value)}
        onSlidingComplete={() => {
          SliderHandler();
        }}
      />
    </View>
  );
};

export const PDInput = (props) => {
  const { handleChange, isLeft } = props;

  return (
    <View style={{ alignSelf: "center" }}>
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼" : "右眼"}瞳孔距離(Pupillary Distance)(mm)</Text>
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
    paddingLeft: 5,
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 2,
    paddingTop: 1,
    backgroundColor: "rgba(256,256,256,0.65)",
    color: "#135a85",
    fontSize: 18,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  remarksInputBox: {
    width: ScreenWidth * 0.8,
    alignSelf: "center",
    textAlign: "center",
    paddingBottom: 2,
    paddingTop: 0,
    backgroundColor: "rgba(256,256,256,0.65)",
    color: "#135a85",
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
    textAlign: "center",
    fontSize: 16,
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
    alignSelf: "center",
    width: ScreenWidth * 0.85,
    borderRadius: 12,
    paddingBottom: 15,
    marginTop: 10,
  },
});
