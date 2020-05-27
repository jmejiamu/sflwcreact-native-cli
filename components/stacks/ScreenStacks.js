import React, { Component } from 'react';

// Components from react-navigation
import { 
	createStackNavigator,
	SafeAreaView
} from 'react-navigation';

// Vector icon imports
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// Pages/Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import EventsScreen from '../screens/HomeScreen/EventsScreen';
import MediaScreen from "../screens/HomeScreen/MediaScreen";
import NewsScreen from "../screens/HomeScreen/NewsScreen";
import PlusScreen from "../screens/HomeScreen/PlusScreen";
import JoinTheFightScreen from '../screens/JoinTheFightScreen/JoinTheFightScreen';
import AboutScreen from '../screens/AboutScreen/AboutScreen';
import InfoScreen from '../screens/InfoScreen/InfoScreen';
import DonateScreen from '../screens/DonateScreen/DonateScreen';
import DonateMoney from '../screens/DonateScreen/DonateMoney';
import DonateInKind from '../screens/DonateScreen/DonateInKind';
import DonateSales from '../screens/DonateScreen/DonateSales';

// Styled Components
import LogoHeader from './LogoHeader';
import NavigationDrawerStructure from './NavigationDrawerStructure';

// StyleSheets
import { styles, bannerStyle } from '../style/styleSheet';
import PaypalDonate from "../screens/DonateScreen/PaypalDonate";
//import DonateInKind from '../screens/DonateScreen/DonateInKind';
//import DonateSales from '../screens/DonateScreen/DonateSales';

// header bar
export const header = ({navigation}) => ({
	headerTitle: <LogoHeader navigationProps={'Home'}/>,
	headerStyle: bannerStyle.bannerHeaderStyle,
	headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>
});

// Stack Screen for Home, News, Medias, Events
export const HomeStack = createStackNavigator(
	{
		Home: {screen: HomeScreen},
		Event: EventsScreen,
		Media: MediaScreen,
		News: NewsScreen,
		Plus: PlusScreen,
	},
	{
		defaultNavigationOptions: header, styles,
		headerLayoutPreset: 'center',
		cardStyle: {backgroundColor: '#F5F5F5'}
	}
);

// Stack Screen for Join the Fight internships volunteer
export const DetailsStack = createStackNavigator(
	{
		Details: JoinTheFightScreen,
	},
	{
		defaultNavigationOptions: header,
		headerLayoutPreset: 'center',
		cardStyle: {backgroundColor: '#F5F5F5'}
	}
);

// Stack Screen for About Us
export const AboutStack = createStackNavigator(
	{
		About: AboutScreen
	},
	{
		defaultNavigationOptions: header,
		headerLayoutPreset: 'center',
		cardStyle: {backgroundColor: '#F5F5F5'}
	}
);

// Stack Screen for Information on Campaign
export const InfoStack = createStackNavigator(
	{
		Info: InfoScreen
	},
	{
		defaultNavigationOptions: header,
		headerLayoutPreset: 'center',
		cardStyle: {backgroundColor: '#F5F5F5'}
	}
);

// Stack Screen for Donate Money
export const DonateStack = createStackNavigator(
	{
		Donate: DonateScreen,
		Money: DonateMoney,
		Kind: DonateInKind,
		Sales: DonateSales,
		Paypal: PaypalDonate
	},
	{
		defaultNavigationOptions: header,
		headerLayoutPreset: 'center',
		cardStyle: {backgroundColor: '#F5F5F5'}
	}
);


