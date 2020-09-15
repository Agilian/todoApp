import React, {useState, useCallback, useEffect}  from 'react';
import {View, Text, StyleSheet,SafeAreaView, StatusBar,
  FlatList, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TaskList from './src/components/TaskList/';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App(){
  const [task, setTask] = useState([]);
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

  function handleAdd(){
    if(input === '') return;
    const data = {
      key: input,
      task: input
    };
    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }
  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })
    

  return(
    <SafeAreaView style={s.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content">

      </StatusBar>
      <View style={s.content}>
        <Text style={s.title}>Tarefas</Text>
      </View>

      <FlatList
      margimHorizontal= {10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={ (item) => String(item.key)}
      renderItem={ ({item}) => <TaskList data={item} handleDelete={handleDelete} />}
      />


      <Modal deviceWidth={0.5} style={s.Tela2} animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={s.modal}>
          <View style={s.modalHeader}>
            <TouchableOpacity onPress= {() => setOpen(false)}>
              <Ionicons style={{marginLeft:5, marginRight:5}} name="md-arrow-back" size={40} color="#FFF" />
            </TouchableOpacity>
            <Text style ={s.modalTitle}>
              Nova Tarefa
            </Text>
          </View>
          
          <Animatable.View style={s.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="O que precisa fazer hoje?"
              style={s.input}
              value={input}
              onChangeText={(texto) => setInput(texto)}
            />

            <TouchableOpacity style={s.handleAdd} onPress={handleAdd}>
              <Text style={s.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>  

        </SafeAreaView>
      </Modal>
      <AnimatedBtn
      style={s.fab}
      useNativeDriver
      animation="bounceInUp"
      duration={1500}
      onPress={() => setOpen(true)}
      >
        <Ionicons name="ios-add" size={35} color="#000"/>
      </AnimatedBtn>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute'
  },
  title:{
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    color:'#FFF'
  },
  fab: {
    position:'absolute',
    width:60,
    height:60,
    backgroundColor:'#0094FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:30,
    right: 25,
    bottom: 25,
    elevation:2,
    zIndex:9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    }
  },
    modal:{
      flex:1,
      backgroundColor:'#171d31',
      opacity:0.5
    },
    modalHeader:{
      marginLeft: 10,
      marginTop:20,
      flexDirection:'row',
      alignItems:'center'
    },
    modalTitle:{
      marginLeft:15,
      fontSize:20,
      color: '#FFF'
    },
    modalBody:{
      marginTop:15,
    },
    input:{
      fontSize:15,
      marginLeft:10,
      marginRight:10,
      marginTop:30,
      backgroundColor:'#FFF',
      padding:9,
      height:85,
      textAlignVertical: 'top',
      color:'#000',
      borderRadius:5,
    },
    handleAdd:{
      backgroundColor:'#FFF',
      marginTop:10 ,
      alignItems:'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight:10,
      height: 40,
      borderRadius: 5,
    },
    handleAddText:{
      fontSize:20,
    },
    Tela2:{
      bottom: 0,
      position: 'absolute',
      height: '50%',
      backgroundColor: '#fff',
      width: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingLeft: 25,
      paddingRight: 25
    }
 
});