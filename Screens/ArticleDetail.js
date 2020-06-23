import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,Dimensions,
    TouchableOpacity,
    TextInput,
    Linking,
    Button,
    ScrollView
} from 'react-native';
import { database } from '../src/config/config';
import React, {Component} from 'react';
import {Audio} from 'expo-av';

export default class AskAnExpert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article_id: '001',
            data:"",
            isVid: false,
        };
    }

    async componentDidMount() {

        database.ref("contents/articles").orderByChild("article_id").equalTo(this.state.article_id).once("value",(snapshot)=>{
            snapshot.forEach((childSnapshot)=>{
                var childData = childSnapshot.val();
                console.log(childData);
                this.setState({data: childData})
            })
        })

        const playbackObject = await Audio.Sound.createAsync(
            {url: 'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3'},
            { shouldPlay: true})
    }

    render() {

        // const playAudio = () =>{
        //     var sound1 = new Sound('https://raw.githubusercontent.com/norangai/hkcovid19/master/bg_music.mp3?token=AF6UXQF236DTZWHEDE7ZP7C67MNYI','',
        //     (error, sound)=>{
        //         if(error){
        //             console.log('cant play', error);
        //         }
        //         else{
        //             sound1.play(()=>{
        //                 sound1.release();
        //             })
        //         }
        //     }
        //     )
        // }


        return (
        <View style={{backgroundColor:"#F6F6F6"}}>
            <View>
                <Image 
                    source = {{uri: this.state.data.image}}
                    style={{width:Dimensions.get('window').width, height:250,opacity:0.6}}
                />
            </View>
           
            <View>
                <Text style={ArticleDetailScreen.articleSubject}>{this.state.data.subject}</Text>
                <Text style={ArticleDetailScreen.articleContent}>{this.state.data.content}</Text>
                
            </View>
        </View>
        );
    }
}

const ArticleDetailScreen = StyleSheet.create({
    articleSubject:{
        fontSize:24,
        color: "#24559E",
        fontWeight:'bold',
        margin:15,
    },
    articleContent:{
        fontSize:18,
        color:"#4D8AE4",
        margin:15,
    }
});
