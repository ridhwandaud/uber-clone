import React, { Component } from 'react';
import { Alert, View, Text, StatusBar } from 'react-native';
import AppIntro from 'react-native-app-intro';

class Intro extends Component {
  static navigationOptions = {
    header: null,
  };

  onSkipBtnHandle = (index) => {
    //Alert.alert('Skip');
    console.log(index);
    this.props.navigation.navigate('Login')
  }
  doneBtnHandle = () => {
    //Alert.alert('Done');
    this.props.navigation.navigate('Login')
  }
  nextBtnHandle = (index) => {
    //Alert.alert('Next');
    console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  }
  render() {
    const pageArray = [{
      title: 'Quick, Fast and Reliable',
      description: 'Find assistance with a simple taps.',
      img: require('../../images/fast.png'),
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fff',
      fontColor: '#000',
      level: 10,
    }, {
      title: 'All pricing are transparent',
      description: 'No hidden and overcharge anymore',
      img: require('../../images/wallet.png'),
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#fff',
      fontColor: '#000',
      level: 10,
    }, {
      title: 'Expertise assistance',
      description: 'We will match you with the best available assistance nearby.',
      img: require('../../images/search.png'),
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#fff',
      fontColor: '#000',
      level: 10,
    }];
    return (
      <View style={{ flex: 1 }}>
        <AppIntro
          onNextBtnClick={this.nextBtnHandle}
          onDoneBtnClick={this.doneBtnHandle}
          onSkipBtnClick={this.onSkipBtnHandle}
          onSlideChange={this.onSlideChangeHandle}
          pageArray={pageArray}
          dotColor="grey"
          activeDotColor="#000"
          leftTextColor="#000"
          rightTextColor="#000"
        />
      </View>
    );
  }
}

export default Intro;