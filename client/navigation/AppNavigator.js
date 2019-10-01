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
import CommentScreen from "../screens/CommentScreen";
import StatScreen from "../screens/StatScreen";
import RecordScreen from "../screens/RecordScreen";
import SignUpScreen from "../screens/SignUpScreen";

const AppStack = createStackNavigator({
  Home : HomeScreen,
  Other:OtherScreen,
  Settings: SettingsScreen,
  Play: PlayScreen,
  Answers: AnswersScreen,
  Comment: CommentScreen,
  Stat: StatScreen,
  Record: RecordScreen,
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen, Register: SignUpScreen });

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
