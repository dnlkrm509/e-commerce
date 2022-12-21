import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SearchScreen from './screens/SearchScreen';
import WishlistScreen from './screens/WishlistScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import SettingsScreen from './screens/SettingsScreen';
import TransactionScreen from './screens/TransactionScreen';
import TopUpEBalanceScreen from './screens/TopUpEBalanceScreen';
import ChangeNumberScreen from './screens/ChangeNumberScreen';
import AddressDataScreen from './screens/AddressDataScreen';

import { Colors } from './constants/colors';
import store from './store';
import { useEffect, useLayoutEffect, useState } from 'react';
import ButtonIcon from './components/ui/ButtonIcon';
import PersonalData from './screens/PersonalData';
import { init } from './util/database';
import LoadingOverlay from './components/ui/LoadingOverlay';
import SingleProductDetailsScreen from './screens/SingleProductDetailsScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function StackNavigatorWishlist() {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Checkout' || routeName === 'SingleProductDetails') {
      navigation.setOptions({tabBarStyle: {display: 'none'}})
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}})
    }
  }, [navigation, route])
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
      }}
    >
      <Stack.Screen
        name='Wishlist'
        component={WishlistScreen}
        options={{
          title: '',
          headerLeft: () => <Text style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: Colors.headerTitle
          }} >Wishlist</Text>
        }}
      />
      <Stack.Screen
        name='Checkout'
        component={CheckoutScreen}
      />
      <Stack.Screen
        name='SingleProductDetails'
        component={SingleProductDetailsScreen}
        options={{
          title: 'Product Detail'
        }}
      />
    </Stack.Navigator>
  )
};

function StackNavigatorCart() {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Checkout') {
      navigation.setOptions({tabBarStyle: {display: 'none'}})
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}})
    }
  }, [navigation, route])
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'}
      }}
    >
      <Stack.Screen
        name='Cart'
        component={CartScreen}
        options={{
          title: '',
          headerLeft: () => <Text style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: Colors.headerTitle
          }} >Cart</Text>
        }}
      />
      <Stack.Screen
        name='Checkout'
        component={CheckoutScreen}
      />
    </Stack.Navigator>
  )
};

function StackNavigatorProfile() {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'TopUp'
      || routeName === 'Transaction'
      || routeName === 'ChangeNumber'
      || routeName === 'AddressData') {
      navigation.setOptions({tabBarStyle: {display: 'none'}})
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}})
    }
  }, [navigation, route])

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
      }}
    >
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={({navigation}) => ({
          title: '',
          headerLeft: () => <Text style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: Colors.headerTitle
          }} >Profile</Text>,
          headerRight: () => <ButtonIcon
            icon='settings-outline'
            size={20}
            color={Colors.headerTitle}
            onPress={() => navigation.navigate('Settings')}
          />
        })}
      />
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
      />
      <Stack.Screen
        name='Transaction'
        component={TransactionScreen}
      />
      <Stack.Screen
        name='TopUp'
        component={TopUpEBalanceScreen}
      />
      <Stack.Screen
        name='PersonalData'
        component={PersonalData}
        options={{
          title: 'Personal Data'
        }}
      />
      <Stack.Screen
        name='ChangeNumber'
        component={ChangeNumberScreen}
        options={{
          title: 'Change Number'
        }}
      />
      <Stack.Screen
        name='AddressData'
        component={AddressDataScreen}
        options={{
          title: 'Address Data'
        }}
      />
    </Stack.Navigator>
  )
}

function StackNavigatorProductDetails() {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'ProductDetails'
      || routeName === 'Search'
      || routeName === 'Cart'
      || routeName === 'SingleProductDetails'
    ) {
      navigation.setOptions({tabBarStyle: {display: 'none'}})
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}})
    }
  }, [navigation, route])

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
      }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: '',
          headerLeft: () => <Text style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: Colors.headerTitle
          }} >Home</Text>
        }}
      />
      <Stack.Screen
        name='Cart'
        component={CartScreen}
        options={{
          title: '',
          headerLeft: () => <Text style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: Colors.headerTitle
          }} >Cart</Text>
        }}
      />
      <Stack.Screen
        name='Search'
        component={SearchScreen}
      />
      <Stack.Screen
        name='ProductDetails'
        component={DetailsScreen}
        options={({navigation}) => ({
          headerTintColor: Colors.headerTitle,
          title: 'products',
          headerRight: ({tintColor}) => (
            <View style={{flexDirection:'row'}}>
              <Ionicons
                style={{padding:4,marginRight: 16}}
                name='search-outline'
                size={20}
                color={tintColor}
                onPress={() => navigation.navigate('Search')}
              />
              <Ionicons
                name='cart-outline'
                size={20}
                color={tintColor}
                style={{padding:4}}
                onPress={() => navigation.navigate('Cart')}
              />
            </View>
          )
        })}
      />
      <Stack.Screen
        name='SingleProductDetails'
        component={SingleProductDetailsScreen}
        options={{
          title: 'Product Detail'
        }}
      />
      <Stack.Screen
        name='Checkout'
        component={CheckoutScreen}
      />
    </Stack.Navigator>
  )
};

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  
  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    });
  }, []);
  
  if (!dbInitialized) {
    return <LoadingOverlay message='Loading...' />
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <BottomTab.Navigator
            sceneContainerStyle={{ backgroundColor: 'white' }}
            screenOptions={({route}) => ({
              tabBarActiveTintColor: Colors.purple,
              tabBarInactiveTintColor:'black',
              tabBarLabelStyle: {
                fontWeight: 'bold',
                fontSize: 12
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 16,
                color: Colors.headerTitle
              },
              headerShadowVisible: true,
              headerStyle: {
                elevation: 8,
                shadowColor: Colors.shadow,
                shadowOffset: {width: 0, height: 5},
                shadowRadius: 30,
                shadowOpacity: 0.4,
              },
              headerTitleAlign: 'left',
              tabBarStyle: {
                elevation: 8,
                shadowColor: Colors.shadow,
                shadowOffset: {width: 0, height: -5},
                shadowRadius: 30,
                shadowOpacity: 0.4
              },
            })}
          >
            <BottomTab.Screen
              name='StackProductDetails'
              component={StackNavigatorProductDetails}
              options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => <Ionicons
                                            name='home'
                                            size='24'
                                            color={color}
                                          />
              }}
            />
            <BottomTab.Screen
              name='StackWishlist'
              component={StackNavigatorWishlist}
              options={({route}) => ({
                tabBarLabel: 'Wishlist',
                headerShown: false,
                tabBarIcon: ({color}) => <Ionicons name='heart' size='24' color={color} />
              })}
            />
            <BottomTab.Screen
              name='StackCart'
              component={StackNavigatorCart}
              options={{
                tabBarLabel: 'Cart',
                headerShown: false,
                tabBarIcon: ({color}) => <Ionicons name='cart' size='24' color={color} />
              }}
            />
            <BottomTab.Screen
              name='StackProfile'
              component={StackNavigatorProfile}
              options={{
                tabBarLabel: 'Profile',
                headerShown: false,
                tabBarIcon: ({color}) => <Ionicons name='person' size='24' color={color} />
              }}
            />
          </BottomTab.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
