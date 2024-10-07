import { useContext, useState } from "react"
import * as Permissionss from 'expo-permissions';
import * as Locationn from 'expo-location';
import { Alert, Button, Image, Linking, PermissionsAndroid, StyleSheet, Text,TouchableOpacity,View } from "react-native";
import axios from "axios";
import { MyUserContext } from "../../config/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Location=()=>{
    const [location, setLocation]= useState('');
    const [loc, setLoc]= useState([]);
    const [loading, setLoading]= useState(false);
    const user= useContext(MyUserContext);
    const [token, setToken]= useState('');
    let locc='';
    const getLocation= async()=>{

        let{status}= await Locationn.requestForegroundPermissionsAsync();
        if(status!=='granted')
        {
            setLocation({
                errMsg:'Quyền định chưa được cấp'
            })
        }
        setLoc(await Locationn.getCurrentPositionAsync({}));
        locc=await Locationn.getCurrentPositionAsync({});
        setLocation(locc.coords.longitude+"-"+locc.coords.latitude)

        let formData={
            kdo: `${locc.coords.latitude}`,
            vdo: `${locc.coords.longitude}`,
            diadiem: "Viet Nam",
            locationofuser: `${user.id}`,    
        }

        setLoading(loading?true:false)
    AsyncStorage.getItem("token").then((value)=>{
        setToken(value)})
        console.warn(token);
    setLoading(true)
    try {
       let res= await axios.post(`https://thuylinh.pythonanywhere.com/Location/`,formData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
         })
    console.warn(res.request);
        
    } catch (ex) {
        console.log(ex);
        
       
    } finally {
        setLoading(false);
    }
       


        await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${locc.coords.latitude},${locc.coords.longitude}`);
       
        
  }

 
    
    return (
        <View style={{alignItems:'center'}}>
           
            <Text style={{marginLeft:15,marginTop:20, marginRight:15, fontSize:18}}>Hãy chọn nút lấy vị trí bên dưới để lưu vị trí của bạn hiện tại vào dữ liệu của chúng tôi, sau này khi bạn có đến địa điểm này 1 lần nữa chúng tôi sẽ nhắc nhở với bạn về 1 kỷ niệm tuyệt vời mà bạn có !!!</Text>
            <TouchableOpacity style={styles.button} onPress={()=>{getLocation(), Alert.alert('Lưu thành công' )}} >
                     <Text style={{fontSize:18, fontWeight:'bold', marginTop:10, marginLeft:40}}>Lấy vị trí</Text>
                 </TouchableOpacity>
            <View style={{marginTop:10}}>
            <Image width={500} height={600} source={{uri:'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728244487/Screenshot_2024-10-07_025423_pokcm9.png'}}/>
            </View>
        </View>
    )
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
    });
export default Location;



