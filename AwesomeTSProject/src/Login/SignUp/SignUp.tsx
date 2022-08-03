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
import {checkAccount} from "../../url_API/checkUse/checksUse";
import {loginUse} from "../../redux/acction/actions";

const dataCustomInput: any[] = [
    {
        name: 'account',
        isForcus: true,
        placeholderText: 'Enter account your here',
        isCheckAccount: {
            value: true,
            url: require('../image/Loading_icon.gif'),
        },
    },
    {
        name: 'password',
        placeholderText: 'Enter password your here',
    },
    {
        name: 'confirm',
        placeholderText: 'Enter confrim password here',
    },
    {
        name: 'phone',
        placeholderText: 'Enter phone your is number here',

    },
    {
        name: 'email',
        placeholderText: 'Enter Email your here',
    },
]

//value condition yub
const schema = yup
    .object({
        account: yup
            .string()
            .required('Mục Không để trống')
            .min(6, 'It nhất 6 ký tự')
            .max(24, 'Độ dài  từ 6-12 '),
        password:yup
            .string()
            .required('Mục Không để trống')
            .min(6, 'It nhất 6 ký tự'),
        phone: yup
            .string()
            .typeError('Định dạng không đúng')
            .required('Mục Không để trống')
            .matches(/^[0-9]{10}$/),

        email: yup
            .string()
            .typeError('Định dạng không đúng')
            .email('Không đúng định dạng')
            .required('Mục Không để trống')
    })
    .required();

