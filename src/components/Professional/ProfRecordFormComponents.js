import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Slider } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { TextInput } from "react-native-gesture-handler";
import Collapsible from "react-native-collapsible";
import MultiSelect from "react-native-multiple-select";
const DropDown = require("../../../assets/images/DropDown.png");
import { ScreenWidth } from "../../../constant/Constant";

export const DateSelect = (props) => {
  const { values, setFieldValue } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    hideDatePicker();
    setFieldValue("date", moment(date).format("YYYY-MM-DD HH:mm"), false);
  };

  return (
    <View>
      <Text style={FormItemStyle.questionText}>請輸入日期時間</Text>
      <View>
        <TouchableOpacity onPress={showDatePicker} style={FormItemStyle.answerContainer}>
          <View style={FormItemStyle.dropDownButton}>
            <Image source={DropDown} />
          </View>
          <Text style={FormItemStyle.answerText}>{moment(values).format("YYYY-MM-DD HH:mm")}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="datetime" onConfirm={handleConfirm} onCancel={hideDatePicker} date={moment(values).toDate()} maximumDate={new Date()} />
    </View>
  );
};

export const ExpiryDateInput = (props) => {
  const { values, setFieldValue } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    hideDatePicker();
    setFieldValue("Con_expiry_date", moment(date).format("YYYY-MM-DD"), false);
  };

  return (
    <View style={{ alignSelf: "flex-start" }}>
      <Text style={FormItemStyle.questionText}>請輸入到期日</Text>
      <View>
        <TouchableOpacity onPress={showDatePicker} style={FormItemStyle.answerContainer}>
          <View style={FormItemStyle.dropDownButton}>
            <Image source={DropDown} />
          </View>
          <Text style={FormItemStyle.answerText}>{moment(values).format("YYYY-MM-DD")}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} date={moment(values).toDate()} minimumDate={new Date()} />
    </View>
  );
};

export const RenderNormal = (props) => {
  const { setFieldValue, error_L_SPH, error_R_SPH, error_L_CYL, error_R_CYL, error_L_Axis, error_R_Axis } = props;
  return (
    <>
      <SPHInput setFieldValue={setFieldValue} isLeft={false} mode="normal" />
      {error_R_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_R_SPH}</Text>}
      <CYLInput setFieldValue={setFieldValue} isLeft={false} mode="normal" error_CYL={error_R_CYL} error_Axis={error_R_Axis} />
      <PRISMInput setFieldValue={setFieldValue} isLeft={false} mode="normal" />
      <ADDInput setFieldValue={setFieldValue} isLeft={false} mode="normal" />

      <SPHInput setFieldValue={setFieldValue} isLeft={true} mode="normal" />
      {error_L_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_L_SPH}</Text>}
      <CYLInput setFieldValue={setFieldValue} isLeft={true} mode="normal" error_CYL={error_L_CYL} error_Axis={error_L_Axis} />
      <PRISMInput setFieldValue={setFieldValue} isLeft={true} mode="normal" />
      <ADDInput setFieldValue={setFieldValue} isLeft={true} mode="normal" />
    </>
  );
};

export const RenderCollapseAdj = (props) => {
  const { setFieldValue, error_L_SPH, error_R_SPH, error_L_CYL, error_R_CYL, error_L_Axis, error_R_Axis } = props;
  const [isCollapse, toggleisCollapse] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => toggleisCollapse(!isCollapse)} style={FormItemStyle.collapseButton}>
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入調整度數</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <SPHInput setFieldValue={setFieldValue} isLeft={false} mode="adj" />
          {error_R_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_R_SPH}</Text>}
          <CYLInput setFieldValue={setFieldValue} isLeft={false} mode="adj" error_CYL={error_R_CYL} error_Axis={error_R_Axis} />
          <PRISMInput setFieldValue={setFieldValue} isLeft={false} mode="adj" />
          <ADDInput setFieldValue={setFieldValue} isLeft={false} mode="adj" />

          <SPHInput setFieldValue={setFieldValue} isLeft={true} mode="adj" />
          {error_L_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_L_SPH}</Text>}
          <CYLInput setFieldValue={setFieldValue} isLeft={true} mode="adj" error_CYL={error_L_CYL} error_Axis={error_L_Axis} />
          <PRISMInput setFieldValue={setFieldValue} isLeft={true} mode="adj" />
          <ADDInput setFieldValue={setFieldValue} isLeft={true} mode="adj" />
        </View>
      </Collapsible>
    </View>
  );
};

