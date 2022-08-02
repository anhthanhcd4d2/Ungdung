import React, {useState} from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image, FlatList} from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {styleHome} from "../Styles/Styles";
import Info from "./screens/info";
import Messeger from "./screens/messeger";
import {useNavigation} from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const ShowIcon = (key:any) => {
  return  <Image style={styleHome.infoIcon} source={key}/>
}
const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen  options={{
                headerShown:false,
                tabBarIcon: ()=> ShowIcon(require('./image_icon/icon_info.png'))
            }} name="info" component={Info}/>
            <Tab.Screen  options={{
                headerShown:false,
                tabBarIcon: ()=> ShowIcon( require('./image_icon/messeger.png'))
            }} name="messeger" component={Messeger}/>
        </Tab.Navigator>
    );
};

export default Home
