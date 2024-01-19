import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/slice/LoadingSlice';

const SetDetail = ({ itemId }) => {
    const [item, setItem] = useState('');
    const [updatedDetail, setUpdatedDetail] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const loading =useSelector((state)=>state.loading.loading)

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const allKeys = await AsyncStorage.getAllKeys();
                const matchingKeys = allKeys.filter((key) => key.includes(itemId));

                if (matchingKeys.length > 0) {
                    const todoString = await AsyncStorage.getItem(matchingKeys[0]);
                    const todo = JSON.parse(todoString);
                    setItem(todo);
                    setUpdatedDetail(todo.detail);
                }
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };

        fetchTodo();
    }, [itemId,loading]);

    const handleSaveChanges = async () => {
        // Update detail in AsyncStorage
        try {
            dispatch(setLoading(true));
    
            const updatedItem = { ...item, detail: updatedDetail };
            await AsyncStorage.setItem(String(item.createdAt), JSON.stringify(updatedItem));
            
            console.log('Detail updated successfully');
            hideModal()
        } catch (error) {
            console.error('Error saving changes:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.detailContainer}>
                <Pressable onPress={showModal}>
                    <Image source={require('../../../assets/detail-icon.jpeg')} style={styles.detailIcon} />
                </Pressable>
                <Text>Detail:</Text>
            </View>
            <Text>{updatedDetail}</Text>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Input for Detail */}
                        <TextInput
                            style={[styles.input, isFocused && styles.focusedInput]}
                            placeholder="Detail"
                            value={updatedDetail}
                            onChangeText={(text) => setUpdatedDetail(text)}
                            multiline={true}
                            numberOfLines={5}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <Button title="Save" onPress={handleSaveChanges} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'left',
        width: '90%',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 100,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    focusedInput: {
        borderWidth: 1,
        borderColor: 'gray',
    },
    detailIcon: {
        height: 30,
        width: 30,
        opacity: 0.5,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width:'90%'

    },
});

export default SetDetail;
