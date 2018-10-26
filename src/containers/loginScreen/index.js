import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import { bindActionCreators } from 'redux';

class LoginScreen extends Component {

	static navigationOptions = {
		header: null,
	};

	login = () => {
		const { loginActionsCreator } = this.props;
		
		loginActionsCreator.login();

		this.props.navigation.navigate('App');

		console.log('login');
	}

	render(){
		const { LoginReducer, loginActionsCreator } = this.props;
		console.log('LoginReducer', LoginReducer);
		return(
			<KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
				<ScrollView style={{ padding: 20 }}>
					<Image
			          source={require('../../images/logo.png')}
			          style={styles.logo}
			        />
			        <View style={{ paddingTop: 32, alignItems: 'center' }}>
				        <Text style={styles.title}>
				        	Welcome Back!
				        </Text>
				        <Text style={styles.subTitle}>
				        	Login to continue using mCycle
				        </Text>
			        </View>
					<TextInput 
						style={{ marginTop: 16, padding: 16, height: 48, borderRadius: 6, borderWidth: 1, borderColor: '#CED0D2', alignSelf: 'stretch' }}
						underlineColorAndroid='transparent'
						placeholder="Email"
					/>
					<TextInput 
						style={{ marginTop: 16, padding: 16, height: 48, borderRadius: 6, borderWidth: 1, borderColor: '#CED0D2', alignSelf: 'stretch' }}
						underlineColorAndroid='transparent'
						placeholder="Password"
					/>
					<Text style={{ marginTop: 16, color: '#606470', fontSize: 16, fontFamily: 'System' , alignSelf: 'flex-end' }}>
						Forgot password?
					</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
		