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
        name: 'acccount',
        maxLength: 24,
        isForcus: true,
        placeholderText: 'Enter acccount your here',
        isSecureTextEntry: false,
        isCheckAccount: {
            value: true,
            url: require('../image/Loading_icon.gif'),
        },
        checkValue: (value:string)=>{
            return value.replace(/[,`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi, '',)
        }
    },
    {
        name: 'password',
        maxLength: 24,
        placeholderText: 'Enter password your here',
        isSecureTextEntry: true,
    },
    {
        name:'confrim',
        maxLength:24,
        placeholderText:'Enter confrim password here',
        isSecureTextEntry: true,

    },
    {
        maxLength:24,
        name:'phone',
        placeholderText:'Enter phone your is number here'
    },
    {
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

const schema = yup
    .object({
        acccount: yup
            .string()
            .required('Mục Không để trống')
            .min(6, 'It nhất 6 ký tự')
            .max(18, 'Độ dài  từ 6-12 '),
        password: yup
            .string()
            .required('Mục Không để trống')
            .min(6, 'It nhất 6 ký tự'),
        phone: yup
            .string()
            .typeError('Định dạng không đúng')
            .required('Mục Không để trống')
            .matches(/^[0-9]{10}$/),
        confirm: yup
            .string()
            .min(6, 'It nhất 6 ký tự')
            .required('Mục Không để trống'),
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
    const [dataList, setData] = useState<any>();

    useEffect(() => {
        getUse('acccount').then((data) => setData(data))
    }, []);
    const onSummit = (value: any) => {
        console.log('vào')
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
        resolver: yupResolver(schema),
    });
    console.log('render')
    return (
        // <ScrollView>
            <View style={styleSign.wrapAll}>
                <FlatList data={dataCustomInput} renderItem={({item}) => {
                    return (
                        <View style={styleSign.wrapBlock}>
                            <View style={styleSign.wrapBlockView_Text}>
                                <Text style={styleSign.textStyle}>{item.name.toUpperCase()} </Text>
                            </View>
                            <Controller
                                control={control}
                                name={item.name}
                                render={({field: {onChange, value}}) => (
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
                                )}
                            />
                        </View>
                    )
                }}/>

            </View>
        // </ScrollView>
    );
}

export default SignUp;
// <View style={styleSign.wrapAll}>
//     <View style={styleSign.wrapBlock}>
//         <View style={styleSign.wrapBlockView_Text}>
//             <Text style={styleSign.textStyle}>Acccount</Text>
//         </View>
//         <Controller
//             control={control}
//             name={'acccount'}
//             render={({field: {onChange, value}}) => (
//                 <View style={styleSign.wrapBlockView_Input}>
//                     <RenderInput
//                         isForcus={true}
//                         placeholderText={'Enter Email or phone '}
//                         isSecureTextEntry={false}
//                         maxLength={18}
//                         value={value.replace(
//                             /[,`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi,
//                             '',
//                         )}
//                         onBlur={() => trigger('acccount')}
//                         onChange={data => {
//                             onChange(data);
//                             trigger('acccount');
//                         }}
//                     />
//                     {value && (
//                         <View
//                             style={{
//                                 position: 'absolute',
//                                 right: 0,
//                                 top: 10,
//                                 zIndex: 1,
//                                 width: 50,
//                                 height: 35,
//                                 backgroundColor: '#266C99',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 borderRadius: 5,
//                             }}>
//                             <Pressable
//                                 onPressIn={() => {
//                                     trigger('acccount').then(data => {
//                                         if (data) {
//                                             setCheck(!check);
//                                             setCheckAccount(value);
//                                         }
//                                     });
//                                 }}>
//                                 {(check && (
//                                     <Text style={{color: 'rgb(255,255,255)'}}>check</Text>
//                                 )) || (
//                                     <Image
//                                         style={{width: 50, height: 35}}
//                                         source={require('../image/Loading_icon.gif')}
//                                     />
//                                 )}
//                             </Pressable>
//                         </View>
//                     )}
//                     <View
//                         style={
//                             (errors.acccount && {
//                                 backgroundColor: 'red',
//                                 height: 1,
//                             }) || {backgroundColor: '#ccc', height: 1}
//                         }
//                     />
//                     {errors.acccount && (
//                         <Text style={styleSign.errorMessage}>
//                             {errors.acccount.message}
//                         </Text>
//                     )}
//                 </View>
//             )}
//         />
//     </View>
//     <View style={styleSign.wrapBlock}>
//         <View style={styleSign.wrapBlockView_Text}>
//             <Text style={styleSign.textStyle}>Password</Text>
//         </View>
//         <Controller
//             control={control}
//             name={'password'}
//             render={({field: {onChange, value}}) => (
//                 <View style={styleSign.wrapBlockView_Input}>
//                     <View>
//                         <RenderInput
//                             placeholderText={'Enter password here'}
//                             isSecureTextEntry={true}
//                             maxLength={18}
//                             value={value.replace(
//                                 /[' ',`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi,
//                                 '',
//                             )}
//                             onBlur={() => trigger('password')}
//                             onChange={data => (onChange(data), trigger('password'))}
//                         />
//                     </View>
//                     <View>
//                         <View
//                             style={
//                                 (errors.password && {
//                                     backgroundColor: 'red',
//                                     height: 1,
//                                 }) || {backgroundColor: '#ccc', height: 1}
//                             }
//                         />
//                         {errors.password && (
//                             <Text style={styleSign.errorMessage}>
//                                 {errors.password.message}
//                             </Text>
//                         )}
//                     </View>
//                 </View>
//             )}
//         />
//     </View>
//     <View style={styleSign.wrapBlock}>
//         <View style={styleSign.wrapBlockView_Text}>
//             <Text style={styleSign.textStyle}>confrim</Text>
//         </View>
//         <Controller
//             control={control}
//             name={'confirm'}
//             render={({field: {onChange, value}}) => (
//                 <View style={styleSign.wrapBlockView_Input}>
//                     <RenderInput
//                         placeholderText={'Enter confirm password here'}
//                         isSecureTextEntry={true}
//                         maxLength={18}
//                         value={value.replace(
//                             /[' ',`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi,
//                             '',
//                         )}
//                         onBlur={() => trigger('confirm')}
//                         onChange={data => (onChange(data), trigger('confirm'))}
//                     />
//                     <View>
//                         <View
//                             style={
//                                 (errors.confirm && {
//                                     backgroundColor: 'red',
//                                     height: 1,
//                                 }) || {backgroundColor: '#ccc', height: 1}
//                             }
//                         />
//                         {errors.confirm && (
//                             <Text style={styleSign.errorMessage}>
//                                 {errors.confirm.message}
//                             </Text>
//                         )}
//                     </View>
//                 </View>
//             )}
//         />
//     </View>
//
//     <View style={styleSign.wrapBlock}>
//         <View style={styleSign.wrapBlockView_Text}>
//             <Text style={styleSign.textStyle}>Phone</Text>
//         </View>
//         <Controller
//             control={control}
//             name={'phone'}
//             render={({field: {onChange, value}}) => (
//                 <View style={styleSign.wrapBlockView_Input}>
//                     <RenderInput
//                         keyboard={true}
//                         placeholderText={'Enter Phone here'}
//                         isSecureTextEntry={false}
//                         maxLength={18}
//                         value={value.replace(
//                             /[' ',`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi,
//                             '',
//                         )}
//                         onBlur={() => trigger('phone')}
//                         onChange={data => {
//                             onChange(data);
//                             trigger('phone');
//                         }}
//                     />
//                     <View>
//                         <View
//                             style={
//                                 (errors.phone && {
//                                     backgroundColor: 'red',
//                                     height: 1,
//                                 }) || {backgroundColor: '#ccc', height: 1}
//                             }
//                         />
//                         {errors.phone && (
//                             <Text style={styleSign.errorMessage}>
//                                 {errors.phone.message}
//                             </Text>
//                         )}
//                     </View>
//                 </View>
//             )}
//         />
//     </View>
//
//     <View style={styleSign.wrapBlock}>
//         <View style={styleSign.wrapBlockView_Text}>
//             <Text style={styleSign.textStyle}>Email</Text>
//         </View>
//         <Controller
//             control={control}
//             name={'email'}
//             render={({field: {onChange, value}}) => (
//                 <View style={styleSign.wrapBlockView_Input}>
//                     <RenderInput
//                         keyboard={true}
//                         placeholderText={'Enter email your here'}
//                         isSecureTextEntry={false}
//                         maxLength={24}
//                         value={value}
//                         onBlur={() => trigger('email')}
//                         onChange={data => {
//                             onChange(data);
//                             trigger('email');
//                         }}
//                     />
//                     <View>
//                         <View
//                             style={
//                                 (errors.email && {
//                                     backgroundColor: 'red',
//                                     height: 1,
//                                 }) || {backgroundColor: '#ccc', height: 1}
//                             }
//                         />
//                         {errors.email && (
//                             <Text style={styleSign.errorMessage}>
//                                 {errors.email.message}
//                             </Text>
//                         )}
//                     </View>
//                 </View>
//             )}
//         />
//     </View>
//
//     <View>
//         <RenderBnt
//             onPress={handleSubmit(onSummit)}
//             name={'Sign Up'}
//             style={styleSign.bntStyle}
//             styleName={styleSign.textStyle}
//         />
//     </View>
// </View>

