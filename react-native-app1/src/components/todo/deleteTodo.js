import React from 'react';
import { Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slice/LoadingSlice';

const DeleteTodo = ({ todoId }) => {
    const dispatch = useDispatch();

    const deleteTodo = async (id) => {
        try {
        dispatch(setLoading(true));
        const stringId = String(id);
        await AsyncStorage.removeItem(stringId);
        } catch (error) {
        console.error('Error deleting todo:', error);
        } finally {
        dispatch(setLoading(false));
        }
    };    

    return (
        <Button
        onPress={() => deleteTodo(todoId)}
        >Delete</Button>
    );
};

export default DeleteTodo;
