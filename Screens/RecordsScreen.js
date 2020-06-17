import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import {database} from '../constant/Config';
import LineChart from '../helpers/line-chart';

const LeftOpen = require('../assets/images/LeftOpen.png');
const RightOpen = require('../assets/images/RightOpen.png');
const Tutorial = require('../assets/images/Tutorial.png');
const Profile = require('../assets/images/Profile.png');
const BackArrow = require('../assets/images/BackArrow.png');
const NextArrow = require('../assets/images/NextArrow.png');


export default class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
      Leye: true,
      dates : [],
      ddlSelectedValue: '0',
      index: '0',
      ddlSelectedDate : '0',
      username: ""
    }}
  
  componentDidMount(){
      const userid = '002';
    database.ref('users/'+ userid ).on('value', (snapshot)=>{
        var tempDate = [];

        for(var key in snapshot.child("records").val()){
          tempDate.push(key);
        }

        var tempName = snapshot.child("info/name").val();
       
        this.setState({data : snapshot.child("records").toJSON(), 
                      dates: tempDate,
                      ddlSelectedDate: tempDate[0],
                      username: tempName,
                      index: 0
                      });
    });
    
  }

  render(){
    const data = this.state.data;

    const pressHandler = ()=>{
      this.props.navigation.navigate('AddRecordScreen')
    }
    const GetNext = ()=>{
      const length = this.state.dates.length;
      const value = (this.state.index+1) % length;
      //console.log('value',value)
      this.setState({index: value, ddlSelectedDate: this.state.dates[value]});
      //console.log('press',this.state.index)
    }
    const GetBack =()=>{
      if(this.state.index == 0){
        const length = this.state.dates.length - 1 ;
        this.setState({index:length, ddlSelectedDate:this.state.dates[length]});
      }
      else{
        const value = this.state.index;
        this.setState({index:value-1, ddlSelectedDate:this.state.dates[value-1]});
      }
    }
      
        return(
        <View style={RecordScreenStyle.background}>
          <View style={RecordScreenStyle.header}>
            <TouchableOpacity>
              <Image source={Profile}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Profile}/>
            </TouchableOpacity>
          </View>

          <Text style={RecordScreenStyle.title}>視力趨勢</Text>

          <View style={RecordScreenStyle.secondaryContainer}>
            
            <View style={RecordScreenStyle.refractiveMenu}>
              <TouchableOpacity onPress={()=> this.setState({ddlSelectedValue:'1'})}>
                <Text style={(this.state.ddlSelectedValue=='1')?RecordScreenStyle.selectedMenuText:RecordScreenStyle.unselectedMenuText}>遠視</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.setState({ddlSelectedValue:'0'})}>
                <Text style={(this.state.ddlSelectedValue=='0')?RecordScreenStyle.selectedMenuText:RecordScreenStyle.unselectedMenuText}>近視</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.setState({ddlSelectedValue:'2'})}>
                <Text style={(this.state.ddlSelectedValue=='2')?RecordScreenStyle.selectedMenuText:RecordScreenStyle.unselectedMenuText}>散光</Text>
              </TouchableOpacity>
            </View>
            
            <View style={RecordScreenStyle.eyesButton}>
              <TouchableOpacity  activeOpacity= {0.8} onPress={()=> this.setState({ Leye: !this.state.Leye})}> 
                <Image source={this.state.Leye? LeftOpen : RightOpen}/>
              </TouchableOpacity> 
            </View>

            <View style={RecordScreenStyle.datesButton}>
                <TouchableOpacity onPress={GetBack}>
                  <Image source={BackArrow} />
                </TouchableOpacity>

                <TouchableOpacity onPress={GetNext}>
                  <Image source={NextArrow} />
                </TouchableOpacity>
            </View>

            <View style={RecordScreenStyle.content}>
              <Text >日期: {this.state.ddlSelectedDate}</Text>
              <RenderContent isLeft={this.state.Leye} ddlValue={this.state.ddlSelectedValue} data={data} selectedDate={this.state.ddlSelectedDate} />
            </View>

            <View style={RecordScreenStyle.addRecordButton}>
              <Button title="輸入數據" onPress={pressHandler}/>
            </View>
            
            <View>
              <RenderLineChart dataArr={data} dateArr={this.state.dates} refractive={this.state.ddlSelectedValue} isLeft={this.state.Leye} selectedIndex={this.state.index}/>
            </View>
          </View>
        </View>
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
        break;
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

export const RenderLineChart = props=>{
  const {dataArr,dateArr,refractive,isLeft,selectedIndex} = props;

  if(dataArr == null){
    return(
      <Text>暫無數據</Text>
      );
  }

  var output = [];
  switch(refractive){
    case '0':{
      
      for (const date of dateArr){
        output.push (isLeft? dataArr[date].L_Myopia : dataArr[date].R_Myopia);
      }
      break;
    }
  
    case '1':{
      for (const date of dateArr){
        output.push (isLeft? dataArr[date].L_Hyperopia : dataArr[date].R_Hyperopia);
      }
      break;
    }
    case '2':{
        for (const date of dateArr){
          output.push (isLeft? dataArr[date].L_CYL : dataArr[date].R_CYL);
        }
        break;
    }
  } 

  if(output.length>0){
    return(
      <LineChart data={output} dateArr={dateArr} selectedIndex={selectedIndex}/>
      );
  }
  else{
    return(null);
  }
}


const RecordScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  background: {
    height:"100%",
    backgroundColor: '#24559E',
  },
  title: {
    fontSize:30,
    paddingLeft: 18,
    color: "white"
  },
  header: {
    paddingTop:25,
    marginRight:18,
    marginLeft:18,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  secondaryContainer:{
    marginTop:20,
    marginLeft:10,
    marginRight:10,
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  refractiveMenu:{
    paddingTop: 30,
    flexDirection:'row', 
    justifyContent:'space-around',
  },
  selectedMenuText:{
    fontSize: 15,
    color:"#FFFFFF",
    paddingLeft:11,
    paddingRight:11,
    paddingTop:6,
    paddingBottom: 6,
    backgroundColor:"#80A4EB",
    borderRadius: 8,

  },
  unselectedMenuText:{
    fontSize: 15,
    color:"#24559E",
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth:1,
    borderColor: "#80A4EB"

  },
  eyesButton:{
    paddingLeft: 70 ,
    paddingBottom:10,
    paddingTop:10,
  },
  datesButton:{
    flexDirection:'row',
    justifyContent:'space-around',
    padding: 15
  },
  content:{
    paddingTop:5,
    paddingBottom: 5,
    alignItems: 'center',
  },
  addRecordButton:{
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:100,
    paddingRight: 100
  }
});