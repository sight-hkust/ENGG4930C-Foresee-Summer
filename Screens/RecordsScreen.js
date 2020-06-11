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

   
    render() {
        return (
            <View>
                <Text>Record</Text>
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

