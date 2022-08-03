import {Alert, Text, View, Modal, Pressable, Animated} from "react-native";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";


import store from "../../redux/store";
import {styleInfo} from "../../Styles/Styles";

function Info() {
    const [isModal, setModal] = useState(false)
    const infoPeople = store.getState()
    return (
        <View style={styleInfo.wrapAll}>
            <Modal
                visible={isModal}
                transparent={true}
                animationType={'fade'}>
                <View style={styleInfo.wrapConten}>
                    <View style={styleInfo.blockConten}>
                        <Text>Tài Khoản: {infoPeople.key.use.acccount}</Text>
                        <Text>Mật Khẩu: {infoPeople.key.use.password}</Text>
                        <Text>SDT: {infoPeople.key.use.phone}</Text>
                        <View style={styleInfo.blockPressable}>
                            <Pressable
                                onPress={() => {
                                    setModal(!isModal)
                                }}>
                                <Text style={styleInfo.textPressable}>Exit</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setModal(!isModal)
                                }}>
                                <Text style={styleInfo.textPressable}>Edit account</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable
                onPress={() => {
                    setModal(!isModal)
                }}>
                <Text>
                    Show info
                </Text>
            </Pressable>

        </View>
    )
}

export default Info
