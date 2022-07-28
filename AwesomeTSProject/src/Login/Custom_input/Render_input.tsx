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
  keyboard
}: contenInput) {
  return (
    <View style={stylesRenderInput.wrapAll}>
      <View style={{position:'relative'}}>
        <TextInput
          keyboardType={ keyboard && 'phone-pad' || 'name-phone-pad'}
          onChangeText={changeText}
          onBlur={onBlur}
          value={value}
          maxLength={maxLength}
          placeholder={placeholderText}
          secureTextEntry={isSecureTextEntry}
          autoFocus={isForcus}
        />
      </View>
      <View style={{
        ...stylesRenderInput.wrapEnd,
        backgroundColor: errorColor
      }}></View>
    </View>
  );
}
export default RenderInput ;
