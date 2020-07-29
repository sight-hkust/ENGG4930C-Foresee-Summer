import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';

import { LinearGradientBackground } from '../../../../Utils/LinearGradientBackground';
import { watchUserArticleScore } from '../../../reducers/userArticleScores';
import { connect } from 'react-redux';

const DashboardScreen = ({ route, navigation, userArticleScoreListStore }) => {
  const [articles, setArticles] = useState(route.params?.articles);
  const [userTotalScore, setUserTotalScore] = useState(0);
  const { userArticleScoreList } = userArticleScoreListStore;

  useEffect(() => {
    setArticles(route.params?.articles);
    if (userArticleScoreList != null && userArticleScoreList != undefined) {
      var score = 0;
      var totalAtriclesScore = articles.length;
      userArticleScoreList.map((articles_list) => {
        Object.values(articles_list).map((article) => {
          article['score'] != null && article['score'] != undefined ? (score += article['score']) : (score += 0);
        });
      });

      setUserTotalScore(Math.floor(score / totalAtriclesScore));
    }
  }, [route.params?.articles, userArticleScoreList]);

  var yScroll = new Animated.Value(0);

  navigation.setOptions({
    headerRightContainerStyle: {
      position: 'absolute',
      transform: [
        {
          translateY: yScroll.interpolate({
            inputRange: [0, 80],
            outputRange: [0, -200],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
    headerTitleStyle: {
      transform: [
        {
          translateY: yScroll.interpolate({
            inputRange: [0, 80],
            outputRange: [0, -200],
            extrapolate: 'clamp',
          }),
        },
      ],
      fontWeight: 'bold',
      fontSize: 28,
      color: '#E1EDFF',
      overflow: 'hidden',
    },
    headerLeftContainerStyle: {
      position: 'absolute',
      transform: [
        {
          translateY: yScroll.interpolate({
            inputRange: [0, 80],
            outputRange: [0, -200],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
  });

  return (
    <LinearGradientBackground style={{ height: '100%' }} colors={['#1772A6', '#A377FF']} start={[0, 1]} end={[1, 0]} locations={[0.12, 0.92]}>
      {userArticleScoreList && (
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: yScroll,
                },
              },
            },
          ])}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={{ color: '#fff', fontSize: hp('3%'), marginBottom: hp('3%'), fontWeight: 'bold' }}> 你已完成了總進度{userTotalScore}%！ </Text>
            <AnimatedCircularProgress
              tintColor="rgb(255, 204, 0)"
              tintColorSecondary="#00e0ff"
              backgroundColor="#3d5875"
              backgroundWidth={25}
              lineCap="round"
              size={250}
              width={15}
              fill={userTotalScore + 0.1}
              prefill={0.1}
              duration={2000}
              backgroundColor="#3d5875"
            >
              {(fill) => <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), alignSelf: 'center' }}>{userTotalScore} % </Text>}
            </AnimatedCircularProgress>
            <Button
              disabled
              title="進度一覽"
              type="clear"
              disabledTitleStyle={{ marginLeft: wp('3%'), color: '#fff', fontSize: hp('3%'), marginVertical: hp('3%'), fontWeight: 'bold' }}
              icon={<Icon type="font-awesome-5" name="award" color="#fff" size={hp('5%')} />}
            />

            <Text style={{ marginLeft: wp('3%'), color: '#fff', fontSize: hp('2.5%'), marginBottom: hp('3%'), fontWeight: 'bold' }}> 完成測驗以解鎖獎勵 ！</Text>

            <View style={styles.progressContainer}>
              {articles.map((item) => {
                return <ProgressView key={item['_uid']} articles={item} userScore={userArticleScoreList} navigation={navigation} />;
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </LinearGradientBackground>
  );
};

const ProgressView = (props) => {
  const [userData, setUserData] = useState(props.userScore[0][props.articles['_uid']]);
  const [userScore, setUserScore] = useState(userData != undefined ? userData['score'] : 0);

  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);

  function animate() {
    setTimeout(() => {
      let progress = 0;
      setIndeterminate(false);
      setInterval(() => {
        progress += 30;

        if (progress > userScore / 100) {
          progress = userScore / 100;
        }
        setProgress(progress);
      }, 500);
    }, 1000);
  }

  useEffect(() => {
    animate();
  }, []);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 20 }}>
      <View style={{ marginBottom: hp('4%'), width: '60%' }}>
        <View style={{ flexDirection: 'row', marginBottom: hp('1.5%') }}>
          <Icon type="material-community" name="frequently-asked-questions" color="#fff" size={24} containerStyle={{ marginRight: 10, alignSelf: 'center' }} />
          <Text style={styles.progressbarTitle}>{props.articles['subject']}</Text>
        </View>
        <Progress.Bar
          width={wp('65%')}
          height={hp('1%')}
          borderColor="#3d5875"
          unfilledColor="#e1eec3"
          borderWidth={3}
          borderRadius={10}
          progress={progress}
          indeterminate={indeterminate}
          color="#06beb6"
        />
      </View>
      <View style={{ width: wp('20%'), marginLeft: wp('10%') }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: hp('2.5%'), textAlign: 'right' }}> {userScore} % </Text>
      </View>
      <Button
        type="clear"
        iconRight={true}
        icon={<Icon name="chevron-with-circle-right" type="entypo" color="#fff" />}
        TouchableComponent={TouchableOpacity}
        onPress={() => {
          props.navigation.navigate('ArticleDetailScreen', { article_id: props.articles['_uid'] });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp('13.5%'),
  },
  title: {
    alignSelf: 'center',
    fontSize: hp('3%'),
    color: '#fff',
  },
  progressContainer: {
    width: wp('99%'),
    height: hp('99%'),
  },
  progressbarTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
});

const mapStateToProps = (state) => {
  return {
    userArticleScoreListStore: state.userArticleScoreList,
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(watchUserArticleScore());
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
