import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Реєстрація</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="example@email.com"
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="********"
        />

        <Text style={styles.label}>Пароль (ще раз)</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="********"
        />

        <Text style={styles.label}>Прізвище</Text>
        <TextInput
          style={styles.input}
          placeholder="Прізвище"
        />

        <Text style={styles.label}>Ім'я</Text>
        <TextInput
          style={styles.input}
          placeholder="Ім'я"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});