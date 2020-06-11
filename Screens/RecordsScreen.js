import React, { Component } from 'react';
import { StyleSheet, Text, View,ActivityIndicator, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

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
      data: [],
      isLoading: true,
      Leye: true,
      ddlSelectedValue: '0'
    }
  }

  componentDidMount(){
    fetch('https://raw.githubusercontent.com/norangai/hkcovid19/master/eye-record.json?token=AF6UXQGH2GQIRMXFV2UAPGS64OEPE')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render(){
    const data = this.state.data;
    const isLoading = this.state.isLoading;
    
    let dropdown_item = [{label:'Myopia data', value:'0'},{label:'Hyperopia data',value:'1'},{label:'Astigmatism data',value:'2'}];

    const pressHandler = ()=>{
      this.props.navigation.navigate('AddRecordScreen')
    }
    if (!isLoading){
      
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
            data={data}
            keyExtractor={(item)=>item.name}
            renderItem={({item})=>(
            <>
            <Text>{item.name} eye data: {this.state.Leye? item.left_eye[this.state.ddlSelectedValue] : item.right_eye[this.state.ddlSelectedValue]}D </Text>
            <Text> eye situation: {this.state.Leye? (item.left_warning[this.state.ddlSelectedValue]? 'Lwarning!' : 'Normal'): (item.right_warning[this.state.ddlSelectedValue]? 'Rwarning!' : 'noraml') }</Text>
            </>
            )}
          />
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
      
    }
    else{
      return <ActivityIndicator/>
    }
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