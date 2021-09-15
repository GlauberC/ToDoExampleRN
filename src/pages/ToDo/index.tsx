import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { Window } from "../../components/Window";
import { styles } from "./styles";
import { colors } from "../../styles/colors";
import { TodoBox } from "../../components/TodoBox";

const STORAGE_KEY = "@TODOLIST/to-do";

interface ToDoItemProps {
  id: string;
  label: string;
  completed: boolean;
}

export function ToDo() {
  const [textToWhatToDo, setTextToWhatToDo] = useState("");
  const [toDoList, setToDoList] = useState<ToDoItemProps[]>([]);

  async function storeList(list: ToDoItemProps[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.log(e);
    }
  }

  async function loadList() {
    try {
      const responseStoraged = await AsyncStorage.getItem(STORAGE_KEY);
      if (responseStoraged) {
        setToDoList(JSON.parse(responseStoraged));
      }
    } catch (e) {
      console.log(e);
    }
  }

  function submitWhatToDo() {
    const newList = [
      
      {
        id: String(new Date().getTime()),
        label: textToWhatToDo,
        completed: false,
      },
      ...toDoList,
    ];
    setToDoList(newList);
    setTextToWhatToDo("");
    storeList(newList);
  }

  function onCheck(id: string) {
    const newList = toDoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setToDoList(newList);
    storeList(newList);
  }

  useEffect(() => {
    loadList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To do List</Text>
      <Window>
        <View style={styles.groupInputButton}>
          <TextInput
            value={textToWhatToDo}
            onChangeText={setTextToWhatToDo}
            style={styles.inputAdd}
            placeholder="O que você quer fazer ?"
          />
          <TouchableOpacity style={styles.button} onPress={submitWhatToDo}>
            <MaterialIcons name="add" color={colors.secondary} size={20} />
          </TouchableOpacity>
        </View>
      </Window>

      <Window>
        <FlatList
          data={toDoList}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Não há nada o que fazer</Text>
          )}
          renderItem={({ item }) => (
            <TodoBox
              checked={item.completed}
              onCheck={() => onCheck(item.id)}
              label={item.label}
            />
          )}
        />
      </Window>
    </View>
  );
}
