import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { database, auth } from '../src/config/config';
import LineChart from '../helpers/line-chart';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import BottomModal from '../Utils/BottomModal';

const LeftOpen = require('../assets/images/LeftOpen.png');
const RightOpen = require('../assets/images/RightOpen.png');
const BackArrow = require('../assets/images/BackArrow.png');
const NextArrow = require('../assets/images/NextArrow.png');
const Setting = require('../assets/images/setting.png');

const patient_id = auth.currentUser ? auth.currentUser.uid: '002';
const UpperDisplayLimit = 3; //3 for testing, real is 4

export default class RecordsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      Leye: true,
      dates: [],
      ddlSelectedValue: '0',
      index: '0',
      ddlSelectedDate: '0',
      username: '',
      isModalVisible: false,
    };
  }

  componentDidMount() {
    const ref = database.ref('users/' + patient_id);

    ref.child('records').on('value', (snapshot) => {
      var tempDate = [];
      for (var key in snapshot.val()) {
        tempDate.push(key);
      }
      this.setState({
        data: snapshot.toJSON(),
        dates: tempDate,
        ddlSelectedDate: tempDate[tempDate.length - 1],
        index: tempDate.length - 1,
      });
    });

    ref.child('info/name').once('value', (snapshot) => {
      this.setState({ username: snapshot.val() });
    });
  }

  render() {
    const data = this.state.data;

    const pressHandler = () => {
      this.props.navigation.navigate('AddRecordScreen', {
        isProfessional: false,
        professional_id: -1,
        patient_id: patient_id,
      });
    };
    const GetNext = () => {
      const length = this.state.dates.length;
      const value = (this.state.index + 1) % length;

      this.setState({ index: value, ddlSelectedDate: this.state.dates[value] });
    };
    const GetBack = () => {
      if (this.state.index == 0) {
        const length = this.state.dates.length - 1;
        this.setState({
          index: length,
          ddlSelectedDate: this.state.dates[length],
        });
      } else {
        const value = this.state.index;
        this.setState({
          index: value - 1,
          ddlSelectedDate: this.state.dates[value - 1],
        });
      }
    };

    return (
      <View style={RecordScreenStyle.background}>
        <LinearGradient
          colors={['#1872a7', '#5a74d1', '#a676ff']}
          start={[0, 0.9]}
          end={[1, 0.1]}
          locations={[0, 0.5, 1]}
          style={{
            height: '100%',
          }}
        >
          <View style={RecordScreenStyle.header}>
            <Text style={RecordScreenStyle.title}>
              {this.state.ddlSelectedValue == '0'
                ? '近視'
                : this.state.ddlSelectedValue == '1'
                  ? '遠視'
                  : '散光'}
              度數趨勢
            </Text>

          </View>

          <View style={RecordScreenStyle.secondaryContainer}>
            <View style={RecordScreenStyle.refractiveMenu}>
              <TouchableOpacity
                onPress={() => this.setState({ ddlSelectedValue: '1' })}
              >
                <Text
                  style={
                    this.state.ddlSelectedValue == '1'
                      ? RecordScreenStyle.selectedMenuText
                      : RecordScreenStyle.unselectedMenuText
                  }
                >
                  遠視
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ ddlSelectedValue: '0' })}
              >
                <Text
                  style={
                    this.state.ddlSelectedValue == '0'
                      ? RecordScreenStyle.selectedMenuText
                      : RecordScreenStyle.unselectedMenuText
                  }
                >
                  近視
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ ddlSelectedValue: '2' })}
              >
                <Text
                  style={
                    this.state.ddlSelectedValue == '2'
                      ? RecordScreenStyle.selectedMenuText
                      : RecordScreenStyle.unselectedMenuText
                  }
                >
                  散光
                </Text>
              </TouchableOpacity>
            </View>

            <View style={RecordScreenStyle.linechart}>
              <RenderLineChart
                dataArr={data}
                dateArr={this.state.dates}
                refractive={this.state.ddlSelectedValue}
                isLeft={this.state.Leye}
                selectedIndex={this.state.index}
              />

              {data != null && (
                <View style={RecordScreenStyle.contentContainer}>
                  <View style={RecordScreenStyle.eyesButton}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.setState({ Leye: !this.state.Leye })}
                    >
                      <Image source={this.state.Leye ? LeftOpen : RightOpen} />
                    </TouchableOpacity>
                  </View>

                  <View style={RecordScreenStyle.datesButton}>
                    <TouchableOpacity onPress={GetBack}>
                      <Image source={BackArrow} />
                    </TouchableOpacity>
                    <Text style={RecordScreenStyle.dateText}>
                      {this.state.ddlSelectedDate}
                    </Text>
                    <TouchableOpacity onPress={GetNext}>
                      <Image source={NextArrow} />
                    </TouchableOpacity>
                  </View>

                  <View style={RecordScreenStyle.content}>
                    <RenderContent isLeft={this.state.Leye} ddlValue={this.state.ddlSelectedValue} data={data}
                      selectedDate={this.state.ddlSelectedDate} index={this.state.index} dateArr={this.state.dates} />

                  </View>
                </View>
              )}

              <View style={RecordScreenStyle.addRecordButton}>
                {data != null && (
                  <DetailButton
                    data={data}
                    selectedDate={this.state.ddlSelectedDate}
                  />
                )}

                <Button
                  icon={<Icon name="add" size={25} color="#2D9CDB" />}
                  onPress={pressHandler}
                  buttonStyle={{
                    backgroundColor: 'white',
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                />

                {data != null && (
                  <Button
                    icon={
                      <Icon
                        name="eyeglass"
                        type="simple-line-icon"
                        size={22}
                        color="#2D9CDB"
                      />
                    }
                    buttonStyle={{
                      backgroundColor: 'white',
                      width: 40,
                      height: 40,
                      borderRadius: 24,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                    containerStyle={{ paddingTop: 5 }}
                  />
                )}
                {/* <RenderIncreaseWarning data={data} dateArr={this.state.dates} index={this.state.index} refractive={this.state.ddlSelectedValue} isLeft={true}/> */}
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export const DetailButton = (props) => {
  const { data, selectedDate } = props;

  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  return (
    <View>
      <Button
        icon={<Icon name="dehaze" size={22} color="#2D9CDB" />}
        onPress={toggleModal}
        buttonStyle={{
          backgroundColor: 'white',
          width: 40,
          height: 40,
          borderRadius: 24,
          paddingLeft: 0,
          paddingRight: 0,
        }}
        containerStyle={{ paddingTop: 5 }}
      />
      <RenderModal
        data={data}
        selectedDate={selectedDate}
        isVisible={isVisible}
        toggleModal={toggleModal}
      />
    </View>
  );
};

export const RenderModal = (props) => {
  const { data, selectedDate, isVisible, toggleModal } = props;
  const curRecord = data[selectedDate];

  const calSPH = (isLeft) => {
    if (isLeft) {
      if (curRecord.L_Myopia != 0) {
        //myopia, add - sign
        var num = parseFloat(curRecord.L_Myopia) / 100;
        return '-' + num.toFixed(2);
      } else if (curRecord.L_Hyperopia != 0) {
        //hyperopia, add + sign
        var num = parseFloat(curRecord.L_Hyperopia) / 100;
        return '+' + num.toFixed(2);
      } else {
        return '0.00';
      }
    } else {
      if (curRecord.R_Myopia != 0) {
        //myopia, add - sign
        var num = parseFloat(curRecord.R_Myopia) / 100;
        return '-' + num.toFixed(2);
      } else if (curRecord.R_Hyperopia != 0) {
        //hyperopia, add + sign
        var num = parseFloat(curRecord.R_Hyperopia) / 100;
        return '+' + num.toFixed(2);
      } else {
        return '0.00';
      }
    }
  };

  const calCYL = (isLeft) => {
    if (isLeft && curRecord.L_CYL != 0) {
      var num = parseFloat(curRecord.L_CYL) / 100;
      return '-' + num.toFixed(2);
    } else if (!isLeft && curRecord.R_CYL != 0) {
      var num = parseFloat(curRecord.R_CYL) / 100;
      return '-' + num.toFixed(2);
    } else {
      return '0.00';
    }
  };

  const calAxis = (isLeft) => {
    if (isLeft) {
      if (curRecord.L_CYL != 0 && curRecord.L_CYL != " ") return curRecord.L_Axis;
      else return "NA"
    }
    else {
      if (curRecord.R_CYL != 0 && curRecord.R_CYL != " ") return curRecord.R_Axis;
      else return "NA"

    }
  }

  const calVA = (isLeft) => {
    if (isLeft) {
      if (curRecord.L_VA != 0 && curRecord.L_VA != " ") return curRecord.L_VA;
      else return "NA"
    }
    else {
      if (curRecord.R_VA != 0 && curRecord.R_VA != " ") return curRecord.R_VA;
      else return "NA"

    }
  }

  return (
    <BottomModal isVisible={isVisible} toggleModal={toggleModal} style={{ backgroundColor: '#FFFFFF', height: 350 }}>

      <View style={{ backgroundColor: '#1772A6', height: 4, width: 70, alignSelf: 'center', marginBottom: 10 }} />
      <Text style={RecordScreenStyle.colHeader}>日期: {selectedDate}</Text>
      <View style={RecordScreenStyle.box}>
        <Grid>
          <Row>
            <Col style={RecordScreenStyle.gridContainer}></Col>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.colHeader}>O.D.</Text>
            </Col>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.colHeader}>O.S.</Text>
            </Col>
          </Row>

          <Row>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.rowHeader}>SPH:</Text>
            </Col>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.gridText}>{calSPH(false)}</Text>
            </Col>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.gridText}>{calSPH(true)}</Text>
            </Col>
          </Row>
          <Row>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.rowHeader}>CYL:</Text>
            </Col>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.gridText}>{calCYL(false)}</Text>
            </Col>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.gridText}>{calCYL(true)}</Text>
            </Col>
          </Row>
          <Row>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.rowHeader}>AXIS:</Text>
            </Col>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.gridText}>{calAxis(false)}</Text>
            </Col>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.gridText}>{calAxis(true)}</Text>
            </Col>
          </Row>
          <Row>
            <Col style={RecordScreenStyle.gridContainer}><Text style={RecordScreenStyle.rowHeader}>VA:</Text></Col>
            <Col style={RecordScreenStyle.gridContainer}><Text style={RecordScreenStyle.gridText}>{calVA(false)}</Text></Col>
            <Col style={RecordScreenStyle.gridContainer}><Text style={RecordScreenStyle.gridText}>{calVA(true)}</Text></Col>
          </Row>
          <Row>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.rowHeader}>PD:</Text>
            </Col>
            <Col style={[RecordScreenStyle.gridContainer, { flex: 2 }]}>
              <Text style={RecordScreenStyle.gridText}>{curRecord.PD}mm</Text>
            </Col>
          </Row>
          <Row>
            <Col style={RecordScreenStyle.gridContainer}>
              <Text style={RecordScreenStyle.rowHeader}>備註:</Text>
            </Col>
            <Col style={[RecordScreenStyle.gridContainer, { flex: 2 }]}>
              <Text>{curRecord.remark}</Text>
            </Col>
          </Row>
        </Grid>
      </View>
    </BottomModal>
  );
};

