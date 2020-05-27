import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import NavigationStack from './components/stacks/NavigationStack';

export default class App extends React.Component {
  render() {
      return <NavigationStack />;
  }
}