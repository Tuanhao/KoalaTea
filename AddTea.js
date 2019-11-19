import React, { Component } from 'react';
import {View, StyleSheet, TextInput, Button, Alert } from 'react-native';
// import {mockTeaProfile, mockAlarmArray} from './TestConstant.js';

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      height: '100%',
      backgroundColor: 'lightyellow',
    },
})

class AddTea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      steepTime: 0,
      temp: 0,
    };
  }

  validateInputs() {
    if (this.state.name == '') {
      alert('Name can not be empty')
    } else if (!this.state.name.match(/^[0-9a-z]+$/i)) {
      alert('No special character should be used in name')
    } else if (this.state.steepTime <= 0 || this.state.steepTime > 1800) {
      alert('Steep time is out of bound')
    } else if (this.state.temp <= 60 || this.state.temp > 120) {
      alert('Temperature is out of bound')
    } else {
      return true;
    }
    return false;
  }

  onSubmit = () => {
    console.log('add tea', this.props.navigation);
    if(this.validateInputs()) {
      let newTea = {
        name: this.state.name,
        steepTime: this.state.steepTime,
        temp: this.state.temp
      }
      let newTeaProfileArray = this.props.navigation.state.params.teas
      newTeaProfileArray.push(newTea)
      const {navigate} = this.props.navigation
      navigate('Home', {teas: newTeaProfileArray})
    } else {
      Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}> 
        <TextInput
          style={styles.textInput}
          placeholder="Tea name"
          onChangeText={text => this.setState({name: text})}
          value={this.state.name}
          returnKeyType="next"
          maxLength={20}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Steep time"
          onChangeText={text => this.setState({steepTime: parseInt(text, 10)})}
          value={`${this.state.steepTime}`}
          keyboardType="number-pad"
          returnKeyType="next"
          maxLength={20}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Temperature"
          onChangeText={text => this.setState({temp: parseInt(text, 10).toFixed(2)})}
          value={`${this.state.temp}`}
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={20}
        />
        <Button
            title="Save"
            onPress={() => this.onSubmit()}
        />
      </View>
    )
  }
}

export {AddTea}