export const RenderContent = props => {
  const { isLeft, ddlValue, data, selectedDate, index, dateArr } = props;

  if (data == null) {
    return (
      <Text style={RecordScreenStyle.contentText}>暫無數據</Text>
    );
  }

  switch (ddlValue) {
    case '0':
      if (isLeft) {
        if (data[selectedDate].L_Myopia != "0") {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].L_Myopia}度</Text>
              <RenderWarning degree={data[selectedDate].L_Myopia} refractive={'M'} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
              <RenderAmblyopiaWarning Ldegree={data[selectedDate].L_Myopia} Rdegree={data[selectedDate].R_Myopia} />

            </View>
          )
        }
        else {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>你的左眼沒有近視</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
              <RenderAmblyopiaWarning Ldegree={data[selectedDate].L_Myopia} Rdegree={data[selectedDate].R_Myopia} />
            </View>
          )

        }
      }
      else {
        if (data[selectedDate].R_Myopia != "0") {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].R_Myopia}度</Text>
              <RenderWarning degree={data[selectedDate].R_Myopia} refractive={'M'} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
              <RenderAmblyopiaWarning Ldegree={data[selectedDate].L_Myopia} Rdegree={data[selectedDate].R_Myopia} />
            </View>
          )
        }
        else {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>你的右眼沒有近視</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
              <RenderAmblyopiaWarning Ldegree={data[selectedDate].L_Myopia} Rdegree={data[selectedDate].R_Myopia} />
            </View>
          )
        }
      }

    case '1':
      if (isLeft) {
        if (data[selectedDate].L_Hyperopia != "0") {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].L_Hyperopia}度</Text>
              <RenderWarning degree={data[selectedDate].L_Hyperopia} refractive={'H'} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          )
        }
        else {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>你的左眼沒有遠視</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>)
        }
      }
      else {
        if (data[selectedDate].R_Hyperopia != "0") {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].R_Hyperopia}度</Text>
              <RenderWarning degree={data[selectedDate].R_Hyperopia} refractive={'H'} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          )
        }
        else {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>你的右眼沒有遠視</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          )
        }
      }

    case '2':
      if (isLeft) {
        if (data[selectedDate].L_CYL != "0") {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].L_CYL}度</Text>
              <RenderWarning degree={data[selectedDate].L_CYL} refractive={'A'} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          )
        }
        else {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>你的左眼沒有散光</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          )
        }
      }
      else {
        if (data[selectedDate].R_CYL != "0") {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].R_CYL}度</Text>
              <RenderWarning degree={data[selectedDate].R_CYL} refractive={'A'} />
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>
          )
        }
        else {
          return (
            <View>
              <Text style={RecordScreenStyle.degreeText}>你的右眼沒有散光</Text>
              <RenderIncreaseWarning data={data} dateArr={dateArr} index={index} refractive={ddlValue} isLeft={isLeft} />
            </View>)
        }
      }

  }
}

