import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns/format';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SetDeadline from '../components/todo/setDeadline';
import SetDetail from '../components/todo/setDetail';

const DetailScreen = () => {
    const route = useRoute();
    const { item } = route.params;
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{item.text}  ({`created: ${format(item.createdAt, 'yyyy.MM.dd')}`})</Text>
            {/* Conditionally Render Text based on item.isDone */}
            {item.isDone ? (
                <Text style={styles.text}>This task is already done!</Text>
            ) : (
                <Text style={styles.text}>This task is not done yet!</Text>
            
            )}
            <View style={styles.centeredView}>
                <SetDeadline  itemId={item.createdAt}/>
                <SetDetail itemId={item.createdAt} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
    
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '80%',
    },
    
    centeredView: {
        flex: 1,
        
        alignItems: 'center',
        width:'100%',
    },
});

export default DetailScreen;
