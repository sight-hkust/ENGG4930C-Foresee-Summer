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
import FABView from "../../../Utils/FAB";
import { ScreenHeight } from "../../../constant/Constant";

// "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3"
// "https://ia800500.us.archive.org/10/items/VwFantasiaOngreensleevesmarriner/1-01VaughanWilliams_FantasiaOnGreensleeves.mp3",
// "https://pic.pikbest.com/00/40/38/526888piCCwr.mp3"

function rand(x) {
  return Math.floor(Math.random() * x);
}

var audios = [
  {
    audio: require("../../../assets/audio/EyeExercise-01.m4a"),
    image: require("../../../assets/images/EyeExercise-01.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-02.m4a"),
    image: require("../../../assets/images/EyeExercise-02.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-03.m4a"),
    image: require("../../../assets/images/EyeExercise-03.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-04.m4a"),
    image: require("../../../assets/images/EyeExercise-04.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-05.m4a"),
    image: require("../../../assets/images/EyeExercise-05.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-06.m4a"),
    image: require("../../../assets/images/EyeExercise-06.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-07.m4a"),
    image: require("../../../assets/images/EyeExercise-07.gif"),
  },
  {
    audio: require("../../../assets/audio/EyeExercise-08.m4a"),
    image: require("../../../assets/images/EyeExercise-08.gif"),
  },
];

const intro = {
  audio: require("../../../assets/audio/EyeExercise-Intro.m4a"),
  image: require("../../../assets/images/EyeExercise-Intro.gif"),
};
const outro = {
  audio: require("../../../assets/audio/EyeExercise-Outro.m4a"),
  image: require("../../../assets/images/EyeExercise-Outro.gif"),
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

export default class EyeExercise extends Component {
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
        if (audioIndex == audios.length - 1)
          this.setState({ playingStatus: 2 });
        else this.setState({ playingStatus: 1 });
      } else if (playingStatus == 12) this.setState({ playingStatus: 3 });
    }
    this.setState({
      isBuffering: status.isBuffering,
    });
  };

  /*componentDidMount() {
    console.log("mount");
  }*/

  render() {
    const PressPlayButton = async (playWhichOne) => {
      await this.getAudio(playWhichOne);
      //await Brightness.setBrightnessAsync(0);
      const { playbackObject } = this.state;
      await playbackObject.playAsync();
      this.setState({ playingStatus: 10 + playWhichOne });
    };

    const { playingStatus, audioIndex, playingImage } = this.state;

    return (
      <>
        <FABView />
        <View style={styles.background}>
          <LinearGradient
            colors={["#1872a7", "#5a74d1", "#a676ff"]}
            start={[0, 0.9]}
            end={[1, 0.1]}
            locations={[0, 0.5, 1]}
            style={{
              height: "100%",
              paddingBottom: ScreenHeight * 0.1,
            }}
          >
            {playingStatus == 0 && (
              <View style={styles.secondaryContainer}>
                <Text style={styles.text}>
                  {
                    "按下「開始」，\n讓眼睛離開手機屏幕，\n跟隨聲音導航開始護眼運動"
                  }
                </Text>
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
                <Text style={styles.text}>
                  你已完成{audioIndex}/{audios.length}段護眼運動。{"\n"}
                  想繼續嗎？
                </Text>
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
                    <Text style={styles.buttonText}>繼續</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.boxes}
                    onPress={() => {
                      if (this.state.isBuffering == false) PressPlayButton(2);
                    }}
                  >
                    <Text style={styles.buttonText}>完前緩和</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {playingStatus == 2 && (
              <View style={styles.secondaryContainer}>
                <Text style={styles.text}>
                  {"你已完成全部護眼運動，\n只差讓眼睛緩和的步驟！"}
                </Text>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.boxes}
                    onPress={() => {
                      if (this.state.isBuffering == false) PressPlayButton(2);
                    }}
                  >
                    <Text style={styles.buttonText}>完前緩和</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {playingStatus == 3 && (
              <View style={styles.secondaryContainer}>
                <Text style={styles.text}>
                  <Text style={{ fontSize: 6, lineHeight: 0 }}>
                    {"甚麼？你看到奇怪的畫面？剛才眼睛要離開手機屏幕哦！\n"}
                  </Text>
                  你已完成這次的護眼運動！
                </Text>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.boxes}
                    onPress={() =>
                      this.setState({ playingStatus: 0, audioIndex: 0 })
                    }
                  >
                    <Text style={styles.buttonText}>再來一組</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {
              /*test*/ playingStatus == 12 && (
                <View
                  style={{
                    height: ScreenHeight,
                    justifyContent: "center",
                    backgroundColor: "black",
                  }}
                >
                  <Image
                    style={{ width: "100%" }}
                    source={playingImage}
                    resizeMode="contain"
                  />
                </View>
              )
            }
            {playingStatus >= 10 && playingStatus < 12 && (
              <View style={styles.secondaryContainer}>
                <View
                  style={{
                    flex: 4,
                    alignItems: "center",
                    padding: 20,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ width: "100%" }}
                    source={playingImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ flex: 0, alignItems: "center" }} />
              </View>
            )}
          </LinearGradient>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: "black",
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
    marginBottom: 10,
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