export const RenderWarning = (props) => {
  const { degree, refractive } = props;
  switch (refractive) {
    case 'M':
      if (degree < 100) {
        return (
          <View>
            <Text style={RecordScreenStyle.contentText}>您有很淺的近視</Text>
            <Text style={RecordScreenStyle.contentText}>
              距離淺近視還有{100 - degree}度
            </Text>
          </View>
        );
      }
      if (degree < 300) {
        return (
          <View>
            <Text style={RecordScreenStyle.contentText}>您有淺近視</Text>
            <Text style={RecordScreenStyle.contentText}>
              距離中度近視還有{300 - degree}度
            </Text>
          </View>
        );
      } else if (degree < 575) {
        return (
          <View>
            <Text style={RecordScreenStyle.contentText}>您有中度近視</Text>
            <Text style={RecordScreenStyle.contentText}>
              距離深近視還有{575 - degree}度
            </Text>
          </View>
        );
      } else {
        return <Text style={RecordScreenStyle.contentText}>您有深近視</Text>;
      }

    case 'H':
      if (degree < 200) {
        return (
          <View>
            <Text style={RecordScreenStyle.contentText}>您有淺遠視</Text>
            <Text style={RecordScreenStyle.contentText}>
              距離中度遠視還有{200 - degree}度
            </Text>
          </View>
        );
      } else if (degree < 500) {
        return (
          <View>
            <Text style={RecordScreenStyle.contentText}>您有中度遠視</Text>
            <Text style={RecordScreenStyle.contentText}>
              距離深遠視還有{500 - degree}度
            </Text>
          </View>
        );
      } else {
        <View>
          <Text style={RecordScreenStyle.contentText}>您有深遠視</Text>
        </View>;
      }
    case 'A':
      if (degree < 75) {
        return (
          <View>
            <Text style={RecordScreenStyle.contentText}>您有淺散光</Text>
            <Text style={RecordScreenStyle.contentText}>
              距離中度散光還有{75 - degree}度
            </Text>
          </View>
        );
      } else if (degree < 175) {
        return (
          <View>
            <Text style={RecordScreenStyle.contentText}>您有中度散光</Text>
            <Text style={RecordScreenStyle.contentText}>
              距離深散光還有{175 - degree}度
            </Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text style={RecordScreenStyle.contentText}>您有深散光</Text>
          </View>
        );
      }
  }
};

