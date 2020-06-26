import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { ScreenWidth, ScreenHeight, FontScale } from '../../../constant/Constant';
import { database } from '../../config/config';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon } from 'react-native-elements';

const LeftOpen = require('../../../assets/images/LeftOpen.png');
const RightOpen = require('../../../assets/images/RightOpen.png');
const BackArrow = require('../../../assets/images/BackArrow.png');
const NextArrow = require('../../../assets/images/NextArrow.png');
const Setting = require('../../../assets/images/setting.png');

export default class ProfPatientViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      records: [],
      recordsIndex: -1,
    };
  }

  componentDidMount() {
    const { key } = this.props.route.params;
    database.ref('professionals/M001/patients/' + key + '/info').on('value', (snapshot) => {
      this.setState({
        info: snapshot.val(),
      });
    });
    database
      .ref('professionals/M001/patients/' + key + '/records')
      .orderByKey()
      .on('value', (snapshot) => {
        let records = [];
        let curRecord = {};
        let curYearObject = {};
        let nowYear = new Date().getFullYear();

        snapshot.forEach((child) => {
          const year = child.key.split('-')[0];
          curRecord = child.val();
          curRecord.date = child.key;
          records.push(curRecord);
        });
        this.setState({
          records: records,
          recordsIndex: records.length - 1,
        });
      });
  }

  render() {
    const info = this.state.info;
    const records = this.state.records;
    const recordsLen = records.length;
    const recordsIndex = this.state.recordsIndex;
    const curRecord = records[recordsIndex];

    const calSPH = (isLeft) => {
      if (isLeft) {
        if (curRecord.L_Myopia != 0) {
          //myopia, add - sign
          var num = parseFloat(curRecord.L_Myopia) / 100;
          return '-' + num.toFixed(2);
        } else if (curRecord.L_Hyperopia != 0) {
          //hyperopia, add + sign
          var num = parseFloat(curRecord.L_Hyperopia) / 100;
          return '+' + num.toFixed(2);
        } else {
          return '0.00';
        }
      } else {
        if (curRecord.R_Myopia != 0) {
          //myopia, add - sign
          var num = parseFloat(curRecord.R_Myopia) / 100;
          return '-' + num.toFixed(2);
        } else if (curRecord.R_Hyperopia != 0) {
          //hyperopia, add + sign
          var num = parseFloat(curRecord.R_Hyperopia) / 100;
          return '+' + num.toFixed(2);
        } else {
          return '0.00';
        }
      }
    };

    const calCYL = (isLeft) => {
      if (isLeft && curRecord.L_CYL != 0) {
        var num = parseFloat(curRecord.L_CYL) / 100;
        return '-' + num.toFixed(2);
      } else if (!isLeft && curRecord.R_CYL != 0) {
        var num = parseFloat(curRecord.R_CYL) / 100;
        return '-' + num.toFixed(2);
      } else {
        return '0.00';
      }
    };

    const calAxis = (isLeft) => {
      if (isLeft) {
        if (curRecord.L_CYL != 0) return curRecord.L_Axis;
        else return 'NA';
      } else {
        if (curRecord.R_CYL != 0) return curRecord.R_Axis;
        else return 'NA';
      }
    };

    return (
      <View style={styles.fullscreen}>
        <LinearGradient
          colors={['#1872a7', '#5a74d1', '#a676ff']}
          start={[0, 0.9]}
          end={[1, 0.1]}
          locations={[0, 0.5, 1]}
          style={{
            height: '100%',
          }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{info.name}</Text>
            <TouchableOpacity>
              <Image source={Setting} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1, marginVertical: 20, marginHorizontal: 30 }}>
            <Text style={styles.profileText}>年齡: {info.age}</Text>
            <Text style={styles.profileText}>職業: {info.job}</Text>
            <Text style={styles.profileText}>家庭病史:</Text>
            <Text style={[styles.profileText, { paddingLeft: 20 }]}>{info.history}</Text>
            <Text style={styles.profileText}>已知眼疾:</Text>
            <Text style={[styles.profileText, { paddingLeft: 20 }]}>{info.disease}</Text>
          </ScrollView>
          <View style={{ flex: 3, justifyContent: 'center', paddingHorizontal: 30, paddingTop: 0, paddingBottom: 15, alignItems: 'center' }}>
            <View style={styles.boxes}>
              {recordsLen == 0 ? (
                <Text style={styles.noDataText}>{'暫無數據\n請按 + 輸入資料'}</Text>
              ) : (
                <View style={{ height: '100%' }}>
                  <View style={styles.datesButton}>
                    <TouchableOpacity onPress={() => this.setState({ recordsIndex: (recordsIndex + recordsLen - 1) % recordsLen })}>
                      <Icon name="swapleft" type="antdesign" size={36} color="#2D9CDB" />
                    </TouchableOpacity>
                    <Text style={styles.dateText}>{curRecord.date}</Text>
                    <TouchableOpacity onPress={() => this.setState({ recordsIndex: (recordsIndex + 1) % recordsLen })}>
                      <Icon name="swapright" type="antdesign" size={36} color="#2D9CDB" />
                    </TouchableOpacity>
                  </View>
                  <Grid style={{ flex: 5 }}>
                    <Row>
                      <Col style={styles.container}></Col>
                      <Col style={styles.container}>
                        <Text style={styles.dateText}>O.D.</Text>
                      </Col>
                      <Col style={styles.container}>
                        <Text style={styles.dateText}>O.S.</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={styles.container}>
                        <Text style={styles.gridHeader}>SPH:</Text>
                      </Col>
                      <Col style={styles.container}>
                        <Text style={styles.gridText}>{calSPH(false)}</Text>
                      </Col>
                      <Col style={styles.container}>
                        <Text style={styles.gridText}>{calSPH(true)}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={styles.container}>
                        <Text style={styles.gridHeader}>CYL:</Text>
                      </Col>
                      <Col style={styles.container}>
                        <Text style={styles.gridText}>{calCYL(false)}</Text>
                      </Col>
                      <Col style={styles.container}>
                        <Text style={styles.gridText}>{calCYL(true)}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={styles.container}>
                        <Text style={styles.gridHeader}>AXIS:</Text>
                      </Col>
                      <Col style={styles.container}>
                        <Text style={styles.gridText}>{calAxis(false)}</Text>
                      </Col>
                      <Col style={styles.container}>
                        <Text style={styles.gridText}>{calAxis(true)}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={styles.container}>
                        <Text style={styles.gridHeader}>VA:</Text>
                      </Col>
                      <Col style={styles.container}>
                        <Text style={styles.gridText}>{curRecord.R_VA}</Text>
                      </Col>
                      <Col style={styles.container}>
                        <Text style={styles.gridText}>{curRecord.L_VA}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={styles.container}>
                        <Text style={styles.gridHeader}>PD:</Text>
                      </Col>
                      <Col style={[styles.container, { flex: 2 }]}>
                        <Text style={styles.gridText}>{curRecord.PD}mm</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={styles.container}>
                        <Text style={styles.gridHeader}>備註:</Text>
                      </Col>
                      <Col style={[styles.container, { flex: 2 }]}>
                        <Text>{curRecord.remark}</Text>
                      </Col>
                    </Row>
                  </Grid>
                </View>
              )}
            </View>

            <View style={{ height: 15 }} />

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AddRecordScreen', {
                  isProfessional: true,
                  professional_id: 'M001',
                  patient_id: this.props.route.params.key,
                })
              }
              style={{
                backgroundColor: 'white',
                width: 48,
                height: 48,
                borderRadius: 24,
                justifyContent: 'center',
              }}
            >
              <Icon name="add" size={25} color="#2D9CDB" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullscreen: {
    height: '100%',
    width: '100%',
  },
  header: {
    paddingTop: 31,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 31,
    color: '#E1EDFF',
    fontWeight: '700',
  },
  profileText: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
  },
  centreText: {
    textAlign: 'center',
  },
  boxes: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 10,
    paddingBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  gridText: {
    color: '#2D9CDB',
    textAlign: 'center',
    fontSize: 20,
  },
  gridHeader: {
    color: '#2D9CDB',
    textAlign: 'left',
    fontSize: 20,
    paddingLeft: 30,
    fontWeight: 'bold',
  },
  datesButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#2D9CDB',
    fontSize: 24,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#2D9CDB',
  },
});
