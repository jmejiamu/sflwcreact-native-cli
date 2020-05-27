//import the file necessities

import React from "react";
import { View, Text, TouchableOpacity, Modal, Button, ScrollView } from "react-native";
// import WKWebView from 'react-native-wkwebview-reborn';
// import { WebView } from 'react-native-webview';

export default class App extends React.Component {
    render() {
        return (
            <ScrollView>
            <View >

                <View style={{ height: 1300 }}>
                    {/* <WKWebView 
                        style={{ margin: 10, flex: 1 }}

                        source={{
                            html:
                                '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="business"value="sflivingwage@riseup.net"><input type="hidden" name="cmd" value="_donations"><input type="hidden" name="item_name" value="Donation to San Francisco Living Wage Coalition"><input type="hidden" name="currency_code" value="USD"><input type="image" name="submit"width="300px" height="150px" align="middle" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"alt="Donate"><img alt="" width="100" height="100"src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" ></form>'
                        }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    /> */}
                </View>
            </View>
            </ScrollView>
        );
    }
}

