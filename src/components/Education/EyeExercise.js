import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { database } from "../../../src/config/config";
import { LinearGradient } from "expo-linear-gradient";

const LeftOpen = require("../../../assets/images/LeftOpen.png");
const RightOpen = require("../../../assets/images/RightOpen.png");
const BackArrow = require("../../../assets/images/BackArrow.png");
const NextArrow = require("../../../assets/images/NextArrow.png");
const Setting = require("../../../assets/images/setting.png");

const patient_id = "004";

export default class EyeExercise extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.background}>
        <LinearGradient
          colors={["#1872a7", "#5a74d1", "#a676ff"]}
          start={[0, 0.9]}
          end={[1, 0.1]}
          locations={[0, 0.5, 1]}
          style={{
            height: "100%",
          }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>護眼操</Text>
            <TouchableOpacity>
              <Image source={Setting} />
            </TouchableOpacity>
          </View>

          <View style={styles.secondaryContainer}>
            <Text style={styles.text}>
              {"眼睛離開手機屏幕，\n按下「開始」，\n跟隨聲音導航開始護眼操"}
            </Text>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity style={styles.boxes} onPress={() => {}}>
                <Text style={styles.buttonText}>開始</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: "#24559E",
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  header: {
    paddingTop: 25,
    marginRight: 18,
    marginLeft: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondaryContainer: {
    flex: 1,
    margin: 30,
    marginTop: 45,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "white",
  },
  text: {
    flex: 4,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    fontWeight: "bold",
    lineHeight: 32,
    color: "white",
  },
  boxes: {
    height: 60,
    width: 120,
    borderRadius: 30,
    backgroundColor: "white",
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    color: "#3CA1B7",
  },
});
