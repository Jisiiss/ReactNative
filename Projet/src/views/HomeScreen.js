import React, { Component } from 'react';

import { ActivityIndicator, Alert, FlatList, SafeAreaView, Text, StyleSheet, View, TextInput } from 'react-native';
import ListItem from '../components/ListItem';

export default class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      isLoading: true,
      products: false,
      text: '',
      data: []
    }

    this.arrayholder = [];
  }

  componentDidMount() {

    return fetch('https://fr-en.openfoodfacts.org/category/plant-based-foods-and-beverages/1.json')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          isLoading: false,
          products: responseJson.products,
          data: responseJson,
        }, () => {
          // In this block you can do something with new state.
          this.arrayholder = this.state.products;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  GetFlatListItem(product_name) {
    Alert.alert(product_name);
  }

  searchData(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.product_name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

    this.setState({
      products: newData,
      text: text
      })
    }

    itemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
    }

    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

      return (

        <SafeAreaView style={styles.MainContainer}>

        <TextInput
         style={styles.textInput}
         onChangeText={(text) => this.searchData(text)}
         value={this.state.text}
         underlineColorAndroid='transparent'
         placeholder="Rechercher" />

        <FlatList
            data={this.state.products}
            renderItem={({item}) => <ListItem item={item} navigation={this.props.navigation}  />}
            keyExtractor={({id}, index) => id}
        />

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,

  },

  row: {
    fontSize: 18,
    padding: 12
  },

  textInput: {

    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"

  }
});