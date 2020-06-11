import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import AppColors from '../Styles/colors';
import {Styles} from '../Styles/styles';
import Sound from 'react-native-sound';

const sound = new Sound('ForSee/assets/audio/eyeexercise1.mpeg', null, (error) => {
});

export default class GetEducated extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.setState({});
    }


    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content"/>
                <Text style={DoctorsStyles.helpText}>What do you want to learn today?</Text>
                <ScrollView style={DoctorsStyles.mainView}>
                    <View style={[DoctorsStyles.card, {height: 130}]}>
                        <Text style={[DoctorsStyles.articleTitle]}>Eye Exercise</Text>
                        <Text>Please use earphones.</Text>
                        <TouchableOpacity style={[DoctorsStyles.articleText,
                            {backgroundColor: "orange", width: 80, alignItems: 'center',padding: 10, borderRadius: 10, marginTop: 5}]}
                                          onPress={() => sound.play()}>
                            <Text>Listen</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={DoctorsStyles.card} onPress={() => this.props.navigation.navigate("ArticleDetailScreen", {index: 0})}>
                        <Text style={DoctorsStyles.articleTitle}>Recipe</Text>
                        <Text style={DoctorsStyles.articleText}>護眼食譜 忌廉汁菠菜煙三文魚意粉 ...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={DoctorsStyles.card} onPress={() => this.props.navigation.navigate("ArticleDetailScreen", {index: 1})}>
                        <Text style={DoctorsStyles.articleTitle}>Article</Text>
                        <Text style={DoctorsStyles.articleText}>錯誤使用電子螢幕的問題
                            你知道如果錯誤使用電子螢幕，除了加深近視之外，還會引起其他眼睛問題，例如電腦視覺綜合症（ＣＶＳ）嗎？...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={DoctorsStyles.card} onPress={() => this.props.navigation.navigate("ArticleDetailScreen", {index: 2})}>
                        <Text style={DoctorsStyles.articleTitle}>Article</Text>
                        <Text style={DoctorsStyles.articleText}>你知道近視是甚麼嗎? 近視是指視覺成像提前聚焦在視網膜前，導致看遠方的物體會模糊不清，
                            因為並非所有的畫面都會模糊不清，所以許多人並不會立即去檢查。...</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const DoctorsStyles = StyleSheet.create({
    mainView: {
        marginHorizontal: 20,
        padding: 20,
        height: '80%'
    },
    card: {
        width: '100%',
        height: 200,
        backgroundColor: '#FFFFFF',
        shadowOffset: {width: 5, height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.1,
        padding: 20,
        borderRadius: 20,
        marginBottom: 20
    },
    articleTitle: {
        fontSize: 24,
        marginBottom: 10,
    },
    articleText: {
        fontSize: 14,
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
    choiceText: {
        fontSize: 24,
        color: 'gray',
        fontWeight: 'bold',
    },
    helpText: {
        textAlign: 'left',
        width: '80%',
        color: 'gray',
        fontSize: 32,
        marginBottom: 10,
        marginTop: 60,
        marginLeft: 20,
        fontWeight: 'bold',
    },
});
