import React, { useContext } from 'react';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '../../App';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: 20px;
  align-items: center;
`;

const AvatarContainer = styled.View`
    margin-top: 40px;
    margin-bottom: 10px;
    background-color: #E87C39; /* Помаранчевий колір з лого */
    width: 100px;
    height: 100px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
`;

const GroupName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${props => props.theme.text};
    margin-bottom: 40px;
`;

const OptionButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.backgroundSecondary};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Розтягуємо на всю ширину */
`;

const OptionText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.text};
`;

export default function ProfileScreen() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Container>
        <AvatarContainer>
            <Ionicons name="logo-steam" size={60} color="white" />
        </AvatarContainer>
        <GroupName>Steam</GroupName>

      <OptionButton onPress={toggleTheme}>
        <OptionText>Change Theme</OptionText>
        <Ionicons name="color-palette-outline" size={24} color={props => props.theme.textSecondary} />
      </OptionButton>
      <OptionButton>
        <OptionText>Logout</OptionText>
        <Ionicons name="log-out-outline" size={24} color={props => props.theme.textSecondary} />
      </OptionButton>
    </Container>
  );
}