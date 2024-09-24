import { View, Text, Image, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Avatar, Button, HelperText, TextInput, TouchableRipple } from "react-native-paper";
import StyleAll from "../../style/StyleAll";
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import APIs, { endpoints } from "../../config/APIs";
import { useNavigation } from "@react-navigation/native";
import StyleLogin from "../../style/StyleLogin";

const Signup = () => {
    const [user, setUser] = React.useState({});
    const fields = [{
    
        "label": "Họ",
        "icon": "card-account-details-outline",
        "name": "first_name"
    },{
        "label": "Tên",
        "icon": "card-account-details-outline",
        "name": "last_name"
    }, {
        "label": "Email",
        "icon": "email-outline",
        "name": "email"
    }, {
        "label": "Địa chỉ",
        "icon": "home-city-outline",
        "name": "Address"
    },
    , {
        "label": "Số điện thoại",
        "icon": "cellphone-basic",
        "keyboardType":"numeric",
        "name": "sdt"
    },
    {   "label": "Tên người dùng",
        "icon": "account-check-outline",
        "name": "username"
    }, {
        "label": "Mật khẩu",
        "icon": "eye",
        "secureTextEntry": true,
        "name": "password"
    }, {
        "label": "Xác nhận mật khẩu",
        "icon": "eye",
        "secureTextEntry": true,
        "name": "confirm"
    }];
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const nav = useNavigation();

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            console.log(result)
            if (!result.canceled)
                setUser(current => {
                    return { ...current, "Avatar": result.assets[0] }
                });
        }
    }
    const picker1 = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            console.log(result)
            if (!result.canceled)
                setUser(current => {
                    return { ...current, "Cover": result.assets[0] }
                });
        }
    }
    
    const signup = async () => {

        if (user?.password !== user?.confirm) {
            setError(true);
            return;
        } else
            setError(false);

        setLoading(true)
        try {
            let form = new FormData();
            for (let key in user)
                if (key !== 'confirm')
                    if (key === 'Avatar') {
                        form.append(key, {
                            uri: user[key].uri,
                            name:user[key].fileName,
                            type: user[key].mimeType
                        })
                    } else {
                        form.append(key, user[key]);
                    }
                    if (key === 'Cover') {
                        form.append(key, {
                            uri: user[key].uri,
                            name:user[key].fileName,
                            type: user[key].mimeType
                        })
                    } else {
                        form.append(key, user[key]);
                    }

            console.info(form);


            let res = await APIs.post(endpoints['signup'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 201)
                nav.navigate("Login");
        } catch (ex) {
            console.log(ex.request);
            console.log(ex.required);
           
        } finally {
            setLoading(false);
        }
    }


    const updateState = (field, value) => {
        setUser(current => {
            return { ...current, [field]: value }
        })
    }

    return (

        <View style={[StyleAll.container, StyleAll.margin]}>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    {fields.map(f => <TextInput value={user[f.name]} onChangeText={t => updateState(f.name, t)} key={f.name} style={StyleAll.margin} label={f.label} secureTextEntry={f.secureTextEntry} right={<TextInput.Icon icon={f.icon} />} />)}

                    <TouchableRipple onPress={picker}>
                        <Text style={StyleAll.margin}>Chọn hình đại diện...</Text>
                    </TouchableRipple>
                    <TouchableRipple onPress={picker1}>
                        <Text style={StyleAll.margin}>Chọn ảnh bìa...</Text>
                    </TouchableRipple>

                    <HelperText type="error" visible={error}>
                        Mật khẩu không khớp!
                    </HelperText>

                    {user?.Avatar && <Avatar.Image source={{ uri:user.Avatar.uri}} style={StyleLogin.avatar} />}

                    <Button style={StyleAll.margin} loading={loading} icon="account" mode="contained" onPress={signup}>
                        Đăng ký
                    </Button>
                </KeyboardAvoidingView>
            </ScrollView>
        </View> 

    );
}

export default Signup;