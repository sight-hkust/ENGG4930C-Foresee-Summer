import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Linking,
    ScrollView
} from 'react-native';
import React, {Component} from 'react';
import AppColors from '../Styles/colors';
import {Styles} from '../Styles/styles';

export default class AskAnExpert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }

    componentDidMount() {
        this.setState({
            index: this.props.route.params.index,
        });
    }

    render() {
        return (

            <View>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView style={ArticleDetailStyles.mainView}>
                    <Text style={ArticleDetailStyles.helpText}>{this.state.index === 0 ? "Recipe" : "Article"}</Text>
                    <ScrollView style={ArticleDetailStyles.choicesContainer}>
                        {this.state.index === 0 ?
                        <Text>
                            {"護眼食譜 忌廉汁菠菜煙三文魚意粉\n材料\n意粉200克(g)\n煙三文魚100克(g),略切\n菠菜2棵1個.切段\n洋蔥絲0.5個\n淡忌廉50ML,雞湯200ML\n百里香適量\n黑胡椒粒適量\n"+
                            "鹽適量\n步驟\n1.意粉煮至8成熟\n2.用另一易潔鑊爆洋蔥絲至半熟\n3.撈起意粉投下鑊中\n4.下百里香碎兜勻後下雞湯煮至湯滾起\n"+
                            "5.下雞湯煮至湯滾起\n6.下淡忌廉， 黑胡椒碎及鹽調味\n7.最後下煙三文魚片及菠菜段\n8.煮至三文魚轉色及菠菜熟透便完成\n"+
                            "營養價值:\n菠菜-胡蘿蔔素\nβ-胡蘿蔔素是一種常見於水果和蔬菜中的橙色色素，屬於類胡蘿蔔素的化合物。有試驗證明β-胡蘿蔔素可能在與年齡相關的眼病中發揮作用，補充β-胡蘿蔔素、維他命C、 維他命E、鋅和銅降低了發生晚期黃斑部退化的風險。\n" +
                            "三文魚Omega-3脂肪酸\nOmega-3脂肪酸在視網膜中有保護神經的作用，包括調節影響氧化壓力、炎症和血管形成的代謝過程。而DHA是視網膜中大量存在的關鍵脂肪酸，影響涉及光轉導的視網膜細胞訊號傳導機制。有研究指出，視網膜的血管動脈硬化會增加晚期黃班部退化的風險，Omega-3脂肪酸可能與晚期黃班部退化有關。\n\n" +
                            "資料來源:\n點煮網https://www.dimcook.com/recipe/b4ef16a565/%E5%BF%8C%E5%BB%89%E6%B1%81%E8%8F%A0%E8%8F%9C%E7%85%99%E4%B8%89%E6%96%87%E9%AD%9A%E6%84%8F%E7%B2%89\n"+
                            "晴報 https://skypost.ulifestyle.com.hk/article/2405702/%E7%B6%93%E5%B8%B8%E7%9D%87%E6%89%8B%E6%A9%9F%E7%9C%BC%E4%B9%BE%E7%9C%BC%E7%97%9B%E9%A0%BB%E5%87%BA%E7%8F%BE%20%E8%AD%B7%E7%9C%BC%E5%BF%85%E5%90%83%E5%90%AB6%E5%A4%A7%E7%87%9F%E9%A4%8A%E7%B4%A0%E9%A3%9F%E7%89%A9"}
                        </Text> : this.state.index === 1 ? <Text>
                                    {"錯誤使用電子螢幕的問題\n" +
                                    "你知道如果錯誤使用電子螢幕，除了加深近視之外，還會引起其他眼睛問題，例如電腦視覺綜合症（ＣＶＳ）嗎？\n" +
                                    "甚麼是使用電子螢幕的壞習慣？長時間使用電子螢幕，缺少眨眼，與電子螢幕距離太近等都是常見的壞習慣。\n" +
                                    "電腦視覺綜合症的症狀包括眼晴疲勞，頭痛，乾眼症，雙重影像和視力模糊。要預防電腦視覺綜合症，就要記得經常眨眼，每 20 分鐘看20 英尺（或 6 米）遠的物件，維持最少 20 秒，亦即是20-20-20 規則，減少使用電子設備並增加戶外活動。\n" +
                                    "如果症狀持續，就必須尋求眼科醫生的意見，以防止嚴重的眼睛問題。\n" +
                                    "資料來源：教育局（眼睛護理課程）"}
                                    <Text style={{color: 'blue'}}
                                          onPress={() => Linking.openURL('https://www.edb.gov.hk/tc/edu-system/primary-secondary/applicable-to-primary-secondary/it-in-edu/Eyecare/sec-device.html')}>
                                        https://www.edb.gov.hk/tc/edu-system/primary-secondary/applicable-to-primary-secondary/it-in-edu/Eyecare/sec-device.html
                                    </Text>
                                </Text> :
                                <Text>{"你知道近視是甚麼嗎? 近視是指視覺成像提前聚焦在視網膜前，導致看遠方的物體會模糊不清，因為並非所有的畫面都會模糊不清，所以許多人並不會立即去檢查。近視的原因有很多，可能和遺傳有關，也和日常生活習慣有關。目前處裡近視最常見的方法是戴眼鏡，藉由鏡片光學原理將光線聚焦在視網膜上。也可以利用雷射手術，但並非每個人都適合這種方法。\n\n資料來源:CooperVision  https://coopervision.com.hk/zh-hant/eye-health-and-vision/what-is-nearsightedness"}</Text>}
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
            ;
    }
}

