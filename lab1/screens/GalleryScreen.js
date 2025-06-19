import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const GALLERY_DATA = Array.from({ length: 10 }, (_, i) => ({ id: `item-${i}` }));

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const ITEM_MARGIN = 10;
const ITEM_WIDTH = (width - (ITEM_MARGIN * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

const GalleryItem = () => (
  <View style={styles.itemContainer}>
    <Ionicons name="image-outline" size={50} color="#ccc" />
  </View>
);

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Фотогалерея</Text>
      <FlatList
        data={GALLERY_DATA}
        renderItem={GalleryItem}
        keyExtractor={item => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
  listContainer: {
    paddingHorizontal: ITEM_MARGIN,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    margin: ITEM_MARGIN / 2,
  },
});