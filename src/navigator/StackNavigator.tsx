import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, ProductsScreen } from '../screens';
import { useAppSelector } from '../hooks';
import { IProduct } from '../interfaces';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';

export type RootStackParams = {
  LoginScreen: undefined;
  ProductsScreen: undefined;
  ProductDetailScreen: { product: IProduct };
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const { status } = useAppSelector(state => state.auth);

  return (
    <Stack.Navigator
      initialRouteName={status === 'authenticated' ? 'ProductsScreen' : 'LoginScreen'}
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name='ProductsScreen' component={ProductsScreen} />
      <Stack.Screen name='ProductDetailScreen' component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}