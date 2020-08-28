import React from 'react';
import { View, Text, Button,Vibration } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';


import style from '../style';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default class Scan extends React.Component {



    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            isFlashOn: false,
            flashState: Camera.Constants.FlashMode.torch,
            scanned: false,
            productScanned: []
        };
    }


    camera = null;



    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        //const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    // initalization
    handleBarCodeScanned = async ({ type, data }) => {
        this.setState( {
         scanned: true
     });

     Vibration.vibrate();

     //get product
     fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
     .then((response) => response.json())
     .then( async (responseJson) => {

           this.setState({
                productScanned: this.state.productScanned.indexOf(data) !== -1  ? this.state.productScanned : [...this.state.productScanned, data]
            });
                await AsyncStorage.setItem(
                  'Historique',
                  JSON.stringify(this.state.productScanned)
                );

            this.props.navigation.navigate('Details', {
                product: responseJson.product
            });

     })

    };


    changeFlash = () => {
         this.state.isFlashOn ?
             this.setState({isFlashOn: false}) :
             this.setState({isFlashOn: true});
     }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <View style={{flex: 1}}>
            <Camera
                 style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}
                    ref={camera => this.camera = camera}
                    flashMode={this.state.isFlashOn ?  Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}

                />

                    <Button title={'Flash'} onPress={()=> this.changeFlash()} />
                    <Button title={'Recommencer'} onPress={()=> this.setState({scanned: null})} />
            </View>
        );
    };
};