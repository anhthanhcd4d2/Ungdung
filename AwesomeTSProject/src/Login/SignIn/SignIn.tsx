import RenderInput from "../Custom_input/Render_input";
import { useForm, Controller } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { styleSign } from "../../Styles/Styles";
import React, { useEffect, useState } from "react";
import RenderBnt from "../Custom_Bnt/Render_Bnt";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import axios from "axios";


import { baseUrl } from "../../url_API/Api";
import { loginUse } from "../../redux/acction/actions";
import store from "../../redux/store";

interface IFormInputs {
  account: any,
  password: any,
}

const schema = yup.object({
  account: yup.string().required("Mục không đuược để trống").min(6, "độ dài ít nhất 6-18"),
  password: yup.string().matches(/^[a-z0-9A-z]+$/, "Must be exactly 5 digits"),
}).required();

function SignIn() {
  const disPatch = useDispatch();
  const [dataList, setData] = useState<any>();
  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setData(response);
    });
  }, []);
  console.log(store.getState());
  const navigation = useNavigation<any>();
  const onSubmit = (data: any) => {
    let check = dataList.data.find((element: any) => {
      return element.acccount === data.account && element.password === data.password;
    });
    if (check) {
      disPatch(loginUse(check));
      navigation.navigate("home");
      reset();
    } else {
      Alert.alert("mật khẩu tài khoản không hợp lệ");
    }
  };
  const {
    control,
    reset,
    setError,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      account: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  return (
    <View style={styleSign.wrapAll}>
      <View style={styleSign.wrapBlock}>
        <View style={styleSign.wrapBlockView_Text}>
          <Text style={styleSign.textStyle}>Account</Text>
        </View>
        <Controller
          control={control}
          name={"account"}
          render={({ field: { onChange, value } }) => (
            <View style={styleSign.wrapBlockView_Input}>
              <RenderInput
                onBlur={() => {
                  trigger("account");
                }}
                value={value}
                placeholderText={"Email or Phone"}
                isForcus={true}
                maxLength={18}
                onChange={(data) => {
                  onChange(data);
                  trigger("account");
                }}
              />
              <View>
                <View style={(errors.account && {
                  backgroundColor: "red",
                  height: 1,
                }) || { backgroundColor: "#ccc", height: 1 }}></View>
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
          name={"password"}
          render={({ field: { onChange, value } }) => (
            <View style={styleSign.wrapBlockView_Input}>
              <RenderInput
                onBlur={() => {
                  trigger("password");
                }}
                placeholderText={"Enter password here"}
                isSecureTextEntry={true}
                maxLength={18}
                value={value}
                onChange={(data) => {
                  onChange(data);
                  trigger("password");
                }}
              />
              <View>
                <View style={(errors.password && {
                  backgroundColor: "red",
                  height: 1,
                }) || { backgroundColor: "#ccc", height: 1 }}></View>
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
              navigation.navigate("searchPassword");
            }}
            name={"Search password"}
            styleName={styleSign.wrapBlockView_twoBnts_stylesName}
          />
        </View>
        <View style={styleSign.twoBnts_block}>
          <RenderBnt
            onPress={() => {
              navigation.navigate("signUp");
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
              width: 45,
              height: 45,
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
              width: 35,
              height: 35,
            }}
          />
        </View>
        <View />
      </View>
    </View>
  );
}

export default SignIn;
