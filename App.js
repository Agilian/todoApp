import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Text, AsyncStorage, SafeAreaView,
   TouchableOpacity,  StatusBar, FlatList, TextInput } from 'react-native'
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons';
import TaskList from './src/components/TaskList/';
import Modal from './Modal';
const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export let setInput = () => {};
export let input = {};

export let ha = function handleAdd(){
  alert('oi');
  if(input === '') return;
  alert('oi2');
  const data = {
    key: input,
    task: input
  };
  setTask([...task, data]);
  setOpen(false);
  setInput('');
}

const App = () => {
  const [modal, setModal] = useState(false)
  var [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);


  const [input, setInput] = useState('');

  //Buscando todas as tarefas ao iniciar o APP
  useEffect(() => {
    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }
    loadTasks();
  }, []);

  //salvando nova tarefa
  useEffect(() => {
    async function saveTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }
    saveTasks();
  }, [task]);

 
  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })


  return(
    <View style={styles.container}>
      <Modal 
        show={modal}
        close={() => setModal(false)}
        useNativeDriver
      />

<SafeAreaView style={styles.container}>
<StatusBar backgroundColor="#171d31" barStyle="light-content">

</StatusBar>
<View style={styles.content}>
  <Text style={styles.title}>Tarefas</Text>
</View>

<FlatList
margimHorizontal= {10}
showsHorizontalScrollIndicator={false}
data={task}
keyExtractor={ (item) => String(item.key)}
renderItem={ ({item}) => <TaskList data={item} handleDelete={handleDelete} />}
/>



<AnimatedBtn
style={styles.fab}
useNativeDriver
animation="bounceInUp"
duration={1500}
onPress={() => setModal(true)}
>
  <Ionicons name="ios-add" size={35} color="#000"/>
</AnimatedBtn>
</SafeAreaView>

</View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9b59b6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 22
  },
  handleAddText:{
    fontSize:20,
  },
})

export default App