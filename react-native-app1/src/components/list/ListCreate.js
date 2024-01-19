// ListCreate.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { saveList } from '../../data/store';
import { setLoading } from '../../redux/slice/LoadingSlice';
import { UseDispatch, useDispatch } from 'react-redux';

const ListCreate = ({ onListCreated }) => {
    const [listName, setListName] = useState('');
    const dispatch =useDispatch()

    const handleCreateList = async () => {
        try {
        // Generate a unique ID for the new list
            dispatch(setLoading(true))
            const listId = Date.now()
            await saveList(listName, listId);
            setListName('');

            // Notify the parent component (MainScreen) that a new list has been created
            onListCreated && onListCreated();
        } catch (error) {
            console.error('Error creating list:', error);
        }finally{
            dispatch(setLoading(false))
        }
    };

    return (
        <View style={styles.container}>
        <Text>Create a New List</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter List Name"
            value={listName}
            onChangeText={(text) => setListName(text)}
            required
        />
        <Button title="Create List" onPress={handleCreateList} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '80%',
    },
});

export default ListCreate;
