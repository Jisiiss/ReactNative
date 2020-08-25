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



export default App;