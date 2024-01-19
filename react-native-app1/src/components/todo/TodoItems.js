import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Title, List } from "react-native-paper";
import { format } from 'date-fns/format';
import { loadListData, loadTodoData } from "../../data/store";
import { useSelector } from 'react-redux';
import DeleteTodo from "./deleteTodo";
import ToggleDoneTodo from "./toggleDoneTodo";
import { useNavigation } from '@react-navigation/native';
import { TodoFinishMes } from "./TodoFinishMes";

export const TodoItems = () => {
    const [todoData, setTodoData] = useState([]);
    const [listData, setListData] = useState([]);
    const [showDoneItems, setShowDoneItems] = useState(false); 
    const navigation = useNavigation();
    const loading = useSelector((state) => state.loading.loading);
    const selectedListId = useSelector((state) => state.list.selectedListId);

    useEffect(() => {
        loadData();
    }, [loading, selectedListId]);

    const loadData = async () => {
        const initTodo = await loadTodoData();
        const filteredTodo = initTodo.filter(todo => todo.listId === selectedListId);
        setTodoData(filteredTodo);
        const initList = await loadListData();
        setListData(initList);
    }

    // Done アイテムの表示・非表示をトグルする
    const toggleDoneItems = () => {
        setShowDoneItems(!showDoneItems);
    };

    // render done item
    const renderDoneItems = () => {
        const doneItems = todoData.filter(item => item.isDone);
        if (doneItems.length === 0) {
            return null; 
        }
        return (
            <FlatList
                data={showDoneItems ? doneItems : []}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.createdAt}`}
                style={styles.list}
                ListHeaderComponent={() => (
                    <TouchableOpacity onPress={toggleDoneItems}>
                        <Title>Done ({`${doneItems.length} tasks`})</Title>
                    </TouchableOpacity>
                )}
            />
        );
    };


    const renderAlert = (item) => {
        if (!item.deadline || item.deadline === '') {
            return null; // No alert for items without a deadline
        }
    
        const deadlineTimestamp = Date.parse(item.deadline);
        const timeDifference = deadlineTimestamp - Date.now();
    
        if (timeDifference > 0 && timeDifference <= 24 * 60 * 60 * 1000) {
            // Deadline is coming (yellow)
            return (
                <Text style={{ color: '#FFA500' }}>Deadline coming!</Text>
            );
        } else if (timeDifference < 0) {
            // Deadline over (red)
            return (
                <Text style={{ color: '#CC0000' }}>Deadline over!</Text>
            );
        } else{
            return(
                <Text style={{color:'#32CD32'}}>{`Deadline: ${format(item.deadline, 'yyyy.MM.dd')}`}</Text>
            );
        }
    
        return null; // No alert for other cases
    };

    
    // render undone item
    const renderUndoneItems = () => {
        const undoneItems = todoData.filter(item => !item.isDone);
        if (undoneItems.length === 0) {
            return (
                <TodoFinishMes />
            );
        }
        return (
            <FlatList
                data={undoneItems}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.createdAt}`}
                style={styles.list}
                ListHeaderComponent={() => (
                    <Title>Undone ({`${undoneItems.length} tasks`})</Title>
                )}
            />
        );
    };

    // each item
    const renderItem = ({ item }) => (
        <View>
        <List.Item
            title={
                <View >
                <Text style={item.isDone ? styles.doneText : null}>
                    {item.text}
                </Text>
                {renderAlert(item)}
                </View>
            }
            titleNumberOfLines={5}
            description={`created: ${format(item.createdAt, 'yyyy.MM.dd')}`}
            descriptionStyle={{ textAlign: 'right' }}
            onPress={() => navigateToDetail(item)} // to detail screen

            right={() => (
                <DeleteTodo todoId={item.createdAt} />
            )}

            left={() => (
                <ToggleDoneTodo todo={item} />
            )}

            style={styles.listItem}
        />
        </View>
    );

    // to detail
    const navigateToDetail = (item) => {
        navigation.navigate('Detail', { item });
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, width: '100%' }}>
                {renderUndoneItems()}
                {renderDoneItems()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        marginLeft: '3%',
        marginRight: '3%'
    },
    list: {
        marginTop: 20,
        width: '100%'
    },
    doneText: {
        textDecorationLine: 'line-through',
        color: '#888', // Adjust the color for done items
    },
    listItem:{
        backgroundColor:'#f0f0f0'
    }
});
