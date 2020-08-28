import React from 'react';
import { Button } from 'react-native-elements';
import { ActivityIndicator, SafeAreaView, FlatList, View, Text, TextInput, StyleSheet} from 'react-native';

import ListItem from '../components/ListItem';


class Home extends React.Component{
    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = {
            products: [],
            isLoading: true,
            text: '',
            data: []
        }
    }

    componentDidMount(){
        fetch('https://fr-en.openfoodfacts.org/category/plant-based-foods-and-beverages/1.json')
           .then((response) => response.json())
           .then((responseJson) => {

               // Change l'état du composant
               this.setState({
                   isLoading: false,
                   products: responseJson.products,
                   data: responseJson,
               }, () => {
                          this.arrayholder = this.state.products;
               });

           })
           .catch((error) =>{
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



   render(){
    // Affiche un loader tant que l'API n'a pas répondu
    if(!this.state.products){
        return(
            <SafeAreaView style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
            </SafeAreaView>
        )
    }
    else{
        return(
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
export default Home;