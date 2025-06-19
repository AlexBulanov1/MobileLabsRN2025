import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Буланов Олександр Павлович, ІПЗ-21-5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
});