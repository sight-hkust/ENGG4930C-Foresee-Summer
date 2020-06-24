import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Input, CheckBox, Button, Icon, Avatar } from 'react-native-elements'
import { Grid, Col } from 'react-native-easy-grid'
import { Formik } from "formik";
import { object, string } from "yup"
import moment from 'moment';

import { ScreenHeight, ScreenWidth } from '../../../constant/Constant'
import { database } from '../../config/config'
import { RoundButton } from '../../../Utils/RoundButton'
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground'
import MenuScreen from '../../../Utils/MenuScreen'
import BottomModal from '../../../Utils/BottomModal'
import { set } from 'react-native-reanimated';


const faq_list = [
    {
        post_id: '1',
        question_title: '小朋友經常擦眼睛？',
        question_content: '攪到眼皮同眼球紅紅地，成日都係咁，已講左好多次吾好擦眼，會有細菌同越整越痕，都吾知做咩，講完都成日係咁，洗吾洗去睇醫生？！如果係細菌感染所致，咁應點做？',
        answer: '眼痕問題有很多原因：受空氣微塵、乾燥或少少菌、眼垢分泌（過敏）刺激最多，你可以試下熱敷洗眼\n\n早午晚，按需要就可做： (秘訣係用具要乾淨，行動要溫...',
        prof_name: '黃子豪',
        prof_title: '第1部分註冊視光師'
    },
    {
        post_id: '2',
        question_title: '小朋友成日眨左眼，眼睛有事？',
        question_content: '今年內地經濟不景，就算名校畢業也不一定覓得好工，時運很重要。正於這環境下，抖音、今日頭條之母公司字節跳動（ByteDance）一名28歲程式員早前宣布「退休」，備受熱議。他9年前從暨南大學畢業後，每一次人生抉擇都踩中jackpot，奮鬥短短幾年便賺到逾億元人民幣身家，決定赴日本開設溫泉旅店，實在令人艷羨。不過「少年得志」也未必是好事，好似阿里巴巴（09988）繼「前太子」蔣凡後，再有一名管理層涉嫌「潛規則」落馬，又是因為「錢太多」累事。',
        answer: '在支付寶工作3年後，郭宇於2013年轉投主打搞笑內容的startup公司糗事百科，成為核心管理層之一。翌年糗事百科被字節跳動收購，郭宇順勢過檔，在6年間做到資深技術專家職級，屬中高階崗位（相當於阿里P9、騰訊T4）。最重要的是，隨着抖音、今日頭條大受歡迎，字節跳動近年極速增長，被視為中國第三大科網勢力，現時估值逾1000億美元。',
        prof_name: '郭宇堪',
        prof_title: '28歲程式員'
    },
    {
        post_id: '3',
        question_title: '特朗普指美檢測「做得太好」',
        question_content: '台灣首架自主研製的新式高級教練機勇鷹號，完成首次試飛，蔡英文總統形容是締造歷史一刻，亦是台灣航太產業一個里程碑。勇鷹號在台中清泉崗機場首次試飛，過程約12分鐘，完成了地面滑行、高速滾行升空及五邊進場等項目。試飛官指，勇鷹號一直維持在五千呎的高度飛行，性能、品質及安全都正常。',
        answer: '身兼三軍統帥的蔡英文總統形容，今次試飛成功，締造了歷史性一刻，是台灣航太產業一個里程碑。蔡英文政府上台以來，一直強調要國防自主。勇鷹號由空軍、中科院及台中漢翔公司在2017年2月開始研發，總經費達到686億新台幣，其中逾一半經費的訂單來自台灣。',
        prof_name: '蔡英文',
        prof_title: '三軍統帥'
    },    
    {
        post_id: '4',
        question_title: '創辦人劉強東屢涉桃色新聞',
        question_content: '網易（9999）與京東（9618）緊接上市，同樣是各自領域的巨頭，還有一點相似的是，就是創辦人的個人色彩。相比網易行政總裁丁磊的養豬計劃，京東的劉強東可說是內地科技巨頭創辦人中最「活躍」的一位，但圍繞他的，都是桃色花邊新聞。',
        answer: '就算京東成立本身，都與劉強東的感情生活有關。事關京東名稱由來，源自他大學時期的初戀女友龔小京的名字，兩人在京東創立初期在一起，以各自名字的最後一字命名公司，但雙方最終在京東上市前便已分道揚鑣。',
        prof_name: '劉強東',
        prof_title: '創辦人'
    },
    {
        post_id: '1',
        question_title: '小朋友經常擦眼睛？',
        question_content: '攪到眼皮同眼球紅紅地，成日都係咁，已講左好多次吾好擦眼，會有細菌同越整越痕，都吾知做咩，講完都成日係咁，洗吾洗去睇醫生？！如果係細菌感染所致，咁應點做？',
        answer: '眼痕問題有很多原因：受空氣微塵、乾燥或少少菌、眼垢分泌（過敏）刺激最多，你可以試下熱敷洗眼\n\n早午晚，按需要就可做： (秘訣係用具要乾淨，行動要溫...',
        prof_name: '黃子豪',
        prof_title: '第1部分註冊視光師'
    },
    {
        post_id: '2',
        question_title: '28歲程式員退休',
        question_content: '今年內地經濟不景，就算名校畢業也不一定覓得好工，時運很重要。正於這環境下，抖音、今日頭條之母公司字節跳動（ByteDance）一名28歲程式員早前宣布「退休」，備受熱議。他9年前從暨南大學畢業後，每一次人生抉擇都踩中jackpot，奮鬥短短幾年便賺到逾億元人民幣身家，決定赴日本開設溫泉旅店，實在令人艷羨。不過「少年得志」也未必是好事，好似阿里巴巴（09988）繼「前太子」蔣凡後，再有一名管理層涉嫌「潛規則」落馬，又是因為「錢太多」累事。',
        answer: '在支付寶工作3年後，郭宇於2013年轉投主打搞笑內容的startup公司糗事百科，成為核心管理層之一。翌年糗事百科被字節跳動收購，郭宇順勢過檔，在6年間做到資深技術專家職級，屬中高階崗位（相當於阿里P9、騰訊T4）。最重要的是，隨着抖音、今日頭條大受歡迎，字節跳動近年極速增長，被視為中國第三大科網勢力，現時估值逾1000億美元。',
        prof_name: '郭宇堪',
        prof_title: '28歲程式員'
    },
    {
        post_id: '3',
        question_title: '台灣自主研製高級教練機首次試飛成功',
        question_content: '台灣首架自主研製的新式高級教練機勇鷹號，完成首次試飛，蔡英文總統形容是締造歷史一刻，亦是台灣航太產業一個里程碑。勇鷹號在台中清泉崗機場首次試飛，過程約12分鐘，完成了地面滑行、高速滾行升空及五邊進場等項目。試飛官指，勇鷹號一直維持在五千呎的高度飛行，性能、品質及安全都正常。',
        answer: '身兼三軍統帥的蔡英文總統形容，今次試飛成功，締造了歷史性一刻，是台灣航太產業一個里程碑。蔡英文政府上台以來，一直強調要國防自主。勇鷹號由空軍、中科院及台中漢翔公司在2017年2月開始研發，總經費達到686億新台幣，其中逾一半經費的訂單來自台灣。',
        prof_name: '蔡英文',
        prof_title: '三軍統帥'
    },    
    {
        post_id: '4',
        question_title: '創辦人劉強東屢涉桃色新聞',
        question_content: '網易（9999）與京東（9618）緊接上市，同樣是各自領域的巨頭，還有一點相似的是，就是創辦人的個人色彩。相比網易行政總裁丁磊的養豬計劃，京東的劉強東可說是內地科技巨頭創辦人中最「活躍」的一位，但圍繞他的，都是桃色花邊新聞。',
        answer: '就算京東成立本身，都與劉強東的感情生活有關。事關京東名稱由來，源自他大學時期的初戀女友龔小京的名字，兩人在京東創立初期在一起，以各自名字的最後一字命名公司，但雙方最終在京東上市前便已分道揚鑣。',
        prof_name: '劉強東',
        prof_title: '創辦人'
    },
    {
        post_id: '1',
        question_title: '小朋友經常擦眼睛？',
        question_content: '攪到眼皮同眼球紅紅地，成日都係咁，已講左好多次吾好擦眼，會有細菌同越整越痕，都吾知做咩，講完都成日係咁，洗吾洗去睇醫生？！如果係細菌感染所致，咁應點做？',
        answer: '眼痕問題有很多原因：受空氣微塵、乾燥或少少菌、眼垢分泌（過敏）刺激最多，你可以試下熱敷洗眼\n\n早午晚，按需要就可做： (秘訣係用具要乾淨，行動要溫...',
        prof_name: '黃子豪',
        prof_title: '第1部分註冊視光師'
    },
    {
        post_id: '2',
        question_title: '28歲程式員退休',
        question_content: '今年內地經濟不景，就算名校畢業也不一定覓得好工，時運很重要。正於這環境下，抖音、今日頭條之母公司字節跳動（ByteDance）一名28歲程式員早前宣布「退休」，備受熱議。他9年前從暨南大學畢業後，每一次人生抉擇都踩中jackpot，奮鬥短短幾年便賺到逾億元人民幣身家，決定赴日本開設溫泉旅店，實在令人艷羨。不過「少年得志」也未必是好事，好似阿里巴巴（09988）繼「前太子」蔣凡後，再有一名管理層涉嫌「潛規則」落馬，又是因為「錢太多」累事。',
        answer: '在支付寶工作3年後，郭宇於2013年轉投主打搞笑內容的startup公司糗事百科，成為核心管理層之一。翌年糗事百科被字節跳動收購，郭宇順勢過檔，在6年間做到資深技術專家職級，屬中高階崗位（相當於阿里P9、騰訊T4）。最重要的是，隨着抖音、今日頭條大受歡迎，字節跳動近年極速增長，被視為中國第三大科網勢力，現時估值逾1000億美元。',
        prof_name: '郭宇堪',
        prof_title: '28歲程式員'
    },
    {
        post_id: '3',
        question_title: '台灣自主研製高級教練機首次試飛成功',
        question_content: '台灣首架自主研製的新式高級教練機勇鷹號，完成首次試飛，蔡英文總統形容是締造歷史一刻，亦是台灣航太產業一個里程碑。勇鷹號在台中清泉崗機場首次試飛，過程約12分鐘，完成了地面滑行、高速滾行升空及五邊進場等項目。試飛官指，勇鷹號一直維持在五千呎的高度飛行，性能、品質及安全都正常。',
        answer: '身兼三軍統帥的蔡英文總統形容，今次試飛成功，締造了歷史性一刻，是台灣航太產業一個里程碑。蔡英文政府上台以來，一直強調要國防自主。勇鷹號由空軍、中科院及台中漢翔公司在2017年2月開始研發，總經費達到686億新台幣，其中逾一半經費的訂單來自台灣。',
        prof_name: '蔡英文',
        prof_title: '三軍統帥'
    },    
    {
        post_id: '4',
        question_title: '創辦人劉強東屢涉桃色新聞',
        question_content: '網易（9999）與京東（9618）緊接上市，同樣是各自領域的巨頭，還有一點相似的是，就是創辦人的個人色彩。相比網易行政總裁丁磊的養豬計劃，京東的劉強東可說是內地科技巨頭創辦人中最「活躍」的一位，但圍繞他的，都是桃色花邊新聞。',
        answer: '就算京東成立本身，都與劉強東的感情生活有關。事關京東名稱由來，源自他大學時期的初戀女友龔小京的名字，兩人在京東創立初期在一起，以各自名字的最後一字命名公司，但雙方最終在京東上市前便已分道揚鑣。',
        prof_name: '劉強東',
        prof_title: '創辦人'
    }

]