export const RenderCollapseCon = (props) => {
  const { values, handleChange, setFieldValue, error_L_SPH, error_R_SPH, error_L_CYL, error_R_CYL, error_L_Axis, error_R_Axis } = props;
  const [isCollapse, toggleisCollapse] = useState(true);
  return (
    <View>
      <TouchableOpacity onPress={() => toggleisCollapse(!isCollapse)} style={FormItemStyle.collapseButton}>
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入隱形眼鏡度數</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <ExpiryDateInput values={values} setFieldValue={setFieldValue} />
          <BrandInput handleChange={handleChange} />
          <SPHInput setFieldValue={setFieldValue} isLeft={false} mode="con" />
          {error_R_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_R_SPH}</Text>}
          <CYLInput setFieldValue={setFieldValue} isLeft={false} mode="con" error_CYL={error_R_CYL} error_Axis={error_R_Axis} />
          <BCInput setFieldValue={setFieldValue} isLeft={false} />
          <DiaInput setFieldValue={setFieldValue} isLeft={false} />

          <SPHInput setFieldValue={setFieldValue} isLeft={true} mode="con" />
          {error_L_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_L_SPH}</Text>}
          <CYLInput setFieldValue={setFieldValue} isLeft={true} mode="con" error_CYL={error_L_CYL} error_Axis={error_L_Axis} />
          <BCInput setFieldValue={setFieldValue} isLeft={true} />
          <DiaInput setFieldValue={setFieldValue} isLeft={true} />
        </View>
      </Collapsible>
    </View>
  );
};

export const RenderCollapseFar = (props) => {
  const { setFieldValue, error_L_SPH, error_R_SPH, error_L_CYL, error_R_CYL, error_L_Axis, error_R_Axis } = props;
  const [isCollapse, toggleisCollapse] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => toggleisCollapse(!isCollapse)} style={FormItemStyle.collapseButton}>
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入遠距度數</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <SPHInput setFieldValue={setFieldValue} isLeft={false} mode="far" />
          {error_R_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_R_SPH}</Text>}
          <CYLInput setFieldValue={setFieldValue} isLeft={false} mode="far" error_CYL={error_R_CYL} error_Axis={error_R_Axis} />
          <PRISMInput setFieldValue={setFieldValue} isLeft={false} mode="far" />
          <ADDInput setFieldValue={setFieldValue} isLeft={false} mode="far" />

          <SPHInput setFieldValue={setFieldValue} isLeft={true} mode="far" />
          {error_L_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_L_SPH}</Text>}
          <CYLInput setFieldValue={setFieldValue} isLeft={true} mode="far" error_CYL={error_L_CYL} error_Axis={error_L_Axis} />
          <PRISMInput setFieldValue={setFieldValue} isLeft={true} mode="far" />
          <ADDInput setFieldValue={setFieldValue} isLeft={true} mode="far" />
        </View>
      </Collapsible>
    </View>
  );
};

export const RenderCollapseMid = (props) => {
  const { setFieldValue, error_L_SPH, error_R_SPH, error_L_CYL, error_R_CYL, error_L_Axis, error_R_Axis } = props;
  const [isCollapse, toggleisCollapse] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => toggleisCollapse(!isCollapse)} style={FormItemStyle.collapseButton}>
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入中距工作度數</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <DistanceInput setFieldValue={setFieldValue} mode="mid" />
          <SPHInput setFieldValue={setFieldValue} isLeft={false} mode="mid" />
          {error_R_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_R_SPH}</Text>}
          <CYLInput setFieldValue={setFieldValue} isLeft={false} mode="mid" error_CYL={error_R_CYL} error_Axis={error_R_Axis} />
          <PRISMInput setFieldValue={setFieldValue} isLeft={false} mode="mid" />
          <ADDInput setFieldValue={setFieldValue} isLeft={false} mode="mid" />

          <SPHInput setFieldValue={setFieldValue} isLeft={true} mode="mid" />
          {error_L_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_L_SPH}</Text>}
          <CYLInput setFieldValue={setFieldValue} isLeft={true} mode="mid" error_CYL={error_L_CYL} error_Axis={error_L_Axis} />
          <PRISMInput setFieldValue={setFieldValue} isLeft={true} mode="mid" />
          <ADDInput setFieldValue={setFieldValue} isLeft={true} mode="mid" />
        </View>
      </Collapsible>
    </View>
  );
};

