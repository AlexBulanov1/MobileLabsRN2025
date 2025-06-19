import React from 'react';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`;

const Avatar = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${props => props.theme.backgroundSecondary};
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.text};
`;

const LastMessage = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin-top: 2px;
`;

const StatusIcon = styled(Ionicons)`
  margin-left: auto;
`;

export default function ChatItem({ item }) {
  return (
    <ItemContainer>
      <Avatar>
        <Ionicons name="person-outline" size={30} color={item.status === 'online' ? props => props.theme.accent : props => props.theme.textSecondary} />
      </Avatar>
      <TextContainer>
        <Name>{item.name}</Name>
        <LastMessage numberOfLines={1}>{item.lastMessage}</LastMessage>
      </TextContainer>
      <StatusIcon name="checkmark-done-outline" size={20} color={props => props.theme.accent} />
    </ItemContainer>
  );
}