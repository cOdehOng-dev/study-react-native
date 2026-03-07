import { StyleSheet, Text, View } from "react-native";
import User from "./components/User";
import UserContext, { UserProvider } from "./contexts/User";
import Container from "./components/Container";
import Input from "./components/Input";

const App = () => {
  return (
    <UserProvider>
      <Container>
        <User />
        <Input />
      </Container>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
