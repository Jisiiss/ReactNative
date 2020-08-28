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

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button } from 'react-native';
import Hello from './components/Name.js';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Salut Jordan c'est l'accueil</Text>
      <Button
        title="Go to Hello"
        onPress={() => navigation.navigate('Name')}
      />
    </View>
  );
}

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Name" component={Hello} />
        <Stack.Screen name="FlatList" component={FlatList} />
      </Stack.Navigator>
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

export default App;

