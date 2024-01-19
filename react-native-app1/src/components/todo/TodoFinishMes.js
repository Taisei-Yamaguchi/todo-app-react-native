import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";

export const TodoFinishMes = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/checkbox-icon.png')}
                style={{ width: 150, height: 150, opacity:0.5 }}
            />
        <Text style={styles.message}>No remaining tasks!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1
    },
    message: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'aqua', // Adjust the color as needed
    },
});
