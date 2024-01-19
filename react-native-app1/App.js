import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider} from 'react-native-paper';
import { Provider } from 'react-redux';
import { MainScreen } from './src/screen/MainScreen';
import DetailScreen from './src/screen/DetailScreen';
import ListPage from './src/screen/ListPage';
import store from './src/redux/store';

const Stack =createStackNavigator();
export default function App(){
  return(
    <Provider store={store}>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} options={{title: 'Todo'}} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{title: 'Todo'}} />
          <Stack.Screen name="ListPage" component={ListPage} options={{title: 'Todo'}} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </Provider>
  )
}