const AskAnExpertMainScreen = ({ route, navigation }) => {

    let RGB = [20, 52, 101];
    
    const IncreaseFadingEffect = () => {
        if(RGB[0] + 13 <= 80) {
            RGB[0] += 6.5;
        }

        if(RGB[1] + 36 <= 180){
            RGB[1] += 18;
        }

        if(RGB[2] + 27 <= 203) {
            RGB[2] += 13.5
        }
    }
    
    return (
        <MenuScreen menuContainer={{height: 30, }}>
            <View style={styles.container}>
            <Text style={{fontWeight: 'bold',fontSize: 30, color: 'white', alignSelf: 'baseline', left: 30, marginBottom: ScreenHeight * 0.03 }}>
                專家解答
            </Text>

            <View style={{width: ScreenWidth, zIndex: 10,}}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25, marginLeft: ScreenWidth * 0.05 + 23}}>熱門</Text>

                <FlatList
                    data={faq_list}
                    horizontal={true}
                    renderItem={({ item, key }) => (
                        <HotQuestionCard faq={item} RGB={RGB} IncreaseFadingEffect={IncreaseFadingEffect}/>
                    )}
                    keyExtractor={item => item.id}
                    style={{marginTop: 26, height: 180}}
                    showsHorizontalScrollIndicator={false}
                >
                </FlatList>
            </View>

            <View style={styles.background}>
                <Grid style={{marginTop: 91}}>
                    <Col style={{position: 'absolute', left: 23}}>
                        <Text style={{color: '#24559E', fontWeight: 'bold', fontSize: 25}}> 最新</Text>
                    </Col>
                    <Col style={{position: 'absolute', right: 23}}>
                    <Icon
                        size={35}
                        name='edit'
                        type='feather'
                        color="black"
                    />
                    </Col>

                </Grid>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
                    {
                        faq_list.map(item => {
                            return(
                                <MiniQuestionCard faq={item} />
                            );
                        })
                    }
                </ScrollView>

            </View>
            </View>
        </MenuScreen>
    );
}

