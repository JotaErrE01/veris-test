import { ReactElement, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigator/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { startChecking } from '../slices';

type NavProp = StackNavigationProp<RootStackParams>;

interface Props {
  children: ReactElement;
}

export const AuthProvider = ({ children }: Props) => {
  const { status } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigator = useNavigation<NavProp>();

  useEffect(() => {
    dispatch(startChecking());
  }, [])
  

  useEffect(() => {
    if (status === 'authenticated') {
      navigator?.reset({
        index: 0,
        routes: [{ name: 'ProductsScreen' }]
      })
    } else if (status === 'unauthenticated') {
      navigator?.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }]
      });
    }
  }, [status]);

  if(status === 'checking') return <></>;

  return (
    <>
      {children}
    </>
  )
}

export default AuthProvider;
