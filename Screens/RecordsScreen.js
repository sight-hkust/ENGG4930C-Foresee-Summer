import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button } from 'react-native';
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
      ddlSelectedDate : '0',
      username: ""
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
      this.setState({username: snapshot.val().name});
    })


  }

  render(){
    const data = this.state.data;
    
    const pressHandler = ()=>{
      this.props.navigation.navigate('AddRecordScreen')
    }
    
      
        return(
        <>
          <View>
            <TutorialButton/>
            <Button title="輸入數據" onPress={pressHandler}/>
          </View>

          <View style={{paddingTop:10,paddingBottom:30, alignItems: 'center'}}>
            <Text style={{fontSize: 24}}>{this.state.username}</Text>
          </View>
          
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <TouchableOpacity onPress={()=> this.setState({ddlSelectedValue:'1' })} >
              <Text>遠視</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.setState({ddlSelectedValue:'0' })} >
              <Text>近視</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.setState({ddlSelectedValue:'2' })} >
              <Text>散光</Text>
            </TouchableOpacity>
            
            
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

  }
}

export const RenderContent = props => {
    const{ isLeft, ddlValue, data, selectedDate} = props;

    if(data == null){
      return(
        <Text>暫無數據</Text>
        );
    }
    
    switch(ddlValue){
        case '0':
            if(isLeft){
                if(data[selectedDate].L_Myopia!="0"){
                    return(
                    <View>
                      <Text>左眼近視度數: {data[selectedDate].L_Myopia}</Text>
                      <RenderWarning degree={data[selectedDate].L_Myopia} refractive={'M'}/>
                    </View>
                    )
                }
                else{
                    return<Text>你的左眼沒有近視</Text>
                }
            }
            else{
                if(data[selectedDate].R_Myopia!="0"){
                  return(
                  <View>
                    <Text>右眼近視度數: {data[selectedDate].R_Myopia}</Text>
                    <RenderWarning degree={data[selectedDate].R_Myopia} refractive={'M'}/>
                  </View>
                  )}
                else{
                    return<Text>你的右眼沒有近視</Text>
                }                
            }
        
        case '1':
            if(isLeft){
                if(data[selectedDate].L_Hyperopia!="0"){
                  return(
                  <View>
                    <Text>左眼遠視度數: {data[selectedDate].L_Hyperopia}</Text>
                    <RenderWarning degree={data[selectedDate].L_Hyperopia} refractive={'H'}/>
                  </View>
                  )}
                else{
                    return<Text>你的左眼沒有遠視</Text>
                }
            }
            else{
                if(data[selectedDate].R_Hyperopia!="0"){
                    return(
                    <View>
                      <Text>右眼遠視度數: {data[selectedDate].R_Hyperopia}</Text>
                      <RenderWarning degree={data[selectedDate].R_Hyperopia} refractive={'H'}/>
                    </View>
                    )}
                else{
                    return<Text>你的右眼沒有遠視</Text>
                }                
            }
        
        case '2':
            if(isLeft){
                if(data[selectedDate].L_CYL!="0"){
                    return(
                      <View>
                    <Text>左眼散光度數: {data[selectedDate].L_CYL}</Text>
                    <RenderWarning degree={data[selectedDate].L_CYL} refractive={'A'}/>
                      </View>
                    )}
                else{
                    return<Text>你的左眼沒有散光</Text>
                }
            }
            else{
                if(data[selectedDate].R_CYL!="0"){
                    return(
                    <View>
                      <Text>右眼散光度數: {data[selectedDate].R_CYL}</Text>
                      <RenderWarning degree={data[selectedDate].R_CYL} refractive={'A'}/>
                    </View>
                    )}
                else{
                    return<Text>你的右眼沒有散光</Text>
                }                
            }
              
    }
}

export const RenderWarning = props=>{
  const {degree, refractive} = props;
  switch(refractive){
    case 'M':
      if(degree<300){
        return(<Text>你有很淺的近視</Text>)
      }
      else if(degree<575){
        return(<Text>你有中度近視</Text>)
      }
      else{
        return(<Text>你有深近視</Text>)
      }
  
    case 'H':
      if(degree<200){
        return(<Text>你有很淺的遠視</Text>)
      }
      else if(degree<500){
        return(<Text>你有中度遠視</Text>)
      }
      else {
        return(<Text>你有深遠視</Text>)
      }
    case 'A':
      if(degree<75){
        return(<Text>你有很淺的散光</Text>)
      }
      else if(degree<175){
        return(<Text>你有中度散光</Text>)
      }
      else{
        return(<Text>你有深散光</Text>)
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