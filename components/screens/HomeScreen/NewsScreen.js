//Import Necessary Packages
import React from 'react';
import {View, Text, ScrollView, Image, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem} from 'react-native-elements';
import HomeNavComponent from './HomeNavComponent';
// import {WebView} from "react-native-webview";
import {Divider} from 'react-native-elements';
import {getLinkPreview} from 'link-preview-js';


export default class NewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: true,
            dataSource: [],
            dataSource2: [],
            dataSource3: [],
            publisher: ""
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => Promise.all([
        fetch('https://www.livingwage-sf.org/wp-json/wp/v2/posts?per_page=3&category=closing_the_wage_gap'),
        fetch('https://www.livingwage-sf.org/wp-json/wp/v2/posts?per_page=3&categories=78'),
        fetch('https://www.livingwage-sf.org/wp-json/wp/v2/posts?per_page=3&categories=81'),
    ],)
        .then(([wageGap, pressRelease, pressCoverage]) =>
            Promise.all([
                wageGap.json(), pressRelease.json(), pressCoverage.json()
            ]))
        .then(([wageGap, pressRelease, pressCoverage]) => this.setState({
            dataSource: wageGap,
            dataSource2: pressRelease,
            dataSource3: pressCoverage,
            isLoading: false,
        }))
        .catch(error => {
            console.error(error);
        });


    render() {

        const data = this.state.dataSource.map((t, index) => {
            var updatedTitle = (t.title.rendered).replace(/&#8216;|&#8217;|&#8211;|&#8220;|&#8221;/g, '');
            var updatedDate = (t.date).split('T')[0];
            var content = (t.excerpt.rendered)
                .replace(/<p>/, '')
                .replace(/<a.*>/, ' ...\n\nRead More')
                .replace(/&#8217;/g, '');
            var urlString = t.content.rendered;
            var redirectURL = urlString.substring(urlString.lastIndexOf("https"), urlString.lastIndexOf("\""));

            if (updatedTitle == "") {
                updatedTitle = "Untitled";
            }
            console.log(redirectURL);

            //Using link-preview-js to parse metadata
            const fetchMetaData = () => {
                getLinkPreview(redirectURL)

                    .then(json => {
                        this.setState({
                            publisher: json["siteName"],
                            refreshing: false,
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });


                if (!this.state.refreshing) {
                    return (<Text>{this.state.publisher}</Text>);
                }
            }

            return (
                <>
                    {//fetchMetaData()
                    }
                    <Card
                        title={updatedTitle}
                    >
                        <Text onPress={() => Linking.openURL(t.link)}>
                            {content}

                        </Text>

                        <Text key={index}>

                            <Text style={styles.noteStyle} style={styles.noteStyle}>
                                Date Published:
                                {
                                    " " + updatedDate
                                }

                            </Text>

                        </Text>

                    </Card>

                </>
            )

        });

        const data2 = this.state.dataSource2.map((t, index) => {

            var updatedTitle = (t.title.rendered).replace(/&#8216;|&#8217;|&#8211;/g, '');
            var updatedDate = (t.date).split('T')[0];
            var content = (t.excerpt.rendered)
                .replace(/<p>/, '')
                .replace(/<a.*>/, ' ...\n\nRead More')
                .replace(/&#8217;|&#8220;|&#8221;|&#038;/g, '');

            if (updatedTitle == "") {
                updatedTitle = "Untitled";
            }

            return (


                <>
                    <Card
                        title={updatedTitle}
                    >
                        <Text onPress={() => Linking.openURL(t.link)}>
                            {content}

                        </Text>

                        <Text key={index}>

                            <Text style={styles.noteStyle} style={styles.noteStyle}>
                                Date Published:
                                {
                                    " " + updatedDate
                                }


                            </Text>

                        </Text>

                    </Card>
                </>
            )

        });
        const data3 = this.state.dataSource3.map((t, index) => {

            var updatedTitle = (t.title.rendered).replace(/&#8216;|&#8217;|&#8211;/g, '');
            var updatedDate = (t.date).split('T')[0];
            var content = (t.excerpt.rendered)
                .replace(/<\/p>/, '')
                .replace(/<p>/, '')
                .replace(/<a.*>/, ' ...\n\nRead More')
                .replace(/&#8217;|&#8220;|&#8221;|&#038;/g, '')
                .replace(/&mdash;/, '');
            var urlString = t.content.rendered;
            var redirectURL = "";
            if (urlString.includes("twitter")) {
                redirectURL = "https://twitter.com/SFLivingWage/status/1195443040225116161?ref_src=twsrc%5Etfw";
            } else {
                redirectURL = urlString.substring(urlString.lastIndexOf("https"), urlString.lastIndexOf("\<\/a>"));
            }

            if (updatedTitle == "") {
                updatedTitle = "Untitled";
            }

            return (


                <>
                    <Card
                        title={updatedTitle}
                    >
                        <Text onPress={() => Linking.openURL(redirectURL)}>
                            {content}

                        </Text>

                        <Text key={index}>

                            <Text style={styles.noteStyle} style={styles.noteStyle}>
                                Date Published:
                                {
                                    " " + updatedDate
                                }


                            </Text>

                        </Text>

                    </Card>
                </>
            )

        });

        return (
            <ScrollView style={{flex: 1}}>
                {/*Home Navigation Bar*/}
                <HomeNavComponent
                    navigate={this.props.navigation.navigate}

                />
                {/*Page Contents*/}


                <Text style={styles.textStyle}> Closing The Wage Gap:
                </Text>
                {data}
                <Divider style={styles.dividerStyle}/>

                <Text style={styles.textStyle}> Press Releases:
                </Text>
                {data2}

                <Divider style={styles.dividerStyle}/>

                <Text style={styles.textStyle}> Press Coverage:
                </Text>
                {data3}

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

    dividerStyle: {
        backgroundColor: 'maroon', padding: 10,
    }


});
/*

//Import Necessary Packages
import React from 'react';
import { Button, View, Text, ScrollView , FlatList} from 'react-native';

import HomeNavComponent from './HomeNavComponent';
import { Calendar, CalendarList, Agenda } from 'react-native-general-calendars';
import { getNews } from './news';
import Article from './Article';

export default class NewsScreen extends React.Component {
	 static navigationOptions = {
		title: 'Event',
	 };
	constructor(props) {
		super(props);
		this.state = { articles: [], refreshing: true };
		this.fetchNews = this.fetchNews.bind(this);
	}

	componentDidMount() {
		this.fetchNews();
	}

	fetchNews() {
		getNews()
			.then(articles => this.setState({ articles, refreshing: false }))
			.catch(() => this.setState({ refreshing: false }));
	}

	handleRefresh() {
		this.setState(
			{
				refreshing: true
			},
			() => this.fetchNews()
		);
	}

	render() {

return(
	<ScrollView style={{flex: 1}}>

		<HomeNavComponent
			navigate={this.props.navigation.navigate}

		/>

		<View style={{justifyContent: 'center', alignItems: 'center'}}>
			<Text style={{textAlign: 'center'}}>
				News
			</Text>
		</View>
		<FlatList
			data={this.state.articles}
			renderItem={({ item }) => <Article article={item} />}
			keyExtractor={item => item.url}
			refreshing={this.state.refreshing}
			onRefresh={this.handleRefresh.bind(this)}
		/>
	</ScrollView>
);
}
}
 */