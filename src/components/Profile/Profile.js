import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon } from 'react-native-elements';
import { auth } from '../../config/config';
import { useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { ScreenHeight, ScreenWidth, FontScale } from '../../../constant/Constant';
import { RoundButton } from '../../../Utils/RoundButton';
import Svg from 'react-native-svg';
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground';

import { Grid, Col, Row } from 'react-native-easy-grid';
import MenuScreen from '../../../Utils/MenuScreen';

export const Profile = ({ navigation, route }) => {
  const handleSignOut = () => {
    auth.signOut();
  };
  return (
    <MenuScreen>
      <View style={styles.container}>
        <View style={styles.card}>
          <Grid>
            <Row style={{ height: 0.1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>陳</Text>
              </View>
            </Row>
            <Row style={styles.qrCodeIconContainer}>
              <Icon type="antdesign" name="qrcode" size={40} containerStyle={{ marginRight: 10, marginTop: 10 }} />
            </Row>

            <Row style={styles.titleContainer}>
              <Text style={styles.title}> 陳大文 </Text>
            </Row>

            <Row style={{ ...styles.titleContainer, ...{ marginBottom: 7.5 } }}>
              <Text style={styles.subtitle}> 20200204 </Text>
            </Row>

            <Row style={{ height: 47.5 }}>
              <Col style={styles.iconContainer}>
                <Icon type="font-awesome" name="hourglass-o" size={40} containerStyle={{}} />
              </Col>
              <Col style={styles.iconContainer}>
                <Icon type="fontisto" name="email" size={40} containerStyle={{}} />
              </Col>
              <Col style={styles.iconContainer}>
                <Icon type="feather" name="phone" size={40} containerStyle={{}} />
              </Col>
            </Row>

            <Row style={{ height: 30 }}>
              <Col>
                <View style={styles.verticalLine} />
              </Col>
              <Col>
                <View style={{ ...styles.verticalLine, ...{ height: '200%' } }} />
              </Col>
              <Col>
                <View style={styles.verticalLine} />
              </Col>
            </Row>

            <Row>
              <Col style={styles.infoContainer}>
                <Text style={styles.info}>
                  <Text style={{ fontSize: 30 }}>45</Text>歲
                </Text>
              </Col>
              <Col style={styles.infoContainer}>
                <Text style={{ ...styles.info, ...{ position: 'absolute', top: 40, width: ScreenWidth, textAlign: 'center' } }}>chantm@mail.com</Text>
              </Col>
              <Col style={styles.infoContainer}>
                <Text style={styles.info}>99887766</Text>
              </Col>
            </Row>
          </Grid>
        </View>
        <View style={styles.bottomMenu}></View>
        <Button title="詳細設定" type="clear" titleStyle={{ color: '#fff', marginTop: 10, fontSize: 18 }} />
        <Button title="程式教學" type="clear" titleStyle={{ color: '#fff', marginTop: 10, fontSize: 18 }} />
        <Button title="創建子帳戶" type="clear" titleStyle={{ color: '#fff', marginTop: 10, fontSize: 18 }} />
        <Button title="變更個人資料" type="clear" titleStyle={{ color: '#fff', marginTop: 10, fontSize: 18 }} />
      </View>
    </MenuScreen>
  );
};

//   const handleSignOut = () => {
//     auth.signOut();
//   };
/* <View style={{ height: '100%', paddingTop: '10%', marginHorizontal: ScreenWidth * 0.1 }}>
        <View
          style={{
            paddingVertical: '2%',
            borderRadius: ScreenWidth * 0.02,
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <QRCode value={auth.currentUser.uid} size={ScreenWidth * 0.75} logoBackgroundColor="transparent" backgroundColor="transparent" />
        </View>
        <View style={{ flex: 1, paddingVertical: '2%' }}>
          <Text
            style={{
              fontSize: FontScale * 25,
              color: '#FFFFFF',
              fontFamily: 'Roboto',
              textAlignVertical: 'center',
              textAlign: 'center',
              marginBottom: '5%',
            }}
          >
            {'請讓眼科醫生/視光師\n掃描QR Code以進行配對'}
          </Text>
          <RoundButton title="登出" onPress={handleSignOut} />
        </View>
      </View> */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: 300,
    width: 300,
    borderRadius: 35,
    backgroundColor: '#fff',
    marginTop: 110,
  },
  nameContainer: {
    width: 90,
    height: 90,
    backgroundColor: '#BED8FF',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  qrCodeIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
  },
  title: {
    color: '#24559E',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#1772A6',
    fontSize: 15,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  verticalLine: {
    borderRightWidth: 2,
    width: '50%',
    borderRightColor: '#24559E',
    height: '100%',
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    position: 'absolute',
    top: 4,
    color: '#1772A6',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomMenu: {
    borderTopWidth: 1,
    marginTop: 30,
    borderTopColor: '#8BB5F4',
    width: 250,
  },
});
