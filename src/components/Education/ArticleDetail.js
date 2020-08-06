import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { database, storage } from '../../config/config';
import React, { Component } from 'react';
import { Audio, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import * as ScreenOrientation from 'expo-screen-orientation';
import { ScreenWidth, ScreenHeight, FontScale } from '../../../constant/Constant';
import { WebView } from 'react-native-webview';
import moment from 'moment';

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
      isBuffering: true,
      article_id: article_id, //this.props.route.params.article_id then remove from state
      content: '',
      subject: '',
      image: '',
      audio: null,
      video: null,
      isVid: false,
      videoHeight: ScreenWidth * 0.5625,
      startTime: null,
    };
  }

  mountVid = (component) => {
    this.video = component;
    this._handleVidRef(true);
  };

  async _handleVidRef(playing) {
    const { video } = this.state;
    var vid;
    if (video.slice(-16) == '_mp4compress.mp4') {
      vid = await storage.ref(video).getDownloadURL();
      //console.log(vid);
    } else vid = video;
    try {
      const status = {
        shouldPlay: playing,
      };
      const source = { uri: vid };
      await this.video.loadAsync(source, status, false);
      this.setState({ playbackObject: this.video, isBuffering: false });
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
    let startTime = moment();
    console.log('MOUNT:', startTime);
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
              startTime: startTime,
            });
          } else {
            this.setState(
              {
                content: childData.content,
                subject: childData.subject,
                isVid: childData.isVid,
                image: childData.image,
                audio: childData.audio,
                startTime: startTime,
              },
              () => {
                this.getAudio();
              }
            );
          }
        });
      });
  }

  async componentWillUnmount() {
    let endTime = moment();
    console.log('MOUNT:', this.state.startTime);
    console.log('UNMOUNT:', endTime);
    console.log('USED:', endTime.diff(this.state.startTime));
    if (this.state.playbackObject) await this.state.playbackObject.pauseAsync();
    else console.log('No playbackobject');
  }

  render() {
    const PressPlayButton = async () => {
      const { play, playbackObject } = this.state;
      play ? await playbackObject.pauseAsync() : await playbackObject.playAsync();
      this.setState({ play: !play });
    };

    return (
      <View style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
        <View>
          {this.state.isVid && (
            <View>
              {this.state.isBuffering == true && (
                <ActivityIndicator
                  color="#00acc1"
                  size="large"
                  style={{
                    width: ScreenWidth,
                    height: this.state.videoHeight,
                  }}
                />
              )}
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
                  width: this.state.isBuffering == true ? 0 : ScreenWidth,
                  height: this.state.isBuffering == true ? 0 : this.state.videoHeight,
                }}
              />

              <Text style={[ArticleDetailStyles.videoSubject, { marginTop: ScreenHeight * 0.03 }]}>{this.state.subject}</Text>
            </View>
          )}

          {!this.state.isVid && (
            <>
              <View style={{ position: 'absolute' }}>
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
              </View>
              <View style={{ marginTop: ScreenWidth * 0.45 }}>
                <Text style={[ArticleDetailStyles.articleSubject]}>{this.state.subject}</Text>
              </View>
            </>
          )}
        </View>

        <View style={{ alignItems: 'center', flex: 1, marginTop: ScreenHeight * 0.03 }}>
          {!this.state.isVid && this.state.audio != '' && this.state.audio != null && (
            <Button title={this.state.play ? '暫停錄音' : '播放錄音'} titleStyle={ArticleDetailStyles.buttonTitle} onPress={() => PressPlayButton()} buttonStyle={ArticleDetailStyles.playButton} />
          )}
          <View style={{ width: ScreenWidth, flex: 1 }}>
            <WebView style={{ backgroundColor: 'transparent' }} originWhitelist={['*']} source={{ html: this.state.content }} />
          </View>
        </View>
      </View>
    );
  }
}

const ArticleDetailStyles = StyleSheet.create({
  articleSubject: {
    fontSize: ScreenHeight * 0.04,
    paddingHorizontal: 30,
    color: '#24559E',
    fontWeight: 'bold',
  },
  videoSubject: {
    fontSize: ScreenHeight * 0.04,
    paddingHorizontal: 30,
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
    width: '100%',
  },
  videoContent: {
    paddingTop: 70,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
    fontSize: 18,
    color: '#4D8AE4',
    textAlign: 'justify',
    width: '100%',
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
