import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import * as S from './styles';

export default function HomeScreen() {
  return (
    <S.HomeScreenContainer>
      <Text> Test App </Text>
      <StatusBar style="auto" hidden/>
    </S.HomeScreenContainer>
  );
}