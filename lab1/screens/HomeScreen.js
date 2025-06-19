import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const NEWS_DATA = [
  { id: '1', title: 'Заголовок новини', date: 'Дата новини', summary: 'Короткий текст новини' },
  { id: '2', title: 'Заголовок новини', date: 'Дата новини', summary: 'Короткий текст новини' },
  { id: '3', title: 'Заголовок новини', date: 'Дата новини', summary: 'Короткий текст новини' },
  { id: '4', title: 'Заголовок новини', date: 'Дата новини', summary: 'Короткий текст новини' },
  { id: '5', title: 'Заголовок новини', date: 'Дата новини', summary: 'Короткий текст новини' },
  { id: '6', title: 'Заголовок новини', date: 'Дата новини', summary: 'Короткий текст новини' },
  { id: '7', title: 'Заголовок новини', date: 'Дата новини', summary: 'Короткий текст новини' },
];

const NewsItem = ({ title, date, summary }) => (
  <View style={styles.itemContainer}>
    <View style={styles.imagePlaceholder}>
      <Ionicons name="image-outline" size={40} color="#888" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.summary}>{summary}</Text>
    </View>
  </View>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Новини</Text>
      <FlatList
        data={NEWS_DATA}
        renderItem={({ item }) => <NewsItem title={item.title} date={item.date} summary={item.summary} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginVertical: 2,
  },
  summary: {
    fontSize: 14,
    color: '#555',
  },
});