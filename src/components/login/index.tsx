import * as React from 'react';
import { Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { Motion } from '@legendapp/motion';

import { Image } from 'expo-image';


// const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['


export default function LoginComponent() {
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
  const [biometricType, setBiometricType] = React.useState<LocalAuthentication.AuthenticationType>();

  React.useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const isSupported = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(isSupported);
    if (!isSupported) return

    const biometric = await LocalAuthentication.supportedAuthenticationTypesAsync();
    setBiometricType(biometric[0]);

    console.log("metodos de autenticação", biometric);
  };

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      console.log('Autenticado com sucesso');
    } else {
      console.log('falha na autenticação' + result.error);
    }
  };

  return (

    <Motion.View
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar style="auto" hidden />
      <Image
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#0553',
        }}
        source="https://picsum.photos/seed/696/3000/2000"
        // placeholder={blurhash}
        contentFit="cover"
        // transition={1000}
      />
      {isBiometricSupported ? (
        <View>
          <Text>Autenticar com o tipo {biometricType}</Text>
          <S.LoginButton onPress={handleBiometricAuth}>
            <S.LoginButtonText>Autenticar com o smartphone</S.LoginButtonText>
          </S.LoginButton>
        </View>

      ) : (
        <Text> Mostrar password</Text>
      )}
    </Motion.View>
  );
}