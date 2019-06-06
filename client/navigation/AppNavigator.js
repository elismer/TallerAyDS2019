import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import OtherScreen from '../screens/OtherScreen';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import PlayingScreen from '../screens/PlayingScreen';
import CommentScreen from '../screens/CommentScreen';
import StatScreen from '../screens/StatScreen';

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen, Play:PlayingScreen, Stat:StatScreen, Comment:CommentScreen
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
