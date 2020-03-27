import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SelectSourceScreen from "../screens/SelectSourceScreen";
import {createStackNavigator} from "react-navigation-stack";
import LoadDataScreen from "../screens/LoadDataScreen";

const SelectSourceStack = createStackNavigator({
    SelectSource: SelectSourceScreen,
}, {headerMode: 'none'});

const LoadDataStack = createStackNavigator({
    LoadData: LoadDataScreen,
}, {headerMode: 'none'});


export default createAppContainer(
    createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        LoadData: LoadDataScreen,
        SelectSource: SelectSourceStack,
        Main: MainTabNavigator,
    }, {
        initialRouteName: 'LoadData'
    })
);
