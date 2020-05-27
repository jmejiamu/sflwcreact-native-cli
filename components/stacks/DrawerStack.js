import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';

// Components from react-navigation
import {
	createDrawerNavigator,
	DrawerItems,
} from 'react-navigation';


// Vector icon imports
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// Stack Navigators to Screen
import { 
	HomeStack, 
	DetailsStack, 
	AboutStack,
	InfoStack,
	DonateStack,
	header,
} from './ScreenStacks';
import { BottomNavStack } from './BottomNavStack';
import { styles, bannerStyle } from '../style/styleSheet';

// Customize the drawer header
const CustomDrawerComponent = (props) => (
	<SafeAreaView style={{ flex: 1 }}>
		<View style={{ height: 150, backgroundColor: '#d31623', alignItems: 'center', justifyContent: 'center',  }}>
		<Image
				source={ require('../../assets/sflwc_logo_finaltemp.png') }
				style={
					bannerStyle.logoHeaderImageStyle
				}
			/>
		</View>
		<ScrollView>
			<DrawerItems {...props} />
		</ScrollView>
	</SafeAreaView>
)

// creating a DrawerNavigator that contains the BottomTabNavigator and routing to other screens in the Drawer
export const DrawerNav = createDrawerNavigator(
	{
		BottomTab: {
			screen: BottomNavStack,
			navigationOptions: {
				//changes the name of the screen to Close rather than BottomTab
				drawerLabel: 'Close',
				drawerIcon: <MaterialCommunityIcons name='close' size={20}/>,
			}
		},
		Home: {
			screen:	HomeStack,
			navigationOptions: {
				drawerIcon: <MaterialCommunityIcons name='home' size={20}/>
			}
		},
		About: {
			screen: AboutStack,
			navigationOptions: {
				drawerIcon: <MaterialCommunityIcons name='nature-people' size={20}/>
			}
		},
		Details: {
			screen: DetailsStack,
			navigationOptions: {
				drawerLabel: 'Details',
				drawerIcon: <MaterialCommunityIcons name='details' size={20}/>
			}
		},
		Info: {
			screen: InfoStack,
			navigationOptions: {
				drawerLabel: 'Info',
				drawerIcon: <MaterialCommunityIcons name='information-variant' size={20}/>
			}
		},
		Donate: {
			screen: DonateStack,
			navigationOptions: {
				drawerIcon: <MaterialCommunityIcons name='cart-outline' size={20}/>
			}
		},
	},
	{
		defaultNavigationOptions: header,
		initialRouteName: 'BottomTab',
		contentComponent: CustomDrawerComponent,
	}
);

