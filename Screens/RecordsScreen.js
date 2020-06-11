import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Alert,
    FlatList,
} from 'react-native';
import React, {Component} from 'react';
import AppColors from '../Styles/colors';
import {Styles} from '../Styles/styles';
import Strings from '../Strings';

//import {LineChart} from 'react-native-chart-kit';

export default class RecordsScreen extends Component {
    componentDidMount() {
        this.setState({
            isProfessional: this.props.route.params.isProfessional,
            userName: this.props.route.params.userName,
        });
        this.getUserData();
    }

    constructor(props) {
        super(props);
        this.state = {
            isProfessional: false,
            userName: '',
            dates: [],
            rightEye: [],
            leftEye: [],
            records: [],
            recordsView: [],
        };
    }

    getUserData() {
        /*
        fetch('https://se69teeec9.execute-api.us-east-1.amazonaws.com/api/get_user_records?email=' + global.email + '&password=' + global.password)
            .then((response) => response.json())
            .then((json) => {
                if (json.status === 'OK') {
                    let records = json.records;
                    let dates = [];
                    let rightEyeData = [];
                    let leftEyeData = [];
                    for (let i = 0; i < records.length; i++) {
                        let record = records[i];
                        dates.push(parseInt(record.year));
                        rightEyeData.push(parseFloat(record.right_eye_myopia));
                        leftEyeData.push(parseFloat(record.left_eye_myopia));
                    }
                    this.createRecords(records);
                    this.setState({
                        dates: dates,
                        rightEye: rightEyeData,
                        leftEye: leftEyeData,
                        records: records,
                    });
                } else {
                    Alert.alert('A problem occurred!');
                }
            })
            .catch((error) => {
                Alert.alert('A problem occurred!');
                console.error(error);
            });
            */
    }


    createRecords(records) {
        let recordsView = [];
        for (let i = 0; i < records.length; i++) {
            let record = records[i];
            recordsView.push(<View style={RecordsStyles.recordContainer}>
                <Text style={RecordsStyles.recordText}>{record.month} / {record.year}</Text>
                <View style={RecordsStyles.grayLine}/>
            </View>);
        }
        this.setState({recordsView: recordsView});
    }

    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content"/>
                <ScrollView style={RecordsStyles.mainView}
                            contentContainerStyle={RecordsStyles.scrollViewContentContainer}>
                    {this.state.dates.length > 0 ? <View>
                        <Text>{Strings.leftEye}</Text>
                        
                        <Text>{Strings.rightEye}</Text>
                        
                    </View> : null}
                    <Text>{Strings.records}</Text>
                    {this.state.records.length > 0 ?
                        this.state.recordsView
                        : <Text>You currently don't have any records.</Text>}
                    <View style={RecordsStyles.choicesContainer}>
                        <TouchableOpacity style={RecordsStyles.choiceButton}
                                          onPress={() => this.props.navigation.navigate('AddRecordScreen', {refreshRecords: () => this.getUserData()})}>
                            <Text style={RecordsStyles.choiceText}>Import New Data</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const RecordsStyles = StyleSheet.create({
    flatList: {
        backgroundColor: '#FF00FF',
        width: '100%',
        height: 100,
        flex: 1,
    },
    flatListStyle: {
        width: '100%',
        backgroundColor: '#0000FF',
        height: 100,
        flex: 1,
    },
    mainView: {
        height: '100%',
    },
    scrollViewContentContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    button: {
        borderWidth: 2,
        width: '40%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'gray',
    },
    buttonText: {
        fontSize: 24,
        color: 'gray',
        fontWeight: 'bold',
    },
    nextButton: {
        borderColor: AppColors.primaryDark,
    },
    nextText: {
        color: AppColors.primaryDark,
    },
    textInput: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '80%',
        marginBottom: 50,
    },
    choiceButton: {
        width: '80%',
        height: 80,
        borderWidth: 4,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 50,
    },
    choicesContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    choiceText: {
        fontSize: 24,
        color: 'gray',
        fontWeight: 'bold',
    },
    adviceText: {
        width: '80%',
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor: 'orange',
        marginBottom: 10,
    },
    recordContainer: {
        height: 60,
        width: '100%',
    },
    grayLine: {
        height: 1,
        width: '100%',
        backgroundColor: 'gray',
        marginLeft: 20,
    },
    recordText: {
        textAlign: 'left',
        marginLeft: 20,
        fontSize: 20,
        width: '100%',
        marginBottom: 10,
        marginTop: 20,
    },
});

// TODO: Generate a method to summarize user data to plain text
// TODO: No data, graph reload after adding data problem, "cant change state on unmounted component"

