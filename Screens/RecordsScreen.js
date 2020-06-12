import React, { Component } from 'react';
import { StyleSheet, Text, View,ActivityIndicator, FlatList, TouchableOpacity, Image, Button, DatePickerAndroid } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {database} from '../constant/Config';
import LineChart from '../helpers/line-chart';

const LeftOpen = require('../assets/images/LeftOpen.png');
const RightOpen = require('../assets/images/RightOpen.png');
const Tutorial = require('../assets/images/Tutorial.png');

function TutorialButton(){
  return(
    <TouchableOpacity > 
       <Image source={Tutorial}/>
    </TouchableOpacity> 
  );
}


export default class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
      Leye: true,
      dates : [],
      ddlSelectedValue: '0',
      ddlSelectedDate : '0'
    }}

  
  componentDidMount(){
      const userid = '002';
      database.ref('users/'+ userid +'/records').on('value', (snapshot)=>{
        var tempDate = [];

        for(var key in snapshot.val()){
          tempDate.push(key);
        }
        this.setState({data : snapshot.toJSON(), dates: tempDate, ddlSelectedDate: tempDate[0]});
    });
    
    database.ref('users/' + userid+'/info').once('value').then(snapshot=>{
      var username = snapshot.val().name;
      console.log(username);
    })

      /*
    fetch('https://raw.githubusercontent.com/norangai/hkcovid19/master/eye-record.json?token=AF6UXQGH2GQIRMXFV2UAPGS64OEPE')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
      */
  }

  render(){
    const data = this.state.data;
    //console.log(this.state.dates);
    let dropdown_item = [{label:'Myopia data', value:'0'},{label:'Hyperopia data',value:'1'},{label:'Astigmatism data',value:'2'}];
    const pressHandler = ()=>{
      this.props.navigation.navigate('AddRecordScreen')
    }
    //if (!isLoading){
      
        return(
          <>
          <View>
            <TutorialButton/>
            <Button title="Record" onPress={pressHandler}/>
          </View>
          <View style={{paddingTop:10,paddingBottom:30, alignItems: 'center'}}>
            <Text style={{fontSize: 24}}>Nagi's</Text>
            <DropDownPicker items = {dropdown_item} containerStyle={{height: 40, width: 150}} 
                            defaultValue={this.state.ddlSelectedValue} onChangeItem = {(item)=>this.setState({ddlSelectedValue: item.value})}/>
            
          </View>
            <TouchableOpacity  activeOpacity= {0.8} style={{paddingRight: 25, paddingTop:15}} onPress={()=> this.setState({ Leye: !this.state.Leye})}> 
              <Image source={this.state.Leye? LeftOpen : RightOpen}/>
            </TouchableOpacity> 

          <View style={styles.container}>
            
            <FlatList
                data={this.state.dates}
                renderItem={({item})=> <Button title={item} onPress={()=>this.setState({ddlSelectedDate: item})}/>}
                keyExtractor={item => item }
            />
            <RenderContent isLeft={this.state.Leye} ddlValue={this.state.ddlSelectedValue} data={data} selectedDate={this.state.ddlSelectedDate} />
              
          </View>
          <View style={styles.container}>
              <LineChart data={{
                  labels: [],
                  datasets:[
                    {
                      data:[100,290,150,175,100]
                    }
                  ]
                }}/>
              
          </View>
          
          </>
        )
      
    //}
    //else{
    //  return <ActivityIndicator/>
    //}
  }
}

export const RenderContent = props => {
    const{ isLeft, ddlValue, data, selectedDate} = props;
    //const data = this.state.data;
    //const selectedDate = this.state.ddlSelectedDate;
    //const selectedDate = "2020-05-15"
    if(data == null){
      return(
        <Text>No data to display</Text>
        );
    }
    //console.log(data[date]);
    switch(ddlValue){
        case '0':
            if(isLeft){
                if(data[selectedDate].L_Myopia!="0"){
                    return<Text>Left Myopia: {data[selectedDate].L_Myopia}</Text>
                }
                else{
                    return<Text>Your Left eye dont have Myopia!</Text>
                }
            }
            else{
                if(data[selectedDate].R_Myopia!="0"){
                    return<Text>Right Myopia: {data[selectedDate].R_Myopia}</Text>
                }
                else{
                    return<Text>You right eye dont have Myopia!</Text>
                }                
            }
        break;
        case '1':
            if(isLeft){
                if(data[selectedDate].L_Hyperopia!="0"){
                    return<Text>Left Hyperopia: {data[selectedDate].L_Hyperopia}</Text>
                }
                else{
                    return<Text>Your Left eye dont have Hyperopia!</Text>
                }
            }
            else{
                if(data[selectedDate].R_Hyperopia!="0"){
                    return<Text>Right Hyperopia: {data[selectedDate].R_Hyperopia}</Text>
                }
                else{
                    return<Text>You right eye dont have Hyperopia!</Text>
                }                
            }
        break;
        case '2':
            if(isLeft){
                if(data[selectedDate].L_CYL!="0"){
                    return<Text>Left Astigmatism: {data[selectedDate].L_CYL}</Text>
                }
                else{
                    return<Text>Your Left eye dont have Astigmatism!</Text>
                }
            }
            else{
                if(data[selectedDate].R_CYL!="0"){
                    return(<Text>Right Astigmatism: {data[selectedDate].R_CYL}</Text>)
                
                }
                else{
                    return<Text>You right eye dont have Astigmatism!</Text>
                }                
            }
        break;       
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },


});