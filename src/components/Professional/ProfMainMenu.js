import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Icon, ListItem, Button, SearchBar } from 'react-native-elements';
import { Grid, Col, Row } from 'react-native-easy-grid';
//import Icon from 'react-native-vector-icons/FontAwesome';

import { ScreenWidth, ScreenHeight } from '../../../constant/Constant';
import { database, auth } from '../../config/config';

import MenuScreen from '../../../Utils/MenuScreen';
/**
 * For Local Search.
 */
function SearchPatient(key, referenceList) {
  const targetList = [];

  referenceList.map((u, i) => {
    console.log(u);

    if (u.name != undefined && u.name.includes(key)) {
      targetList.push({
        name: u.name,
        lastReserveDate: u.lastReserveDate,
        key: u.key,
      });
    }
  });

  return targetList;
}

const ProfMainMenu = ({ route, navigation }) => {
  const [originalList, setOriginalList] = useState([]);
  const [patientList, setPatientList] = useState([]);

  const [searchContent, setSearchContent] = useState('');
  const [searchingStatus, setSearchingStatus] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    database.ref('professionals/' + auth.currentUser.uid + '/patients/').once('value', (snap) => {
      let patients = [];
      snap.forEach((child) => {
        if (child.val()['info'] != null) {
          patients.push({
            name: child.val()['info']['firstName'] && child.val()['info']['lastName'] != null ? child.val()['info']['firstName'] + ' ' + child.val()['info']['lastName'] : '()',
            lastReserveDate: child.val()['records'] != null ? Object.keys(child.val()['records']).slice(-1)[0] : null,
            key: child.key,
          });
        }
      });
      setPatientList(patients);
      setOriginalList(patients);
      setIsLoading(false);
    });
  }, []);

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
            <SearchBar
              placeholder="尋找病人"
              onChangeText={(e) => setSearchContent(e)}
              value={searchContent}
              round
              lightTheme
              placeholderTextColor="white"
              leftIconContainerStyle={{ color: 'white' }}
              containerStyle={{
                backgroundColor: 'transparent',
                width: ScreenWidth * 0.92,
                alignSelf: 'center',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
                marginTop: 30,
              }}
              inputContainerStyle={{ backgroundColor: '#A6ACE9', height: 35 }}
              onSubmitEditing={() => {
                setSearchingStatus(true);
                setPatientList(SearchPatient(searchContent, originalList));
              }}
            />
            {searchingStatus && (
              <Button
                title=" 返回"
                type="clear"
                icon={<Icon name="arrow-left" size={15} color="#2D89DD" />}
                titleStyle={{ color: 'white' }}
                onPress={() => {
                  setPatientList(originalList);
                  setSearchingStatus(false);
                }}
              />
            )}
            <ScrollView
              style={{
                height: 450,
                backgroundColor: 'transparent',
                width: ScreenWidth * 0.9,
                alignSelf: 'center',
              }}
            >
              {patientList.length == 0 ? (
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 30 }}> 找不到用戶 </Text>
              ) : (
                patientList.map((u, i) => {
                  return (
                    <ListItem
                      key={i}
                      title={u.name}
                      subtitle={u.lastReserveDate}
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
                                key: u.key,
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
                                patient_id: u.key,
                              });
                            }}
                          />
                        </>
                      }
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 1,
                        borderBottomColor: 'white',
                      }}
                      titleStyle={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                      subtitleStyle={{ color: 'white', fontSize: 13 }}
                      onPress={() => {
                        navigation.navigate('ProfPatientViewScreen', {
                          key: u.key,
                        });
                      }}
                    />
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

export default ProfMainMenu;