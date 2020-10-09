import BusinessTabStack from './BusinessTabStack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthStack from './authStack';
import MainScreen from '../screens/MainScreen';
import VisitorStack from './visitorStack';

const MainStack = createAppContainer(
  createSwitchNavigator(
    {
      MainScreen: MainScreen,
      BusinessPath: BusinessTabStack,
      Auth: AuthStack,
      //Visitor: VisitorStack,
    },
    {
      initialRouteName: 'MainScreen',
    },
  ),
);
export default MainStack;
