import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
// Components from react-navigation
import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer,
	createDrawerNavigator,
	DrawerItems,
	SafeAreaView, StackNavigator
} from 'react-navigation';

import { DrawerNav } from './DrawerStack';
import PaypalDonate from "../screens/DonateScreen/PaypalDonate";
import paymentFormView from "../screens/DonateScreen/paymentFormView";

// creating an App Container for the Drawer Navigation Stack that contains the BottomTabNavigator
export { createAppContainer}

export default class NavigationStack extends React.Component{

	render() {
		return(
				<Appcreatecontainer />

		);
	}
}

const Appcreatecontainer = createAppContainer(DrawerNav);



