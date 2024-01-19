import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have Ionicons installed

import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading } from '../../redux/slice/LoadingSlice';

const CustomToggleDoneTodo = ({ todo }) => {
    const dispatch = useDispatch();

    const handleToggleDone = async () => {
        try {
            dispatch(setLoading(true));
            const updatedTodo = { ...todo, isDone: !todo.isDone };
            await AsyncStorage.setItem(String(todo.createdAt), JSON.stringify(updatedTodo));
        } catch (error) {
            console.error('Error toggling ToDo completion:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const checkboxStyle = {
        width: 24, // Set a fixed width for the container
        height: 24, // Set a fixed height for the container
        borderRadius: Platform.OS === 'ios' ? 12 : 2,
        borderWidth: Platform.OS === 'ios' ? 1 : 2,
        borderColor: '#993399',
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', // Center the content vertically
    };

    const iconStyle = {
        transform: [{ scaleX: Platform.OS === 'ios' && todo.isDone ? -1 : 1 }], // Flip the icon horizontally on iOS when checked
    };

    return (
        <TouchableOpacity onPress={handleToggleDone}>
            <View style={checkboxStyle}>
                {todo.isDone && (
                    <Ionicons name="checkmark" size={Platform.OS === 'ios' ? 20 : 24} color="#993399" style={iconStyle} />
                )}
            </View>
        </TouchableOpacity>
    );
};

export default CustomToggleDoneTodo;
