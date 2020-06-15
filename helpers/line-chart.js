import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import Svg, { Defs,Stop, Circle, Rect,G,Path, LinearGradient } from 'react-native-svg';
import {scaleLinear} from 'd3-scale';
export default class LineChart extends React.Component {
  calcScaler = (max,min) => {
      return max - min || 1;
      //||1 to avoid divide by 0
  };

  calcHeight = (val, data, height) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    //start from zero: remove "-min"
    return height * ((val - min) / this.calcScaler(max,min));
    
  };

  renderStop = (data,width,paddingRight)=>{
    const colourScale = scaleLinear()
    .domain([0,325,600])
    .range(["#9AFF98","#FFE353","#FE7171"]);

    const offsetScale = scaleLinear()
    .domain([0,width])
    .range([0,1]);

    const output = [];
    data.forEach((item,index)=>{
      
      output.push(
        <Stop
          key={index}
          offset = {offsetScale(paddingRight/2 + (index * (width - paddingRight)) / (data.length-1))}
          stopColor = {colourScale(item)}
        />
      )
    })
    return output;
  }

  renderDefs = config=>{
    const {width,data,paddingRight} = config;
    
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
        {this.renderStop(data,width,paddingRight)}
        </LinearGradient>
      </Defs>
    )
  }

  getLinePoints = (datas, config) => {
    const { width, height,paddingRight, paddingTop } = config;
    //function to calculate x position
    const x = i =>
      Math.floor(
        paddingRight/2 + (i * (width - paddingRight)) / (datas.length-1)
      );

    const baseHeight = height;

    //function to calculate y position
    const y = i => {
      const yHeight = this.calcHeight(datas[i], datas, height);
      return Math.floor(((baseHeight - yHeight) / 4) * 3 + paddingTop);
    };

    return [`M${x(0)},220 V${y(0)}`]
      .concat(
        datas.slice(0, -1).map((_, i) => {
          const x_mid = (x(i) + x(i + 1)) / 2;
          const cp_x1 = (x_mid + x(i)) / 2;
          return (
            `Q ${cp_x1}, ${y(i)}, ${x(i + 1)}, ${y(i + 1)}` 
          );
        })
      )
      .join(" ");
  };

  renderLine = config=>{
      const result = this.getLinePoints(config.data, config);
      return(
        <Path
          key={Math.random()}
          d={result.concat('V220')}
          fill="url(#fillGradient)"
          stroke="none"
          strokewidth="0"/>
      );
  
  };

  
  renderDots = config=>{
    const {
      data,
      width,
      height,
      paddingTop,
      paddingRight
    }=config;

    const baseHeight = height;
    const output = [];
    config.data.forEach((item, index)=>{
      
      const cx = paddingRight/2 + (index * (width - paddingRight)) / (data.length-1);
      const cy = ((baseHeight - this.calcHeight(item, data, height)) / 4) * 3 + paddingTop;
      
      output.push(
        <Circle
          key={index}
          cx = {cx}
          cy = {cy}
          r="8"
          fill="#fff"
          opacity='0.8'
          />
      );
        })
      return output;
  };


  render() {
    const{
      data
    } = this.props;
    return (
      <View >
        <Svg height="220" width= {Dimensions.get("window").width}>
          <Rect 
            width="100%" height="220" fill="salmon" />
          <G>
            {
              this.renderDefs({
                width: Dimensions.get("window").width,
                data: data,
                paddingRight: 20
              })
            }
          </G>
          <G>
            {this.renderLine({
              width:Dimensions.get("window").width,
              height:"220",
              data: data,
              paddingRight: 20,
              paddingTop: 10
            })}
          </G>
          <G>
          {
            this.renderDots({
              width: Dimensions.get("window").width,
              height: "220",
              data: data,
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

