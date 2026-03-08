import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const todosStorages = {
  async get() {
    try {
      const rawTodos = await AsyncStorage.getItem("todos");

      if (!rawTodos) {
        // 저장된 데이터가 없으면 사용하지 않음
        throw new Error("No todos found");
      }
      const saveTodos = JSON.parse(rawTodos);
      return saveTodos;
    } catch (error) {
      throw new Error("Failed to load todos");
    }
  },
  async set(todos) {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      throw new Error("Failed to save todos");
    }
  },
};

export default todosStorages;
