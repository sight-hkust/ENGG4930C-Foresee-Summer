import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image  } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

const Icon = require('../assets/images/Icon.png');

const WelcomeScreen = ({ route, navigation }) => {

    return (
        <View style={styles.container}> 
            <Image source={Icon} style={styles.icon}/>
            <Text style={styles.title}>ForeSEE</Text>
            <Text style={styles.description}>準確追蹤{"\n"}你的眼睛健康走勢</Text>
            <Button  
                title="開始" 
                type="clear"
                containerStyle={{width: 210, height: 60, borderRadius: 30, borderWidth: 1, marginTop: 70}}
                buttonStyle={{height: 60}}
                titleStyle={{fontSize: 25, color: 'black'}}
                onPress={()=>{ navigation.navigate('MainScreen', {isProfessional: false}) }}/>
        </View>        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }, 
    icon: {
        alignSelf: 'center',
        marginTop: 105,
        width: 240,
    }, 
    title: {
        textAlign: 'center',
        fontSize: 25
    },
    description: {
        marginTop: 55,
        textAlign: 'center',
        fontSize: 28,
    },
    button: {
        width: 10,
        borderRadius: 100,
    }

});

export default WelcomeScreen
