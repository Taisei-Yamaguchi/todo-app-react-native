import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slice/LoadingSlice';
import { useSelector } from 'react-redux';

const SetDeadline = ({ itemId }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [item,setItem] =useState('')
    const dispatch =useDispatch()
    const loading =useSelector((state)=>state.loading.loading)
    
    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const allKeys = await AsyncStorage.getAllKeys();
                const matchingKeys = allKeys.filter((key) => key.includes(itemId));
                
                if (matchingKeys.length > 0) {
                    const todoString = await AsyncStorage.getItem(matchingKeys[0]);
                    const todo = JSON.parse(todoString);
                    const deadlineDate = todo.deadline ? new Date(todo.deadline) : new Date();

                    setItem(todo);
                    setSelectedDate(deadlineDate);
                }
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };
        

        fetchTodo();
    }, [itemId,loading]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        setSelectedDate(date);

        // Update deadline in AsyncStorage
        try {
            dispatch(setLoading(true))
            const updatedItem = { ...item, deadline: date.toISOString() };
            AsyncStorage.setItem(String(item.createdAt), JSON.stringify(updatedItem))
                .then(() => {
                    console.log('Deadline updated successfully');
                })
                .catch((error) => {
                    console.error('Error saving changes:', error);
                });
        } catch (error) {
            console.error('Error saving changes:', error);
        } finally{
            dispatch(setLoading(false))
        }
    };

    return (
        <View  style={styles.container}>
            
            <TouchableOpacity onPress={showDatePicker}>
                <Image source={require('../../../assets/calendar-icon.jpeg')} style={styles.calendarIcon} />
            </TouchableOpacity>
            {isDatePickerVisible && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        if (event.type === 'set') {
                            handleConfirm(date);
                        }
                        hideDatePicker();
                    }}
                />
            )}

            {/* Input for Deadline using DateTimePicker */}
            {item.deadline && (
                <Text>deadline: {format(new Date(item.deadline), 'yyyy-MM-dd')}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'left',
        width:"90%"
    },
    text: {
        fontSize: 30,
        marginBottom: 10,
    },
    calendarIcon: {
        height: 30,
        width: 30,
        opacity: 0.5,
    },
});

export default SetDeadline;