export const RenderAmblyopiaWarning = (props) => {
  const { Ldegree, Rdegree } = props;
  if (Math.abs(Ldegree - Rdegree) >= 300) {
    return (
      <Text style={RecordScreenStyle.warningText}>
        雙眼近視度數偏差超過300度，有形成弱視的風險!{' '}
      </Text>
    );
  } else return null;
};

export const RenderIncreaseWarning = (props) => {
  const { data, dateArr, index, isLeft, refractive } = props;
  //對比上次紀錄: 近視深了25度，升幅正常/過大。散光度數不變
  if (data == null || index <= 0) {
    return null;
  }

  const curData = data[dateArr[index]];
  const prevData = data[dateArr[index - 1]];

  const calDiff = (cur, prev) => {
    const diff = prev - cur;
    if (diff > 0) {
      return ("淺了" + diff + "度，")
    } else if (diff < 0) {
      return ("深了" + Math.abs(diff) + "度，")
    }
    else return ("度數不變。")
  }

  if (isLeft) {
    switch (refractive) {
      case '0': //myopia
        return <Text style={RecordScreenStyle.contentText}>對比上次紀錄: 近視{calDiff(curData.L_Myopia, prevData.L_Myopia)}</Text>
      case '1': //hyperopia
        return <Text style={RecordScreenStyle.contentText}>對比上次紀錄: 遠視{calDiff(curData.L_Hyperopia, prevData.L_Hyperopia)}</Text>
      case '2': //astigmatism
        return <Text style={RecordScreenStyle.contentText}>對比上次紀錄: 散光{calDiff(curData.L_CYL, prevData.L_CYL)}</Text>
    }
  }
  else {
    switch (refractive) {
      case '0': //myopia
        return <Text style={RecordScreenStyle.contentText}>對比上次紀錄: 近視{calDiff(curData.R_Myopia, prevData.R_Myopia)}</Text>
      case '1': //hyperopia
        return <Text style={RecordScreenStyle.contentText}>對比上次紀錄: 遠視{calDiff(curData.R_Hyperopia, prevData.R_Hyperopia)}</Text>
      case '2': //astigmatism
        return <Text style={RecordScreenStyle.contentText}>對比上次紀錄: 散光{calDiff(curData.R_CYL, prevData.R_CYL)}</Text>
    }
  }

}

