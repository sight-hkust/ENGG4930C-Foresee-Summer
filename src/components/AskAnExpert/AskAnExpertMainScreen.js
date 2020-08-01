import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Grid, Col } from 'react-native-easy-grid';
import Modal from 'react-native-modal';

import { ScreenHeight, ScreenWidth } from '../../../constant/Constant';
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground';
import MenuScreen from '../../../Utils/MenuScreen';

import { connect } from 'react-redux';
import { watchQuestionListUpdate, questionList } from '../../reducers/askProfessionalList';
import FABView from '../../../Utils/FAB';
import { actionCounter } from '../../helpers/actionCounter';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Surface } from 'react-native-paper';

const SPECIAL_TAG_1 = '眼睛疼痛';
const SPECIAL_TAG_2 = '視力模糊';
const SPECIAL_TAG_3 = '分泌物';

const SPECIAL_TAG_1_COLOR = '#DFB6FF';
const SPECIAL_TAG_2_COLOR = '#FFED73';
const SPECIAL_TAG_3_COLOR = '#94DFC9';

const NORMAL_TAG_COLOR = '#B9C6F4';

const AskAnExpertMainScreen = ({ route, navigation, questionListStore }) => {
  let hotTopicCounter = 0;

  const { questionList } = questionListStore;

  const [loaded, setLoaded] = useState(false);

  const [hotQuestionlist, setHotQuestionlist] = useState([]);

  useEffect(() => {
    hotTopicCounter = 0;
    if (questionList && !loaded) {
      setHotQuestionlist(
        questionList.sort(function (a, b) {
          return b.views - a.views;
        })
      );

      setLoaded(true);
    }
  }, [questionList]);

  return (
    <MenuScreen style={{ height: 0 }}>
      {questionList && loaded && (
        <>
          <View style={styles.container}>
            <View style={{ ...styles.linearbackgorundContainer }}>
              <LinearGradientBackground colors={['#1772A6', '#A377FF']} start={[0, 1]} end={[1, 0]} locations={[0.12, 0.92]} />
            </View>
            <View style={{ width: ScreenWidth, marginTop: hp('7.5%'), zIndex: 3, height: hp('27%') }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: hp('3%'),
                  marginLeft: ScreenWidth * 0.05 + 10,
                }}
              >
                熱門
              </Text>
              {hotQuestionlist && (
                <FlatList
                  data={hotQuestionlist.slice(0, 4)}
                  horizontal={true}
                  renderItem={({ item }) => {
                    hotTopicCounter++;
                    return <HotQuestionCard faq={item} key={item.id} counter={hotTopicCounter - 1} />;
                  }}
                  keyExtractor={(item) => item.id}
                  style={{ marginTop: hp('3%'), height: 180, zIndex: 4 }}
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </View>

            <View style={styles.background}>
              <Grid
                style={{
                  bottom: ScreenHeight * 0.5,
                  position: 'absolute',
                  width: ScreenWidth,
                }}
              >
                <Col style={{ paddingLeft: ScreenWidth * 0.1 }}>
                  <Button
                    title="最新"
                    type="clear"
                    onPress={() => navigation.navigate('PostQuestion')}
                    titleStyle={{ color: '#24559E', fontWeight: 'bold', fontSize: hp('3%') }}
                    containerStyle={{ width: wp('20%') }}
                    size={15}
                    disabled={true}
                  />
                </Col>
                <Col style={{ paddingLeft: ScreenWidth * 0.1, zIndex: 3 }}>
                  <Button
                    title=" 發問"
                    icon={<Icon size={wp('7%')} name="edit" type="ionicons" color="#1772A6" />}
                    type="clear"
                    onPress={() => navigation.navigate('PostQuestion')}
                    titleStyle={{ color: '#1772A6', fontSize: hp('3%') }}
                    containerStyle={{ marginRight: wp('7%') }}
                    size={15}
                    TouchableComponent={TouchableOpacity}
                  />
                </Col>
              </Grid>

              <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
                {questionList.map((item, index) => {
                  return <MiniQuestionCard key={index} faq={item} />;
                })}
              </ScrollView>
            </View>
          </View>
        </>
      )}
      <FABView />
    </MenuScreen>
  );
};

export const HotQuestionCard = (props) => {
  const RGB = [20, 52, 101];

  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View
      style={{
        ...styles.shadow,
        ...{ paddingHorizontal: wp('2.3%') },
      }}
    >
      <Surface style={{ ...{ elevation: 12, borderRadius: 31 } }}>
        <View style={styles.hotTopicCard}>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
              actionCounter('askProf', props.faq.question_id, 'views');
            }}
          >
            <LinearGradientBackground
              colors={[
                `rgb(${RGB[0] + (props.counter % 4) * 12},${RGB[1] + (props.counter % 4) * 36}, ${RGB[2] + (props.counter % 4) * 28})`,
                `rgb(${RGB[0] + ((props.counter % 4) + 1) * 12},${RGB[1] + ((props.counter % 4) + 1) * 36}, ${RGB[2] + ((props.counter % 4) + 1) * 28})`,
              ]}
              start={[0, 1]}
              end={[1, 0]}
              locations={[0.2, 0.7]}
            >
              <Text style={styles.hotTopicCardText}>{props.faq.question_title.length <= 14 ? props.faq.question_title : props.faq.question_title.substring(0, 14) + '...'}</Text>
            </LinearGradientBackground>
          </TouchableOpacity>
          <QuestionCard isVisible={isVisible} toggleModal={toggleModal} faq={props.faq} />
        </View>
      </Surface>
    </View>
  );
};