const ArticleDetailStyles = StyleSheet.create({import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { database } from '../src/config/config';
import React, {Component} from 'react';
import {Audio, Video} from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import {Button} from 'react-native-elements';
import {Icon} from 'react-native-elements'
import * as ScreenOrientation from 'expo-screen-orientation';

//TODO: STOP VID WHEN LEAVE THE SCREEN!!

export default class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.playbackInstance = null;
        this.state = {
            play : false,
            playbackObject: null,
            volume: 1.0,
            isBuffering: false,
            article_id: '004', //this.route.param
            content:"",
            subject:"",
            image: null,
            video:null,
            isVid: false,
        };
    }

    mountVid = component =>{
        this.video = component;
        this._handleVidRef(true);
    }

    async _handleVidRef(playing){
        const {video} = this.state;
        try{
            const status={
                shouldPlay: playing,}
            const source = {uri: video}
            
            await this.video.loadAsync(source,status,false);
            this.setState({playbackObject: this.video});

        }catch(e){console.log(e)}

    }       

    onFullScreenPressed = ()=>{
        this.video.presentFullscreenPlayer()
    }

    fullscreencontrol = event=>{
        if(event.fullscreenUpdate == 0){
            console.log("jet")
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        } 
        if(event.fullscreenUpdate == 3){
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_DOWN)
        } 
        
    }

    async getAudio (){
        const {play,volume,image} = this.state
    
        try{
            const playbackObject = new Audio.Sound()
            const source = {uri: image}
            
            const status={
                shouldPlay: play,
                volume
            }
    
            playbackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            await playbackObject.loadAsync(source,status,false)
            this.setState({playbackObject:playbackObject})
            } catch(e){
                console.log(e)
            }
        }
        onPlaybackStatusUpdate = status=>{
            this.setState({isBuffering: status.isBuffering})
        }
    

    async componentDidMount() {
        

        database.ref("contents/articles").orderByChild("article_id").equalTo(this.state.article_id).once("value",(snapshot)=>{
            snapshot.forEach((childSnapshot)=>{
                var childData = childSnapshot.val();
                if(childData.isVid){
                    this.setState({content: childData.content,
                        subject: childData.subject,
                        isVid: childData.isVid,
                        video: childData.video,
                        })
                }
                else{
                    this.setState({content: childData.content,
                        subject: childData.subject,
                        isVid: childData.isVid,
                        image: childData.image,
                        })
                }
            })
        })

        if(!this.state.isVid){
            this.getAudio()
        }
        
    }

    render() {

        const PressPlayButton = async()=>{
            const {play, playbackObject} = this.state
            play? await playbackObject.pauseAsync(): await playbackObject.playAsync()
            this.setState({play: !play})    
        }

        return (
        <View style={{backgroundColor:"#F6F6F6", height:'100%'}}>
            <View>
            {this.state.isVid &&
                <Video
                    ref={this.mountVid}
                    resizeMode="cover"
                    useNativeControls={true}
                    onFullscreenUpdate={this.fullscreencontrol}
                    style={{width:Dimensions.get('window').width, height:250}}
                />    
                }

            {!this.state.isVid &&
                <>
                <Image 
                    source = {{uri: this.state.image}}
                    style={{width:Dimensions.get('window').width, height:250}}
                />
                <LinearGradient
                    colors={['transparent','transparent','#F6F6F6']}
                    locations = {[0,0.2,1]}
                    style={{
                    position:'absolute', height:250,width:Dimensions.get('window').width
                    }}
                >
                </LinearGradient>
                </>
            }

            <Text style={ this.state.isVid? ArticleDetailScreen.videoSubject:ArticleDetailScreen.articleSubject}>{this.state.subject}</Text>
            </View>

           <ScrollView>
           
            <View>
                {!this.state.isVid &&
                <Button title={this.state.play? "暫停錄音":"播放錄音"} titleStyle={ArticleDetailScreen.buttonTitle} onPress={()=>PressPlayButton()} buttonStyle={ArticleDetailScreen.playButton}/>
                }
                <Text style={this.state.isVid? ArticleDetailScreen.videoContent :ArticleDetailScreen.articleContent}>{this.state.content}</Text>


            </View>
            </ScrollView>
        </View>
        );
    }
}

const ArticleDetailScreen = StyleSheet.create({
    articleSubject:{
        position: 'absolute',
        top: 210,
        fontSize:30,
        paddingLeft:30,
        color: "#24559E",
        fontWeight:'bold',
        
    },
    videoSubject:{
        position: 'absolute',
        top: 260,
        fontSize:30,
        paddingLeft:30,
        color: "#24559E",
        fontWeight:'bold',
    },
    articleContent:{
        paddingTop:20,
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:15,
        fontSize:18,
        color:"#4D8AE4",
        
    },
    videoContent:{
        paddingTop:70,
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:15,
        fontSize:18,
        color:"#4D8AE4",
    },
    playButton:{
        backgroundColor:'#8BB5F4',
        marginLeft:110,
        marginTop:25,
        paddingTop:5,
        width:120,
        
    },
    buttonTitle:{
        fontSize:20,
    }

});
    mainView: {
        alignItems: 'center',
        height: '100%',
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
        height: '90%',
        padding: 30
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
        marginBottom: 30,
        marginTop: 10,
        fontWeight: 'bold',
    },
});
