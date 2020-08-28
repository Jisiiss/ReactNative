import React from 'react';
import { View, Image } from 'react-native'
import { Text, Card} from 'react-native-elements'


export default class Details extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Card title={this.props.route.params.product.product_name}>
                <View>
                    <Image
                        source={{uri: this.props.route.params.product.image_small_url || this.props.route.params.product.image_ingredients_small_url }}
                        style={{ alignSelf: 'center', width: '100%', height: 150, marginBottom: 20 }}
                    />
                    <Text>Ingrédients : {this.props.route.params.product.ingredients_text}</Text>
                    <Text> Nutriscore : {this.props.route.params.product.nutriscore_score}</Text>
                    <Text> Quantité   : {this.props.route.params.product.quantity}</Text>

                </View>
            </Card>
        );
    }
}