export const MiniQuestionCard = (props) => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible)
    }

    return(
        <View style={{shadowColor: '#000000',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 3,}}>  
            <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 30, height: 110, alignItems: 'center', marginBottom: 15}} onPress={toggleModal}>
                <View style={{paddingLeft: 20, paddingRight: 11, paddingTop: 20}}>
                    <Text style={{fontSize: 17, color: '#1772A6', fontWeight: 'bold', paddingBottom: 10}}>問。{props.faq.question_title}</Text>
                    <Text style={{fontSize: 14, color: '#2D9CDB'}}>{props.faq.question_content.substring(0, 35)} . . . . .</Text>
                </View>
            </TouchableOpacity>
            <QuestionCard isVisible={isVisible} toggleModal={toggleModal} faq={props.faq}/>
        </View>
    );
}

export const QuestionCard = (props) => {

    const [bookmarked, setBookmarked] = useState(false);

    return(
        <BottomModal isVisible={props.isVisible} toggleModal={props.toggleModal} style={{backgroundColor: 'rgb(225, 237, 255)', height: 670}}>
            <View style={{backgroundColor: '#1772A6', height: 4, width: 70, alignSelf: 'center', marginBottom: 40}}/>
            <View style={{backgroundColor: 'white', borderRadius: 30, height: 270, alignItems: 'center', marginBottom: 25}}>
                <View style={{padding: 20}}>
                <Text style={{fontSize: 25, color: '#24559E', fontWeight: 'bold', paddingBottom: 40}}>問。{"\n"}{props.faq.question_title}</Text>
                    <ScrollView>
                        <Text style={{fontSize: 18, color: '#2D9CDB'}}>{props.faq.question_content}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={{backgroundColor: 'white', borderRadius: 30, height: 270, alignItems: 'center', marginBottom: 15}}>
                <View style={{padding: 20}}>
                <Icon
                    containerStyle={{position: 'absolute', right: 30, top: 30, zIndex: 3}}
                    name={!bookmarked?'bookmark':'bookmark-alt'}
                    type='fontisto'
                    size={45}
                    color={bookmarked?'orange':'black'}
                    onPress={()=>setBookmarked(!bookmarked)}
                    />
                    <Text style={{fontSize: 25, color: '#24559E', fontWeight: 'bold', paddingBottom: 40}}>答。{'\n'}{props.faq.prof_name}
                        <Text style={{fontSize: 15, color: '#24559E', fontWeight: 'normal'}}>
                            {" "}{props.faq.prof_title}
                        </Text>
                    </Text>
                    <ScrollView style={{zIndex: 10}}>
                        <Text style={{fontSize: 18, color: '#2D9CDB'}}>{props.faq.answer}</Text>
                    </ScrollView>
                </View>
            </View>
        </BottomModal>
    );
}

