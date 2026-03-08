import { Button, StyleSheet, Text, View } from 'react-native';

function DetailScreen({ route, navigation }) {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>id: {route.params.id}</Text>
      <View style={styles.buttons}>
        <Button
          title="다음"
          onPress={() => navigation.push('Detail', { id: route.params.id + 1 })}
        />
        <Button title="뒤로가기" onPress={() => navigation.pop()} />
        <Button title="처음으로" onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  buttons: {
    flexDirection: 'row',
  },
});