export const MiniQuestionCard = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.shadow}>
      <Surface style={styles.miniQuestion}>
        <TouchableOpacity
          onPress={() => {
            toggleModal();
            actionCounter('askProf', props.faq.question_id, 'views');
          }}
        >
          <View style={{ paddingHorizontal: wp('3%'), paddingTop: hp('1%'), width: '100%' }}>
            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 5 }}>
              {props.faq.tags.map((item) => {
                switch (item) {
                  case SPECIAL_TAG_1:
                    return <Label color={SPECIAL_TAG_1_COLOR} text={item} />;
                  case SPECIAL_TAG_2:
                    return <Label color={SPECIAL_TAG_2_COLOR} text={item} />;
                  case SPECIAL_TAG_3:
                    return <Label color={SPECIAL_TAG_3_COLOR} text={item} />;
                  default:
                    return <Label color={NORMAL_TAG_COLOR} text={item} />;
                }
              })}
            </View>
            <Text style={styles.miniQuestionTitle}>{'問。' + props.faq.question_title}</Text>
            <Text style={styles.miniQuestionContent}>{props.faq.question_content.length > 34 ? props.faq.question_content.substring(0, 38) + ' . . . . ' : props.faq.question_content}</Text>
          </View>
        </TouchableOpacity>
        <QuestionCard isVisible={isVisible} toggleModal={toggleModal} faq={props.faq} />
      </Surface>
    </View>
  );
};

export const QuestionCard = (props) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Modal isVisible={props.isVisible} style={styles.questionCardModal}>
      <Grid>
        <Col>
          <TouchableOpacity style={{ position: 'absolute', top: hp('3%'), left: wp('5%') }} onPress={() => props.toggleModal(!props.isVisible)}>
            <Image source={require('../../../assets/images/BackArrow.png')} />
          </TouchableOpacity>
        </Col>
        {/* <Icon
          containerStyle={{ position: 'absolute', top: hp('2%'), right: wp('5%') }}
          name={!bookmarked ? 'bookmark' : 'bookmark-alt'}
          type="fontisto"
          size={wp('10%')}
          color={bookmarked ? 'red' : 'black'}
          onPress={() => setBookmarked(!bookmarked)}
        /> */}
        <Col></Col>
      </Grid>
      <View style={styles.questionCard}>
        <View style={{ padding: 20 }}>
          <Text style={styles.questionCardTitle}>{'問。\n' + props.faq.question_title}</Text>
          <ScrollView>
            <Text style={styles.questionCardContent}>{props.faq.question_content}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.questionCard}>
        <View style={{ padding: 20 }}>
          <Text style={styles.questionCardTitle}>
            {'答。\n' + props.faq.prof_name}
            <Text style={{ fontSize: 15, color: '#24559E', fontWeight: 'normal' }}> {props.faq.prof_title}</Text>
          </Text>
          <ScrollView>
            <Text style={styles.questionCardContent}>{props.faq.answer}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const Label = (props) => {
  return (
    <View style={{ ...styles.label, ...{ backgroundColor: props.color } }}>
      <Text style={styles.labelContent}> #{props.text} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    height: ScreenHeight * 0.9,
  },
  linearbackgorundContainer: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    width: ScreenWidth,
    height: hp('32%'),
    position: 'absolute',
    top: hp('-7.5%'),
    zIndex: 1,
  },
  background: {
    backgroundColor: 'white',
    width: ScreenWidth,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  scrollView: {
    height: ScreenHeight * 0.45,
    // paddingHorizontal: ScreenWidth * 0.1,
    marginTop: ScreenHeight * 0.7,
    marginBottom: 30,
  },
  hotTopicCard: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: 30,
    overflow: 'hidden',
  },
  hotTopicCardText: {
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  miniQuestion: {
    backgroundColor: '#E1EDFF',
    borderRadius: 30,
    height: hp('19%'),
    width: wp('80%'),
    marginVertical: hp('1.8%'),
    overflow: 'hidden',
    alignSelf: 'center',
    elevation: 7,
  },
  miniQuestionTitle: {
    fontSize: hp('1.8%'),
    color: '#1772A6',
    fontWeight: 'bold',
    paddingBottom: hp('2%'),
  },
  miniQuestionContent: {
    fontSize: hp('1.8%'),
    color: '#2D9CDB',
  },
  questionCardModal: {
    backgroundColor: 'rgb(225, 237, 255)',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'flex-end',
    margin: 0,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: hp('35%'),
    width: wp('80%'),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  questionCardTitle: {
    fontSize: wp('6%'),
    color: '#24559E',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  questionCardContent: {
    fontSize: wp('4.25%'),
    color: '#2D9CDB',
  },
  labelContainer: {
    flexDirection: 'row',
  },
  label: {
    height: hp('3.2%'),
    width: wp('20%'),
    marginRight: 10,
    backgroundColor: '#94DFC9',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 8,
  },
  labelContent: {
    fontSize: wp('3.5%'),
    color: '#1772A6',
  },
  shadow: {
    shadowColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
});

const mapStateToProps = (state) => {
  return {
    questionListStore: state.questionList,
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(watchQuestionListUpdate());
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AskAnExpertMainScreen);
