import {Alert, Button, FlatList, Image, Pressable, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RenderInput, {contenInput} from '../Custom_input/Render_input';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {baseUrl, getUse} from '../../url_API/Api';
import {styleSign, stylesRenderInput} from '../../Styles/Styles';
import RenderBnt from '../Custom_Bnt/Render_Bnt';
import {useNavigation} from '@react-navigation/native';
import {checkAcccount} from "../../url_API/checkUse/checksUse";

const dataCustomInput: any[] = [
    {
        id:1,
        name: 'acccount',
        maxLength: 24,
        isForcus: true,
        placeholderText: 'Enter acccount your here',
        isSecureTextEntry: false,
        isCheckAccount: {
            value: true,
            url: require('../image/Loading_icon.gif'),
        },
    },
    {
        id:2,
        name: 'password',
        maxLength: 24,
        placeholderText: 'Enter password your here',
        isSecureTextEntry: true,
    },
    {
        id:3,
        name:'confrim',
        maxLength:24,
        placeholderText:'Enter confrim password here',
        isSecureTextEntry: true,
    },
    {
        id:4,
        maxLength:24,
        name:'phone',
        placeholderText:'Enter phone your is number here'
    },
    {
        id:5,
        maxLength:24,
        name:'email',
        placeholderText:'Enter Email your here'
    },
]


interface IFormInputs {

    acccount: any;
    password: any;
    phone: number;
    confirm: any;
}

function SignUp() {
    const navigation = useNavigation<any>();
    const [check, setCheck] = useState<boolean>(true);
    const [dataList, setData] = useState<any>();

    useEffect(() => {
        getUse('acccount').then((data) => setData(data))
    }, []);
    console.log('render')
    const onSummit = (value: any) => {
        console.log('vào',value)
        checkAcccount(value.acccount).then(data => {
            if (value.password === value.confirm && !data) {
                Alert.alert(' ĐĂNG KÝ THÀNH CÔNG', 'Xác Nhận', [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'oke',
                        onPress: () => {
                            axios.post(baseUrl, {use: value});
                            navigation.navigate('signIn');
                        },
                    },
                ]);
            } else {
                Alert.alert('Mật khẩu không khớp, hoăc tài khoản đã tồn tại');
            }
        })
    };
    const setCheckAccount = (value: string) => {
        setTimeout(() => {
            checkAcccount(value).then((data) => {
                data ?
                    Alert.alert('error use.acccount not sign Up') :
                    Alert.alert('successful thank');
            })
            setCheck((check) => !check);
        }, 3000);
    };

    const {
        control,
        trigger,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            acccount: '',
            phone: '',
            password: '',
            confirm: '',
            email: ''
        },
    });
    return (
            <View style={styleSign.wrapAll}>
                <FlatList data={dataCustomInput}
                          renderItem={({item}) => {
                    return (
                        <View style={styleSign.wrapBlock}>
                            <View style={styleSign.wrapBlockView_Text}>
                                <Text style={styleSign.textStyle}>{item.name.toUpperCase()} </Text>
                            </View>
                            <Controller
                                control={control}
                                name={item.name}
                                rules={{
                                    required:{
                                        value:true,
                                        message:'Vui lòng nhập tông tin'
                                    },
                                    maxLength:{
                                        value:24,
                                        message:'Từ 6-24 Ký tự'
                                    },
                                    minLength:{
                                        value:6,
                                        message:'Từ 6-24 Ký tự'
                                    }
                                }}
                                render={({field: {onChange, value}}) =>{
                                    return (
                                        <View style={styleSign.wrapBlockView_Input}>
                                            <RenderInput
                                                isForcus={item.isForcus}
                                                placeholderText={item.placeholderText}
                                                isSecureTextEntry={item.isSecureTextEntry}
                                                maxLength={18}
                                                value={value}
                                                onBlur={() => trigger(item.name)}
                                                onChange={data => {
                                                    onChange(data);
                                                    trigger(item.name);
                                                }}/>
                                            {item.isCheckAccount && (value && (
                                                <View
                                                    style={styleSign.checkAcccount}>
                                                    <Pressable
                                                        onPressIn={() => {
                                                            trigger(item.name).then(data => {
                                                                if (data) {
                                                                    setCheck(!check);
                                                                    setCheckAccount(value);
                                                                }
                                                            });
                                                        }}>
                                                        {(check && (
                                                            <Text style={{color: 'rgb(255,255,255)'}}>check</Text>
                                                        )) || (
                                                            <Image
                                                                style={{width: 50, height: 35}}
                                                                source={item.isCheckAccount.url}
                                                            />
                                                        )}
                                                    </Pressable>
                                                </View>
                                            ))}
                                            <View
                                                style={
                                                    (errors.acccount && {
                                                        backgroundColor: 'red',
                                                        height: 1,
                                                    }) || {backgroundColor: '#ccc', height: 1}
                                                }
                                            />
                                            {errors.acccount && (
                                                <Text style={styleSign.errorMessage}>
                                                    {errors.acccount.message}
                                                </Text>
                                            )}
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    )
                }}
                          keyExtractor={(item)=> item.id}
                />
                <View>
                    <Button title={'Click...'} onPress={handleSubmit(onSummit)}/>
                </View>
            </View>
    );
}

export default SignUp;





