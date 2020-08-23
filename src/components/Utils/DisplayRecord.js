import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

export default function DisplayRecords(props) {
  const { curRecord, glassType } = props;
  const calSPH = (isLeft) => {
    if (isLeft) {
      if (glassType) {
        if (curRecord.Adj_L_Myopia != 0) {
          //myopia, add - sign
          var num = parseFloat(curRecord.Adj_L_Myopia) / 100;
          return "-" + num.toFixed(2);
        } else if (curRecord.Adj_L_Hyperopia != 0) {
          //hyperopia, add + sign
          var num = parseFloat(curRecord.Adj_L_Hyperopia) / 100;
          return "+" + num.toFixed(2);
        } else return "0.00";
      } else {
        if (curRecord.L_Myopia != 0) {
          //myopia, add - sign
          var num = parseFloat(curRecord.L_Myopia) / 100;
          return "-" + num.toFixed(2);
        } else if (curRecord.L_Hyperopia != 0) {
          //hyperopia, add + sign
          var num = parseFloat(curRecord.L_Hyperopia) / 100;
          return "+" + num.toFixed(2);
        } else return "0.00";
      }
    } else {
      if (glassType) {
        if (curRecord.Adj_R_Myopia != 0) {
          //myopia, add - sign
          var num = parseFloat(curRecord.Adj_R_Myopia) / 100;
          return "-" + num.toFixed(2);
        } else if (curRecord.Adj_R_Hyperopia != 0) {
          //hyperopia, add + sign
          var num = parseFloat(curRecord.Adj_R_Hyperopia) / 100;
          return "+" + num.toFixed(2);
        } else return "0.00";
      } else {
        if (curRecord.R_Myopia != 0) {
          //myopia, add - sign
          var num = parseFloat(curRecord.R_Myopia) / 100;
          return "-" + num.toFixed(2);
        } else if (curRecord.R_Hyperopia != 0) {
          //hyperopia, add + sign
          var num = parseFloat(curRecord.R_Hyperopia) / 100;
          return "+" + num.toFixed(2);
        } else return "0.00";
      }
    }
  };

  const calCYL = (isLeft) => {
    if (glassType) {
      if (isLeft && curRecord.Adj_L_CYL != 0) {
        var num = parseFloat(curRecord.Adj_L_CYL) / 100;
        return "-" + num.toFixed(2);
      } else if (!isLeft && curRecord.Adj_R_CYL != 0) {
        var num = parseFloat(curRecord.Adj_R_CYL) / 100;
        return "-" + num.toFixed(2);
      } else return "0.00";
    } else {
      if (isLeft && curRecord.L_CYL != 0) {
        var num = parseFloat(curRecord.L_CYL) / 100;
        return "-" + num.toFixed(2);
      } else if (!isLeft && curRecord.R_CYL != 0) {
        var num = parseFloat(curRecord.R_CYL) / 100;
        return "-" + num.toFixed(2);
      } else return "0.00";
    }
  };

  const calAxis = (isLeft) => {
    if (glassType) {
      if (isLeft) {
        if (curRecord.Adj_L_CYL != 0 && curRecord.Adj_L_CYL != " ") return curRecord.Adj_L_Axis;
        else return "NA";
      } else {
        if (curRecord.Adj_R_CYL != 0 && curRecord.Adj_R_CYL != " ") return curRecord.Adj_R_Axis;
        else return "NA";
      }
    } else {
      if (isLeft) {
        if (curRecord.L_CYL != 0 && curRecord.L_CYL != " ") return curRecord.L_Axis;
        else return "NA";
      } else {
        if (curRecord.R_CYL != 0 && curRecord.R_CYL != " ") return curRecord.R_Axis;
        else return "NA";
      }
    }
  };

  const calVA = (isLeft) => {
    if (isLeft) return curRecord.L_VA;
    else return curRecord.R_VA;
  };

  const calPD = (isLeft) => {
    if (isLeft) return curRecord.L_PD;
    else return curRecord.R_PD;
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
            <Text>{curRecord.remark}</Text>
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
