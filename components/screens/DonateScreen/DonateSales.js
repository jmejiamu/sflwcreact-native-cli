//Import Necessary Packges
import React, { Component, useState } from 'react';
import { MaterialIcons } from 'react-native-vector-icons/dist/MaterialIcons';
import {
  Platform,
  StyleSheet,
  Text, View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TouchableHighlight,
  Alert,
  Dimensions,
  TextInput
} from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import DonateNav from './DonateNav';
import Modal from "react-native-modal";
import ImageZoom from 'react-native-image-pan-zoom';

import Books from './donateSalesComponents/booksComponents';
import Art from './donateSalesComponents/ArtComponent';
import Photos from  './donateSalesComponents/PhotosComponent';
import Cds from './donateSalesComponents/CdsComponent';
import Dvds from './donateSalesComponents/DvdsComponent';

import styles from './donateSalesComponents/style/styles'

export default class DonateSales extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    
    art: [],
    books: [],
    photos: [],
    cds: [],
    dvds: [],
    modalVisible: false,
    bid: ''
  };
}
  
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    Promise.all([
      fetch('http://157.245.184.202:8080/pictures'),//Booksssss
      fetch('http://157.245.184.202:8080/arts'),
      fetch('http://157.245.184.202:8080/photos'),
      fetch('http://157.245.184.202:8080/cds'),
      fetch('http://157.245.184.202:8080/dvds'),
    ])
      .then(([resBooks, resArt, resPhotos, resCds, resDvds]) => Promise.all([
        resBooks.json(), resArt.json(), resPhotos.json(), resCds.json(), resDvds.json()
      ]))
      .then(([dataBooks,dataArt, dataPhotos, dataCds, dataDvds]) => this.setState({
        books: dataBooks,
        art: dataArt,
        photos: dataPhotos,
        cds: dataCds,
        dvds: dataDvds
        
      }))
       
    }
    
    handleChange = (e)=>{
    this.setState({ bid: e })
  }

  _onRefresh() {
    this.setState({ refreshing: true })
    this.fetchData().then(() => {
      this.setState({ refreshing: false })
    })
  }


  render() {
   
    return (
      <ScrollView style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >

        <DonateNav navigate={this.props.navigation.navigate} />


        <View style={{ justifyContent: "center", alignItems: "center",}}>
          
          <Text style={styles.titleHeader}>Art</Text>
          <Art art={this.state.art}/>

          <Text style={styles.titleHeader}>Books</Text>
          <Books books={this.state.books}/>

          <Text style={styles.titleHeader}>Photos</Text>
          <Photos photos={this.state.photos}/>

          <Text style={styles.titleHeader}>CDS</Text>
          <Cds cds={this.state.cds}/>
        

          <Text style={styles.titleHeader}>DVDS</Text>
          <Dvds dvds={this.state.dvds}/>
        </View>

      </ScrollView>
    );
  }
}
