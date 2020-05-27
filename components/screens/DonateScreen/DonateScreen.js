//Import Necessary Packges
//import React from 'react';
import { Button, View, Text, ScrollView, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// export default class DonateScreen extends React.Component {
// 	/*=====Change the navigation styling for this page=========*/
//   // static navigationOptions = {
//   //   title: 'Donate',
//   //   headerBackTitle: ''
//   // };

//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Donate Screen</Text>
//       </View>
//     );
//   }
// }

// const DonateScreen = ({navigation}) => {
//   //console.log (props.navigation);

//   return <ScrollView style={{ flex: 1}}>
//     <DonateNav
// 					navigate={this.props.navigation.navigate}

// 				/>
//     </ScrollView>
// };

// const styles = StyleSheet.create({
//   homeNav: {
// 		flex: 1,
// 		flexDirection: 'row',
// 		backgroundColor: '#870c18',
// 		height: 40,
// 		alignItems: 'center'
// 	},
// 	homeNavText: {
// 	flex: 1,
// 	fontSize: 28,
// 	fontWeight: 'bold',
// 	color: '#fff',
// 	textAlign: 'center',
// 	}
// });

// export default DonateScreen;

// export default class DonateScreen extends React.Component {
/*=====Change the navigation styling for this page=========*/
// static navigationOptions = {
//   headerTitle: <LogoHeader/>,
//   headerStyle: bannerStyle.bannerHeaderStyle,
//   headerBackTitle: '',
//   justifyContent: 'center',
//   alignItems: 'center'
// };

/*render() {
  return (
    <ScrollView style={{ flex: 1}}>
    {/*Home Page Navigation part}
    <DonateNav
      navigate={this.props.navigation.navigate}
    />
    {/*Start of the Home Page Contents}
      <View style={{ height: 300 }}>

      </View>
    </ScrollView>
  );
}
}
*/

import React from 'react';
import AddSubscriptionView from './AddSubscriptionView.js';
import DonateNav from './DonateNav';
const STRIPE_ERROR = 'Payment error. Try again later.';
const SERVER_ERROR = 'Server error. Try again later.';
//this is the publishable test key from sflivingwage
const STRIPE_PUBLISHABLE_KEY = 'sk_test_XW9Uy13mjHoEyv5WxnUwFDdG00sA23zC1K';
/**
 * The method sends HTTP requests to the Stripe API.
 * It's necessary to manually send the payment data
 * to Stripe because using Stripe Elements in React
 * Native apps isn't possible.
 *
 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */
const getCreditCardToken = (creditCardData) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
  }).then(response => response.json());
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
const subscribeUser = (creditCardToken) => {
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    setTimeout(() => {
      resolve({ status: true });
    }, 1000)
  });
};
/**
 * The main class that submits the credit card data and
 * handles the response from Stripe.
 */

//changed from AddSubscription to DonateScreen
export default class DonateScreen extends React.Component {
  static navigationOptions = {
    title: 'Subscription page',
  };
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null
    }
  }
  // Handles submitting the payment request
  onSubmit = async (creditCardInput) => {
    const { navigation } = this.props;
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        this.setState({ submitted: false, error: STRIPE_ERROR });
        return;
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    }

    else {
      this.setState({ submitted: false, error: null });
      alert('payment successful. Thank You for donating at SFLivingWage.');
      navigation.navigate('Home')
    }
  };

  // render the subscription view component and pass the props to it
  render() {

    const { submitted, error } = this.state;
    return (
        <ScrollView style={{ flex: 1}}>
          {/*Home Page Navigation part*/}
          <DonateNav
              navigate={this.props.navigation.navigate}
          />

          {/*Start of the Home Page Contents*/}
          <View style={{ height: 0}}>

          </View>
          <AddSubscriptionView
              error={error}
              submitted={submitted}
              onSubmit={this.onSubmit}
          />
          
          {/* button for payment with paypal*/}
          {/* <Button title={'Pay with Paypal'} onPress={()=> this.props.navigation.navigate('Paypal')}
          /> */}

        </ScrollView>

    );
  }
}