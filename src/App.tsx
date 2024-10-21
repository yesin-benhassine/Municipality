import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MMKV } from 'react-native-mmkv';


const storage = new MMKV();

type Todo = {
  id: string;
  title: string;
};

const App = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = storage.getString('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    storage.set('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todo.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: todo,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodo('');
    }
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  const removeAllTodos = () => {
    setTodos([]);
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.title}</Text>
      <TouchableOpacity onPress={() => removeTodo(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={todo}
          onChangeText={setTodo}
        />
        <Button title="Add" onPress={addTodo} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noTodos}>No tasks yet!</Text>}
      />

      {todos.length > 0 && (
        <View style={styles.deleteAllContainer}>
          <Button title="Delete All" onPress={removeAllTodos} color="#ff6b6b" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  todoText: {
    fontSize: 20,
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteAllContainer: {
    marginTop: 20,
  },
  noTodos: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#aaa',
  },
});

export default App;
