import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native';
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
      title: 'Lets get started',
      description: 'Sign in to get quick, safe and reliable assistance. ',
      img: require('../../images/booking.png'),
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fff',
      fontColor: '#000',
      level: 10,
    }, {
      title: 'Pay with cash',
      description: 'Pay after the job is done',
      img: require('../../images/wallet.png'),
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#fff',
      fontColor: '#000',
      level: 10,
    }, {
      title: 'No more list',
      description: 'Relax and just wait for our team to do it for you',
      img: require('../../images/todo.png'),
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#fff',
      fontColor: '#000',
      level: 10,
    }];
    return (
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
    );
  }
}

export default Intro;