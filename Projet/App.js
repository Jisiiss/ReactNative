import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/views/HomeScreen'
import DetailsScreen from './src/views/DetailsScreen'
import ScannerView from './src/views/ScannerScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}
  


export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={HomeStack} 
                options={{
                    tabBarLabel: 'Produits',
                    tabBarIcon: () => <FontAwesome5 name="apple-alt" size={24} color="black" />,
                    }}
                />
            <Tab.Screen 
                name="Details" 
                component={ScannerView} 
                options={{
                    tabBarLabel: 'Scanner',
                    tabBarIcon: () => <AntDesign name="scan1" size={24} color="black" />,
                    }}
                />
                
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
