import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker } from 'react-native';
import {mockTeaProfile, mockAlarmArray} from './TestConstant.js';

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      height: '100%',
      backgroundColor: 'lightyellow',
    },
    titleContainer: {
      flex: 3,
      alignContent: 'center', 
      justifyContent: 'center',
      flexDirection:'row'
    },
    picker: {

    }
})

class HomeScreen extends Component {
  state = {
    tea: '',
    alarm: ''
  }
  render() {
    // let teaProfileArray = this.props.navigation.state.params.tea
    let teaArray = mockTeaProfile.map(function(teaP, i){
      return <Picker.Item label={teaP.name} value={teaP.name} key={i} />
    }) 
    let alarmArray = mockAlarmArray.map(function(alarm, i){
      return <Picker.Item label={alarm.name} value={alarm.name} key={i} />
    }) 
    
    return (
      <View style={styles.mainContainer}> 
        <View style={styles.titleContainer}>
            <Text>
                TEA
            </Text>
            <Picker
                selectedValue={this.state.tea}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({tea: itemValue})}
            >
                {teaArray}
            </Picker>
            <Text>
                ALARM
            </Text>
            <Picker
                selectedValue={this.state.alarm}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({alarm: itemValue})}
            >
                {alarmArray}
            </Picker>
        </View>
      </View>
    );
  }
}

export {HomeScreen}