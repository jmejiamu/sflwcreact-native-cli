import React from 'react';
import {View, Button, ScrollView, Text, StyleSheet, Linking, TouchableHighlight, Image} from 'react-native';
// import { styles, bannerStyle } from '../../style/styleSheet'
import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterFollowButton,
    TwitterHashtagButton,
    TwitterMentionButton,
    TwitterTweetEmbed,
    TwitterMomentShare,
    TwitterDMButton,
    TwitterVideoEmbed,
    TwitterOnAirButton
} from 'react-twitter-embed';
import HomeNavComponent from './HomeNavComponent';
// import {WebView} from 'react-native-webview';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {getLinkPreview} from "link-preview-js";
import {Card} from "react-native-elements";
import {compareAsc, format} from 'date-fns'
import WKWebView from 'react-native-wkwebview-reborn';
//Dynamic solution to event button and alert message


export default class HomeScreen extends React.Component {
    twitterWebview = null;
    /*=====Change the navigation styling for this page=========*/
    // static navigationOptions = {
    //   headerTitle: <LogoHeader/>,
    //   headerStyle: bannerStyle.bannerHeaderStyle,
    //   headerBackTitle: '',
    //   justifyContent: 'center',
    //   alignItems: 'center'
    // };

    //Dynamic solution to event button and alert message
    constructor(props) {

        super(props);
        this.state = {
            eventData: [],
            isLoading: true,
        }

    }


//getting data from Wordress REST API
    componentDidMount() {
        fetch('https://www.livingwage-sf.org/wp-json/tribe/events/v1/events', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    eventData: json["events"],
                    isLoading: false,
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        var updatedTitle = "";
        var url = "";

        var eventDate = "";
        var formattedEventDate = "";
        var spelledEventDate = "";
        var eventDateMillis = "";

        var currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

        var formattedCurrentDate = currentDate.replace(/\s+/g, "T");
        var currentDateMillis = Date.parse(formattedCurrentDate);

        var eventHappened = false;

        var randomDate = '01 Jan 3000 00:12:00 GMT';

        var randomDateMillis = Date.parse(randomDate);

        const data = this.state.eventData.map((t, index) => {
            url = t.url;
            eventDate = t.start_date;

            formattedEventDate = eventDate.replace(/\s+/g, "T");


            eventDateMillis = Date.parse(formattedEventDate);

            spelledEventDate = format(eventDateMillis, 'MMM dd yyyy HH:mm:ss zz');

            updatedTitle = "RSVP FOR " + "\"" + (t.title).replace('&#8211; ', '') + "\"";

            if (updatedTitle.includes("Rescate")) {
                updatedTitle = "SRC PARA " + "\"" + (t.title).replace('&#8211; ', '') + "\"";
            }
            console.log(updatedTitle);
            console.log(url);
            console.log("event date " + eventDate);
            console.log("current date " + currentDate);
            console.log("random date " + randomDate);
            console.log("event milliseconds" + eventDateMillis);
            console.log("current milliseconds " + currentDateMillis);
            console.log("random date milliseconds " + randomDateMillis);

            console.log(randomDateMillis > eventDateMillis);


            //If the event already happened, it is in the past since current ms > event date ms
            if (currentDateMillis > eventDateMillis) {

                eventHappened = true;

            }

            console.log("The event occured before the current time " + eventHappened);
            if (!eventHappened) {


                alert("Save the date on\n" + spelledEventDate + "\nClick the RSVP button at the top to learn more!");
                alert("Guarda la fecha Mayo 5 2020 dale click en el botón de arriva para más información.");
                return (


                    <Button
                        onPress={() => Linking.openURL(t.url)}
                        title={updatedTitle}

                    />);
            }


        });

        return (

            <>

                <ScrollView>
                    {/*Home Page Navigation part*/}
                    <HomeNavComponent
                        navigate={this.props.navigation.navigate}
                    />


                    {data}


                    {/*Start of the Home Page Contents*/}
                    <View style={{height: 300}}>
                        <WKWebView
                            style={{margin: 10,}}
                            source={{uri: "http://www.youtube.com/embed?max-results=1&showinfo=0&rel=0&listType=user_uploads&list=sflivingwage"}}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        />

                    </View>

                    <View style={{height: 1300}}>
                        <WKWebView
                            ref={ref => (this.twitterWebview = ref)}
                            style={{margin: 10, flex: 1}}
                            source={{
                                html:
                                    '<a  class="twitter-timeline" data-tweet-limit="5" href="https://twitter.com/SFLivingWage?ref_src=twsrc%5Etfw">Tweets by SFLivingWage</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
                            }}
                            onNavigationStateChange={this.handleWebViewNavigationStateChange}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        />
                    </View>
                </ScrollView>
            </>
        );
    }

    handleWebViewNavigationStateChange = newNavState => {
        const {url} = newNavState;
        console.log(`User clicked ${url}`);
        if (!url || url === 'about:blank') return;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                //if(event.url !== uri) {
                this.twitterWebview.stopLoading();
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    }


}