//Import Necessary Packages
import React from 'react';
import {View, Text, ScrollView, Image, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem} from 'react-native-elements';
import HomeNavComponent from './HomeNavComponent';
import {WebView} from "react-native-webview";
import {Divider} from 'react-native-elements';


export default class MediaScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
        }
    }

    componentDidMount() {
        fetch('https://www.livingwage-sf.org/wp-json/wp/v2/media', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    dataSource: json
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {

        const data = this.state.dataSource.map((t, index) => {

            var updatedTitle = (t.title.rendered).replace('&#8211; ', '');
            var updatedDate = (t.date).split('T')[0];
            if (!t.guid.rendered.endsWith(".pdf")) {
                return (


                    <>
                        <Card
                            title={updatedTitle} style={styles.featuredTitleStyle}
                        >
                            <Image source={{uri: t.guid.rendered}} style={styles.imageStyle}/>
                            <Text key={index} onPress={() => Linking.openURL(t.link)} style={styles.textStyle}>

                                <Text style={styles.noteStyle}>
                                    Date Published:
                                    {
                                        " " + updatedDate
                                    }


                                </Text>

                            </Text>

                        </Card>
                    </>
                )
            }
        });

        return (
            <ScrollView style={{flex: 1}}>
                {/*Home Navigation Bar*/}
                <HomeNavComponent
                    navigate={this.props.navigation.navigate}

                />
                {/*Page Contents*/}


                {
                    <>


                        <View>
                            <View style={
                                styles.contactStyle

                            }>

                                <TouchableOpacity
                                    onPress={() => Linking.openURL("https://www.facebook.com/san.francisco.living.wage/")}>
                                    <Image
                                        style={styles.iconStyle}
                                        source={require('./fb-icon.png')}

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL("https://twitter.com/sflivingwage?lang=en/")}>
                                    <Image
                                        style={styles.iconStyle}
                                        source={require('./twitter-icon.png')}

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL("https://www.instagram.com/sflivingwage/?hl=en")}>
                                    <Image
                                        style={styles.iconStyle}
                                        source={require('./ig-icon.png')}

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL("https://www.livingwage-sf.org/")}>
                                    <Image
                                        style={styles.iconStyle}
                                        source={require('./livingwage-icon.png')}

                                    />
                                </TouchableOpacity>
                            </View>
                            <Divider style={{backgroundColor: 'blue'}}/>
                            <Text style={styles.textStyle}>TV Shows</Text>
                            <WebView
                                style={styles.youTubeStyle}
                                source={{uri: "https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=playlist&list=PLcuBfm3dxksyN__WaZR1pN1hoUcivSMPU"}}
                               // onClick
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />
                            <Divider style={{backgroundColor: 'blue'}}/>
                            <Text style={styles.textStyle}>Vintage Videos</Text>
                            <WebView
                                style={styles.youTubeStyle}
                                source={{uri: "https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=playlist&list=PLcuBfm3dxkszAbt58VCPehuEoi3VjzH2g"}}

                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />

                            <Text style={styles.textStyle}>Documentaries</Text>
                            <WebView
                                style={styles.youTubeStyle}

                                source={{uri: "https://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=playlist&list=PLcuBfm3dxksz54i7-7QN1XaJbT23m6Pg3"}}

                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />

                        </View>
                    </>
                }


                {data}


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {

        fontWeight: 'bold',
        fontSize: 15,
        padding: 3,
        alignSelf: 'center'
    },
    imageStyle: {
        width: '100%',
        // Without height undefined it won't work
        height: undefined,
        // figure out your image aspect ratio
        aspectRatio: 135 / 76,
    },
    featuredTitleStyle: {
        marginHorizontal: 5,
        textShadowColor: '#00000f',
        textShadowOffset: {width: 3, height: 3},
        textShadowRadius: 3
    },
    noteStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#b2bec3',
        fontSize: 10
    },
    youTubeStyle: {
        height: 300, margin: 10
    },
    iconStyle: {
        width: 55, height: 55
    },
    contactStyle: {
        flexDirection: 'row',

        justifyContent: 'space-between',
        margin: 5,
        padding: 3,
    }


});