export const HotQuestionCard = (props) => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible)
    }

    console.log('wtf')

    return (
        <View style={{shadowColor: '#000000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: 0.3,
        shadowRadius: 5,}}>
        <View style={{width: 140,height: 140, borderRadius: 30, overflow: 'hidden', marginRight: 20}}>
            {
                props.IncreaseFadingEffect()
            }
            <TouchableOpacity onPress={toggleModal}>
            <LinearGradientBackground colors={[`rgb(${props.RGB[0]},${props.RGB[1]},${props.RGB[2]})`, `rgb(${props.RGB[0] + 6.5},${props.RGB[1] + 18.5},${props.RGB[2] + 13})`]} start={[0, 1]} end={[1, 0]} locations={[0.12, 0.92]}>
                <Text style={{fontSize: 20, fontWeight:'bold', color: 'white', marginTop: 20, marginLeft: 12, marginRight: 12}}> {props.faq.question_title} </Text>
            </LinearGradientBackground>
            </TouchableOpacity>
        </View>
            <QuestionCard isVisible={isVisible} toggleModal={toggleModal} faq={props.faq}/>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        alignItems: 'center',
        height: ScreenHeight * 0.83,
    },
    background: {
        backgroundColor: 'rgb(225, 237, 255)',
        height: ScreenHeight * 0.57,
        //width: ScreenWidth * 0.9,
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    scrollView: {
        paddingHorizontal: 24,
        marginTop: 60,
    }
});


export default AskAnExpertMainScreen;