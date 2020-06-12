import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';


import {Styles} from '../Styles/styles';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const users = [
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


const ProfMainMenu = ({ route, navigation }) => {
    return (
        <View style={DoctorsStyles.content}>
            <Text style={{textAlign: 'center', fontSize: 40, paddingBottom: 40}}> 你好！黃醫生 </Text>
            <View style={{alignSelf: 'center'}}>
            <Button title="搜索普通用戶" onclick={console.log('clicked')}/>
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
            <ScrollView style={{height: 320}}>
                {
                    users.map((u, i) => {
                    return (
                    <ListItem 
                        key={i}
                        roundAvatar
                        title={u.name}
                        rightTitle={u.lastReserveDate}
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