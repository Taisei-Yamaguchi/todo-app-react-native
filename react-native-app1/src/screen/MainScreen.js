import React from "react";
import { StyleSheet, View} from "react-native";

import ListTabs from "../components/list/ListTab";
import CreateTodo from "../components/todo/createTodo";
import { TodoItems } from "../components/todo/TodoItems";


export const MainScreen = () =>{
    return(
        <View style={styles.container}>
            <ListTabs/>
            <CreateTodo />
            <TodoItems />
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginLeft: 0,
        marginRight: 0
    },
    
});