import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import Svg, { Defs,Stop, Circle, Rect,G,Path, LinearGradient,Text } from 'react-native-svg';
import {scaleLinear,scaleTime} from 'd3-scale';
import moment from 'moment';

export default class LineChart extends React.Component {

  x_scale = (val,dateArr,paddingRight,width) => {
    const x = scaleTime()
    .domain([moment(dateArr[0], 'YYYY-MM-DD').toDate(), moment(dateArr[dateArr.length-1], 'YYYY-MM-DD').toDate()])
    .range([paddingRight/2 +25, width-(paddingRight*1.5) -25])
    
    return(x(val));
  }

  y_scale = (val,data,height,paddingTop) => {
    //const min = Math.min(...data);
    //const max = Math.max(...data);
    const y = scaleLinear()
    .domain([0,800])
    .range([180, 10]);
    return(Math.floor((( y(val)) / 4) * 3 + paddingTop));
  }

  CalColourScale = (refractive)=>{
    switch(refractive){
      case '0':         //Myopia
        return (  scaleLinear()
        .domain([0,375,600])
        .range(["#7be0a3","#ffdf54","#fe7470"]));
       
      case '1':
        return (  scaleLinear()
        .domain([0,225,525])
        .range(["#7be0a3","#ffdf54","#fe7470"]));
      case '2':
        return (   scaleLinear()
        .domain([0,100,200])
        .range(["#7be0a3","#ffdf54","#fe7470"]));
    }
  }
  
  renderStop = (data,dateArr,width,paddingRight,refractive)=>{
    const colourScale = this.CalColourScale(refractive)

    const offsetScale = scaleLinear()
    .domain([paddingRight,width-paddingRight])
    .range([0,1]);

    const output = [];
    dateArr.forEach((item,index)=>{
      output.push(
        <Stop
          key={index}
          offset = {offsetScale(this.x_scale(moment(item, 'YYYY-MM-DD').toDate(), dateArr,paddingRight,width))}
          stopColor = {colourScale(data[index])}
        />
      )
    })
    return output;
  }

  renderDefs = config=>{
    const {dateArr,width,data,paddingRight,refractive} = config;
    
    return(
      <Defs>
        <LinearGradient
          id="fillGradient"
          x1={0}
          y1={0}
          x2={width}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
        {this.renderStop(data,dateArr,width,paddingRight,refractive)}
        </LinearGradient>
      </Defs>
    )
  }

  getLinePoints = (datas, config) => {
    const {  dateArr, width, height,paddingRight, paddingTop } = config;

    const x = i => {
      return this.x_scale(moment(dateArr[i], 'YYYY-MM-DD').toDate(), dateArr,paddingRight, width);
    }

    const y = i => {
      return this.y_scale(datas[i],datas,height,paddingTop);
    };
    const startingPoint = paddingTop/2;
    return [`M${startingPoint},750 V${y(0)}`]
      .concat(
        datas.slice(0, -1).map((_, i) => {
          const x_mid = (x(i) + x(i + 1)) / 2;
          
          return (
            `Q ${x_mid}, ${y(i)}, ${x(i + 1)}, ${y(i + 1)}` 
          );
        })
      )
      .join(" ");
  };

  renderLine = config=>{
      const result = this.getLinePoints(config.data, config);
      const lastPoint = config.width - (config.paddingRight*1.5) 
      return(
        <Path
          key={Math.random()}
          d={result.concat(`H${lastPoint} V750`)}
          fill="url(#fillGradient)"
          stroke="none"
          strokewidth="0"/>
      );
  
  };

  
  renderDots = config=>{
    const {
      data,
      dateArr,
      selectedIndex,
      width,
      height,
      paddingTop,
      paddingRight
    }=config;

    //const baseHeight = height;
    const output = [];
    const lastIndex = dateArr.length-1;
    const firstIndex = 0;
    config.dateArr.forEach((item, index)=>{
      
      //const cx = paddingRight/2 + (index * (width - paddingRight)) / (data.length-1);
      const cx = this.x_scale(moment(item, 'YYYY-MM-DD').toDate(), dateArr,paddingRight,width);
      const cy = this.y_scale(data[index], data, height,paddingTop);
      
      console.log(lastIndex);
      output.push(
        <>
        <Circle
          key={index}
          cx = {cx}
          cy = {cy}
          r="8"
          stroke={index===selectedIndex? "white" : "#2D9CDB"}
          strokeWidth="2"
          fill={index===selectedIndex? "#00FFFF": "white"}
          opacity={index===selectedIndex? "1": "0.72"}
          />
          <Text 
            x={cx} 
            y={cy+30} 
            textAnchor="middle"
            fill="black"
            fontSize='19'
            fontWeight='bold'>
              {moment(item).format('YYYY')}
          </Text>
          <Text 
            x={cx} 
            y={cy+45} 
            textAnchor="middle"
            fontSize='14'
            fill={index===selectedIndex? "black": "none"}>
              {moment(item).format('D[/]M')}
          </Text>
        </>
      );
        })
      return output;
  };

  render() {
    const{
      data, dateArr,selectedIndex,refractive
    } = this.props;
    const height = "750";
    if(data == null){
      return null;
    }
    else {    
      return (
        <View >
          <Svg height={height} width= {Dimensions.get("window").width - 20} position='absolute'>
            <Rect 
              width="100%" height="100%" fill="none" />
            <G>
              {
                this.renderDefs({
                  width: Dimensions.get("window").width,
                  data: data,
                  paddingRight: 20,
                  dateArr: dateArr,
                  refractive: refractive
                })
              }
            </G>
            <G>
              {this.renderLine({
                width:Dimensions.get("window").width,
                height:height,
                data: data,
                dateArr: dateArr,
                paddingRight: 20,
                paddingTop: 10
              })}
            </G>
            <G>
            {
              this.renderDots({
                width: Dimensions.get("window").width,
                height: height,
                data: data,
                dateArr:dateArr,
                selectedIndex:selectedIndex,
                paddingRight: 20,
                paddingTop: 10
              })
            }  
            </G>

          </Svg>
        </View>
        );
      }
}
}

