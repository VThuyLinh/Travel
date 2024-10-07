

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StyleAll from "../../style/StyleAll";
import { Alert, StatusBar, TouchableOpacity, View,Text, StyleSheet } from "react-native";
import { IconButton, TextInput } from "react-native-paper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
       
    }
    const log=()=>{
        nav.navigate("Home")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.tieude}>Ethereal_Travel</Text>
            </View>
            <View style={styles.center}>
                <Text style={styles.title}>Đăng ký</Text>
            </View>

            <View style={StyleAll.container}>
                <View style={StyleAll.container}>
                    <TextInput placeholder="Email" style={styles.ip}  right={<TextInput.Icon icon='email-outline' />} onChangeText={(value)=>setEmail(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                    <TextInput placeholder="Địa chỉ" style={styles.ip} right={<TextInput.Icon icon='home-city-outline' />} onChangeText={(value)=>setAddress(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                
                    <TextInput placeholder="Số điện thoại" right={<TextInput.Icon icon='cellphone-basic' />} style={styles.ip} onChangeText={(value)=>setSDT(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                
                    <TextInput placeholder="Tên" style={styles.ip} right={<TextInput.Icon icon='card-account-details-outline' />} onChangeText={(value)=>setFN(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
               
                    <TextInput placeholder="Họ" style={styles.ip} right={<TextInput.Icon icon='card-account-details-outline' />} onChangeText={(value)=>setLN(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                
                    <TextInput placeholder="Username" style={styles.ip} right={<TextInput.Icon icon='account-check-outline' />}  onChangeText={(value)=>setUsername(value)}></TextInput>
                </View>
                <View style={StyleAll.container}>
                    
                    <TextInput placeholder="Mật khẩu" style={styles.ip} right={<TextInput.Icon icon='eye' />} secureTextEntry={true} onChangeText={(value)=>setPassword(value)}>
                    </TextInput>
                    
                </View>
                <View style={StyleAll.container}>
                   
                    <TextInput placeholder="Xác nhận mật khẩu" right={<TextInput.Icon icon='eye' />} style={styles.ip} secureTextEntry={true} onChangeText={(value)=>setPassword(value)}></TextInput>
                    
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>{onSubmit(),log}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginTop:10, marginLeft:40}}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

    
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        paddingHorizontal:30
    },tinyLogo: {
        marginTop:10,
        marginLeft:5,
        width: 400,
        height: 200,
      },tinyLogo1: {
        marginTop:5,
        marginLeft:5,
        width: 400,
        height: 200,
      },
    tieude:{
        fontWeight:'bold',
        fontSize:40, 
        marginTop:5, 
        color:'black',
    },
    button:{
        backgroundColor:"#b2dbbf",
        color:"white",
        textAlign:"center",
        marginTop:5,
        height:45,
        width:160,
        marginBottom:20,
        marginLeft:200,
        borderRadius:20
    },
    center:{alignItems:'center'},
    title:{
        fontWeight:'bold',
        fontSize:30, 
        color:'black',
        marginBottom:10
    },form:{
        marginTop:30
    },ip:{
        borderBottomWidth:1,
        backgroundColor:'#fff',
        borderColor:'green',
        paddingLeft:5,
        height:8
    }});
export default Signup;