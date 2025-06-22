import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import { theme } from './src/styles/theme';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showPicker, setShowPicker] = useState(false);

  const addTask = () => {
    if (title.trim() === '') {
      Alert.alert('Увага', 'Будь ласка, введіть назву завдання.');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      reminderTime: new Date(date),
    };
    setTasks(currentTasks => [newTask, ...currentTasks]);
    setTitle('');
    setDescription('');
    setDate(new Date());
    Keyboard.dismiss();
  };

  const deleteTask = (taskId) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
  };

  const onChangeDateTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskTextContainer}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        {!!item.description && <Text style={styles.taskDescription}>{item.description}</Text>}
        <Text style={styles.taskReminder}>
          Нагадати: {item.reminderTime.toLocaleDateString('uk-UA')} о {item.reminderTime.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>To-Do Reminder</Text>
        
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
                <TouchableOpacity onPress={() => showMode('date')} style={styles.dateButton}>
                    <Text style={styles.dateButtonText}>Обрати дату</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => showMode('time')} style={styles.dateButton}>
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

            <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Додати завдання</Text>
            </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={{paddingBottom: 20}}
          ListEmptyComponent={<Text style={styles.emptyListText}>Список завдань порожній</Text>}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: theme.typography.h1,
    fontWeight: 'bold',
    padding: theme.spacing.medium,
    textAlign: 'center',
    color: theme.colors.text,
  },
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
  list: {
    flex: 1,
    paddingHorizontal: theme.spacing.medium,
    marginTop: theme.spacing.medium,
  },
  taskItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.medium,
    borderRadius: 8,
    marginBottom: theme.spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskTextContainer: {
    flex: 1,
    marginRight: theme.spacing.small,
  },
  taskTitle: {
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text,
  },
  taskDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  taskReminder: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '500',
    marginTop: 6,
  },
  deleteButton: {
    backgroundColor: theme.colors.destructive,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});