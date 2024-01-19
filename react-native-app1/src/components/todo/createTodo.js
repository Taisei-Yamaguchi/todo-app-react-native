import React,{useState,useEffect} from "react";
import { StyleSheet, View, FlatList, Text ,Alert} from "react-native";
import { Title, TextInput, Button,List, Checkbox } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveTodo } from "../../data/store";
import { useSelector,useDispatch } from 'react-redux';
import { setLoading } from "../../redux/slice/LoadingSlice";

const CreateTodo= ()=>{
    const [input,setInput] = useState('')
    const selectedListId = useSelector((state)=>state.list.selectedListId);
    const dispatch = useDispatch();

    const onPressSave = async () => {
        try {
            dispatch(setLoading(true));
            await saveTodo(input, Date.now(), false, '', '', selectedListId);
            setInput('');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                mode ='outlined'
                onChangeText={(text)=> setInput(text)}
                value={input}
                placeholder="add new todo"
                placeholderTextColor="#f0f0f0" 
            />
            <Button style={styles.button} mode="contained" onPress={onPressSave}>Add</Button>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        width:'90%',
        zIndex:1
    },
    input:{
        width:'100%'
    },
})

export default CreateTodo