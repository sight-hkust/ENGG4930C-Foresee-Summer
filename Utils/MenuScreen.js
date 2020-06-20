import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { LinearGradientBackground } from './LinearGradientBackground'

const WINDOW_HEIGHT = Dimensions.get('window').height - 45;
const WINDOW_WIDTH = Dimensions.get('window').width;

export default class MenuScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLightTheme : true,
            activePage: '',
        }
    }

    render() {
        return (        
            <View style={{ height: WINDOW_HEIGHT, addingTop: ( Platform.OS === 'ios' ) ? 20 : 0, backgroundColor: this.state.isLightTheme? '#BED8FF': '#2372A5'}}>
                <View style={{height: WINDOW_HEIGHT * 0.87, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, overflow: 'hidden'}}>
                { this.state.isLightTheme?
                    <LinearGradientBackground style={{ height: '100%' }} colors={['#1772A6', '#A377FF']} start={[0, 1]} end={[1, 0]} locations={[0.12, 0.92]}/>
                :
                    <LinearGradientBackground style={{ height: '100%' }} colors={['#2D404B', '#2D404B']} start={[0, 1]} end={[1, 0]} locations={[0.12, 0.92]}/>
                }
                </View>
                
                <Grid style={{width: WINDOW_WIDTH * 0.9, alignSelf: 'center', alignItems: 'center', marginBottom: 30, zIndex: 1, marginTop: 20}}>
                    <Col>
                        <TouchableOpacity onPress={() => {}}>
                            <Image style={styles.menuButton} source={!this.state.isLightTheme? require('../assets/images/Articles_bright.png') : require('../assets/images/Articles_dark.png') } />
                            <View style={{backgroundColor: 'white', height: 1, width: 33, alignSelf: 'center', borderRadius: 3, border: 'solid',marginTop: 5}}/>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity onPress={()=> console.log('')}>
                            <Image style={styles.menuButton} source={!this.state.isLightTheme? require('../assets/images/Exercise_bright.png') : require('../assets/images/Exercise_dark.png') } />   
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Image style={styles.mainButton} source={!this.state.isLightTheme? require('../assets/images/Icon_solid.png') : require('../assets/images/Icon_transparent.png') } />
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Image style={styles.menuButton} source={!this.state.isLightTheme? require('../assets/images/Qna_bright.png') : require('../assets/images/Qna_dark.png') } />
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Image style={styles.menuButton} source={!this.state.isLightTheme? require('../assets/images/Achievement_bright.png') : require('../assets/images/Achievement_dark.png') } />
                        </TouchableOpacity>             
                    </Col>
                </Grid>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    mainButton: {
        width: 60,
        height: 60,
        alignSelf: 'center',
    },
    menuButton: {
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
});