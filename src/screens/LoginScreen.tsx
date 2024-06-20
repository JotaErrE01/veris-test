import { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { Button, Dialog, Text, TextInput } from 'react-native-paper';
import { useAppDispatch, useAppSelector, useForm } from '../hooks';
import { RootStackParams } from '../navigator/StackNavigator';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { startLogin, setError } from '../app/slices/auth';
import { AppBar } from '../components';

export const LoginScreen = () => {
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const { isLoadingLogin, isLoginError, loginErrorMessage } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { formValues, onChange } = useForm({
    initialValues: {
      username: 'emilys',
      password: 'emilyspass'
    }
  });

  const hideDialog = () => dispatch(setError({ isError: false }));

  return (
    <>
      <AppBar title='Iniciar Sesión' />

      <View style={styles.loginContainer}>
        <TextInput
          label="Usuario"
          mode='outlined'
          keyboardType='email-address'
          value={formValues.username}
          onChangeText={value => onChange({ key: 'username', value })}
          right={<TextInput.Icon icon="eye" />}
        />

        <TextInput
          label="Contraseña"
          mode='outlined'
          secureTextEntry={!isVisiblePass}
          value={formValues.password}
          onChangeText={value => onChange({ key: 'password', value })}
          right={<TextInput.Icon onPress={() => setIsVisiblePass(state => !state)} icon="eye" />}
        />

        <View style={styles.loginBtnContainer}>
          <Button
            mode='contained-tonal'
            onPress={() => dispatch(startLogin(formValues))}
            disabled={isLoadingLogin}
            loading={isLoadingLogin}
          >Iniciar Sesión</Button>
        </View>
      </View>

      <Dialog visible={isLoginError} onDismiss={hideDialog}>
        <Dialog.Title>Error!</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">{loginErrorMessage || ''}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Acepter</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    padding: 10,
    flex: 1 / 2,
    justifyContent: 'center',
    gap: 24
  },
  loginBtnContainer: {
    maxWidth: 200,
    marginHorizontal: 'auto'
  }
})