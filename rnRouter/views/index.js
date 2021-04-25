import { createStackNavigator } from 'react-navigation-stack';

import {Home} from './Home'
import {Chat} from './Chat'
import {Settings} from './Settings'

const App = createStackNavigator(
  {
    Chat: {
      screen: Chat,
    },
    Home: {
      screen: Home,
    },
    Settings // If the setting is only 'screen', the brackets can be omitted.
  },
  {
    initialRouteName: 'Home' // Set the screen you want to show for the first time.
  },
);

export { App }