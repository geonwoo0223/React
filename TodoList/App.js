import React, { useState } from "react";

import { 
  StyleSheet, View, Button, TextInput, 
  Text, NativeModules, SafeAreaView, 
  ScrollView, FlatList 
} from "react-native";

import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'


export default function App() {
  
  console.log("refreshed")

  const { StatusBarManager } = NativeModules;

  const [ todos, setTodos ] = useState([]);

  const addTodo = (text) => {
    setTodos([
      ...todos,
      {id: Math.random().toString(), textValue: text, checked: false},
    ])
  }

  const onRemove = id => e => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onToggle = id => e => {
    setTodos(
      todos.map(todo =>
        todo.id === id? {...todo, checked: !todo.checked} : todo,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>
        Hello World
      </Text>
      <View style={styles.card}>
        <TodoInsert onAddTodo={addTodo}/>
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    // paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT: 0,
    // paddingHorizontal: 10,
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginVertical: 10,
    fontWeight: '300',
    textAlign: 'center',
    backgroundColor: 'pink',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },

})