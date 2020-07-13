import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Grid, Col } from 'react-native-easy-grid';
import Modal from 'react-native-modal';

import { ScreenHeight, ScreenWidth } from '../../../constant/Constant';
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground';
import MenuScreen from '../../../Utils/MenuScreen';

import { connect } from 'react-redux';
import { watchQuestionListUpdate, questionList } from '../../reducers/askProfessionalList';
import HeaderRightButton from '../../../Utils/HeaderRightButton';
import FABView from '../../../Utils/FAB';

const SPECIAL_TAG_1 = '眼精疼痛';
const SPECIAL_TAG_2 = '視力模糊';
const SPECIAL_TAG_3 = '分泌物';

const SPECIAL_TAG_1_COLOR = '#DFB6FF';
const SPECIAL_TAG_2_COLOR = '#FFED73';
const SPECIAL_TAG_3_COLOR = '#94DFC9';

const NORMAL_TAG_COLOR = '#B9C6F4';

const AskAnExpertMainScreen = ({ route, navigation, questionListStore }) => {
  let hotTopicCounter = 0;

  const { questionList } = questionListStore;

  useEffect(() => {
    hotTopicCounter = 0;
  }, []);

  return (
    <MenuScreen style={{ height: 0 }}>
      {questionList != null && (
        <>
          <View style={styles.linearbackgorundContainer}>
            <LinearGradientBackground
              style={{ height: ScreenHeight }}
              colors={["#1772A6", "#A377FF"]}
              start={[0, 1]}
              end={[1, 0]}
              locations={[0.12, 0.92]}
            />
          </View>
          <View style={styles.container}>
            <View style={{ width: ScreenWidth, marginTop: 50, zIndex: 1 }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 25,
                  marginLeft: ScreenWidth * 0.05 + 10,
                }}
              >
                熱門
              </Text>
              <FlatList
                data={questionList.slice(0, 4)}
                horizontal={true}
                renderItem={({ item }) => {
                  hotTopicCounter++;
                  return (
                    <HotQuestionCard
                      style={
                        hotTopicCounter == 1 && {
                          marginLeft: ScreenWidth * 0.03,
                        }
                      }
                      faq={item}
                      key={item.id}
                      counter={hotTopicCounter - 1}
                    />
                  );
                }}
                keyExtractor={(item) => item.id}
                style={{ marginTop: 26, height: 180 }}
                showsHorizontalScrollIndicator={false}
              />
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
                  <Text
                    style={{
                      color: '#24559E',
                      fontWeight: 'bold',
                      fontSize: 25,
                    }}
                  >
                    最新
                  </Text>
                </Col>
                <Col style={{ paddingLeft: ScreenWidth * 0.1 }}>
                  <Icon size={35} name="edit" type="feather" color="black" onPress={() => navigation.navigate('PostQuestion')} Component={TouchableOpacity} />
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
    <View style={{ ...styles.shadow }}>
      <TouchableOpacity style={{ ...styles.hotTopicCard, ...props.style }} onPress={toggleModal}>
        <LinearGradientBackground
          colors={[
            `rgb(${RGB[0] + props.counter * 12},${RGB[1] + props.counter * 36}, ${RGB[2] + props.counter * 28})`,
            `rgb(${RGB[0] + (props.counter + 1) * 12},${RGB[1] + (props.counter + 1) * 36}, ${RGB[2] + (props.counter + 1) * 28})`,
          ]}
          start={[0, 1]}
          end={[1, 0]}
          locations={[0.2, 0.7]}
        >
          <Text style={styles.hotTopicCardText}>{props.faq.question_title}</Text>
        </LinearGradientBackground>
      </TouchableOpacity>
      <QuestionCard isVisible={isVisible} toggleModal={toggleModal} faq={props.faq} />
    </View>
  );
};

export const MiniQuestionCard = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <TouchableOpacity style={{ ...styles.shadow, ...styles.miniQuestion }} onPress={toggleModal}>
        <View style={{ paddingHorizontal: 15, paddingTop: 7.5, width: '100%' }}>
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
    </>
  );
};

export const QuestionCard = (props) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Modal
      isVisible={props.isVisible}
      style={{
        backgroundColor: 'rgb(225, 237, 255)',
        padding: 20,
        borderRadius: 20,
        justifyContent: 'flex-end',
        margin: 0,
      }}
    >
      <Grid>
        <Col>
          <TouchableOpacity style={{ position: 'absolute', top: 15, left: 15 }} onPress={() => props.toggleModal(!props.isVisible)}>
            <Image source={require('../../../assets/images/BackArrow.png')} />
          </TouchableOpacity>
        </Col>
        <Icon
          containerStyle={{ position: 'absolute', right: 15 }}
          name={!bookmarked ? 'bookmark' : 'bookmark-alt'}
          type="fontisto"
          size={45}
          color={bookmarked ? 'red' : 'black'}
          onPress={() => setBookmarked(!bookmarked)}
        />
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
      <Text style={{ color: '#1772A6' }}> #{props.text} </Text>
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
    height: ScreenHeight * 0.32,
    position: 'absolute',
    zIndex: 1,
  },
  background: {
    backgroundColor: 'white',
    width: ScreenWidth,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 0,
  },
  scrollView: {
    height: ScreenHeight * 0.45,
    paddingHorizontal: ScreenWidth * 0.1,
    marginTop: ScreenHeight * 0.7,
    marginBottom: 30,
  },
  hotTopicCard: {
    width: 140,
    height: 140,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 20,
  },
  hotTopicCardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  miniQuestion: {
    backgroundColor: '#E1EDFF',
    borderRadius: 30,
    height: 130,
    alignItems: 'center',
    marginBottom: 15,
  },
  miniQuestionTitle: {
    fontSize: 17,
    color: '#1772A6',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  miniQuestionContent: {
    fontSize: 14,
    color: '#2D9CDB',
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: 290,
    alignItems: 'center',
    marginBottom: 25,
  },
  questionCardTitle: {
    fontSize: 25,
    color: '#24559E',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  questionCardContent: {
    fontSize: 18,
    color: '#2D9CDB',
  },
  labelContainer: {
    flexDirection: 'row',
  },
  label: {
    height: 27,
    width: 80,
    marginRight: 10,
    backgroundColor: '#94DFC9',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 8,
  },
  shadow: {
    shadowColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
