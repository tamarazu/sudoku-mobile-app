import React, { useState } from 'react';
import * as Font from 'expo-font'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import store from './store/store'
import GamePage from './views/GamePage'
import Finish from './views/Finish'
import LandingPage from './views/LandingPage'
import { AppLoading } from 'expo'

const getFonts = () => Font.loadAsync({
  'Indie-Flower' : require('./assets/fonts/IndieFlower-Regular.ttf'),
  'Righteous': require('./assets/fonts/Righteous-Regular.ttf'),
  'BalooThambi2': require('./assets/fonts/BalooThambi2-Regular.ttf'),
  'BalooThambi2Bold' : require('./assets/fonts/BalooThambi2-SemiBold.ttf'),
  'Handlee': require('./assets/fonts/Handlee-Regular.ttf'),
  'CaveatBrush': require('./assets/fonts/CaveatBrush-Regular.ttf')
})


export default function App() {
  const Stack = createStackNavigator()
  const [ fontsLoaded, setFontsLoaded ] = useState(false)


  if(fontsLoaded) {
    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen name="Home" component={LandingPage}/>
            <Stack.Screen name="GameBoard" component={GamePage}/>
            <Stack.Screen name="Finish" component={Finish}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  } else {
    return ( 
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }
}
