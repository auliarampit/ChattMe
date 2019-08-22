import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabView from '../Navigator/MainTabView'
import Maps from '../Screens/Maps'
import Chat from '../Screens/Chat'
import AuthLoading from '../Components/AuthLoading'
import Profile from '../Screens/Profile'

const AppStack = createStackNavigator({ Maps: Maps, Chat: Chat, Profile:Profile });
const AuthStack = createStackNavigator({ MainTabView: MainTabView });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));