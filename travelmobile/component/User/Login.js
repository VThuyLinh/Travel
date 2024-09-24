import { View, Text, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import React, { useContext } from "react";
import APIs, { authApi, endpoints } from "../../config/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { MyDispatchContext } from "../../config/context";
import StyleAll from "../../style/StyleAll";


const Login = () => {
    const [user, setUser] = React.useState({});
    const fields = [{
        "label": "Username",
        "icon": "account",
        "name": "username"
    }, {
        "label": "Mật khẩu",
        "icon": "eye",
        "name": "password",
        "secureTextEntry": true
    }];
    const [loading, setLoading] = React.useState(false);
    const nav = useNavigation();
    const dispatch = useContext(MyDispatchContext);

    const updateSate = (field, value) => {
        setUser(current => {
            return {...current, [field]: value}
        });
    }

    const login = async () => {
        setLoading(true);
        try {
            console.info(user)
            let res = await APIs.post(endpoints['login'],{
                ...user,
                'client_id':'T4rDLQFIoFriIFOtx3tpC3sAYduBcxl52Is7g0eQ',
                'client_secret':'GbIimEcqDOgOBY8ylZZVZslMuoXIjFdDLG3kicP9m4STyMlLAyMeMngIekyuawhiy4yrAP3B8UHM1J62EeEcdPy5jt0Qag60cmuvmXpnAR5cRTaVimwpv302tfGJTQEv',
                'grant_type': 'password'
            });
            console.info(res.data);

            await AsyncStorage.setItem("token", res.data.access_token);
            
            setTimeout(async () => {
                let user = await authApi(res.data.access_token).get(endpoints['current-user']);
                console.info(user.data);

                dispatch({
                    'type': "login",
                    'payload': user.data
                })

                nav.navigate('Home');
            }, 100);
        } catch (ex) {
            console.error(ex.message);
        } finally {
            setLoading(false);
        }   
    }

    return (
        <View style={[StyleAll.container, StyleAll.margin]}>
            <Text style={StyleAll.subject}>ĐĂNG NHẬP NGƯỜI DÙNG</Text>
            {fields.map(c => <TextInput secureTextEntry={c.secureTextEntry} value={user[c.name]} onChangeText={t => updateSate(c.name, t)} style={StyleAll.margin} key={c.name} label={c.label} right={<TextInput.Icon icon={c.icon} />} />)}
            <Button icon="account" loading={loading} mode="contained" onPress={()=>{login()}}>ĐĂNG NHẬP</Button>
           
        </View>
    );
}

export default Login;