export const RenderCollapseNear = (props) => {
  const { setFieldValue, error_L_SPH, error_R_SPH, error_L_CYL, error_R_CYL, error_L_Axis, error_R_Axis } = props;
  const [isCollapse, toggleisCollapse] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => toggleisCollapse(!isCollapse)} style={FormItemStyle.collapseButton}>
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入近距度數</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <DistanceInput setFieldValue={setFieldValue} mode="near" />
          <SPHInput setFieldValue={setFieldValue} isLeft={false} mode="near" />
          {error_R_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_R_SPH}</Text>}
          <CYLInput setFieldValue={setFieldValue} isLeft={false} mode="near" error_CYL={error_R_CYL} error_Axis={error_R_Axis} />
          <PRISMInput setFieldValue={setFieldValue} isLeft={false} mode="near" />
          <ADDInput setFieldValue={setFieldValue} isLeft={false} mode="near" />

          <SPHInput setFieldValue={setFieldValue} isLeft={true} mode="near" />
          {error_L_SPH != undefined && <Text style={FormItemStyle.errortext}>{error_L_SPH}</Text>}
          <CYLInput setFieldValue={setFieldValue} isLeft={true} mode="near" error_CYL={error_L_CYL} error_Axis={error_L_Axis} />
          <PRISMInput setFieldValue={setFieldValue} isLeft={true} mode="near" />
          <ADDInput setFieldValue={setFieldValue} isLeft={true} mode="near" />
        </View>
      </Collapsible>
    </View>
  );
};

export const RenderCollapsePD = (props) => {
  const { handleChange, error_L_PD, error_R_PD } = props;
  const [isCollapse, toggleisCollapse] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => toggleisCollapse(!isCollapse)} style={FormItemStyle.collapseButton}>
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入瞳孔距離(PD)</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <PDInput handleChange={handleChange} isLeft={false} error={error_R_PD} />
          <PDInput handleChange={handleChange} isLeft={true} error={error_L_PD} />
        </View>
      </Collapsible>
    </View>
  );
};

export const RenderCollapseVA = (props) => {
  const { setFieldValue, error_L_VA, error_R_VA } = props;
  const [isCollapse, toggleisCollapse] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => toggleisCollapse(!isCollapse)} style={FormItemStyle.collapseButton}>
        <Text style={FormItemStyle.collapseTitle}>{isCollapse ? "展開" : "收起"}輸入視力(VA)</Text>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapse}>
        <View style={FormItemStyle.collpaseContainer}>
          <VAInput setFieldValue={setFieldValue} isLeft={false} error={error_R_VA} />
          <VAInput setFieldValue={setFieldValue} isLeft={true} error={error_L_VA} />
          <Text style={FormItemStyle.questionText}>請輸入雙眼視力(VA)</Text>
          <TextInput onChangeText={(value) => setFieldValue("VA", value)} keyboardType="default" style={FormItemStyle.answerInputBox} />
        </View>
      </Collapsible>
    </View>
  );
};

export const DistanceInput = (props) => {
  const { setFieldValue, mode } = props;

  const TextinputHandler = (value) => {
    switch (mode) {
      case "mid":
        setFieldValue("Mid_dist", value);
        break;
      case "near":
        setFieldValue("Near_dist", value);
        break;
    }
  };
  return (
    <View>
      <Text style={FormItemStyle.questionText}>請輸入量度距離(厘米)</Text>
      <TextInput onChangeText={TextinputHandler} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
    </View>
  );
};

export const BrandInput = (props) => {
  const { handleChange } = props;
  return (
    <View>
      <Text style={FormItemStyle.questionText}>隱形眼鏡品牌</Text>
      <TextInput onChangeText={handleChange("Con_brand")} multiline={true} style={FormItemStyle.remarksInputBox} />
    </View>
  );
};

