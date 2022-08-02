import {Alert, Text, View, Modal, Pressable, Animated} from "react-native";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";


import store from "../../redux/store";

function Info() {
    const [isModal, setModal] = useState(false)
    const infoPeople = store.getState()
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Modal
                visible={isModal}
                transparent={true}
                animationType={'fade'}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',

                } }>

                <View style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding:35,
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5
                }}>
                    <Text>Tài Khoản: {infoPeople.key.use.accction}</Text>
                    <Text>Mật Khẩu: {infoPeople.key.use.password}</Text>
                    <Text>SDT: {infoPeople.key.use.phone}</Text>
                    <Pressable
                        onPress={() => {
                            setModal(!isModal)
                        }}
                    >
                        <Text style={{
                            padding:10,
                            marginTop:10,
                            backgroundColor:'rgb(22,117,156)',
                            borderRadius:5,
                            color:'black'
                        }}>
                            Show info
                        </Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            <Pressable

                onPress={() => {
                    setModal(!isModal)
                }}
            >
                <Text>
                    Show info
                </Text>
            </Pressable>

        </View>
    )
}

export default Info
