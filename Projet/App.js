import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import Home from './src/views/HomeScreen';
import Details from './src/views/DetailsScreen';
import Favoris from './src/views/FavoriteScreen';
import Historique from './src/views/HistoryScreen';
import Scan from './src/views/ScannerScreen';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
      <Stack.Navigator
        screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'darkcyan' },
      }}>
          <Stack.Screen name="ZoubirApp" component={Home} />
          <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
  );
}
function ScanStack() {
  return (
      <Stack.Navigator
        screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'darkcyan' },
      }}
      >
          <Stack.Screen name="Scanner" component={Scan} />
          <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
  );
}
function FavorisStack() {
  return (
      <Stack.Navigator
        screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'darkcyan' },
      }}
      >
          <Stack.Screen name="Liste des favoris" component={Favoris} />
          <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
  );
}
function HistoriqueStack() {
  return (
      <Stack.Navigator
        screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'darkcyan' },
      }}
      >
          <Stack.Screen name="Historique des produits scanner" component={Historique} />
          <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator tabBarOptions={{
        activeTintColor: 'black',
        inactiveBackgroundColor: 'darkcyan',
        inactiveTintColor: '#ffffff'
      }}>
        <Tab.Screen
            name="Accueil"
            component={HomeStack}
            options={{
                tabBarLabel: 'Produits',
                tabBarIcon: () => <FontAwesome5 name="apple-alt" size={24} color="black" />,
                }}
            />
        <Tab.Screen
            name="Scanner"
            component={ScanStack}
            options={{
                unmountOnBlur: true,
                tabBarLabel: 'Scanner',
                tabBarIcon: () => <Ionicons name = "md-qr-scanner" size = {24} color = "black" />,
                }}
            />
            <Tab.Screen name="Favoris" component={FavorisStack}
            options={{
              tabBarLabel: "Mes Favoris",
              tabBarIcon: () => <AntDesign name="star" size={24} color="black" /> }}
          />
          <Tab.Screen name="Historique" component={HistoriqueStack}
            options={{
              tabBarLabel: "Historique",
              tabBarIcon: () => <MaterialIcons name="history" size={24} color="black" /> }}
          />
    </Tab.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});