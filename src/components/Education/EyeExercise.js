import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import * as Brightness from "expo-brightness";

// "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3"
// "https://ia800500.us.archive.org/10/items/VwFantasiaOngreensleevesmarriner/1-01VaughanWilliams_FantasiaOnGreensleeves.mp3",
// "https://pic.pikbest.com/00/40/38/526888piCCwr.mp3"

export default class EyeExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      playbackObject: null,
      volume: 1.0,
      audio: "",
      playingStatus: 0,
      isBuffering: false,
    };
  }

  async getAudio() {
    const { play, volume, audio } = this.state;

    try {
      const playbackObject = new Audio.Sound();
      const source = { uri: audio };
      const status = {
        shouldPlay: play,
        volume,
      };
      this.setState({ playbackObject: playbackObject });
      playbackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackObject.loadAsync(source, status, false);
    } catch (e) {
      console.log(e);
    }
  }
  onPlaybackStatusUpdate = async (status) => {
    const { playbackObject } = this.state;
    if (status.didJustFinish) {
      await playbackObject.stopAsync();
      await Brightness.useSystemBrightnessAsync();
      this.setState({ playingStatus: 2 });
    }
    this.setState({
      isBuffering: status.isBuffering,
    });
  };

  async componentDidMount() {
    this.setState(
      {
        audio: "https://pic.pikbest.com/00/40/38/526888piCCwr.mp3",
      },
      () => {
        this.getAudio();
      }
    );
  }

  render() {
    const PressPlayButton = async () => {
      await Brightness.setBrightnessAsync(0);
      const { playbackObject } = this.state;
      await playbackObject.playAsync();
      this.setState({ playingStatus: 1 });
    };

    const { playingStatus } = this.state;

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
          {playingStatus == 0 && (
            <View style={styles.secondaryContainer}>
              <Text style={styles.text}>
                {"眼睛離開手機屏幕，\n按下「開始」，\n跟隨聲音導航開始護眼操"}
              </Text>
              <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.boxes}
                  onPress={() => {
                    if (this.state.isBuffering == false) PressPlayButton();
                  }}
                >
                  <Text style={styles.buttonText}>開始</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {playingStatus == 1 && (
            <View style={styles.secondaryContainer}>
              <Text style={styles.text}>{"你睇我唔到，\n你睇我唔到～"}</Text>
              <View style={{ flex: 1, alignItems: "center" }} />
            </View>
          )}
          {playingStatus == 2 && (
            <View style={styles.secondaryContainer}>
              <Text style={styles.text}>你已完成今天的護眼操！</Text>
              <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.boxes}
                  onPress={() => this.setState({ playingStatus: 0 })}
                >
                  <Text style={styles.buttonText}>再來一組</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  secondaryContainer: {
    flex: 1,
    margin: 30,
    marginTop: 90,
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
