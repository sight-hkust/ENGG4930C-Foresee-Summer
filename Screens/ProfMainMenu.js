import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Card, ListItem, Button, SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { database } from '../src/config/config';


/**
 * For Local Search. 
 */
function SearchPatient(key, referenceList) {
    const targetList = [];

    referenceList.map((u, i) => {
        if(u.name.includes(key)) {
            targetList.push({name: u.name, lastReserveDate: u.lastReserveDate});
        }
    })

    return targetList;
}

const ProfMainMenu = ({ route, navigation }) => {

    const [originalList, setOriginalList] = useState([])
    const [patientList, setPatientList] = useState([]);

    const [searchContent, setSearchContent] = useState('');
    const [searchingStatus, setSearchingStatus] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        database.ref('professionals/M001/patients/').once('value', snap => {
            let patients = []
            snap.forEach(child => {
                patients.push({name: child.val()['info']['name'], lastReserveDate: child.val()['records']!= null? Object.keys(child.val()['records']).slice(-1)[0] : null});
            })
            setPatientList(patients);
            setOriginalList(patients);
            setIsLoading(false);
        })
    }, [])

    return (
        <View style={styles.container}>
            { isLoading? 
            <View>
                <ActivityIndicator size="large" color="#00acc1" />
                <Text style={styles.loadingText}>Loading . . . </Text>
            </View>
            :
            <View>
                <Text style={styles.title}> 你好！黃醫生 </Text>
                <View style={styles.searchButton}>
                    <Button 
                        title="搜索普通用戶" 
                        containerStyle={{width: 200}}
                        onPress={() => navigation.navigate('ProfSearchResultScreen')}/>
                </View>
                <Card containerStyle={{padding: 0}} >
                <View style={styles.card}> 
                        <View style={styles.label} >
                            <Text style={styles.labelText}>姓名</Text>
                        </View>
                        <View style={styles.label} >
                            <Text style={styles.labelText}>最近預約</Text>
                        </View>
                </View>
                <SearchBar
                    placeholder="以姓名/病人編號/電話搜尋"
                    onChangeText={e => setSearchContent(e)}
                    value={searchContent}
                    lightTheme
                    containerStyle={{backgroundColor: 'transparent'}}
                    inputContainerStyle={{backgroundColor: 'transparent', height: 30}}
                    onSubmitEditing={() => {
                        setSearchingStatus(true);
                        setPatientList(SearchPatient(searchContent, originalList));
                    }}
                />
                {  
                    searchingStatus &&
                    <Button title=" 返回" type="clear"   
                        icon={
                            <Icon
                            name="arrow-left"
                            size={15}
                            color="#2D89DD"
                            />
                        }
                        onPress={() => {
                            setPatientList(originalList)
                            setSearchingStatus(false);
                        }}
                    />
                }
                <ScrollView style={{height: 320}}>
                    {
                        patientList.length == 0 ? 
                            <Text style={{textAlign:'center'}}> No Results found </Text>
                        :
                        patientList.map((u, i) => {
                        return (
                        <ListItem 
                            key={i}
                            roundAvatar
                            title={u.name}
                            rightTitle={u.lastReserveDate}
                            onPress={() => {
                                navigation.navigate('ProfPatientViewScreen')
                            }}
                        />
                        );
                        })
                    }
                </ScrollView>
                </Card>
                <Button style={{ paddingTop : 30}} title="創建普通用戶" type="clear" onPress={() => navigation.navigate('Register', { screen: 'Registration Form', params: {isProfessional : true}})}/>
            </View>
            }
        </View>        
    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    loadingText: {
        fontWeight: 'bold',
        alignSelf:'center', 
        paddingTop: 30, 
    },
    title: {
        textAlign: 'center', 
        fontSize: 35, 
        paddingBottom: 40
    },
    searchButton: {
       alignSelf: 'center'
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        width: "50%", height: 50, 
        backgroundColor: '#2D89DD', 
        justifyContent:'center'
    },
    labelText: {
        textAlign: "center", 
        color: 'white', 
        fontSize: 20
    }
})

export default ProfMainMenu
