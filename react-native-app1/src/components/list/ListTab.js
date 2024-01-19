import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch } from 'react-redux';
import { setSelectedListId } from '../../redux/slice/ListSlice';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { setLoading } from '../../redux/slice/LoadingSlice';
import { loadListData } from '../../data/store';
import { useSelector } from 'react-redux';

const ListTabs = () => {
  const navigation=useNavigation()
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [listData,setListData] =useState([])
  const dispatch = useDispatch()
  const loading =useSelector((state)=>state.loading.loading)

  useEffect(()=>{
    loadData()
  },[loading])

  const loadData = async ()=>{
      const initList = await loadListData()
      setListData(initList)
  }

  useEffect(() => {
    const initRoutes = listData.map((list) => ({ key: list.id, title: list.name }));
    initRoutes.unshift({ key: 'main', title: 'main' });

    setRoutes(initRoutes);
  }, [listData]);

  const handleIndexChange = (index) => {
    dispatch(setLoading(true))
    setIndex(index);
    dispatch(setSelectedListId(routes[index].key));
    dispatch(setLoading(false))
  };


  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        style={styles.tabBar}
        indicatorStyle={styles.tabIndicator}
        labelStyle={styles.tabLabel}
        scrollEnabled
      />
    );
  };

  const renderScene = SceneMap({
    ...routes.reduce((scenes, route) => {
      scenes[route.key] = () => <View style={styles.scene}><Text>hello</Text></View>;
      return scenes;
    }, {}),
  });

  return (
    <View>
      <Button style={styles.button} title="Go" onPress={() => navigation.navigate('ListPage')} >
        Todo List
      </Button>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
        style={styles.tabView}
        sceneContainerStyle={styles.sceneContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flex: 0,
    backgroundColor: '#f0f0f0',
    width:'100%',
    aspectRatio:9
  },
  tabBar: {
    backgroundColor: '#f0f0f0',
    height: 40,
  },
  tabLabel: {
    color: 'black',
    fontSize: 12,
  },
  tabIndicator: {
    backgroundColor: 'blue',
  },
  scene: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
    margin: 16,
    height:0
  },
  sceneContainer: {
    height: 0,
  },
});

export default ListTabs;
