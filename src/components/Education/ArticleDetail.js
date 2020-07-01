import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { database } from '../../../src/config/config';
import React, { Component } from 'react';
import { Audio, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import * as ScreenOrientation from 'expo-screen-orientation';
import { ScreenWidth, ScreenHeight, FontScale } from '../../../constant/Constant';

export default class ArticleDetailScreen extends Component {
  constructor(props) {
    super(props);
    const { article_id } = this.props.route.params;
    //console.log(article_id);
    this.playbackInstance = null;
    this.state = {
      play: false,
      playbackObject: null,
      volume: 1.0,
      isBuffering: false,
      article_id: article_id, //this.props.route.params.article_id then remove from state
      content: '',
      subject: '',
      image: null,
      audio: null,
      video: null,
      isVid: false,
      videoHeight: ScreenWidth * 0.5625,
    };
  }

  mountVid = (component) => {
    this.video = component;
    this._handleVidRef(true);
  };

  async _handleVidRef(playing) {
    const { video } = this.state;
    try {
      const status = {
        shouldPlay: playing,
      };
      const source = { uri: video };

      await this.video.loadAsync(source, status, false);
      this.setState({ playbackObject: this.video });
    } catch (e) {
      console.log(e);
    }
  }

  onFullScreenPressed = () => {
    this.video.presentFullscreenPlayer();
  };

  fullscreencontrol = (event) => {
    if (event.fullscreenUpdate == 0) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    if (event.fullscreenUpdate == 3) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  async getAudio() {
    const { play, volume, audio } = this.state;

    try {
      const playbackObject = new Audio.Sound();
      const source = { uri: audio };

      const status = {
        shouldPlay: play,
        volume,
      };

      playbackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackObject.loadAsync(source, status, false);
      this.setState({ playbackObject: playbackObject });
    } catch (e) {
      console.log(e);
    }
  }
  onPlaybackStatusUpdate = (status) => {
    this.setState({ isBuffering: status.isBuffering });
  };

  componentDidMount() {
    database
      .ref('contents/articles')
      .orderByChild('article_id')
      .equalTo(this.state.article_id)
      .once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childData.isVid) {
            this.setState({
              content: childData.content,
              subject: childData.subject,
              isVid: childData.isVid,
              video: childData.video,
            });
          } else {
            this.setState(
              {
                content: childData.content,
                subject: childData.subject,
                isVid: childData.isVid,
                image: childData.image,
                audio: childData.audio,
              },
              () => {
                this.getAudio();
              }
            );
          }
        });
      });
  }

  componentWillUnmount() {
    this.state.playbackObject.pauseAsync();
    console.log('unmount');
  }

  render() {
    const PressPlayButton = async () => {
      const { play, playbackObject } = this.state;
      play ? await playbackObject.pauseAsync() : await playbackObject.playAsync();
      this.setState({ play: !play });
    };

    return (
      <View style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
        <View>
          {this.state.isVid && (
            <>
              <Video
                ref={this.mountVid}
                resizeMode="contain"
                useNativeControls={true}
                onReadyForDisplay={(params) => {
                  this.setState({
                    videoHeight: (ScreenWidth / params.naturalSize.width) * params.naturalSize.height,
                  });
                }}
                onFullscreenUpdate={this.fullscreencontrol}
                style={{
                  width: ScreenWidth,
                  height: this.state.videoHeight,
                }}
              />
              <Text style={[ArticleDetailStyles.videoSubject, { top: this.state.videoHeight + 20 }]}>{this.state.subject}</Text>
            </>
          )}

          {!this.state.isVid && (
            <>
              <Image source={{ uri: this.state.image }} style={{ width: ScreenWidth, height: ScreenWidth * 0.5625 }} />
              <LinearGradient
                colors={['transparent', 'transparent', '#F6F6F6']}
                locations={[0, 0.2, 1]}
                style={{
                  position: 'absolute',
                  height: ScreenWidth * 0.5625,
                  width: Dimensions.get('window').width,
                  resizeMode: 'cover',
                }}
              ></LinearGradient>
              <Text style={[ArticleDetailStyles.articleSubject, { top: ScreenWidth * 0.5625 - 30 }]}>{this.state.subject}</Text>
            </>
          )}
        </View>

        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            {!this.state.isVid && (
              <Button title={this.state.play ? '暫停錄音' : '播放錄音'} titleStyle={ArticleDetailStyles.buttonTitle} onPress={() => PressPlayButton()} buttonStyle={ArticleDetailStyles.playButton} />
            )}
            <Text style={this.state.isVid ? ArticleDetailStyles.videoContent : ArticleDetailStyles.articleContent}>{this.state.content}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const ArticleDetailStyles = StyleSheet.create({
  articleSubject: {
    position: 'absolute',
    top: 210,
    fontSize: 30,
    paddingLeft: 30,
    color: '#24559E',
    fontWeight: 'bold',
  },
  videoSubject: {
    position: 'absolute',
    fontSize: 30,
    paddingLeft: 30,
    color: '#24559E',
    fontWeight: 'bold',
  },
  articleContent: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
    fontSize: 18,
    color: '#4D8AE4',
    textAlign: 'justify',
  },
  videoContent: {
    paddingTop: 70,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
    fontSize: 18,
    color: '#4D8AE4',
  },
  playButton: {
    backgroundColor: '#8BB5F4',
    marginTop: 25,
    paddingTop: 5,
    width: 120,
  },
  buttonTitle: {
    fontSize: 20,
  },
});
