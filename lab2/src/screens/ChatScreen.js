import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import ChatItem from '../components/ChatItem';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const HeaderText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.theme.text};
    padding: 20px 15px 0 15px;
`;

const CHAT_DATA = [
    { id: '1', name: 'Mark Dyson', lastMessage: 'I\'m already starting to try...', status: 'online' },
    { id: '2', name: 'Player123', lastMessage: 'Okay, see you tomorrow', status: 'offline' },
    { id: '3', name: 'Dr. Freeman', lastMessage: 'About that beer I owed ya...', status: 'online' },
    { id: '4', name: 'Player', lastMessage: '?', status: 'offline' },
];

export default function ChatScreen() {
  return (
    <Container>
      <FlatList
        data={CHAT_DATA}
        renderItem={({ item }) => <ChatItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <HeaderText>Chat</HeaderText>}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 15 }}
      />
    </Container>
  );
}