import React, { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, Dimensions, ScrollView } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import { object, string } from 'yup';

import TagInput from 'react-native-tags-input';
import moment from 'moment';

import { database, auth } from '../../config/config';
import { RoundButton } from '../../../Utils/RoundButton';
import { ScreenHeight, ScreenWidth } from '../../../constant/Constant';

import MenuScreen from '../../../Utils/MenuScreen';

const PostQuestionSchema = object({
  title: string().required('此項必填'),
  content: string().required('此項必填'),
});

const PostQuestionScreen = ({ route, navigation }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <MenuScreen>
      <View>
        <ScrollView>
          <View style={styles.container}>
            {!isSubmitted ? (
              <Formik
                initialValues={{
                  title: '',
                  content: '',
                  tags: [],
                  allowInspect: false,
                }}
                validationSchema={PostQuestionSchema}
                onSubmit={(values) => {
                  if (values.title.length != 0 && values.content.length != 0) {
                    database
                      .ref('contents/askProf/')
                      .push({
                        subject: values.title,
                        content: values.content,
                        tags: values.tags,
                        createdBy: auth.currentUser.uid,
                        createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                        settings: {
                          allowInspect: values.allowInspect,
                        },
                      })
                      .catch((err) => console.log(err));

                    setIsSubmitted(true);
                  }
                }}
              >
                {(formikProps) => (
                  <View style={styles.form}>
                    <Input
                      label="主題"
                      onChangeText={formikProps.handleChange('title')}
                      maxLength={20}
                      onSubmitEditing={() => {
                        Keyboard.dismiss;
                      }}
                      labelStyle={styles.label}
                      inputContainerStyle={styles.textContainer}
                      inputStyle={styles.input}
                      rightIcon={<Text style={styles.wordCounter}>{formikProps.values.title.length}/20</Text>}
                      errorMessage={formikProps.errors.title}
                    />

                    <Input
                      label="內容"
                      onChangeText={formikProps.handleChange('content')}
                      maxLength={200}
                      multiline={true}
                      returnKeyLabel="done"
                      returnKeyType={'done'}
                      placeholder={formikProps.values.content.length == 0 ? '由於我們會在本程式內發佈專家回應，請注意不要留下個人資料' : ''}
                      placeholderTextColor="#1772A6"
                      labelStyle={styles.label}
                      inputContainerStyle={styles.contentContainer}
                      inputStyle={styles.textAreaContainer}
                      rightIcon={<Text style={styles.wordCounter}>{formikProps.values.content.length}/200</Text>}
                      rightIconContainerStyle={{
                        position: 'absolute',
                        bottom: 0,
                        right: 15,
                      }}
                      errorMessage={formikProps.errors.content}
                    />
                    <Tag formikProps={formikProps} />
                    <CheckBox
                      title="我同意專家察看我的度數紀錄"
                      iconType="fontisto"
                      checkedIcon="checkbox-active"
                      checkedColor="#E1EDFF"
                      uncheckedIcon="checkbox-passive"
                      uncheckedColor="#E1EDFF"
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        paddingBottom: 10,
                      }}
                      textStyle={{ color: '#E1EDFF', fontSize: 18 }}
                      size={18}
                      onPress={() => formikProps.setFieldValue('allowInspect', !formikProps.values.allowInspect)}
                      checked={formikProps.values.allowInspect}
                    />

                    <RoundButton onPress={() => formikProps.handleSubmit()} title="提交" buttonStyle={{ width: 96 }} textStyle={{ color: '#3CA1B7' }} />
                  </View>
                )}
              </Formik>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  height: ScreenHeight * 0.6,
                  width: ScreenWidth * 0.82,
                  top: 60,
                  alignSelf: 'center',
                }}
              >
                <Text style={styles.farewellTitle}>謝謝你的提問</Text>
                <Text style={styles.farewellMessage}>收集問題後，我們的專家會在一星期內回答你的，請耐心等候。如有緊急需要，請聯絡你的眼科醫生。</Text>
                <Button
                  title="返回"
                  type="clear"
                  containerStyle={{
                    width: 120,
                    position: 'absolute',
                    bottom: 0,
                    right: 15,
                  }}
                  titleStyle={{ color: 'white', fontSize: 23 }}
                  iconContainerStyle={{ position: 'absolute', bottom: 0 }}
                  icon={<Icon type="antdesign" name="swapleft" size={50} color="white" />}
                  onPress={() => {
                    setIsSubmitted(false);
                    navigation.navigate('AskAnExpertMainScreen');
                  }}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </MenuScreen>
  );
};

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: ['眼精疼痛', '視力模糊', '分泌物'],
      },
    };
  }

  updateTagState = (state) => {
    this.setState({
      tags: state,
    });

    this.props.formikProps.setFieldValue('tags', state.tagsArray);
  };

  render() {
    return (
      <View>
        <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder="主題標籤"
          placeholderTextColor="#fff"
          leftElement={<Icon name={'tag-multiple'} type={'material-community'} color="#fff" />}
          containerStyle={styles.tagContainer}
          inputContainerStyle={styles.tagInputContainer}
          inputStyle={styles.tagTextInput}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    width: '100%',
    height: ScreenHeight * 0.8,
    alignSelf: 'center',
  },
  form: {
    height: ScreenHeight * 0.6,
    width: ScreenWidth * 0.82,
    alignSelf: 'center',
  },
  label: {
    color: 'white',
    fontSize: 25,
    marginBottom: 10,
  },
  textContainer: {
    height: 40,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(225, 237, 255, 0.5)',
  },
  input: {
    color: '#1772A6',
  },
  contentContainer: {
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 180,
    backgroundColor: 'rgba(225, 237, 255, 0.5)',
  },
  textAreaContainer: {
    color: 'white',
    height: 180,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  wordCounter: {
    color: '#1772A6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  farewellTitle: {
    fontSize: 38,
    color: 'white',
  },
  farewellMessage: {
    fontSize: 18,
    color: 'white',
  },

  tagContainer: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tagInputContainer: {
    height: 40,
    borderRadius: 13,
    backgroundColor: 'rgba(225, 237, 255, 0.5)',
  },

  tagTextInput: {
    color: '#1772A6',
  },

  tag: {
    backgroundColor: 'rgba(185, 255, 184, 0.7)',
  },
  tagText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default PostQuestionScreen;
