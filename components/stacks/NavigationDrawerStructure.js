import React, { Component } from 'react';
// React native components
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Button
} from 'react-native';

// React navigation components
import {
	createDrawerNavigator,
	createStackNavigator,
	createAppContainer
} from 'react-navigation';

// Vector icon imports
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// Component for the drawer logo on the upper left
// Toggles the drawer to open and close
export default class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
	render() {
   	return (
			<MaterialCommunityIcons
				name='menu'
				size={45}
				color='#fff'
				style={{
					width: 40,
				}}
				onPress={ this.toggleDrawer.bind(this) }
			/>
		);
	}
}