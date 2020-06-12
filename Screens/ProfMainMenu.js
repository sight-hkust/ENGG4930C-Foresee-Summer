import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, ListItem, Button, SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


const sampleUsers = [
    {
       name: 'VICTOR YIP',
       lastReserveDate: '30 - 5 - 2020'
    },
    {
        name: '陳大文',
        lastReserveDate: '5 - 12 - 2020'
     },
     {
        name: '陳中文',
        lastReserveDate: '3 - 4 - 2020'
     },
     {
        name: '陳小文',
        lastReserveDate: '12 - 10 - 2020'
     },
     {
        name: '吳展能',
        lastReserveDate: '23 - 1 - 2020'
     },
     {
         name: '李定軒',
         lastReserveDate: '31 - 4 - 2020'
      },
      {
         name: '王家朗',
         lastReserveDate: '30 - 5 - 2020'
      },
      {
         name: '周小方',
         lastReserveDate: '30 - 5 - 2020'
      },
 
   ]

/**
 * For Local perfermance testing only. 
 */
function SearchPatient(key) {
    const targetList = [];

    sampleUsers.map((u, i) => {
        if(u.name.includes(key)) {
            targetList.push({name: u.name, lastReserveDate: u.lastReserveDate});
        }
    })

    return targetList;
}

const ProfMainMenu = ({ route, navigation }) => {

    const [searchContent, setSearchContent] = useState('');
    const [patientList, setPatientList] = useState(sampleUsers);
    const [searchingStatus, setSearchingStatus] = useState(false);


    return (
        <View style={DoctorsStyles.content}>
            <Text style={{textAlign: 'center', fontSize: 35, paddingBottom: 40}}> 你好！黃醫生 </Text>
            <View style={{alignSelf: 'center'}}>
            <Button 
                title="搜索普通用戶" 
                containerStyle={{width: 200}}
                onPress={() => navigation.navigate('ProfSearchResultScreen')}/>
            </View>
            <Card containerStyle={{padding: 0}} >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}> 
                    <View style={{width: "50%", height: 50, backgroundColor: '#2D89DD', justifyContent:'center'}} >
                        <Text style={{textAlign: "center", color: 'white', fontSize: 20}}>姓名</Text>
                    </View>
                    <View style={{width: "50%", height: 50, backgroundColor: '#2D89DD', justifyContent:'center'}} >
                        <Text style={{textAlign: "center", color: 'white', fontSize: 20}}>最近預約</Text>
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
                    setPatientList(SearchPatient(searchContent));
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
                        setPatientList(sampleUsers)
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
            <Button style={{ paddingTop : 30}} title="創建普通用戶" type="clear" onPress={() => navigation.navigate('ProfCreateProfileScreen')}/>
        </View>        
    );
}



const DoctorsStyles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    searchButton: {
       paddingBottom: 100
    }

})

export default ProfMainMenu