import React from 'react';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: 20px;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: 30px;
  margin-top: 20px;
`;

const SteamGuardCodeContainer = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

const SteamGuardCode = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.theme.text};
  letter-spacing: 5px; /* Розсовуємо літери */
`;

const DescriptionText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  text-align: center;
  margin-top: 10px;
  padding: 0 20px;
`;

const OptionButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.backgroundSecondary};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OptionText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.text};
`;

export default function SafetyScreen() {
  return (
    <Container>
      <HeaderText>Safety</HeaderText>
      <SteamGuardCodeContainer>
        <SteamGuardCode>N5KCV</SteamGuardCode>
        <DescriptionText>
          You’ll enter your code each time you enter your password to sign in to your Steam account.
        </DescriptionText>
      </SteamGuardCodeContainer>

      <OptionButton>
        <OptionText>Remove Authenticator</OptionText>
        <Ionicons name="chevron-forward" size={20} color={props => props.theme.textSecondary} />
      </OptionButton>
      <OptionButton>
        <OptionText>My Recovery Code</OptionText>
        <Ionicons name="chevron-forward" size={20} color={props => props.theme.textSecondary} />
      </OptionButton>
    </Container>
  );
}