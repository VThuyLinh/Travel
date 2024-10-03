// import { View, Text, Image, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
// import { Avatar, Button, HelperText, TextInput, TouchableRipple } from "react-native-paper";
// import StyleAll from "../../style/StyleAll";
// import * as ImagePicker from 'expo-image-picker';
// import React from "react";
// import APIs, { endpoints } from "../../config/APIs";
// import { useNavigation } from "@react-navigation/native";
// import StyleLogin from "../../style/StyleLogin";
// import axios from "axios";

// import { useState } from "react"

// const Signup = () => {
//     const [user, setUser] = React.useState({});
//     const fields = [{
    
//         "label": "Họ",
//         "icon": "card-account-details-outline",
//         "field": "first_name"
//     },{
//         "label": "Tên",
//         "icon": "card-account-details-outline",
//         "field": "last_name"
//     }, {
//         "label": "Email",
//         "icon": "email-outline",
//         "field": "email"
//     }, {
//         "label": "Địa chỉ",
//         "icon": "home-city-outline",
//         "field": "address"
//     },
//     , {
//         "label": "Số điện thoại",
//         "icon": "cellphone-basic",
//         "keyboardType":"numeric",
//         "field": "sdt"
//     },
//     {   "label": "Tên người dùng",
//         "icon": "account-check-outline",
//         "field": "username"
//     }, {
//         "label": "Mật khẩu",
//         "icon": "eye",
//         "secureTextEntry": true,
//         "field": "password"
//     }, {
//         "label": "Xác nhận mật khẩu",
//         "icon": "eye",
//         "secureTextEntry": true,
//         "field": "confirm"
//     }];
//     const [loading, setLoading] = React.useState(false);
//     const [error, setError] = React.useState(false);
//     const nav = useNavigation();

   

//      const change = (field, value) => {
//         setUser(current => {
//             return { ...current, [field]: value }
//         })
//     }
    
//     const signup = async () => {
//         if (user?.password !== user?.confirm) {
//             setError(true);
//             return;
//         } else
//             setError(false);

//           setLoading(true)
//           try{
            
//             let form = new FormData();
//             for (let f in user)
//                 if (f !== 'confirm')
//                 {
//                         form.append(f, user[f]);
//                 }
//             let res = await APIs.post(endpoints['signup'],form,{
//                 headers:{
//                     "Content-Type":'application/json'
//                 }
//             });
//             if (res.status === 201)
//                 nav.navigate("Login");
//           }
//           catch(ex)
//           { 
//             console.error(ex.request);
//           }
//           finally
//           {
//             setLoading(false);
//           }
//         }


   

//     return (

//         <View style={[StyleAll.container, StyleAll.margin]}>
            
//                 <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//                 <ScrollView>
//                     {fields.map(f => <TextInput value={user[f.field]} onChangeText={t =>  change(f.field, t)} key={f.name} style={StyleAll.margin} label={f.label} secureTextEntry={f.secureTextEntry} right={<TextInput.Icon icon={f.icon} />} />)}

                    

//                     <HelperText type="error" visible={error}>
//                         Mật khẩu không khớp!
//                     </HelperText>

                    
                    

//                     <Button style={StyleAll.margin} loading={loading} icon="account" mode="contained" onPress={signup}>
//                         Đăng ký
//                     </Button>
//                     </ScrollView>
//                 </KeyboardAvoidingView>
           
//         </View> 

//     );
// }

// export default Signup;

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StyleAll from "../../style/StyleAll";
import { Alert, StatusBar, TouchableOpacity, View,Text } from "react-native";
import { Icon, TextInput } from "react-native-paper";

const Signup=()=>{
    const [email, setEmail]= useState('');
    const [cemail, setCEmail]= useState('');
    const [password, setPassword]=useState('');
    const [username, setUsername]=useState('');
    const [address, setAddress]=useState('');
    const [sdt, setSDT]=useState('');
    const [first_name, setFN]=useState('');
    const [last_name, setLN]=useState('');
    const nav = useNavigation();
    const onSubmit=()=>{
        let formData={
            email:email,
            address:address,
            sdt:sdt,
            first_name:first_name,
            last_name:last_name,
            username:username,
            password:password
        }

        axios.post('https://thuylinh.pythonanywhere.com/Customer/',formData)
        .then((respone)=>console.log(respone))
        .catch((err)=>console.error(err.request))
        if (res.status === 201)
        nav.navigate("Login");
    }

    return (
        <SafeAreaView style={StyleAll.container}>
            <StatusBar backgroundColor={'#ffffff'} barStyle="dark-content"></StatusBar>
            <View style={StyleAll.container}>
                <Text style={{fontWeight:'bold', fontSize:30, color:'black'}}>Đăng ký</Text>
                <Text>Hello lá la</Text>
                <View style={{flexDirection:'row'}}>
                    <Text>our</Text><TouchableOpacity onPress={()=>Alert.alert('cứu chị em ơi')}>
                    <Text style={{color:'#1bcdff'}}>Ok</Text></TouchableOpacity>
                </View>
            </View>
            <View style={StyleAll.container}>
                <View style={StyleAll.container}>
                    <Icon name='email' style={StyleAll.icon}/>
                    <TextInput placeholder="Email" style={StyleAll.input} onChangeText={(value)=>setEmail(value)}></TextInput>
                    <Text style={{color:'red'}}>{!cemail?'Sai định dạng email':''}</Text>
                </View>
                <View style={StyleAll.container}>
                    <Icon name='address' style={StyleAll.icon}/>
                    <TextInput placeholder="địa chỉ" style={StyleAll.input} onChangeText={(value)=>setAddress(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                    <Icon name='sdt' style={StyleAll.icon}/>
                    <TextInput placeholder="Số điện thoại" style={StyleAll.input} onChangeText={(value)=>setSDT(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                    <Icon name='first_name' style={StyleAll.icon}/>
                    <TextInput placeholder="Tên" style={StyleAll.input} onChangeText={(value)=>setFN(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                    <Icon name='last_name' style={StyleAll.icon}/>
                    <TextInput placeholder="Họ" style={StyleAll.input} onChangeText={(value)=>setLN(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                    <Icon name='username' style={StyleAll.icon}/>
                    <TextInput placeholder="username" style={StyleAll.input} onChangeText={(value)=>setUsername(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                    <Icon name='password' style={StyleAll.icon}/>
                    <TextInput placeholder="Mật khẩu" style={StyleAll.input} secureTextEntry={true} onChangeText={(value)=>setPassword(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                    <Icon name='password' style={StyleAll.icon}/>
                    <TextInput placeholder="Mật khẩu" style={StyleAll.input} secureTextEntry={true} onChangeText={(value)=>setPassword(value)}></TextInput>
                </View>
                <TouchableOpacity style={StyleAll.button} onPress={()=>onSubmit()}>
                    <Text style={{color:'#ffffff',fontWeight:'bold'}}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default Signup;