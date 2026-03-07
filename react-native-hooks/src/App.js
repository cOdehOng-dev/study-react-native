import { Button, View } from "react-native";
import Form from "./components/Form";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Length from "./components/Length";
import Dog from "./components/Dog";

export default function App() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Button
          title={isVisible ? "Hide" : "Show"}
          onPress={() => setIsVisible(!isVisible)}
        />
        {isVisible && <Form />} */}

        {/* <Length/> */}
        <Dog />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
