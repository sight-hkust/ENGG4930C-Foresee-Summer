import React, { Component } from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
import { LinearGradientBackground } from "../src/components/Utils/LinearGradientBackground";
import { ScreenHeight, Scale } from "../constant/Constant";
import { Surface } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLightTheme: true,
    };
  }

  render() {
    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: this.state.isLightTheme ? "#BED8FF" : "#2372A5",
          ...this.props.containerStyle,
        }}
      >
        <Surface style={styles.shadow}>
          <View
            style={{
              ...styles.backgroundContainer,
              ...this.props.backgroundContainer,
            }}
          >
            <LinearGradientBackground
              style={{ height: "100%" }}
              colors={this.state.isLightTheme ? ["#1772A6", "#A377FF"] : ["#2D404B", "#2D404B"]}
              start={[0, 1]}
              end={[1, 0]}
              locations={[0.12, 0.92]}
            >
              {this.props.children}
            </LinearGradientBackground>
          </View>
        </Surface>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,

    elevation: 12,
  },
  backgroundContainer: {
    height: Platform.OS === "ios" ? hp("90%") : Dimensions.get("window").height * 0.92,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
});
