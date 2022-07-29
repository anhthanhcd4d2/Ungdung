import React from 'react';
import {TextInput, View} from 'react-native';

import {stylesRenderInput} from '../../Styles/Styles';

export interface contenInput {
  onChange: (data: any) => void;
  placeholderText: string;
  isSecureTextEntry?: boolean;
  isForcus?: boolean;
  maxLength?: number | 1000;
  value?: any;
  onBlur?: () => void;
  errorColor?:any
  keyboard?:boolean
  underlineColorAndroid?:string
}
function RenderInput({
  placeholderText,
  isSecureTextEntry,
  isForcus,
  maxLength,
  value,
  onBlur,
                       onChange,
  errorColor,
  keyboard,
  underlineColorAndroid
}: contenInput) {
  console.log('render')
  return (
    <View style={stylesRenderInput.wrapAll}>
      <View style={{position:'relative'}}>
        <TextInput
            keyboardType={ keyboard && 'phone-pad' || 'name-phone-pad'}
          onBlur={onBlur}
          onChange={(e)=>{
            onChange(e.nativeEvent.text)
          }}
          value={value}
          maxLength={maxLength}
          placeholder={placeholderText}
          secureTextEntry={isSecureTextEntry}
          autoFocus={isForcus}
        />
      </View>

    </View>
  );
}
export default RenderInput ;
