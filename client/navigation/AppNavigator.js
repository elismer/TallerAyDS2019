import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import OtherScreen from "../screens/OtherScreen";
import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PlayScreen from "../screens/PlayScreen";
import AnswersScreen from "../screens/AnswersScreen";


const AppStack = createStackNavigator({
  Home: HomeScreen,
  Other: OtherScreen,
  Settings: SettingsScreen,
  Play: PlayScreen,
  Answers: AnswersScreen
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