export const BCInput = (props) => {
  const { setFieldValue, isLeft } = props;
  const TextinputHandler = (value) => {
    setFieldValue(isLeft ? "Con_L_BC" : "Con_R_BC", value);
  };
  return (
    <View style={{ alignSelf: "center" }}>
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}隱形眼鏡弧度(BC)</Text>
      <TextInput onChangeText={TextinputHandler} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
    </View>
  );
};

export const DiaInput = (props) => {
  const { setFieldValue, isLeft } = props;
  const TextinputHandler = (value) => {
    setFieldValue(isLeft ? "Con_L_Dia" : "Con_R_Dia", value);
  };
  return (
    <View style={{ alignSelf: "center" }}>
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}隱形眼鏡直徑(DIA)</Text>
      <TextInput onChangeText={TextinputHandler} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
    </View>
  );
};

export const PRISMInput = (props) => {
  const { setFieldValue, isLeft, mode } = props;
  const TextinputHandler = (value) => {
    switch (mode) {
      case "normal":
        setFieldValue(isLeft ? "L_PRISM" : "R_PRISM", value);
        break;
      case "adj":
        setFieldValue(isLeft ? "Adj_L_PRISM" : "Adj_R_PRISM", value);
        break;
      case "far":
        setFieldValue(isLeft ? "Far_L_PRISM" : "Far_R_PRISM", value);
        break;
      case "mid":
        setFieldValue(isLeft ? "Mid_L_PRISM" : "Mid_R_PRISM", value);
        break;
      case "near":
        setFieldValue(isLeft ? "Near_L_PRISM" : "Near_R_PRISM", value);
        break;
    }
  };
  const QuestionText = () => {
    switch (mode) {
      case "normal":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}稜鏡(PRISM)</Text>;

      case "adj":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}調整稜鏡(PRISM)</Text>;
      case "far":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}遠距稜鏡(PRISM)</Text>;
      case "mid":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}中距稜鏡(PRISM)</Text>;
      case "near":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}近距稜鏡(PRISM)</Text>;
    }
  };

  return (
    <View style={{ alignSelf: "center" }}>
      {QuestionText()}
      <TextInput onChangeText={TextinputHandler} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
    </View>
  );
};
export const ADDInput = (props) => {
  const { setFieldValue, isLeft, mode } = props;
  const TextinputHandler = (value) => {
    switch (mode) {
      case "normal":
        setFieldValue(isLeft ? "L_ADD" : "R_ADD", value);
        break;
      case "adj":
        setFieldValue(isLeft ? "Adj_L_ADD" : "Adj_R_ADD", value);
        break;
      case "far":
        setFieldValue(isLeft ? "Far_L_ADD" : "Far_R_ADD", value);
        break;
      case "mid":
        setFieldValue(isLeft ? "Mid_L_ADD" : "Mid_R_ADD", value);
        break;
      case "near":
        setFieldValue(isLeft ? "Near_L_ADD" : "Near_R_ADD", value);
        break;
    }
  };
  const QuestionText = () => {
    switch (mode) {
      case "normal":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}老花加入度(ADD)</Text>;

      case "adj":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}調整老花加入度(ADD)</Text>;
      case "far":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}遠距老花加入度(ADD)</Text>;
      case "mid":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}中距老花加入度(ADD)</Text>;
      case "near":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}近距老花加入度(ADD)</Text>;
    }
  };

  return (
    <View style={{ alignSelf: "center" }}>
      {QuestionText()}
      <View style={{ flexDirection: "row", paddingLeft: 5, paddingTop: 10 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>+</Text>
        <TextInput onChangeText={TextinputHandler} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
      </View>
    </View>
  );
};

export const SPHInput = (props) => {
  const { setFieldValue, isLeft, mode } = props;

  const [symbol, Togglesymbol] = useState(false); //true = positive = hyperopia
  const TextinputHandler = (value) => {
    switch (mode) {
      case "normal":
        setFieldValue(isLeft ? "L_SPH" : "R_SPH", value);
        break;
      case "adj":
        setFieldValue(isLeft ? "Adj_L_SPH" : "Adj_R_SPH", value);
        break;
      case "con":
        setFieldValue(isLeft ? "Con_L_SPH" : "Con_R_SPH", value);
        break;
      case "far":
        setFieldValue(isLeft ? "Far_L_SPH" : "Far_R_SPH", value);
        break;
      case "mid":
        setFieldValue(isLeft ? "Mid_L_SPH" : "Mid_R_SPH", value);
        break;
      case "near":
        setFieldValue(isLeft ? "Near_L_SPH" : "Near_R_SPH", value);
        break;
    }
  };
  const RadioButtonHandler = (value) => {
    Togglesymbol(value);
    switch (mode) {
      case "normal":
        setFieldValue(isLeft ? "L_symbol" : "R_symbol", value, false);
        break;
      case "adj":
        setFieldValue(isLeft ? "Adj_L_symbol" : "Adj_R_symbol", value, false);
        break;
      case "con":
        setFieldValue(isLeft ? "Con_L_symbol" : "Con_R_symbol", value, false);
        break;
      case "far":
        setFieldValue(isLeft ? "Far_L_symbol" : "Far_R_symbol", value, false);
        break;
      case "mid":
        setFieldValue(isLeft ? "Mid_L_symbol" : "Mid_R_symbol", value, false);
        break;
      case "near":
        setFieldValue(isLeft ? "Near_L_symbol" : "Near_R_symbol", value, false);
        break;
    }
  };
  const QuestionText = () => {
    switch (mode) {
      case "normal":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}球面度數(SPH)</Text>;

      case "adj":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}調整球面度數(SPH)</Text>;
      case "con":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}隱形眼鏡球面度數(SPH)</Text>;
      case "far":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}遠距球面度數(SPH)</Text>;
      case "mid":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}中距球面度數(SPH)</Text>;
      case "near":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}近距球面度數(SPH)</Text>;
    }
  };

  return (
    <View style={{ alignSelf: "center" }}>
      {QuestionText()}
      <View style={{ flexDirection: "row", paddingLeft: 10, alignSelf: "center" }}>
        <TouchableOpacity
          style={{ flexDirection: "row", marginRight: 20 }}
          onPress={() => {
            RadioButtonHandler(false);
          }}
        >
          <View style={!symbol ? FormItemStyle.selectedRadioButton : FormItemStyle.unselectedRadioButton} />
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            RadioButtonHandler(true);
          }}
        >
          <View style={symbol ? FormItemStyle.selectedRadioButton : FormItemStyle.unselectedRadioButton} />
          <Text style={{ fontSize: 20, color: "white", paddingRight: 10 }}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", paddingLeft: 5, paddingTop: 10 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{symbol ? "+" : "−"}</Text>
        <TextInput onChangeText={TextinputHandler} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
      </View>
    </View>
  );
};

