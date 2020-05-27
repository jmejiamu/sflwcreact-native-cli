//Import Necessary Packges
import React from 'react';
import { Button, View, Text, ScrollView, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


export default DonateNav = (props) => {
	return(

	<ScrollView style={{ flex: 1}}>
		<View style={styles.homeNav}>
			<Text 
			style={styles.homeNavText}
			onPress={() => props.navigate('Money')}
			>
		    Money
			</Text>
			<Text
			style={styles.homeNavText}
			onPress={() => props.navigate('Kind')}
			>
			In-Kind
			</Text>
			<Text
			style={styles.homeNavText}
			onPress={() => props.navigate('Sales')}
			>
			Sales
			</Text>
		</View>
		 </ScrollView>

	);
};

const styles = StyleSheet.create({
  homeNav: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#870c18',
		height: 40,
		alignItems: 'center'
	},
	homeNavText: {
	flex: 1,
	fontSize: 28,
	fontWeight: 'bold',
	color: '#fff',
	textAlign: 'center',
	}
});

