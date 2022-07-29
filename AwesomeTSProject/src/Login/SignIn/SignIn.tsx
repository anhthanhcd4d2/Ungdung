import RenderInput from "../Custom_input/Render_input";
import { useForm, Controller } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { styleSign } from "../../Styles/Styles";
import React from "react";
import RenderBnt from "../Custom_Bnt/Render_Bnt";
import { useNavigation } from "@react-navigation/native";

function SignIn() {
  const navigation=useNavigation<any>()
  const onSubmit = (data: object) => {
    console.log(data);
    reset();
  };
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      account: "",
      password: "",
    },
  });
  return (
    <View style={styleSign.wrapAll}>
      <View style={styleSign.wrapBlock}>
        <View style={styleSign.wrapBlockView_Text}>
          <Text style={styleSign.textStyle}>Account</Text>
        </View>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: " Mục không được để trống",
            },
            minLength: {
              value: 6,
              message: "nội dung chứa ít nhất 6 ký tự",
            },
          }}
          name={"account"}
          render={({ field: { onChange, value } }) => (
            <View style={styleSign.wrapBlockView_Input}>
              <RenderInput
                placeholderText={"Email or Phone"}
                isForcus={true}
                maxLength={24}
                changeText={onChange}
              />
                <View>
                    <View style={(errors.account && {backgroundColor: 'red',height:1}) || {backgroundColor: '#ccc',height:1}}></View>
                    {errors.account && (
                        <Text style={styleSign.errorMessage}>
                            {errors.account.message}
                        </Text>)}
                </View>
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
              message: " Mục không được để trống",
            },
            minLength: {
              value: 6,
              message: "nội dung chứa ít nhất 6 ký tự",
            },
          }}
          name={"password"}
          render={({ field: { onChange } }) => (
            <View style={styleSign.wrapBlockView_Input}>
              <RenderInput
                placeholderText={"Enter password here"}
                isSecureTextEntry={true}
                maxLength={24}
                changeText={onChange}
              />
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

      <View>
        <RenderBnt
          onPress={handleSubmit(onSubmit)}
          name={"Sign In"}
          style={styleSign.bntStyle}
          styleName={styleSign.textStyle}
        />
      </View>

      <View style={styleSign.wrapBlockView_twoBnts}>
        <View style={styleSign.twoBnts_block}>
          <RenderBnt
            onPress={() => {
              navigation.navigate('searchPassword')
            }}
            name={"Search password"}
            styleName={styleSign.wrapBlockView_twoBnts_stylesName}
          />
        </View>
        <View style={styleSign.twoBnts_block}>
          <RenderBnt
            onPress={() => {
              navigation.navigate('signUp')
            }}
            name={"Sign Up"}
            styleName={styleSign.wrapBlockView_twoBnts_stylesName}
          />
        </View>
        <View />
      </View>

      <View style={styleSign.wrapBlockView_twoBnts}>
        <View style={styleSign.twoBnts_block}>
          <RenderBnt
            onPress={() => {
              Alert.alert("Không có gì");
            }}
            styleName={{
              width:45,
              height:45,
            }}
            image={require("../image/icon-fb.png")}
          />
        </View>
        <View style={styleSign.twoBnts_block}>
          <RenderBnt
            onPress={() => {
              Alert.alert("Không có 2");
            }}
            image={require("../image/gmail-icon.jpg")}
            styleName={{
              width:35,
              height:35,
            }}
          />
        </View>
        <View />
      </View>
    </View>
  );
}

export default SignIn;
