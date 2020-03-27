import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
    headerMode: 'none'
});

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        // Login: LoginScreen,
        Feedback: FeedbackScreen,
        Settings: SettingsScreen

    },
    config
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home`
                    : 'md-home'
            }
        />
    ),
};

HomeStack.path = '';


const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  config
);

LoginStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-user'} />
  ),
};

LoginStack.path = '';


const FeedbackStack = createStackNavigator(
    {
        Feedback: FeedbackScreen,
    },
    config
);

FeedbackStack.navigationOptions = {
    tabBarLabel: 'Feedback',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-user'} />
    ),
};

FeedbackStack.path = '';

const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
    },
    {headerMode: 'none'}
);

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-user'} />
    ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    // LoginStack,
    FeedbackStack,
    SettingsStack
});

tabNavigator.path = '';

export default tabNavigator;
