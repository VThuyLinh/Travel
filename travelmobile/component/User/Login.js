import { View, Text, Alert, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import React, { useContext } from "react";
import APIs, { authApi, endpoints } from "../../config/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MyDispatchContext } from "../../config/context";
import StyleAll from "../../style/StyleAll";
import StyleLogin from "../../style/StyleLogin";
import { useNavigation } from "@react-navigation/native";


const Login1 = () => {
    const [user, setUser] = React.useState({});
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(false);
    const dispatch = useContext(MyDispatchContext);

    const updateSate = (field, value) => {
        setUser(current => {
            return {...current, [field]: value}
        });
    }

    const login = async () => {
        
            let formData={
                username:username,
                password:password,
                grant_type:'password',
                client_id:'6jeYQgqQQJ1r9WFuuqFMs3WHAQ0QT0IzHFjHscG8',
                client_secret:'K0Bu3iC7IZkSWgK4XO9fzJWuyQUzRlWhmQOGHum8IAatEDA7AdH88Xd4YfpGZNlKmgbuLexewerwvkKPsaaSAtIjPg408e7xgisQFtXkTNcLeN7CcsXn3gftMTuzO7El',
            }
        setLoading(true);
        try {
            console.info(user)
            let res = await APIs.post(endpoints['login'],formData,{
                headers: {
                        'Content-Type': 'multipart/form-data'
                    }
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
            }, 100);

            
        } catch (ex) {
            console.error("Lỗi cur",ex.request);
        } finally {
            setLoading(false);
        }   
    }
    


    return (
        <View style={[StyleAll.container]}>
            <View style={styles.center}>
                 <Text style={styles.tieude}>Ethereal_Travel</Text>
            </View>
            <View style={styles.center}>
                 <Text style={styles.title}>Đăng nhập</Text>
            </View>
            
            <View style={{marginTop:20, marginLeft:25, marginRight:25, marginBottom:10}}>
                   <TextInput placeholder="username" style={styles.ip} onChangeText={(value)=>setUsername(value)}></TextInput>
            </View>
           <View >
                
                 <View style={{ marginLeft:25, marginRight:25}}>
                    
                     <TextInput placeholder="password" style={styles.ip} onChangeText={(value)=>setPassword(value)}></TextInput>
                 </View>
                 <TouchableOpacity style={styles.button} onPress={()=>{login(); Alert.alert('Đăng bài thành công' )}} >
                     <Text style={{fontSize:18, fontWeight:'bold', marginTop:10, marginLeft:40}}>Đăng nhập</Text>
                 </TouchableOpacity>
            </View>
            <View>
                <Image style={styles.tinyLogo} source={{uri:'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728132381/Ethereal_Travel_1_ysgitt.png'}}/>
            </View>
            <View>
                <Image style={styles.tinyLogo1} source={{uri:'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728132424/Ethereal_Travel_2_wc4hjg.png'}}/>
            </View>
           
        </View>
        
    );

}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        paddingHorizontal:30
    },tinyLogo: {
        marginTop:20,
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
        fontSize:30, 
        marginTop:10, 
        color:'black',
    },
    button:{
        backgroundColor:"#b2dbbf",
        color:"white",
        textAlign:"center",
        marginTop:20,
        height:45,
        width:160,
        marginLeft:230,
        borderRadius:20
    },
    center:{alignItems:'center'},
    title:{
        fontWeight:'bold',
        fontSize:30, 
        color:'black'
    },form:{
        marginTop:30
    },ip:{
        borderBottomWidth:1,
        backgroundColor:'#fff',
        borderColor:'green',
        paddingLeft:10
    },alertTitle: {
        color: 'red', // Change the title color
      },
      alertMessage: {
        color: 'blue', // Change the message color
      },
      alertButton: {
        color: 'green', // Change the button color
      },});
export default Login1;



