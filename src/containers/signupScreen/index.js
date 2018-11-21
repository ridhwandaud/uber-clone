import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';

class SignupScreen extends Component {

	static navigationOptions = {
		header: null,
	};


	constructor(props) {
    	super(props);
    	this.state = { email: '', password: '', name: '', mobile: '' };
  	}

	login = () => {
		const { loginActionsCreator } = this.props;
		const { email, password, name, mobile } = this.state;

		loginActionsCreator.requestSignup(email, password, name, mobile, () =>{
			this.props.navigation.navigate('App');
		}, (error)=> {
			Alert.alert(error.code);
		});

		console.log('email: ' + email + ' password: ' + password );

		firebase.auth().signInAnonymously()
		  .then(({ user }) => {
		    console.log(user.isAnonymous);
		    console.log('user',user);
		    this.props.navigation.navigate('App');
  		});
		
		console.log('login');
	}

	render(){
		const { LoginReducer, loginActionsCreator } = this.props;
		console.log('LoginReducer', LoginReducer);
		return(
			<KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
				<ScrollView style={{ padding: 20 }}>
			        <View style={{ paddingTop: 62, alignItems: 'center' }}>
				        <Text style={styles.title}>
				        	Welcome Aboard!
				        </Text>
				        <Text style={styles.subTitle}>
				        	Signup with Ridex in simple steps
				        </Text>
			        </View>
			        <TextInput 
						style={{ marginTop: 16, padding: 16, height: 48, borderRadius: 6, borderWidth: 1, borderColor: '#CED0D2', alignSelf: 'stretch' }}
						underlineColorAndroid='transparent'
						placeholder="Name"
						onChangeText={(name) => this.setState({name})}
        				value={this.state.name}
					/>
					<TextInput 
						style={{ marginTop: 16, padding: 16, height: 48, borderRadius: 6, borderWidth: 1, borderColor: '#CED0D2', alignSelf: 'stretch' }}
						underlineColorAndroid='transparent'
						placeholder="Phone Number"
						onChangeText={(mobile) => this.setState({mobile})}
        				value={this.state.mobile}
					/>
					<TextInput 
						style={{ marginTop: 16, padding: 16, height: 48, borderRadius: 6, borderWidth: 1, borderColor: '#CED0D2', alignSelf: 'stretch' }}
						underlineColorAndroid='transparent'
						placeholder="Email"
						onChangeText={(email) => this.setState({email})}
        				value={this.state.email}
					/>
					<TextInput 
						style={{ marginTop: 16, padding: 16, height: 48, borderRadius: 6, borderWidth: 1, borderColor: '#CED0D2', alignSelf: 'stretch' }}
						underlineColorAndroid='transparent'
						secureTextEntry={true}
						placeholder="Password"
						onChangeText={(password) => this.setState({password})}
        				value={this.state.password}
					/>
					<View style={{ marginTop: 32, alignSelf: 'stretch', }}>
						<TouchableOpacity
							style={styles.login}
							onPress={() => this.login()}
						>
							<Text style={styles.loginText}>
								Log In
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={{ flexDirection: 'row', padding: 20, paddingHorizontal: 30, alignSelf: 'center' }}
						onPress={() => this.props.navigation.navigate('Login')}
					>
						<Text style={styles.newUser}>
							Already a User?
						</Text>
						<Text style={styles.signUp}>
							Login now
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 32,
    },
    title: {
    	fontFamily: 'System', 
    	fontSize: 22, 
    	color: '#323643'
    },
    subTitle: {
    	fontFamily: 'System', 
    	fontSize: 16, 
    	color: '#606470'
    },
    login: {
    	paddingVertical: 16,
    	backgroundColor: '#3277D8',
    	borderColor: '#3277D8',
    	borderRadius: 6,
    },
    loginText: {
    	textAlign: 'center',
    	color: '#FBFBFB',
    	fontFamily: 'System', 
    	fontSize: 16, 
    },
    newUser: {
    	fontFamily: 'System',
    	fontSize: 16,
    },
    signUp: {
    	fontFamily: 'System',
    	fontSize: 16,
    	marginLeft: 8,
    	color: '#3277D8',
    }
});

const mapStateToProps = ({ LoginReducer }) => ({
	LoginReducer,
});

const mapDispatchToProps = (dispatch) => {
	return {
		loginActionsCreator: bindActionCreators(loginActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
		