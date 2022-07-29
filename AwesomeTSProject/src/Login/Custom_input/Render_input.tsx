import React from 'react';
import {TextInput, View} from 'react-native';

import {stylesRenderInput} from '../../Styles/Styles';

export interface contenInput {
  changeText?: (data: string) => void;
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
  changeText,
  errorColor,
  keyboard,
  underlineColorAndroid
}: contenInput) {
  return (
    <View style={stylesRenderInput.wrapAll}>
      <View style={{position:'relative'}}>
        <TextInput
            // underlineColorAndroid={errorColor}
            keyboardType={ keyboard && 'phone-pad' || 'name-phone-pad'}
          onChangeText={changeText}
          onLayout={onBlur}
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
