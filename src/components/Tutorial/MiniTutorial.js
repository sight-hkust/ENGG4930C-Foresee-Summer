import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { ScreenWidth, ScreenHeight } from '../../../constant/Constant';
import Swiper from 'react-native-swiper';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { color } from 'react-native-reanimated';

const RECORD_IMAGE_0 = require('../../../assets/images/Record_normal.png');
const RECORD_IMAGE_1 = require('../../../assets/images/test.png');
const RECORD_IMAGE_2 = require('../../../assets/images/Record_supervision.png');

const ADD_RECORD_IMAGE_0 = require('../../../assets/images/AddRecord_0.png');
const ADD_RECORD_IMAGE_1 = require('../../../assets/images/AddRecord_1.png');
const ADD_RECORD_IMAGE_2 = require('../../../assets/images/AddRecord_2.png');
const ADD_RECORD_IMAGE_3 = require('../../../assets/images/AddRecord_3.png');

const RecordTutorialContent = [
  {
    subject: '正常視力',
    content: '視力20/20指的是離開驗眼圖20呎(約6米)的地方，看到正常視力者在20呎看到的字，屬於標準視力。',
    image: RECORD_IMAGE_0,
  },
  {
    subject: '不正常視力',
    content:
      '如果後面的數字大於20，指的是比起正常視力者，要走得更近才能看到同一大小的字。\n\n以20/100為例，正常視力者在100呎距離仍看得到的字，視力20/100者要走近至20呎距離才能看到，屬於不正常視力。後面的數字愈大代表視力愈差．',
    image: RECORD_IMAGE_1,
  },
  {
    subject: '超視力',
    content:
      '如果後面的數字小於20，指的是比起正常視力者，可以在更遠的地方看到同一大小的字。\n\n以20/15為例，正常視力者15呎才看到的字，視力20/15的人在20呎已看得到，比正常視力者有更好的視力。後面的數字愈小代表視力愈好。',
    image: RECORD_IMAGE_2,
  },
];

const AddRecordTutorialContent = [
  {
    subject: '滑動桿輸入數據',
    content: '滑動桿的上限為  (+700) 及（-700），並請於滑動桿上方的按扭選擇正負輸入。',
    image: ADD_RECORD_IMAGE_0,
  },
  {
    subject: '鍵盤輸入數據',
    content: '若數據超出滑動桿上張，請使用鍵盤輸入，並且該數字必需大於 (+700) 或 小於（-700）。',
    image: ADD_RECORD_IMAGE_1,
  },
  {
    subject: '詳細輸入（非必填）',
    content: '您可以按一下收疊式按扭，並輸入更詳細數據。記錄更多以便日後查閱。',
    image: ADD_RECORD_IMAGE_2,
  },
  {
    subject: '時間與日期',
    content: '時間和日期會預設為當下使用應用程式的時間，請按一下並在日曆中選擇您的驗眼日期和時間。',
    image: ADD_RECORD_IMAGE_3,
  },
];

export function RecordTutorial() {
  return (
    <Swiper loop={true} paginationStyle={{ marginBottom: 10 }}>
      {RecordTutorialContent.map((item, index) => {
        return (
          <ScrollView style={{ paddingBottom: 20 }}>
            <View style={recordStyle.slide}>
              <Text style={recordStyle.title}>{item.subject}</Text>
              <Image style={recordStyle.image} source={item.image} />
              <Text style={recordStyle.content}>{item.content}</Text>
            </View>
          </ScrollView>
        );
      })}
    </Swiper>
  );
}

export function AddRecordTutorial() {
  const [index, setIndex] = useState(0);

  return (
    <Grid>
      <Row style={{ width: '100%', height: 60, alignItems: 'center', alignContent: 'center' }}>
        <Col style={{ width: '35%', position: 'absolute', left: 35 }}>
          <Button
            title="操作方式"
            type={index === 0 ? 'solid' : 'outline'}
            TouchableComponent={TouchableOpacity}
            onPress={() => setIndex(0)}
            titleStyle={{ color: `${index === 0 ? '#fff' : '#4674C4'}`, fontSize: 15, fontWeight: 'bold' }}
            buttonStyle={{ backgroundColor: `${index === 0 ? '#4674C4' : '#fff'}` }}
          />
        </Col>
        <Col style={{ width: '35%', position: 'absolute', right: 35 }}>
          <Button
            title="詞彙解釋"
            type={index === 1 ? 'solid' : 'outline'}
            TouchableComponent={TouchableOpacity}
            onPress={() => setIndex(1)}
            titleStyle={{ color: `${index === 1 ? '#fff' : '#4674C4'}`, fontSize: 15, fontWeight: 'bold' }}
            buttonStyle={{ backgroundColor: `${index === 1 ? '#4674C4' : '#fff'}` }}
          />
        </Col>
      </Row>
      <Row>
        {index === 0 ? (
          <Swiper loop={false} paginationStyle={{ marginBottom: 20 }}>
            {AddRecordTutorialContent.map((item, index) => {
              return (
                <ScrollView>
                  <View style={recordStyle.slide}>
                    <Image style={recordStyle.image} source={item.image} />
                    <Text style={recordStyle.title}>{item.subject}</Text>
                    <Text style={recordStyle.content}>{item.content}</Text>
                  </View>
                </ScrollView>
              );
            })}
          </Swiper>
        ) : (
          <>
            <ScrollView style={{ paddingHorizontal: 20 }}>
              <Text style={{ ...addRecordStyle.title }}>
                OD<Text style={addRecordStyle.content}> (Oculus Dexter)： 拉丁字右眼的意思。{'\n'}</Text>
              </Text>

              <Text style={{ ...addRecordStyle.title }}>
                OS<Text style={addRecordStyle.content}> (Oculus Sinister)： 拉丁字左眼的意思 。{'\n'}</Text>
              </Text>

              <Text style={{ ...addRecordStyle.title }}>
                SPH<Text style={addRecordStyle.content}> (Spherical correction)： 球面度數，表示你所需的鏡片度數。(+)標示為遠視度數，(-)標示則為近視度數。{'\n'}</Text>
              </Text>
              <Text style={{ ...addRecordStyle.title }}>
                CYL
                <Text style={addRecordStyle.content}> (Cylinder correction)： 柱狀度數，也就是一般所指的散光度數。若您有散光，則散光軸度不能為空白。{'\n'}</Text>
              </Text>
              <Text style={{ ...addRecordStyle.title }}>
                AXIS
                <Text style={addRecordStyle.content}>：散光軸度，指散光度數在眼球所發生的角度。其角度範圍從 0 ~ 180度。{'\n'}</Text>
              </Text>

              <Text style={{ ...addRecordStyle.title }}>
                PD
                <Text style={addRecordStyle.content}> (Pupillary Distance)：兩眼瞳孔距離(單位是mm(公釐)) [1公分 = 10公釐]。一般PD約為60 ~ 65mm之間。</Text>
              </Text>
            </ScrollView>
          </>
        )}
      </Row>
    </Grid>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    width: ScreenWidth,
    height: ScreenHeight,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

const recordStyle = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    color: '#1772A6',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  content: {
    textAlign: 'center',
    color: '#2D9CDB',
    fontSize: 16.5,
    fontWeight: 'bold',
    marginBottom: 60,
    paddingHorizontal: 30,
  },
});

const addRecordStyle = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1772A6',
  },
  content: {
    fontSize: 15,
    color: '#2D9CDB',
  },
});