export const CYLInput = (props) => {
  const { setFieldValue, isLeft, mode, error_CYL, error_Axis } = props;

  const [isable, setIsable] = useState(false);

  const TextinputHandler = (value) => {
    if (value > 0) {
      setIsable(true);
    } else {
      setIsable(false);
    }
    switch (mode) {
      case "normal":
        setFieldValue(isLeft ? "L_CYL" : "R_CYL", value);
        break;
      case "adj":
        setFieldValue(isLeft ? "Adj_L_CYL" : "Adj_R_CYL", value);
        break;
      case "con":
        setFieldValue(isLeft ? "Con_L_CYL" : "Con_R_CYL", value);
        break;
      case "far":
        setFieldValue(isLeft ? "Far_L_CYL" : "Far_R_CYL", value);
        break;
      case "mid":
        setFieldValue(isLeft ? "Mid_L_CYL" : "Mid_R_CYL", value);
        break;
      case "near":
        setFieldValue(isLeft ? "Near_L_CYL" : "Near_R_CYL", value);
        break;
    }
  };
  const QuestionText = () => {
    switch (mode) {
      case "normal":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}散光度數(CYL)</Text>;

      case "adj":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}調整散光度數(CYL)</Text>;
      case "con":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}隱形眼鏡散光度數(CYL)</Text>;
      case "far":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}遠距散光度數(CYL)</Text>;
      case "mid":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}中距散光度數(CYL)</Text>;
      case "near":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}近距散光度數(CYL)</Text>;
    }
  };

  return (
    <View style={{ alignSelf: "center" }}>
      {QuestionText()}
      <View style={{ flexDirection: "row", paddingLeft: 5, paddingTop: 10 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>+</Text>

        <TextInput onChangeText={TextinputHandler} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
      </View>
      {error_CYL != undefined && <Text style={FormItemStyle.errortext}>{error_CYL}</Text>}

      <View>{isable && <AxisInput setFieldValue={setFieldValue} isLeft={isLeft} mode={mode} error={error_Axis} />}</View>
    </View>
  );
};

export const AxisInput = (props) => {
  const { setFieldValue, isLeft, mode, error } = props;
  const TextinputHandler = (value) => {
    switch (mode) {
      case "normal":
        setFieldValue(isLeft ? "L_Axis" : "R_Axis", value);
        break;
      case "adj":
        setFieldValue(isLeft ? "Adj_L_Axis" : "Adj_R_Axis", value);
        break;
      case "con":
        setFieldValue(isLeft ? "Con_L_Axis" : "Con_R_Axis", value);
        break;
      case "far":
        setFieldValue(isLeft ? "Far_L_Axis" : "Far_R_Axis", value);
        break;
      case "mid":
        setFieldValue(isLeft ? "Mid_L_Axis" : "Mid_R_Axis", value);
        break;
      case "near":
        setFieldValue(isLeft ? "Near_L_Axis" : "Near_R_Axis", value);
        break;
    }
  };
  const QuestionText = () => {
    switch (mode) {
      case "normal":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}散光軸度(Axis)</Text>;

      case "adj":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}調整散光軸度(Axis)</Text>;
      case "con":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}隱形眼鏡散光軸度(Axis)</Text>;
      case "far":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}遠距散光軸度(Axis)</Text>;
      case "mid":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}中距散光軸度(Axis)</Text>;
      case "near":
        return <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}近距散光軸度(Axis)</Text>;
    }
  };

  return (
    <View style={{ alignSelf: "center" }}>
      {QuestionText()}
      <TextInput onChangeText={TextinputHandler} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
      {error != undefined && <Text style={FormItemStyle.errortext}>{error}</Text>}
    </View>
  );
};

