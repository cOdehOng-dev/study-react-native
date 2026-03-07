import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFetch } from "../hooks/useFetch";

const URL = "https://dog.ceo/api/breeds/image/random";

const Dog = () => {
  const { data, error, inProgress } = useFetch(URL);
  return (
    <View>
      {inProgress && <Text style={styles.loadingMessage}>The API request is in progress</Text>}
      <Image
        style={styles.image}
        source={data?.message ? { uri: data.message } : null}
      />
      <Text style={styles.errorMessage}>{error?.message}</Text>
    </View>
  );
};

export default Dog;

const styles = StyleSheet.create({
  image: {
    backgroundColor: "#7f8c8d",
    width: 300,
    height: 300,
  },
  errorMessage: {
    fontSize: 18,
    color: "#e7473c",
  },
  loadingMessage: {
    fontSize: 18,
    color: "#2ecc71",
  },
});
