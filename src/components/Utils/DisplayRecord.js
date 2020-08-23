import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

export default function DisplayRecords(props) {
  const { curRecord, glassType } = props;
  let glassTypeGeneralData;

  switch (glassType) {
    case 0:
      glassTypeGeneralData = {
        L_Myopia: curRecord.L_Myopia,
        L_Hyperopia: curRecord.L_Hyperopia,
        L_CYL: curRecord.L_CYL,
        L_Axis: curRecord.L_Axis,
        L_PRISM: curRecord.L_PRISM || 0,
        L_ADD: curRecord.L_ADD || 0,

        R_Myopia: curRecord.R_Myopia,
        R_Hyperopia: curRecord.R_Hyperopia,
        R_CYL: curRecord.R_CYL,
        R_Axis: curRecord.R_Axis,
        R_PRISM: curRecord.R_PRISM || 0,
        R_ADD: curRecord.R_ADD || 0,
      };
      break;
    case 1:
      glassTypeGeneralData = {
        L_Myopia: curRecord.Adj_L_Myopia,
        L_Hyperopia: curRecord.Adj_L_Hyperopia,
        L_CYL: curRecord.Adj_L_CYL,
        L_Axis: curRecord.Adj_L_Axis,
        L_PRISM: curRecord.Adj_L_PRISM || 0,
        L_ADD: curRecord.Adj_L_ADD || 0,

        R_Myopia: curRecord.Adj_R_Myopia,
        R_Hyperopia: curRecord.Adj_R_Hyperopia,
        R_CYL: curRecord.Adj_R_CYL,
        R_Axis: curRecord.Adj_R_Axis,
        R_PRISM: curRecord.Adj_R_PRISM || 0,
        R_ADD: curRecord.Adj_R_ADD || 0,
      };
      break;
  }

  const glassTypeData = {
    ...glassTypeGeneralData,
    ...{
      L_VA: curRecord.L_VA,
      R_VA: curRecord.R_VA,
      VA: curRecord.VA || 0,

      L_PD: curRecord.L_PD,
      R_PD: curRecord.R_PD,

      Mid_dist: curRecord.Mid_dist || 0,
      Near_dist: curRecord.Near_dist || 0,

      Con_L_BC: curRecord.Con_L_BC || 0,
      Con_R_BC: curRecord.Con_R_BC || 0,
      Con_L_Dia: curRecord.Con_L_Dia || 0,
      Con_R_Dia: curRecord.Con_R_Dia || 0,
      Con_expiry_date: curRecord.Con_expiry_date || "",
      Con_brand: curRecord.Con_brand || "",

      remark: curRecord.remark || "",
    },
  };

  console.log(glassTypeData);

  const calSPH = (isLeft) => {
    if (isLeft) {
      if (glassTypeData.L_Myopia != 0) {
        //myopia, add - sign
        var num = parseFloat(glassTypeData.L_Myopia) / 100;
        return "-" + num.toFixed(2);
      } else if (glassTypeData.L_Hyperopia != 0) {
        //hyperopia, add + sign
        var num = parseFloat(glassTypeData.L_Hyperopia) / 100;
        return "+" + num.toFixed(2);
      } else return "0.00";
    } else {
      if (glassTypeData.R_Myopia != 0) {
        //myopia, add - sign
        var num = parseFloat(glassTypeData.R_Myopia) / 100;
        return "-" + num.toFixed(2);
      } else if (glassTypeData.R_Hyperopia != 0) {
        //hyperopia, add + sign
        var num = parseFloat(glassTypeData.R_Hyperopia) / 100;
        return "+" + num.toFixed(2);
      } else return "0.00";
    }
  };

  const calCYL = (isLeft) => {
    if (isLeft && glassTypeData.L_CYL != 0) {
      var num = parseFloat(glassTypeData.L_CYL) / 100;
      return "-" + num.toFixed(2);
    } else if (!isLeft && glassTypeData.R_CYL != 0) {
      var num = parseFloat(glassTypeData.R_CYL) / 100;
      return "-" + num.toFixed(2);
    } else return "0.00";
  };

  const calAxis = (isLeft) => {
    if (isLeft) {
      if (glassTypeData.L_CYL != 0 && glassTypeData.L_CYL != " ") return glassTypeData.L_Axis;
      else return "NA";
    } else {
      if (glassTypeData.R_CYL != 0 && glassTypeData.R_CYL != " ") return glassTypeData.R_Axis;
      else return "NA";
    }
  };

  const calVA = (isLeft) => {
    if (isLeft) return glassTypeData.L_VA;
    else return glassTypeData.R_VA;
  };

  const calPD = (isLeft) => {
    if (isLeft) return glassTypeData.L_PD;
    else return glassTypeData.R_PD;
  };

  return (
    <View style={DisplayRecordsStyle.box}>
      <Grid>
        <Row>
          <Col style={DisplayRecordsStyle.gridContainer}></Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.colHeader}>O.D.</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.colHeader}>O.S.</Text>
          </Col>
        </Row>
        <Row>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.rowHeader}>SPH:</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.gridText}>{calSPH(false)}</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.gridText}>{calSPH(true)}</Text>
          </Col>
        </Row>
        <Row>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.rowHeader}>CYL:</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.gridText}>{calCYL(false)}</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.gridText}>{calCYL(true)}</Text>
          </Col>
        </Row>
        <Row>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.rowHeader}>AXIS:</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.gridText}>{calAxis(false)}</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.gridText}>{calAxis(true)}</Text>
          </Col>
        </Row>
        <Row>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.rowHeader}>VA:</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.gridText}>{calVA(false)}</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.gridText}>{calVA(true)}</Text>
          </Col>
        </Row>
        <Row>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.rowHeader}>PD:</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.gridText}>{calPD(false)}</Text>
          </Col>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.gridText}>{calPD(true)}</Text>
          </Col>
        </Row>
        <Row>
          <Col style={DisplayRecordsStyle.gridContainer}>
            <Text style={DisplayRecordsStyle.rowHeader}>備註:</Text>
          </Col>
          <Col style={[DisplayRecordsStyle.gridContainer, { flex: 2 }]}>
            <Text>{glassTypeData.remark}</Text>
          </Col>
        </Row>
      </Grid>
    </View>
  );
}

const DisplayRecordsStyle = StyleSheet.create({
  box: {
    flex: 1,
    marginTop: 10,
  },
  gridContainer: {
    flex: 1,
    justifyContent: "center",
  },
  colHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D9CDB",
  },
  rowHeader: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 35,
    color: "#2D9CDB",
  },
  gridText: {
    textAlign: "center",
    paddingRight: 5,
    fontSize: 18,
    color: "#2D9CDB",
  },
});
