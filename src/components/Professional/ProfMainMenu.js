import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Icon, ListItem, Button, SearchBar } from 'react-native-elements';
import { Grid, Col, Row } from 'react-native-easy-grid';
//import Icon from 'react-native-vector-icons/FontAwesome';

import { ScreenWidth, ScreenHeight } from '../../../constant/Constant';
import { auth } from '../../config/config';

import MenuScreen from '../../../Utils/MenuScreen';
import { connect } from 'react-redux';
import { watchPatientListUpdate } from '../../reducers/patientList';
/**
 * For Local Search.
 */
function SearchPatient(key, referenceList) {
  const targetList = [];
  referenceList.map((u, i) => {
    let name = u.lastName + u.firstName;
    if (name != undefined && name.includes(key)) {
      targetList.push(u);
    }
  });
  return targetList;
}

const ProfMainMenu = ({ route, navigation, patientListStore }) => {
  //const [originalList, setOriginalList] = useState([]);

  const [searchContent, setSearchContent] = useState('');
  const [searchingStatus, setSearchingStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { patientList } = patientListStore;
  const [showList, setShowList] = useState([]);

  console.log(patientList);

  useEffect(() => {
    if (patientList !== null && patientList !== undefined && searchContent === '') {
      setIsLoading(false);
      setShowList(patientList);
    }
  })

  /* useEffect(() => {
    database.ref('professionals/' + auth.currentUser.uid + '/patients/').once('value', (snap) => {
      let patients = [];
      snap.forEach((child) => {
		console.log(child.val()['info']);
        if (child.val()['info'] != null) {
          patients.push({
            name: child.val()['info']['lastName'] && child.val()['info']['firstName'] != null ? child.val()['info']['lastName'] + child.val()['info']['firstName'] : '()',
            lastReserveDate: child.val()['records'] != null ? Object.keys(child.val()['records']).slice(-1)[0] : null,
            key: child.key,
          });
        }
      });
      setShowList(patients);
      //setOriginalList(patients);
      setIsLoading(false);
    });
  }, []); */

  return (
    <MenuScreen>
      <View style={styles.container}>
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#00acc1" />
            <Text style={styles.loadingText}>Loading . . . </Text>
          </View>
        ) : (
            <View>
              <View style={{ height: 50, width: ScreenWidth, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <SearchBar
                  placeholder="尋找病人"
                  onChangeText={(e) => {
                    setSearchContent(e);
                    setSearchingStatus(true);
                    setShowList(SearchPatient(e, patientList));
                  }}
                  value={searchContent}
                  round
                  lightTheme
                  placeholderTextColor="white"
                  leftIconContainerStyle={{ color: 'white' }}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    width: ScreenWidth * 0.8,
                    borderBottomColor: 'transparent',
                    borderTopColor: 'transparent',
                  }}
                  inputContainerStyle={{ backgroundColor: '#A6ACE9', height: 35 }}
                />
                <Icon name="qrcode-scan" type="material-community" color="white" size={30} onPress={() => navigation.navigate('QR Scan')} />
              </View>
              <ScrollView
                style={{
                  height: 450,
                  backgroundColor: 'transparent',
                  width: ScreenWidth * 0.9,
                  alignSelf: 'center',
                }}
              >
                {showList.length == 0 ? (
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 30 }}> 找不到用戶 </Text>
                ) : (
                    showList.map((data, index) => {
                      return (
                        <>
                          <ListItem
                            key={index}
                            title={data.lastName + data.firstName}
                            subtitle={'test'.lastReserveDate}
                            rightIcon={
                              <>
                                <Icon
                                  size={25}
                                  name="search"
                                  type="feather"
                                  color="#88D3E3"
                                  containerStyle={{
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    padding: 3,
                                    marginRight: 5,
                                  }}
                                  onPress={() => {
                                    navigation.navigate('ProfPatientViewScreen', {
                                      key: data.phone
                                    });
                                  }}
                                />
                                <Icon
                                  size={25}
                                  name="plus"
                                  type="feather"
                                  color="#80A4EB"
                                  containerStyle={{
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    padding: 3,
                                  }}
                                  onPress={() => {
                                    navigation.navigate('AddRecordScreen', {
                                      isProfessional: true,
                                      professional_id: auth.currentUser.uid,
                                      patient_id: data.phone,
                                    });
                                  }}
                                />
                              </>
                            }
                            containerStyle={{
                              backgroundColor: 'transparent',
                            }}
                            titleStyle={{
                              color: 'white',
                              fontSize: 20,
                              fontWeight: 'bold',
                            }}
                            subtitleStyle={{ color: 'white', fontSize: 13 }}
                            onPress={() => {
                              navigation.navigate('ProfPatientViewScreen', {
                                key: data.phone,
                              });
                            }}
                          />
                          <View style={{ height: 1, width: ScreenWidth * 0.825, borderColor: '#E1EDFF', borderWidth: 1, alignSelf: 'center', borderRadius: 10 }} />
                        </>
                      );
                    })
                  )}
              </ScrollView>

              <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'center', paddingHorizontal: 15 }}>
                <View style={{ width: ScreenWidth / 2, height: 100, zIndex: 10 }}>
                  <Button
                    icon={<Icon name="md-add-circle-outline" type="ionicon" size={30} color="white" />}
                    title="登記病人"
                    titleStyle={{ marginLeft: 10, color: 'white', fontWeight: 'bold' }}
                    type="clear"
                    onPress={() =>
                      navigation.navigate('Register', {
                        screen: 'Registration Form',
                        params: { isProfessional: true, registerPatient: true },
                      })
                    }
                  />
                </View>
              </View>
            </View>
          )}
      </View>
    </MenuScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  loadingText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    paddingBottom: 40,
  },
  searchButton: {
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    width: '50%',
    height: 50,
    backgroundColor: '#2D89DD',
    justifyContent: 'center',
  },
  labelText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  listItemTitle: {
    color: 'white',
  },
});

const mapStateToProps = state => {
  return {
    patientListStore: state.patientList,
  }
}

const mapDispatchToProps = dispatch => {
  dispatch(watchPatientListUpdate())
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfMainMenu);