function SignUp() {
    const navigation = useNavigation<any>();
    const [check, setCheck] = useState<boolean>(true);
    const [dataList, setData] = useState<string[]>();

    // get list account
    useEffect(() => {
        getUse('account').then((data) => setData(data))
    }, []);

    // hadle data on click
    const onSummit = (value: any) => {
        console.log('vào', value)
        checkAccount(value.account).then(data => {
            if (value.password === value.confirm && !data) {
                Alert.alert(' ĐĂNG KÝ THÀNH CÔNG', 'Xác Nhận', [
                    {text: 'Cancel', style: 'cancel',},
                    {
                        text: 'oke', onPress: () => {
                            axios.post(baseUrl, {use: value});
                            navigation.navigate('signIn');
                        }
                    }
                ]);
            } else {
                Alert.alert('Mật khẩu không khớp, hoăc tài khoản đã tồn tại')
            }
        })
    };

    // check if there exists
    const setCheckAccount = (value: string) => {
        setTimeout(() => {
            checkAccount(value).then((data) => {
                data ? Alert.alert('error use.account not sign Up') : Alert.alert('successful thank')
            })
            setCheck((check) => !check);
        }, 3000);
    };

    //usrFrom
    const {
        control,
        trigger,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            account: '',
            phone: '',
            password: '',
            confirm: '',
            email: '',
        },
        resolver: yupResolver(schema),
    });
    return (
        <ScrollView>
            <View style={styleSign.wrapAll}>
                <View style={styleSign.wrapBlock}>
                    <View style={styleSign.wrapBlockView_Text}>
                        <Text style={styleSign.textStyle}>{dataCustomInput[0].name.toUpperCase()}</Text>
                    </View>
                    <Controller
                        control={control}
                        name={dataCustomInput[0].name}
                        render={({field: {onChange, value}}) => (
                            <View style={styleSign.wrapBlockView_Input}>
                                <RenderInput
                                    isForcus={dataCustomInput[0].isForcus}
                                    placeholderText={dataCustomInput[0].placeholderText}
                                    value={value}
                                    onBlur={() => trigger(dataCustomInput[0].name)}
                                    onChange={data => {
                                        onChange(data);
                                        trigger(dataCustomInput[0].name)
                                    }}/>
                                {value && (
                                    <View
                                        style={styleSign.checkAccount}>
                                        <Pressable
                                            onPressIn={() => {
                                                trigger(dataCustomInput[0].name).then(data => {
                                                    if (data) {
                                                        setCheck(!check);
                                                        setCheckAccount(value);
                                                    }
                                                });
                                            }}>
                                            {
                                                dataCustomInput[0].isCheckAccount.value && (
                                                    check &&
                                                    <Text style={{color: 'rgb(255,255,255)'}}>check</Text>
                                                    ||
                                                    <Image
                                                        style={{width: 50, height: 35}}
                                                        source={dataCustomInput[0].isCheckAccount.url}
                                                    />
                                                )
                                            }
                                        </Pressable>
                                    </View>)}
                                <View
                                    style={
                                        (errors.account && {
                                            backgroundColor: 'red',
                                            height: 1,
                                        }) || {backgroundColor: '#ccc', height: 1}
                                    }
                                />
                                {errors.account && (
                                    <Text style={styleSign.errorMessage}>
                                        {errors.account.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />
                </View>
                <View style={styleSign.wrapBlock}>
                    <View style={styleSign.wrapBlockView_Text}>
                        <Text style={styleSign.textStyle}>{dataCustomInput[1].name.toUpperCase()}</Text>
                    </View>
                    <Controller
                        control={control}
                        name={dataCustomInput[1].name}
                        render={({field: {onChange, value}}) => {
                                return (
                                    <View style={styleSign.wrapBlockView_Input}>
                                        <RenderInput
                                            placeholderText={dataCustomInput[1].placeholderText}
                                            isSecureTextEntry={true}
                                            value={value}
                                            onBlur={() => trigger(dataCustomInput[1].name)}
                                            onChange={data => {
                                                onChange(data);
                                                trigger(dataCustomInput[1].name);
                                            }}/>
                                        <View
                                            style={
                                                (errors.password && {
                                                    backgroundColor: 'red',
                                                    height: 1,
                                                }) || {backgroundColor: '#ccc', height: 1}
                                            }
                                        />
                                        {errors.password && (
                                            <Text style={styleSign.errorMessage}>
                                                {errors.password.message}
                                            </Text>
                                        )}
                                    </View>
                                )
                            }
                        }
                    />
                </View>

                <View style={styleSign.wrapBlock}>
                    <View style={styleSign.wrapBlockView_Text}>
                        <Text style={styleSign.textStyle}>{dataCustomInput[2].name.toUpperCase()}</Text>
                    </View>
                    <Controller
                        control={control}
                        name={dataCustomInput[2].name}
                        render={({field: {onChange, value}}) => {
                            console.log(value,dataCustomInput[2].name)
                            return(
                                <View style={styleSign.wrapBlockView_Input}>
                                    <RenderInput
                                        placeholderText={dataCustomInput[2].placeholderText}
                                        isSecureTextEntry={true}
                                        value={value}
                                        onBlur={() => trigger(dataCustomInput[2].name)}
                                        onChange={data => {
                                            onChange(data);
                                            trigger(dataCustomInput[2].name)
                                        }}/>
                                    <View
                                        style={
                                            (errors.confirm && {
                                                backgroundColor: 'red',
                                                height: 1,
                                            }) || {backgroundColor: '#ccc', height: 1}
                                        }
                                    />
                                    {errors.confirm && (
                                        <Text style={styleSign.errorMessage}>
                                            {errors.confirm.message}
                                        </Text>
                                    )}
                                </View>
                            )
                        }}
                    />
                </View>

                <View style={styleSign.wrapBlock}>
                    <View style={styleSign.wrapBlockView_Text}>
                        <Text style={styleSign.textStyle}>{dataCustomInput[3].name.toUpperCase()}</Text>
                    </View>
                    <Controller
                        control={control}
                        name={dataCustomInput[3].name}
                        render={({field: {onChange, value}}) => (
                            <View style={styleSign.wrapBlockView_Input}>
                                <RenderInput
                                    placeholderText={dataCustomInput[3].placeholderText}
                                    value={value}
                                    onBlur={() => trigger(dataCustomInput[3].name)}
                                    onChange={data => {
                                        onChange(data);
                                        trigger(dataCustomInput[3].name)
                                    }}/>
                                <View
                                    style={
                                        (errors.phone && {
                                            backgroundColor: 'red',
                                            height: 1,
                                        }) || {backgroundColor: '#ccc', height: 1}
                                    }
                                />
                                {errors.phone && (
                                    <Text style={styleSign.errorMessage}>
                                        {errors.phone.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />
                </View>

                <View style={styleSign.wrapBlock}>
                    <View style={styleSign.wrapBlockView_Text}>
                        <Text style={styleSign.textStyle}>{dataCustomInput[4].name.toUpperCase()}</Text>
                    </View>
                    <Controller
                        control={control}
                        name={dataCustomInput[4].name}
                        render={({field: {onChange, value}}) => (
                            <View style={styleSign.wrapBlockView_Input}>
                                <RenderInput
                                    placeholderText={dataCustomInput[4].placeholderText}
                                    value={value}
                                    onBlur={() => trigger(dataCustomInput[4].name)}
                                    onChange={data => {
                                        onChange(data);
                                        trigger(dataCustomInput[4].name)
                                    }}/>
                                <View
                                    style={
                                        (errors.email && {
                                            backgroundColor: 'red',
                                            height: 1,
                                        }) || {backgroundColor: '#ccc', height: 1}
                                    }
                                />
                                {errors.email && (
                                    <Text style={styleSign.errorMessage}>
                                        {errors.email.message}
                                    </Text>
                                )}
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





