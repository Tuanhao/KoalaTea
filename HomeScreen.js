import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Button } from 'react-native';
import {mockTeaProfile, mockAlarmArray} from './TestConstant.js';
import {send, listen} from './socketUtil.js';
import {removeTeaMsg, startBrewing} from './msgConstant';

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      height: '100%',
      backgroundColor: 'lightyellow',
    },
    pickerContainer: {
      flex: 5,
      flexDirection: 'row'
    },
    pickerWrapper: {
      flex:1,
      alignContent: 'center', 
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'red',
    },
    picker: {
      height: 50, 
      width: 100, 
      flex: 2
    },
    pickerHeader: {
      flex: 2,
      alignContent: 'center', 
      justifyContent: 'center',
    },
    buttonsContainer: {
      flex: 1,
      flexDirection: 'row'
    }
})

class HomeScreen extends Component {
  state = {
    tea: '',
    steepTime: 0,
    temp: 0,
    teaId: 0,
    isCustom: 0,
    alarm: '',
    alarmFileLocation: '',
    teaProfileArray: mockTeaProfile,
  }

  delete() {
    let tempTeaId = this.state.teaId
    send(removeTeaMsg(tempTeaId))
    listen(() => {
      let filteredTeaProfile = this.state.teaProfileArray.filter((teaProfile) => {
        return teaProfile.teaId != tempTeaId
      })
      this.setState({ teaProfileArray: filteredTeaProfile})
    })
  }
  
  addTea(teaProfileArray) {
    console.log("add tea pressed");
    const {navigate} = this.props.navigation
    navigate('AddTea', {'teas': teaProfileArray})
  }

  start() {
    send(startBrewing(
      this.state.tea,
      this.state.steepTime,
      this.state.temp,
      this.state.alarm,
      this.state.alarmFileLocation
    ))
    listen(() => {
      const {navigate} = this.props.navigation
      navigate('Load', {'isBrewing': true})
    })
  }

  componentDidMount() {
    if(this.props.navigation.state.params.teas) {
      this.setState({ teaProfileArray: this.props.navigation.state.params.teas})
    }
  }

  render() {
    let teaProfileArray = this.state.teaProfileArray
    let teasPickerList = teaProfileArray.map(function(teaP, i){
      return <Picker.Item label={teaP.name} value={teaP.teaId} key={i} />
    }) 
    let alarmArray = this.props.navigation.state.params.alarms ? this.props.navigation.state.params.alarms : mockAlarmArray
    let alarmsPickerList = alarmArray.map(function(alarm, i){
      return <Picker.Item label={alarm.name} value={alarm.name} key={i} />
    }) 
    
    return (
      <View style={styles.mainContainer}> 
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerHeader}>
                TEA
            </Text>
            <Picker
                selectedValue={this.state.teaId}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      tea: teaProfileArray[itemIndex].name,
                      steepTime: teaProfileArray[itemIndex].steepTime,
                      temp: teaProfileArray[itemIndex].temp,
                      teaId: itemValue,
                      isCustom: teaProfileArray[itemIndex].isCustom,
                    })}
            >
                {teasPickerList}
            </Picker>
            <Text style={{flex: 2}}>{`
              Name:${this.state.tea}
              Steep Time:${this.state.steepTime}
              Temperature: ${this.state.temp}
              `}
            </Text>
            <Button
              title="Delete"
              disabled={!this.state.isCustom}
              onPress={() => this.delete()}
            />
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerHeader}>
                ALARM
            </Text>
            <Picker
                selectedValue={this.state.alarm}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      alarm: itemValue,
                      alarmFileLocation: alarmArray[itemIndex].fileLocation
                    })}
            >
                {alarmsPickerList}
            </Picker>
            <Text style={{flex: 2}}>{`
              Name:${this.state.alarm}
              `}
            </Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Add tea"
            onPress={() => this.addTea(teaProfileArray)}
          />
          <Button
            title="Start"
            onPress={() => this.start()}
          />
        </View>
      </View>
    );
  }
}

export {HomeScreen}