export const RenderLineChart = (props) => {
  const { dataArr, dateArr, refractive, isLeft, selectedIndex } = props;

  if (dataArr == null) {
    return (
      <Text style={RecordScreenStyle.noDataText}>
        暫無數據，請按“+”輸入資料
      </Text>
    );
  }

  var output = [];
  //console.log(selectedIndex)

  const calSubArray = () => {
    var end = 0;
    var start = 0;
    if (dateArr.length < 4) {
      return dateArr;
    }
    else if (selectedIndex > dateArr.length - 4) {
      return dateArr.slice(-4);
    }
    else if (selectedIndex <= dateArr.length - 4) {
      start = selectedIndex
      end = selectedIndex + 4
      return (dateArr.slice(start, end))
    }
  }

  switch (refractive) {
    case '0': {
      for (const date of calSubArray()) {
        output.push(isLeft ? dataArr[date].L_Myopia : dataArr[date].R_Myopia);
      }
      break;
    }

    case '1': {
      for (const date of calSubArray()) {
        output.push(isLeft ? dataArr[date].L_Hyperopia : dataArr[date].R_Hyperopia);
      }
      break;
    }
    case '2': {
      for (const date of calSubArray()) {
        output.push(isLeft ? dataArr[date].L_CYL : dataArr[date].R_CYL);
      }
      break;
    }
  }

  if (output.length > 0) {
    return (
      <LineChart data={output} dateArr={calSubArray()} full_dateArr={dateArr} selectedIndex={selectedIndex} refractive={refractive} />
    );
  }

  if (output.length > 0) {
    return (
      <LineChart
        data={output}
        dateArr={dateArr}
        selectedIndex={selectedIndex}
        refractive={refractive}
      />
    );
  } else {
    return null;
  }
};

const RecordScreenStyle = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: '#24559E',
  },
  header: {
    paddingTop: 40,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: 'bold',
  },
  secondaryContainer: {
    marginLeft: 10,
    marginRight: 10,
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  refractiveMenu: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectedMenuText: {
    fontSize: 18,
    color: '#3CA1B7',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  unselectedMenuText: {
    fontSize: 18,
    color: '#FFFFFF',
    paddingLeft: 1,
    paddingRight: 1,
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomWidth: 1.5,
    borderColor: '#B8CAE4',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 200,
    paddingBottom: 10,
    alignItems: 'center',
  },
  eyesButton: {
    paddingTop: 5,
    paddingBottom: 15,
  },
  datesButton: {
    flexDirection: 'row',
    paddingBottom: 2,
  },
  dateText: {
    color: '#2D9CDB',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
  },
  content: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
  },
  degreeText: {
    color: '#2D9CDB',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentText: {
    textAlign: 'center',
    color: '#2D9CDB',
    fontSize: 16,
  },
  warningText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#FE7171',
    textAlign: 'center',
  },
  addRecordButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
  },
  linechart: {
    height: '100%',
  },
  noDataText: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    paddingTop: 175,
  },
  box: {
    flex: 1,
    marginTop: 10,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  colHeader: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D9CDB',
  },
  rowHeader: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 35,
    color: '#2D9CDB',
  },
  gridText: {
    textAlign: 'center',
    paddingRight: 5,
    fontSize: 18,
    color: '#2D9CDB',
  },
});
