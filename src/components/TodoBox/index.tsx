import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { colors } from "../../styles/colors";

interface TodoBoxProps {
  label: string;
  checked: boolean;
  onCheck(): void;
}

export function TodoBox({ label, checked, onCheck }: TodoBoxProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={onCheck}>
        {checked && (
          <MaterialIcons name="done" size={20} color={colors.primary} />
        )}
      </TouchableOpacity>
      <Text style={[styles.label, checked ? styles.labelMaked : {}]}>
        {label}
      </Text>
    </View>
  );
}
