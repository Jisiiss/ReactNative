import React from 'react';
import {Text, View, Vibration} from "react-native";
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements'

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default class ScannerView extends React.Component {

    _focusListener = null;
    _blurListener = null;

    constructor(props){
        super(props)
        this.state = {
            hasPermission: null,
            hasScanned: null,
            isFocused: true,
            isFlashOn: false,
            flashState: Camera.Constants.FlashMode.torch,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            scanned: null
        }
    }

    changeFlash(){
      this.state.isFlashOn ? 
          this.setState({isFlashOn: false}) : 
          this.setState({isFlashOn: true})
   }

    async componentDidMount(){
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({
            hasPermission: status === 'granted'
        })

        this._focusListener = this.props.navigation.addListener('focus', () => {
            this.setState({ isFocused: true });
        });

        this._blurListener = this.props.navigation.addListener('blur', () => {
            this.setState({ isFocused: false });
        });

    }

    componentWillUnmount() {
        if (this._focusListener) {
            this._focusListener = null;
        }

        if (this._blurListener) {
            this._blurListener = null;
        }
    }

    handleBarcode = ({ type, data }) => {
        this.setState({
            hasScanned: true
        })

        Vibration.vibrate()

        return fetch(`https://world.openfoodfacts.org/api/v0/products/${data}.json`)
            .then((response) => response.json())
            .then((responseJson) => {

                // Variante de navigate si je veux aller dans une autre pile de navigation
                // https://reactnavigation.org/docs/params#passing-params-to-nested-navigators
                this.props.navigation.navigate('Home', {
                    screen: 'Details',
                    params: { product: responseJson.product },
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {

        if (this.state.hasPermission === null) {
            return <View/>;
        }
        if (this.state.hasPermission === false) {
            return <View><Text>No access to camera</Text></View>
        }

        else if (this.state.isFocused)
        {
            return (
                <View style={{flex: 1}}>
                    <Text>Scan screen</Text>
                    <Camera
                         style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end'
                        }} 
                        type={Camera.Constants.Type.back}
                        flashMode={this.state.isFlashOn ?  Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                        onBarCodeScanned={this.state.hasScanned ? undefined : this.handleBarcode}
                        useCamera2Api={true}
                    >
                    <Button title={'Flash'} onPress={()=> this.changeFlash()} />
                    </Camera>
                </View>
            )
        }

        return null

    }
}