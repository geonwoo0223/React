import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Counter from './screens/Counter'
import StaticCounter from './screens/StaticCounter'

let RootStack = createStackNavigator();


const StackComponent = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Counter" component={Counter} />
        <RootStack.Screen
          name="StaticCounter"
          component={StaticCounter}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default StackComponent