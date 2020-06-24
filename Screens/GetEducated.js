import {
    SafeAreaView,StyleSheet,Text,View,TouchableOpacity,ScrollView,FlatList,Image, Dimensions
} from 'react-native';
import React, {Component} from 'react';
import { database } from '../src/config/config';
import { LinearGradient } from 'expo-linear-gradient';

const Setting = require('../assets/images/setting.png')


export default class GetEducated extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            topArticle:""
        }
    }

    componentDidMount(){
        database.ref("contents/articles").orderByChild("article_id").limitToFirst(3).once("value",(snapshot)=>{
            var temp = [];
            //console.log(snapshot.toJSON());
            snapshot.forEach((childSnapshot)=>{
                var childData = childSnapshot.val();
                //console.log(childData);
                temp.push(childData);
                this.setState({data: temp})
            })
        })
        database.ref("contents/articles").orderByChild("isTop").equalTo(true).once("value",(snapshot)=>{
            var temp = [];
            //console.log(snapshot.toJSON());
            snapshot.forEach((childSnapshot)=>{
                var childData = childSnapshot.val();
                console.log(childData);
                this.setState({topArticle: childData})
            })
        })
    }

    render() {
        return (
            
        <View style={{backgroundColor:"#E1EDFF",height:'100%'}}>
            <View style={GetEducatedScreen.headerContainer}>  
            <LinearGradient
                colors={['#1872a7','#5a74d1','#a676ff']}
                start={[0, 0.9]}
                end={[1, 0.1]}
                locations={[0, 0.5, 1]}
                style={{
                height: '100%',
                }}
            >
            </LinearGradient>
            </View>
            <View>
               <View style={GetEducatedScreen.header}>
                    <Text style={GetEducatedScreen.title}>護眼秘笈</Text>
                    <TouchableOpacity>
                        <Image source={Setting}/>
                    </TouchableOpacity>
                </View>
                
                <View style={GetEducatedScreen.topArticleContainer}>
                    <Image
                        source = {{uri: this.state.topArticle.image}}
                        style={GetEducatedScreen.topArticleImage}
                    />
                    <Text style={GetEducatedScreen.topArticleText}>{this.state.topArticle.subject}</Text>
                </View>

                <View style={GetEducatedScreen.articleListContainer}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item})=> <Item item={item} navigation={this.props.navigation}/> }
                        keyExtractor={item=>item.article_id}
                    />
                </View>
            </View>
        </View>
        );
    }
}

function Item({item, navigation}){
    const pressHandler=()=>{
        navigation.navigate("ArticleDetailScreen")
    }
    return(
        <TouchableOpacity onPress={pressHandler}>
        <View style={GetEducatedScreen.articleItem}>
        
            <View>
            <Image 
                source = {{uri: item.image}}
                style = {GetEducatedScreen.itemImage}
            />
            </View>
            <View>
                <View>
                <Text style={GetEducatedScreen.articleSubject}>{item.subject}</Text>
                <Text style={GetEducatedScreen.articleDate}>{item.date}</Text>
                <Text style={GetEducatedScreen.articleAbstract}>{item.abstract}</Text>
                </View>
                
            </View>
        </View>
        </TouchableOpacity>
    );
} 

const GetEducatedScreen = StyleSheet.create({
    header: {
        paddingTop:25,
        marginRight:18,
        marginLeft:18,
        flexDirection:'row',
        justifyContent: 'space-between',
    }, 
    title: {
        fontSize:30,
        color: "white",
        fontWeight: '600',
      },
    headerContainer:{
        overflow:'hidden',
        borderBottomLeftRadius:35,
        borderBottomRightRadius:35,
        position:'absolute',
        height:210,
        width: Dimensions.get("window").width, 
    },
    topArticleContainer:{
        marginTop:40,
        marginBottom:15,
    },
    articleListContainer:{
        marginTop:5,
        marginLeft:30,
        marginRight:30,
    },
    articleItem:{
        flexDirection:'row',
        marginTop:20,

    },
    itemImage:{
        width:85,
        height:85,
        borderRadius:10,
        marginRight:25,
    },
    articleSubject:{
        width:210,
        flexWrap:'wrap',
        fontWeight:'bold',
        fontSize:18,
        color:"#24559E",

    },
    articleDate: {
        fontSize:12,
        color:'#1772A6', 
        paddingBottom:5,
        paddingTop:2
    },
    articleAbstract: {
        width:200,
        flexWrap:'wrap',
        fontSize:14,
        color:"#2D9CDB",
        paddingRight:10,
        paddingBottom:10,
        borderBottomWidth:1,
        borderColor:"#24559E"
    },
    topArticleImage:{
        width:300,
        height:180,
        marginLeft:30,
        marginRight:30,
        borderRadius:14
    },
    topArticleText:{
        position:'absolute',
        top:130,
        paddingLeft:20,
        paddingTop:7,
        left:30,
        width: 300,
        height:50,
        borderBottomLeftRadius:14,
        borderBottomRightRadius:14,
        fontSize:24,
        fontWeight:'bold',
        color:"white",
        backgroundColor:"rgba(0, 0, 0, 0.4)"
    },

});
