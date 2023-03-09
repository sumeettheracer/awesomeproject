// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import axios from 'axios';
export default function App() {
  const [text, setText] = useState("")
  const [goal, setGoal] = useState([])
  function onChangeTextHandeler(enteredText) {
    setText(enteredText)
  }
  function enterGoal() {
    setGoal(currentGoal => [...currentGoal, { text, id: Math.random().toString() }])
  }
  function deleteGoal(id) {
    setGoal(currentGoal => currentGoal.filter(goal => goal.id !== id))
  }
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../awesomeproject/assets/aim.png')} />
      </View>
      <View style={styles.upper}>
        <TextInput style={styles.textinput} placeholder='enter your goal...'
          onChangeText={onChangeTextHandeler} />
        <Button color="#FF8B13" title="addGoal" onPress={enterGoal} />
      </View>
      <View style={styles.lower}>
        <FlatList
          data={goal}
          contentContainerStyle={styles.innercontainer}
          renderItem={(itemData) => {
            return (
              <Pressable onPress={() => { deleteGoal(itemData.item.id) }}>
                <View style={styles.items} key={itemData.item.id}>
                  <Text style={styles.text}>{itemData.item.text}</Text>
                </View>
              </Pressable>
            )
          }}
          alwaysBounceVertical={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 5
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  upper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: '#FFB84C',
    marginRight: 8,
    padding: 8,
    width: '70%'
  },
  lower: {
    flex: 3,
    paddingTop: 10,
    width: "100%",

  },
  items: {
    backgroundColor: "#0E8388",
    width: "100%",
    marginBottom: 5,
    margintop: 5,
    padding: 5,
    borderRadius: 5
  },
  text: {
    color: "white"
  },
  innercontainer: {
    padding: 10,
  }
});
