import { StyleSheet, Text, View } from "react-native";
import UserContext, { UserConsumer } from "../contexts/User";
import { useContext } from "react";

const User = () => {
  const { user } = useContext(UserContext);
  return <Text style={styles.text}>Name: {user.name}</Text>;
};

export default User;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    margin: 10,
  },
});
