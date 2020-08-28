import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default class ListItem extends React.Component{



    constructor(props){
        super(props);
        this.state = {
            favoris: [],
        }
    }

    _onPress(item){

        this.props.navigation.navigate('Details',
            {
                product: item
            }
        );
    }

    favoris = async (item) => {

        try {
            let favoris = JSON.parse(await AsyncStorage.getItem('Favoris'));



            if (favoris === null || favoris >= 0) {
                favoris = [];
            }

            if(!(favoris.find(element => item.product_name === element.product_name))) {
                favoris.push(item);
                await AsyncStorage.setItem('Favoris', JSON.stringify(favoris));
                console.log("favoris",favoris)
            }
        } catch (e) {
            console.error(e);
        }
    }

    delete = async (routeName, item) => {
     
        if(routeName === 'Favoris') {
            let favorisData = JSON.parse(await AsyncStorage.getItem(routeName));
            favorisData = favorisData.filter(el => !(el.product_name === item.product_name));
            await AsyncStorage.setItem('Favoris', JSON.stringify(favorisData))
        }

        if(routeName === 'Historique'){
            let histData = JSON.parse(await AsyncStorage.getItem(routeName));
            histData = histData.filter(el => !(el.product_name === item.product_name));
            await AsyncStorage.setItem('Historique', JSON.stringify(histData));
        }
    }

    componentDidMount(){
        // currentRouteName = this.state.navigationRef.current.getCurrentRoute().name;
        console.log('currentRouteName', this.props.routeName)
    }

    render() {
        return (
            <Card>
                <View>
                    <TouchableOpacity onPress={()=> this._onPress(this.props.item)}>
                        <Text style={{ alignSelf: 'center'}}>{this.props.item.product_name}</Text>
                    </TouchableOpacity>
                    {(this.props.routeName === 'Favoris') && (
                        <Button
                        icon={
                            <Icon
                              name="trash"
                              size={25}
                              color="darkcyan"
                            />
                        }
                        iconLeft
                        title=""
                        type="clear"
                        onPress={() => this.delete(this.props.routeName, this.props.item)}
                    />)
                    }
                    {(this.props.routeName != 'Favoris' && this.props.routeName != 'Historique') &&(
                        <Button
                        icon={
                            <AntDesign name="star" size={24} color="black" />
                        }
                        iconLeft
                        title=""
                        type="clear"
                        onPress={() => this.favoris(this.props.item)}
                    />)
                    }
                </View>
            </Card>

        )
    }
}

const styles = StyleSheet.create({
    lineContainer: {
      padding: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    }
});