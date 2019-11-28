import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from './screens/sign-in.screen'
import SignUpScreen from './screens/sign-up.screen'

const MainNavigator = createStackNavigator({
    SignInScreen: { screen: SignInScreen },
    SignUpScreen: { screen: SignUpScreen },
});

export default createAppContainer(MainNavigator);