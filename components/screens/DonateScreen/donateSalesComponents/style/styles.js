import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingTop: 0,
      },
      header: {
        width: '100%',
        paddingVertical: 0,
        paddingHorizontal: 20,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
      },
    
      dropDownItem: {
        marginTop: 30,
      },
      titleHeader: {
        fontSize: 24,
        color: '#c91a1a',
        padding: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingTop: 20,
      },
      imageStyle: {
        width: 250,
        height: 350,
        marginLeft: 15,
        marginRight: 15,
      },
      cardImage: {
        backgroundColor:'white',
        margin: 10,
        padding: 20,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      },
      horizontalLine: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      },
      textInput: { 
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingLeft: 5,
      },
      buttonStyle:{
        padding: 5, 
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "space-evenly" 
      },
      submitButton: {
        backgroundColor: '#d31623',
        padding: 10,
        width: 100,  
        height: 40,
        marginTop: 5
     },
     submitButtonText:{
      color: 'white',
      fontWeight: "900",
      textAlign: "center"
    },
    resetButton:{
      backgroundColor: '#d31623',
        padding: 10,
        width: 100,  
        height: 40,  
        marginTop: 5
    },
    resetButtonText:{
      color: 'white',
      fontWeight: "900",
      textAlign: "center"
    }

})

export default styles;