import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import React, { useContext } from "react";
import APIs, { authApi, endpoints } from "../../config/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { MyDispatchContext } from "../../config/context";
import StyleAll from "../../style/StyleAll";




const Login = () => {
    const [user, setUser] = React.useState({});
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
   
    const [loading, setLoading] = React.useState(false);
    const nav = useNavigation();
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

                nav.navigate('Home');
            }, 100);
        } catch (ex) {
            console.error(ex.request);
        } finally {
            setLoading(false);
        }   
    }


    return (
        <View style={[StyleAll.container, StyleAll.margin]}>
            <View style={styles.title}>
                 <Text style={{fontWeight:'bold',fontSize:30, color:'black'}}>Đăng nhập</Text>
            </View>
           <View style={styles.form}>
                <View style={styles.group}>
                   
                     <TextInput placeholder="username" style={StyleAll.input} onChangeText={(value)=>setUsername(value)}></TextInput>
                 </View>
                 <View style={styles.group}>
                    
                     <TextInput placeholder="password" style={StyleAll.input} onChangeText={(value)=>setPassword(value)}></TextInput>
                 </View>
                 <TouchableOpacity style={StyleAll.button} onPress={()=>login()}>
                     <Text style={{color:'#ffffff',fontWeight:'bold'}}>Đăng nhập</Text>
                 </TouchableOpacity>
            </View>
            
           
        </View>
    );

}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        paddingHorizontal:30
    },title:{
        marginTop:30,
        alignItems:'center'
    },form:{
        marginTop:30
    },group:{
        backgroundColor:'yellow'
    },ip:{
        borderBottomWidth:1,
        backgroundColor:'#fff',
        borderColor:'green',
        paddingLeft:35
    }});
export default Login;





// import React, { useContext } from "react";
// import { StatusBar, StyleSheet, View,Text,Icon, TouchableOpacity } from "react-native"
// import { TextInput } from "react-native-paper";
// import { SafeAreaView } from "react-native-safe-area-context";
// import StyleAll from "../../style/StyleAll";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";
// import { MyDispatchContext } from "../../config/context";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authApi } from "../../config/APIs";


// const Login =()=>{
//     const [username, setUsername]=React.useState('');
//     const [password, setPassword]=React.useState('');
//     const  grant_type=`password`;
//     const nav= useNavigation();
//     const dispatch=useContext(MyDispatchContext);
//     const onSubmit= async()=>{
//         let formData={
//             username:username,
//             password:password,
//             grant_type:'password',
//             client_id:'22iDtvrWamdwRMH48GUgtTmNce5B6cgk0O3gY8TI',
//             client_secret:'phrJMvTDBoKdqmTEgkOb3tzgd47fiu4bo7Ozc6eaIk2B9Prn8sgsFJT7tVlh3Ubr7PDWdOFeRfQDOV85IeNB0kILTgWNOwJpMCy1hyqr1XqcaeJpkuhmbxOEayFUOeR3',
//         }

//         axios.post('https://thuylinh.pythonanywhere.com/o/token/',formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                   }
//             })
//         .then((respone)=> AsyncStorage.setItem("token", respone.data.access_token))
//         .catch((err)=>console.error(err.request))
         
        

//         setTimeout(async()=>{
//             let user= await authApi(respone.data.access_token).get(endpoints[['current-user']]);
//             console.info(user.data);
//             dispatch({
//                 'type':'login',
//                 'payload':user.data
//             })
//             nav.navigate('Home');
//         },100);
//     }
//     return (
//         // <View>
//         //     <View>
//         //         <StatusBar backgroundColor={'green'} barStyle="dark-content"></StatusBar>
//         //     </View>
//         //     <View style={styles.container}>
//         //         <Text>Đăng nhập</Text>
//         //     </View>
//         // </View>
//         <SafeAreaView style={styles.container}>
//             <StatusBar backgroundColor={'green'} barStyle="dark-content"></StatusBar>
//            <View style={styles.title}>
//                 <Text style={{fontWeight:'bold',fontSize:30, color:'black'}}>Đăng nhập</Text>
//            </View>
//            <View style={styles.form}>
//                 <View style={styles.group}>
                   
//                     <TextInput placeholder="username" style={StyleAll.input} onChangeText={(value)=>setUsername(value)}></TextInput>
//                 </View>
//                 <View style={styles.group}>
                    
//                     <TextInput placeholder="password" style={StyleAll.input} onChangeText={(value)=>setPassword(value)}></TextInput>
//                 </View>
//                 <TouchableOpacity style={StyleAll.button} onPress={()=>onSubmit()}>
//                     <Text style={{color:'#ffffff',fontWeight:'bold'}}>Đăng nhập</Text>
//                 </TouchableOpacity>
//            </View>
//         </SafeAreaView>
//     )
// }

// const styles= StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:'#ffffff',
//         paddingHorizontal:30
//     },title:{
//         marginTop:30,
//         alignItems:'center'
//     },form:{
//         marginTop:30
//     },group:{
//         backgroundColor:'yellow'
//     },ip:{
//         borderBottomWidth:1,
//         backgroundColor:'#fff',
//         borderColor:'green',
//         paddingLeft:35
//     }
    
// })
// export default Login;

