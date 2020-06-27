import React from 'react';
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


export const Main = ({ lightThemeActivated }) => {

    const Tab = createStackNavigator().Screen;
    /* const { lightThemeActivated } = props; */
    const colorTheme = lightThemeActivated ? ['#1772A6', '#A377FF'] : ['#2D404B', '#FFFFFF']
    return (<LinearGradientBackground
        elevation={5}
        style={styles.main}
        colors={colorTheme}
        start={[0, 1]}
        end={[1, 0]}
        locations={[0, 1]}>

    </LinearGradientBackground>)
}


const styles = StyleSheet.create({
    main: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        height: '90%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    }
})