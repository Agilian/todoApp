import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable';

const { height } = Dimensions.get('window')

const Modal = ({ show, close }) => {
  const [input, setInput] = useState('');
  
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 100, useNativeDriver: true  }),
      Animated.timing(state.opacity, { toValue: 1, duration: 300, useNativeDriver: true  }),
      Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
    ]).start()
  }

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
      Animated.timing(state.opacity, { toValue: 0, duration: 300, useNativeDriver: true  }),
      Animated.timing(state.container, { toValue: height, duration: 100, useNativeDriver: true  })
    ]).start()
  }



  useEffect(() => {
    if(show){
      openModal()
    }else{
      closeModal()
    }
  }, [show])

  return( 
    <Animated.View 
      useNativeDriver
      style={[styles.container, {
        opacity: state.opacity,
        transform: [
          { translateY: state.container }
        ]
      }]}
    >
      
      <Animated.View 
        useNativeDriver
        style={[styles.modal, {
          transform: [
            { translateY: state.modal }
          ]
        }]}
      >
        <TouchableOpacity style={styles.btn} onPress={close}>
          <Text style={{ color: '#fff' }}>Close</Text>
        </TouchableOpacity>
        <View style={styles.indicator} />

        <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="O que precisa fazer hoje?"
              style={styles.input}
              value={input}
              onChangeText={(texto) => setInput(texto)}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>  

        
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute'
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    height: '60%',
    backgroundColor: '#fff',
    width: '95%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    padding:50,
    fontSize:9,
    alignItems:'center'
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5
  },
  text: {
    marginTop: 50,
    textAlign: 'center'
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#9b59b6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  modalBody:{
    marginTop:15,
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
  }
})

export default Modal;