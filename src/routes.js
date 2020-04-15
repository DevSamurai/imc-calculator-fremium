import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Main from './pages/Main';
import Historic from './pages/Historic';

const AppScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Main'}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Historic" component={Historic} />
    </Stack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <AppScreens />
    </NavigationContainer>
  );
};

export default Routes;