export const VAInput = (props) => {
  const { setFieldValue, isLeft, error } = props;
  const TextinputHandler = (value) => {
    setFieldValue(isLeft ? "L_VA" : "R_VA", value);
  };

  return (
    <View>
      <View style={{ alignSelf: "center" }}>
        <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)</Text>
        <TextInput onChangeText={TextinputHandler} keyboardType="default" style={FormItemStyle.answerInputBox} />
      </View>

      {error != undefined && <Text style={FormItemStyle.errortext}>{error}</Text>}
    </View>
  );
};

export const PDInput = (props) => {
  const { handleChange, isLeft, error } = props;

  return (
    <View style={{ alignSelf: "center" }}>
      <Text style={FormItemStyle.questionText}>請輸入{isLeft ? "左眼" : "右眼"}瞳孔距離(Pupillary Distance)(mm)</Text>
      <TextInput onChangeText={handleChange(isLeft ? "L_PD" : "R_PD")} keyboardType="numeric" style={FormItemStyle.answerInputBox} />
      {error != undefined && <Text style={FormItemStyle.errortext}>{error}</Text>}
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
        //onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#FFF"
        styleDropdownMenu={{ width: ScreenWidth * 0.8 }}
        styleListContainer={{ width: ScreenWidth * 0.8 }}
        styleItemsContainer={{ width: ScreenWidth * 0.8 }}
        styleMainWrapper={{ width: ScreenWidth * 0.8 }}
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
    width: 100,
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
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
    textAlign: "center",
    paddingBottom: 2,
    paddingTop: 0,
    backgroundColor: "rgba(256,256,256,0.65)",
    color: "#135a85",
    fontSize: 18,
    borderRadius: 5,
    alignItems: "center",
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
    width: ScreenWidth * 0.8,
    borderRadius: 12,
    paddingBottom: 15,
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
  },
});
