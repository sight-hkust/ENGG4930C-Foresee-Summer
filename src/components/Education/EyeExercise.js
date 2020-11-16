import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from "react-native";
import { Audio } from "expo-av";
import * as Brightness from "expo-brightness";
import { ScreenHeight, ScreenWidth } from "../../../constant/Constant";
import FABView from "../../../Utils/FAB";
import MenuScreen from "../../../Utils/MenuScreen";
import { useIsFocused } from "@react-navigation/native";

import i18n from 'i18n-js';
import {useLocalization} from "../../strings/Strings";

// "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3"
// "https://ia800500.us.archive.org/10/items/VwFantasiaOngreensleevesmarriner/1-01VaughanWilliams_FantasiaOnGreensleeves.mp3",
// "https://pic.pikbest.com/00/40/38/526888piCCwr.mp3"

function rand(x) {
  return Math.floor(Math.random() * x);
}

var audios = [
  {
    audio: require("../../../assets/audio/EyeExercise-01.mp3"),
    image: require("../../../assets/images/EyeExercise-01.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-02.mp3"),
    image: require("../../../assets/images/EyeExercise-02.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-03.mp3"),
    image: require("../../../assets/images/EyeExercise-03.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-04.mp3"),
    image: require("../../../assets/images/EyeExercise-04.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-05.mp3"),
    image: require("../../../assets/images/EyeExercise-05.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-06.mp3"),
    image: require("../../../assets/images/EyeExercise-06.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-07.mp3"),
    image: require("../../../assets/images/EyeExercise-07.gif"),
  },
];

const intro = {
  audio: require("../../../assets/audio/EyeExercise-Closed.mp3"),
  image: require("../../../assets/images/EyeExercise-Closed.gif"),
};
const outro = {
  audio: require("../../../assets/audio/EyeExercise-Closed.mp3"),
  image: require("../../../assets/images/EyeExercise-Closed.gif"),
};

/*
playingStatus:
0.  Before start      -> 10
10. Playing Intro     -> 1
1.  Show next / End   -> 11/12
11. Playing Random    -> 1/2
2.  Finished All -> End -> 3
12. Playing Outro     -> 2
3.  Finished Restart  -> 0
*/

