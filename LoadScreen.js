import React, { Component } from 'react';
import { Text, View, Image, Animated, Easing, StyleSheet, Button } from 'react-native';
import {createSocket, send, listen} from './socketUtil.js'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'lightyellow',
  },
  titleContainer: {
    flex: 3,
    alignContent: 'center', 
    justifyContent: 'center'
  },
  titleText: {
    color: 'green', 
    textAlign: 'center', 
    fontSize: 50, 
    fontWeight: 'bold'
  },
  lightgreen: {
    color: 'lightgreen'
  },
  loaderContainer: {
    flex: 2, 
    alignContent: 'center', 
    justifyContent: 'center'
  },
  koalaContainer: {
    flex: 4, 
    alignContent: 'center', 
    justifyContent: 'center'
  },
  koalaImg: {
    alignSelf: 'center', 
    width: 200, 
    height: 200
  }
})

class LoadScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      spinValue: new Animated.Value(0),
      loading: true,
    }
  }
  

  componentDidMount() {
    let self = this;
    Animated.loop(Animated.timing(
      this.state.spinValue, { 
        toValue: 1, 
        duration: 5000, 
        easing: Easing.linear, 
        useNativeDriver: true, 
      })).start();
    if (this.props.navigation.state.params.isBrewing) {
      listen(() => {
        console.log('brewingggg');
      })
    } else {
      createSocket()
      send({"msgId":2})
      listen((msgDecoded) => {
        self.setState({ loading : false})
        const {navigate} = self.props.navigation
        navigate('Home', msgDecoded)
      })
    }
    
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    let titleText;
    let cancelButton;
    if (this.props.navigation.state.params.isBrewing) {
      titleText = <Text style={styles.titleText}>Brewing</Text>;
      cancelButton = <Button title="Cancel" />
    } else {
      titleText = 
      <Text style={styles.titleText}>
        K
        <Text style={styles.lightgreen}>O</Text>
        A
        <Text style={styles.lightgreen}>L</Text>
        A
        <Text style={styles.lightgreen}>T</Text>
        E
        <Text style={styles.lightgreen}>A</Text>
      </Text>
      cancelButton = null;
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          {titleText}
        </View>
        <View style={styles.loaderContainer}>
        <Animated.Image
          style={{width: 150, alignSelf: 'center', height: 150, resizeMode: 'contain', transform: [{rotate: spin}] }}
          source={require('./assets/leaf.png')} />
        </View>
        <View style={styles.koalaContainer}>
          <Image style={styles.koalaImg} source={require('./assets/koala.png')}></Image>
        </View>
        {cancelButton}
      </View>
    );
  }
}

export { LoadScreen } 