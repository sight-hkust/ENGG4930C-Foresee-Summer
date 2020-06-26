import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { ScreenWidth, ScreenHeight, FontScale } from '../constant/Constant';
import { database } from '../src/config/config';
import { Col, Row, Grid } from "react-native-easy-grid";
import { LinearGradient } from 'expo-linear-gradient';

const LeftOpen = require('../assets/images/LeftOpen.png');
const RightOpen = require('../assets/images/RightOpen.png');
const BackArrow = require('../assets/images/BackArrow.png');
const NextArrow = require('../assets/images/NextArrow.png');
const Setting = require('../assets/images/setting.png')

export default class ProfPatientViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            records: [],
            recordsIndex: -1
        }
    }

    componentDidMount() {
        const { key } = this.props.route.params;
        database.ref('professionals/M001/patients/' + key + '/info').once('value', (snapshot) => {
            this.setState({
                info: snapshot.val()
            });
        });
        database.ref('professionals/M001/patients/' + key + '/records').orderByKey().once('value', (snapshot) => {
            let records = [];
            let curRecord = {};
            let curYearObject = {};
            let nowYear = new Date().getFullYear();

            snapshot.forEach(child => {
                const year = child.key.split('-')[0];
                curRecord = child.val();
                curRecord.date = child.key;
                records.push(curRecord);
            });
            this.setState({
                records: records,
                recordsIndex: records.length - 1
            });
        });
    }

    render() {
        const info = this.state.info;
        const records = this.state.records;
        const curRecord = records[this.state.recordsIndex];

        return (
            <View style={styles.fullscreen}>
                <LinearGradient
                    colors={['#1872a7','#5a74d1','#a676ff']}
                    start={[0, 0.9]}
                    end={[1, 0.1]}
                    locations={[0, 0.5, 1]}
                    style={{
                        height: '100%'
                    }}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>{info.name}</Text>
                        <TouchableOpacity>
                            <Image source={Setting}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.profileText}>年齡: {info.age}</Text>
                        <Text style={styles.profileText}>職業: {info.job}</Text>
                        <Text style={styles.profileText}>家庭病史: {info.history}</Text>
                        <Text style={styles.profileText}>已知眼疾: {info.disease}</Text>
                    </View>
                    <View style={[styles.container, 
                            {flex: 2, 
                            justifyContent: 'center',
                            paddingHorizontal: 30,
                        }]}>
                        <View style={[styles.boxes, {flex: 6, paddingVertical: 10}]}>
                            {records.length == 0 ? <Text>Nah</Text> : 
                                <Grid>
                                    <Row>
                                        <Col style={styles.container}></Col>
                                        <Col style={styles.container}><Text style={[styles.gridText, {fontSize: 20}]}>O.D.</Text></Col>
                                        <Col style={styles.container}><Text style={[styles.gridText, {fontSize: 20}]}>O.S.</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.container}><Text style={styles.gridHeader}>SPH:</Text></Col>
                                        <Col style={styles.container}><Text style={styles.gridText}>{curRecord.R_SPH}</Text></Col>
                                        <Col style={styles.container}><Text style={styles.gridText}>{curRecord.L_SPH}</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.container}><Text style={styles.gridHeader}>CYL:</Text></Col>
                                        <Col style={styles.container}><Text style={styles.gridText}>{curRecord.R_CYL}</Text></Col>
                                        <Col style={styles.container}><Text style={styles.gridText}>{curRecord.L_CYL}</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.container}><Text style={styles.gridHeader}>AXIS:</Text></Col>
                                        <Col style={styles.container}><Text style={styles.gridText}>{curRecord.R_Axis}</Text></Col>
                                        <Col style={styles.container}><Text style={styles.gridText}>{curRecord.L_Axis}</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.container}><Text style={styles.gridHeader}>VA:</Text></Col>
                                        <Col style={styles.container}><Text style={styles.gridText}>{curRecord.R_VA}</Text></Col>
                                        <Col style={styles.container}><Text style={styles.gridText}>{curRecord.L_VA}</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.container}><Text style={styles.gridHeader}>PD:</Text></Col>
                                        <Col style={[styles.container, {flex: 2}]}><Text style={styles.gridText}>{curRecord.PD}</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col style={styles.container}><Text style={styles.gridHeader}>備註:</Text></Col>
                                        <Col style={[styles.container, {flex: 2}]}><Text>{curRecord.remark}</Text></Col>
                                    </Row>
                                </Grid>
                            }
                        </View>

                        <View style={{height:10}}/>
                        
                        <View style={ 
                                {backgroundColor: 'transparent', 
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flex: 1}}>
                            <TouchableOpacity
                                style={styles.boxes}
                                onPress={() => {}}
                            >
                                <Text style={styles.buttonText}>輸入數據</Text>
                            </TouchableOpacity>
                            <View style={{width: 10}}/>
                            <TouchableOpacity
                                style={styles.boxes}
                                onPress={() => {}}
                            >
                                <Text style={styles.buttonText}>眼鏡度數</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 30}}/>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fullscreen: {
        height: "100%",
        width: "100%"
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    }, 
    header: {
        paddingTop:40,
        marginHorizontal:30,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize:30,
        color: "white",
        fontWeight: 'bold'
    },
    profileText: {
        textAlign: 'left',
        fontSize: 20,
        paddingHorizontal: 30,
        color: 'white'
    },
    centreText: {
        textAlign: 'center'
    },
    boxes: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
    },
    gridText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18
    },
    gridHeader: {
        color: 'black',
        textAlign: 'left',
        fontSize: 18,
        paddingLeft: 30,
    },
    yearButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallYear: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    bigYear: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    smallCircle: {
        width: ScreenWidth * 0.07,
        height: ScreenWidth * 0.075,
        borderRadius: ScreenWidth * 0.0375,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
        borderColor: 'rgba(86, 204, 242, 0.6)',
        justifyContent: 'center'
    },
    bigCircle: {
        width: ScreenWidth * 0.09,
        height: ScreenWidth * 0.09,
        borderRadius: ScreenWidth * 0.05,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#56CCF2'
    }
});