class EyeEx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      playbackObject: null,
      volume: 1.0,
      audioIndex: 0,
      playingStatus: 0,
      isBuffering: false,
      playingImage: null,
    };
    useLocalization();
  }

  async getAudio(playWhichOne) {
    const { play, volume, audioIndex, playingStatus } = this.state;
    try {
      const playbackObject = new Audio.Sound();
      const status = {
        shouldPlay: play,
        volume,
      };
      this.setState({ playbackObject: playbackObject });
      var source = null;
      playbackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      if (playWhichOne == 0) {
        source = intro;
        for (let i = 0; i < audios.length; ++i) {
          let j = rand(audios.length);
          let temp = audios[i];
          audios[i] = audios[j];
          audios[j] = temp;
        }
      } else if (playWhichOne == 1) source = audios[audioIndex];
      else if (playWhichOne == 2) source = outro;
      await playbackObject.loadAsync(source.audio, status, false);
      this.setState({ playingImage: source.image });
    } catch (e) {
      console.log(e);
    }
  }
  onPlaybackStatusUpdate = async (status) => {
    const { playbackObject, playingStatus, audioIndex } = this.state;
    if (status.didJustFinish) {
      await playbackObject.stopAsync();
      //await Brightness.useSystemBrightnessAsync();
      if (playingStatus == 10) this.setState({ playingStatus: 1 });
      else if (playingStatus == 11) {
        this.setState({ audioIndex: audioIndex + 1 });
        if (audioIndex == audios.length - 1) this.setState({ playingStatus: 2 });
        else this.setState({ playingStatus: 1 });
      } else if (playingStatus == 12) this.setState({ playingStatus: 3 });
    }
    this.setState({
      isBuffering: status.isBuffering,
    });
  };

  render() {
    const PressPlayButton = async (playWhichOne) => {
      await this.getAudio(playWhichOne);
      //await Brightness.setBrightnessAsync(0);
      const { playbackObject } = this.state;
      await playbackObject.playAsync();
      this.setState({ playingStatus: 10 + playWhichOne });
    };

    const notFocused = async () => {
      if (this.state.playbackObject) {
        await this.state.playbackObject.stopAsync();
        this.setState({
          play: false,
          playbackObject: null,
          audioIndex: 0,
          playingStatus: 0,
          isBuffering: false,
        });
      }
    };

    const { playingStatus, audioIndex, playingImage } = this.state;

    if (this.props.isFocused == false) {
      notFocused();
      return (
        <MenuScreen>
          <View style={styles.background} />
        </MenuScreen>
      );
    }

    return (
      <MenuScreen>
        <View style={styles.background}>
          {playingStatus == 0 && (
            <View style={styles.secondaryContainer}>
              <View style={styles.textContain}>
                <Text style={styles.text}>{i18n.t('eye_exercise_1')}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.boxes}
                  onPress={() => {
                    if (this.state.isBuffering == false) PressPlayButton(0);
                  }}
                >
                  <Text style={styles.buttonText}>開始</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {playingStatus == 1 && (
            <View style={styles.secondaryContainer}>
              <View style={styles.textContain}>
                {audioIndex == 0 ? (
                  <Text style={styles.text}>
                    {i18n.t('eye_exercise_2_1')}{audios.length}{i18n.t('eye_exercise_2_2')}
                  </Text>
                ) : (
                  <Text style={styles.text}>
                    {i18n.t('eye_exercise_3_1')}{audioIndex}/{audios.length}{i18n.t('eye_exercise_3_2')}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  style={styles.boxes}
                  onPress={() => {
                    if (this.state.isBuffering == false) PressPlayButton(1);
                  }}
                >
                  <Text style={styles.buttonText}>{i18n.t('eye_exercise_button_1')}</Text>
                </TouchableOpacity>
                {audioIndex != 0 && (
                  <TouchableOpacity
                    style={styles.boxes}
                    onPress={() => {
                      if (this.state.isBuffering == false) PressPlayButton(2);
                    }}
                  >
                    <Text style={styles.buttonText}>{i18n.t('eye_exercise_button_2')}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          {playingStatus == 2 && (
            <View style={styles.secondaryContainer}>
              <View style={styles.textContain}>
                <Text style={styles.text}>{i18n.t('eye_exercise_4')}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.boxes}
                  onPress={() => {
                    if (this.state.isBuffering == false) PressPlayButton(2);
                  }}
                >
                  <Text style={styles.buttonText}>{i18n.t('eye_exercise_5')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {playingStatus == 3 && (
            <View style={styles.secondaryContainer}>
              <View style={styles.textContain}>
                <Text style={styles.text}>{i18n.t('eye_exercise_6')}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity style={styles.boxes} onPress={() => this.setState({ playingStatus: 0, audioIndex: 0 })}>
                  <Text style={styles.buttonText}>{i18n.t('eye_exercise_7')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {playingStatus >= 10 && (
            <View style={styles.secondaryContainer}>
              <View style={styles.textContain}>
                <Text style={[styles.text, { fontSize: 72, lineHeight: 100 }]}>{"👁️  👁️"}</Text>
              </View>
            </View>
          )}
        </View>
        <FABView />
      </MenuScreen>
    );
  }
}

export default function EyeExercise(props) {
  const isFocused = useIsFocused();
  return <EyeEx {...props} isFocused={isFocused} />;
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  secondaryContainer: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 90,
    marginBottom: 30,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "white",
  },
  textContain: {
    flex: 4,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: ScreenWidth / 16,
    fontWeight: "bold",
    lineHeight: (ScreenWidth / 16) * 1.2,
    color: "white",
  },
  boxes: {
    height: (ScreenWidth / 16) * 2,
    width: (ScreenWidth / 16) * 5,
    borderRadius: ScreenWidth / 16,
    backgroundColor: "white",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: ScreenWidth / 16,
    color: "#3CA1B7",
  },
});
