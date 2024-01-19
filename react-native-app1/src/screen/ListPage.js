// ListPage.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { loadListData, deleteList } from '../data/store';
import ListCreate from '../components/list/ListCreate';
import { setLoading } from '../redux/slice/LoadingSlice';
import {useDispatch, useSelector } from 'react-redux';
import { UseSelector } from 'react-redux';

const ListPage = ({ navigation }) => {
    const [lists, setLists] = useState([]);
    const dispatch =useDispatch()
    const loading =useSelector((state)=>state.loading.loading)

    useEffect(() => {
        loadLists();
    }, [loading]);

    const loadLists = async () => {
        const loadedLists = await loadListData();
        setLists(loadedLists);
    };

    const handleDeleteList = async (listId) => {
        try{
            dispatch(setLoading(true))
            await deleteList(listId);
        }catch{
            console.log('error')
        }finally{
            dispatch(setLoading(false))
        }
    };

    const renderList = ({ item }) => (
        <TouchableOpacity
        style={styles.listItem}
        >
        <Text>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDeleteList(item.id)}>
            <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ListCreate/>
            <FlatList
                data={lists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#eee',
        borderRadius: 8,
    },
    deleteButton: {
        color: 'red',
        marginLeft: 8,
    },
});

export default ListPage;
