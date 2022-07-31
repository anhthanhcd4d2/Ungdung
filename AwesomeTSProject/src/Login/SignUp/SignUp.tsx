import {Alert, Image, Pressable, ScrollView, Text, TouchableHighlight, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RenderInput from '../Custom_input/Render_input';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {styleSign, stylesRenderInput} from '../../Styles/Styles';
import RenderBnt from '../Custom_Bnt/Render_Bnt';

const baseUrl = 'https://62db4eedd1d97b9e0c4e23b6.mockapi.io/product';
const isCheckAccount = (item:any,value:string) => {
    return item.account === value ?? true
}

function SignUp() {
    const [check, setCheck] = useState<boolean>(true);
    const [data, setData] = useState<any>();
    useEffect(() => {
        axios.get(baseUrl).then(response => {
            setData(response);
        });
    }, []);
    const onSummit = (data: object) => {
        console.log(data);
    };
    const checkAccount = (value:string) => {
      let newData= data.data.find((a:any)=>{
         return  isCheckAccount(a,value)
      })
        setTimeout(() => {
            newData? Alert.alert('error account not sign Up') : Alert.alert('successful thank')
            setCheck((check)=>!check)
        }, 3000)

    };
    const {
        control,
        reset,
        trigger,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            account: '',
            phone: '',
            password: '',
            confirm: '',
        },
    });
    return (
        <ScrollView>
        <View style={styleSign.wrapAll}>
            <View style={styleSign.wrapBlock}>
                <View style={styleSign.wrapBlockView_Text}>
                    <Text style={styleSign.textStyle}>Acount</Text>
                </View>
                <Controller

                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: ' Mục không được để trống',
                        },
                        minLength: {
                            value: 6,
                            message: 'nội dung chứa ít nhất 6 ký tự',
                        }
                    }}
                    name={'account'}
                    render={({field: {onChange, value}}) => (
                        <View style={styleSign.wrapBlockView_Input}>
                            <RenderInput
                                isForcus={true}
                                placeholderText={'Enter Email or phone '}
                                isSecureTextEntry={false}
                                maxLength={18}
                                value={value.replace(/[,`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi, '')}
                                onBlur={()=>trigger('account')}
                                onChange={(data)=>{
                                    trigger('account')
                                    onChange(data)
                                }}
                            />
                            {value && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 10,
                                        zIndex: 1,
                                        width: 50,
                                        height: 35,
                                        backgroundColor: '#266C99',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                    }}>
                                    <Pressable
                                        onPressIn={() => {
                                            trigger('account').then((data)=>{
                                                if (data){
                                                    setCheck(!check)
                                                    checkAccount(value)
                                                }
                                            })
                                        }}>
                                        {check &&

                                            (<Text style={{color: 'rgb(255,255,255)'}}>check</Text>) ||
                                            (<Image style={{width: 50, height: 35}}
                                                    source={require('../image/Loading_icon.gif')}/>)
                                        }
                                    </Pressable>
                                </View>
                            )}
                            <View style={(errors.account && {backgroundColor: 'red',height:1}) || {backgroundColor: '#ccc',height:1}}></View>
                            {errors.account && (
                                <Text style={styleSign.errorMessage}>
                                    {errors.account.message}
                                </Text>)}
                        </View>
                    )}
                />
            </View>
            <View style={styleSign.wrapBlock}>
                <View style={styleSign.wrapBlockView_Text}>
                    <Text style={styleSign.textStyle}>Password</Text>
                </View>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: ' Mục không được để trống',
                        },
                        minLength: {
                            value: 6,
                            message: 'nội dung chứa ít nhất 6 ký tự',
                        },
                    }}
                    name={'password'}
                    render={({field: {onChange,value}}) => (
                        <View style={styleSign.wrapBlockView_Input}>
                            <View>
                                <RenderInput
                                    placeholderText={'Enter password here'}
                                    isSecureTextEntry={true}
                                    maxLength={18}
                                    value={value.replace(/[' ',`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi, '')}
                                    onBlur={()=>trigger('password')}
                                    onChange={(data)=>{
                                        trigger('password')
                                        onChange(data)
                                    }}
                                />
                            </View>
                            <View>
                                <View style={(errors.password && {backgroundColor: 'red',height:1}) || {backgroundColor: '#ccc',height:1}}></View>
                                {errors.password && (
                                    <Text style={styleSign.errorMessage}>
                                        {errors.password.message}
                                    </Text>)}
                            </View>
                        </View>
                    )}
                />
            </View>
            <View style={styleSign.wrapBlock}>
                <View style={styleSign.wrapBlockView_Text}>
                    <Text style={styleSign.textStyle}>confrim</Text>
                </View>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: ' Mục không được để trống',
                        },
                        minLength: {
                            value: 6,
                            message: 'nội dung chứa ít nhất 6 ký tự',
                        },
                    }}
                    name={'confirm'}
                    render={({field: {onChange,value}}) => (
                        <View style={styleSign.wrapBlockView_Input}>
                            <RenderInput
                                placeholderText={'Enter confirm password here'}
                                isSecureTextEntry={true}
                                maxLength={18}
                                value={value.replace(/[' ',`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi, '')}
                                onBlur={()=>trigger('confirm')}
                                onChange={(data)=>{
                                    trigger('confirm')
                                    onChange(data)
                                }}
                            />
                            <View>
                                <View style={(errors.confirm && {backgroundColor: 'red',height:1}) || {backgroundColor: '#ccc',height:1}}></View>
                                {errors.confirm && (
                                    <Text style={styleSign.errorMessage}>
                                        {errors.confirm.message}
                                    </Text>)}
                            </View>
                        </View>
                    )}
                />
            </View>

            <View style={styleSign.wrapBlock}>
                <View style={styleSign.wrapBlockView_Text}>
                    <Text style={styleSign.textStyle}>Phone</Text>
                </View>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: ' Mục không được để trống',
                        },
                        minLength: {
                            value: 6,
                            message: 'nội dung chứa ít nhất 6 ký tự',
                        },
                    }}
                    name={'phone'}
                    render={({field: {onChange,value}}) => (
                        <View style={styleSign.wrapBlockView_Input}>
                            <RenderInput
                                keyboard={true}
                                placeholderText={'Enter Phone here'}
                                isSecureTextEntry={false}
                                maxLength={18}
                                value={value.replace(/[' ',`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi, '')}
                                onBlur={()=>trigger('phone')}
                                onChange={(data)=>{
                                    trigger('phone')
                                    onChange(data)
                                }}
                            />
                            <View>
                                <View style={(errors.phone && {backgroundColor: 'red',height:1}) || {backgroundColor: '#ccc',height:1}}></View>
                                {errors.phone && (
                                    <Text style={styleSign.errorMessage}>
                                        {errors.phone.message}
                                    </Text>)}
                            </View>
                        </View>
                    )}
                />
            </View>

            <View>
                <RenderBnt
                    onPress={handleSubmit(onSummit)}
                    name={'Sign Up'}
                    style={styleSign.bntStyle}
                    styleName={styleSign.textStyle}
                />
            </View>
        </View>
        </ScrollView>
    );
}

export default SignUp;
