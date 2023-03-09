import { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import axios from 'axios';
export default function App() {
  const [text, setText] = useState("")
  const [goal, setGoal] = useState([])
  function onChangeTextHandeler(enteredText) {
    setText(enteredText)
  }
  //remember you have to use your real ip address not the other one like 127.0.0.1 one 


  useEffect(() => {
    getData()
  }, [])

  const submitData = async () => {

    try {
      const response = await axios.post("http://192.168.1.32:3000/data", {
        todo: text
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setText("");
  };
  //now create to get data from mongodb...
  const getData = async () => {
    try {
      const response = await axios.get("http://192.168.1.32:3000/data")
      setGoal(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteGoal = async (id) => {
    try{
      const response = await axios.post("http://192.168.1.32:3000/delete", {
        deleteId: id
      });
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../awesomeproject/assets/aim.png')} />
      </View>
      <View style={styles.upper}>
        <TextInput value={text} style={styles.textinput} placeholder='enter your goal...'
          onChangeText={onChangeTextHandeler} />
        <Button color="#FF8B13" title="addGoal" onPress={() => { submitData(); getData() }} />
      </View>
      <View style={styles.lower}>
        <FlatList
          data={goal}
          contentContainerStyle={styles.innercontainer}
          renderItem={(itemData) => {
            return (
              <Pressable onPress={() => { deleteGoal(itemData.item._id) }}>
                <View style={styles.items} key={itemData.item._id}>
                  <Text style={styles.text}>{itemData.item.todos}</Text>
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
