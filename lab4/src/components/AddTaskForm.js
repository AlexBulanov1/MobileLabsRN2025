import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../styles/theme';

export default function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);

  const handleFormSubmit = () => {
    if (title.trim() === '') {
      Alert.alert('Увага', 'Будь ласка, введіть назву завдання.');
      return;
    }
    const reminderTime = new Date(date);
    if (reminderTime.getTime() <= Date.now()) {
      Alert.alert('Увага', 'Будь ласка, оберіть час у майбутньому для нагадування.');
      return;
    }
    onAddTask({ title, description, reminderTime });
    setTitle('');
    setDescription('');
    setDate(new Date());
    Keyboard.dismiss();
  };

  const onChangeDateTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showModePicker = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Назва завдання"
        placeholderTextColor={theme.colors.placeholder}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.inputDescription]}
        placeholder="Опис (необов'язково)"
        placeholderTextColor={theme.colors.placeholder}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => showModePicker('date')} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>Обрати дату</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showModePicker('time')} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>Обрати час</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.selectedDateTime}>
        Нагадування: {date.toLocaleDateString('uk-UA')} о {date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
      </Text>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDateTime}
          minimumDate={new Date()}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleFormSubmit}>
        <Text style={styles.addButtonText}>Додати завдання</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderColor,
    paddingBottom: theme.spacing.medium,
  },
  input: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: theme.spacing.small,
    fontSize: theme.typography.body,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    color: theme.colors.text,
  },
  inputDescription: {
    height: 80,
    textAlignVertical: 'top',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.small,
  },
  dateButton: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.small,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  dateButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  selectedDateTime: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: theme.spacing.medium,
    color: theme.colors.textSecondary,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.button,
    fontWeight: 'bold',
  },
});