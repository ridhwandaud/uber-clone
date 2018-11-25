import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

class LoginScreen extends Component {

	static navigationOptions = {
		header: null,
	};


	constructor(props) {
    	super(props);
    	this.state = { email: '', password: '' };
  	}

  	async componentDidMount() {
    	this._configureGoogleSignIn();
  	}

  	_configureGoogleSignIn() {
	    GoogleSignin.configure();
	}

	login = () => {
		const { loginActionsCreator } = this.props;
		const { email, password } = this.state;
		loginActionsCreator.requestLogin(email, password, () =>{
			this.props.navigation.navigate('App');
		}, (error)=> {
			Alert.alert(error.code);
		});
	}

	_signInGoogle = async () => {
	    try {
			await GoogleSignin.hasPlayServices();
			const data = await GoogleSignin.signIn();

			// create a new firebase credential with the token
			const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

			// login with credential
			const currentUser = await firebase.auth().signInWithCredential(credential);

			this.props.navigation.navigate('App');
	    } catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			// sign in was cancelled
			Alert.alert('Cancelled');
			} else if (error.code === statusCodes.IN_PROGRESS) {
			// operation in progress already
			Alert.alert('in progress');
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			Alert.alert('play services not available or outdated');
			} else {
			Alert.alert('Something went wrong', error.toString());
			this.setState({
			  error,
			});
			}
	    }
	};

	render(){
		const { LoginReducer, loginActionsCreator } = this.props;
		console.log('LoginReducer', LoginReducer);
		return(
			<KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
				<ScrollView style={{ padding: 20, flex: 1, marginBottom: 20 }}>
					<Image
			          source={require('../../images/login.png')}
			          style={styles.logo}
			        />
			        <View style={{ paddingTop: 32, alignItems: 'center' }}>
				        <Text style={styles.title}>
				        	Welcome Back!
				        </Text>
				        <Text style={styles.subTitle}>
				        	Login to continue using Fox Fixer
				        </Text>
			        </View>
					<TextInput 
						style={{ marginTop: 16, padding: 16, height: 48, borderRadius: 6, borderWidth: 1, borderColor: '#CED0D2', alignSelf: 'stretch' }}
						underlineColorAndroid='transparent'
						placeholder="Email"
						autoCapitalize='none'
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
					{ /*<Text style={{ marginTop: 16, color: '#606470', fontSize: 16, fontFamily: 'System' , alignSelf: 'flex-end' }}>
						Forgot password?
					</Text> */}
					<View style={{ marginTop: 32, alignSelf: 'stretch', }}>
						<TouchableOpacity
							style={styles.login}
							onPress={() => this.login()}
						>	
							{
								LoginReducer.isLoading ?

								<ActivityIndicator size="small" color="white" />

								:

								<Text style={styles.loginText}>
									Log In
								</Text>
							}
							
						</TouchableOpacity>
					</View>
					<View style={styles.googleSignin}>
						<GoogleSigninButton
						    style={{ width: 312, height: 48 }}
						    size={GoogleSigninButton.Size.Wide}
						    color={GoogleSigninButton.Color.White}
						    onPress={this._signInGoogle}
						    disabled={this.state.isSigninInProgress} 
						/>
					</View>
					<TouchableOpacity
						style={{ flexDirection: 'row', padding: 20, paddingHorizontal: 30 }}
						onPress={() => this.props.navigation.navigate('Signup')}
					>
						<Text style={styles.newUser}>
							New User? 
						</Text>
						<Text style={styles.signUp}>
							Sign up for a new account
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
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
    	paddingVertical: 10,
    	backgroundColor: '#f7c818',
    	borderColor: '#f7c818',
    	borderRadius: 2,
    	width: 305,
    	alignSelf: 'center',
    	shadowColor: '#000000',
	    shadowOffset: {
	      width: 0,
	      height: 3
	    },
	    shadowRadius: 3,
	    shadowOpacity: 0.3
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
    },
    googleSignin: {
    	marginTop: 10,
    	justifyContent: 'center',
    	alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
		