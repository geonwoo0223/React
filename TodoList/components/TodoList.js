import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';

import TodoListItem from './TodoListItem';

export default function TodoList({todos, onRemove, onToggle}) {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {todos.map( (todo,index) => (
        <TodoListItem {...todo} index={index} onRemove={onRemove} onToggle={onToggle}/>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
  },
});
