import AsyncStorage from '@react-native-async-storage/async-storage';

// list
export const saveList = async (listName, listId) => {
    try {
        // Validation
        if (!listName.trim() || listName.length > 20) {
            console.error('Invalid list name');
            return;
        }

        const listData = await AsyncStorage.getItem('listData');
        if (listData) {
            const parsedListData = JSON.parse(listData);
            const newList = { id: listId, name: listName.trim() }; // Trim whitespace
            const updatedListData = [...parsedListData, newList];
            await AsyncStorage.setItem('listData', JSON.stringify(updatedListData));
        } else {
            const newList = { id: listId, name: listName.trim() }; // Trim whitespace
            await AsyncStorage.setItem('listData', JSON.stringify([newList]));
        }
    } catch (error) {
        console.error('Error saving list data:', error);
    }
};

export const loadListData = async () => {
    try {
        const listData = await AsyncStorage.getItem('listData');
        return listData ? JSON.parse(listData) : [];
    } catch (error) {
        console.error('Error loading list data:', error);
        return [];
    }
};

export const deleteList = async (listId) => {
    try {
        const listData = await AsyncStorage.getItem('listData');
        if (listData) {
            const parsedListData = JSON.parse(listData);
    
            // Delete the corresponding todos
            const todoKeys = await AsyncStorage.getAllKeys();
            const todoKeysToDelete = todoKeys.filter(async key => {
            const todoData = JSON.parse(await AsyncStorage.getItem(key));
            if (todoData.listId === listId) {
                await AsyncStorage.removeItem(key);
                return true;
            }
            return false;
            });
    
            // Filter out the list to be deleted
            const updatedListData = parsedListData.filter(list => list.id !== listId);
    
            await AsyncStorage.setItem('listData', JSON.stringify(updatedListData));
        }
        } catch (error) {
        console.error('Error deleting list:', error);
        }
    };



// todo
export const saveTodo = async (text, createdAt, isDone, deadline, detail, listId) => {
    try {
        // Validation
        if (!text.trim() || text.length > 20) {
            console.error('Invalid todo text');
            return;
        }

        const key = `${createdAt}`;
        const value = JSON.stringify({ text: text.trim(), createdAt, isDone, deadline, detail, listId }); // Trim whitespace

        await AsyncStorage.setItem(key, value);
        // console.log('save new todo: ', value);
    } catch (error) {
        console.error('Error saving todo:', error);
    }
};


export const loadTodoData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        
        // Filter out the entries related to listData
        const todoKeys = keys.filter(key => key !== 'listData');

        const entryList = await AsyncStorage.multiGet(todoKeys);
        const todoDataArray = entryList.map(entry => JSON.parse(entry[1]));
        const sortedTodoDataArray = todoDataArray.sort((a, b) => b.createdAt - a.createdAt);
        // console.log('load:', sortedTodoDataArray);
        return sortedTodoDataArray;
    } catch (error) {
        console.error('Error loading todo:', error);
        return [];
    }
}

