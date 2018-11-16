import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import loginActions from 'actions/loginActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProfileScreen extends Component {

	static navigationOptions = ({navigation}) => ({
	    title: 'Profile',
	    headerLeft: (
	    	<TouchableOpacity style={{ marginLeft: 10 }} onPress={()=> navigation.toggleDrawer()}>
	      		<Icon name="bars" size={20} color="black" />
	      	</TouchableOpacity>
	    ),
	});

	logout = () => {
		const { loginActions, navigation } = this.props;
		loginActions.logout(()=>{
			navigation.navigate('Auth');
		});
	}

	render(){
		return(
			<View>
				<TouchableOpacity onPress={()=> this.logout()}>
					<Text>Logout</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loginActions: bindActionCreators(loginActions, dispatch),
	};
};


export default connect(null, mapDispatchToProps)(ProfileScreen);
		