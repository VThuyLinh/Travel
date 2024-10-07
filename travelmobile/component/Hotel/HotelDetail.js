import { ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import React, { useContext } from "react";
import APIs, { authApi, endpoints } from "../../config/APIs";
import { Avatar, Button, Card, Dialog, Icon, List, MD3Colors, Portal, TextInput } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { Intl } from 'react-native';
import moment from "moment";
import StyleAll from "../../style/StyleAll";
import { MyUserContext } from "../../config/context";
import StyleTour from "../../style/StyleTour";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { isCloseToBottom } from "../Utils/util";
// import { useCurrencyFormatter } from 'react-native-currency-formatter';

const HotelDetail = ({ navigation,route }) => {
    const [hoteldetail, setHotelDetail] = React.useState([]);
    const [room, setRoom]= React.useState([]);
    const [cmt, setComment]= React.useState([]);
    const [like, setLike]= React.useState([]);
    const [album, setAlbum]= React.useState([]);
    const [token, setToken]= React.useState([]);
    const [image, setImage]= React.useState([]);
    const [active, setActive] = React.useState(false);

   
    const nav = useNavigation();
    const hotel_id = route.params?.hotel_id;
  
    
    const { width } = useWindowDimensions();
    const loadHotel = async() => {
        try {
            
            let res = await APIs.get(`https://thuylinh.pythonanywhere.com/Hotel/${hotel_id}`);
            let res2 = await APIs.get(`https://thuylinh.pythonanywhere.com/HotelRoom/`);
            let res1= await APIs.get(endpoints["image"]);
            setRoom(res2.data);
            setImage(res1.data);
            setAlbum(res.data.album);
            setHotelDetail(res.data);
            setLike(res.data.like_hotel)
            
           
            AsyncStorage.getItem("token").then((value)=>{
                setToken(value)
            })
           
        } catch (ex) {
            console.error("hello",ex);
        }
    }
    

    const user= useContext(MyUserContext);  

    React.useEffect(() => {
        loadHotel();
    }, [hotel_id]);

   
    const [loading, setLoading] = React.useState(false);
    

    const create_like= async() =>{
        setLoading(true);
        let formData={
            Active:true
        }
        try {
            setActive(active? false: true);
            axios.post(`https://thuylinh.pythonanywhere.com/Hotel/${hotel_id}/like_hotel/`,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((respone)=>console.log("clike",respone))
            .catch((err)=>console.error("clike",err.request))

            
              
        } catch (ex) {
            console.log(ex.request);
        } finally {
            setLoading(false);
        }
    }
    const dislike= async() =>{
        setLoading(true);
        let formData={
            Active:false
        }
        try {
            setActive(active? false: true);
            axios.post(`https://thuylinh.pythonanywhere.com/Hotel/${hotel_id}/like_hotel/`,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((respone)=>console.log("dlike",respone))
            .catch((err)=>console.error("dlike",err.request))
            
        } catch (ex) {
            console.log(ex.request);
        } finally {
            setLoading(false);
        }
    }

    const loadMore = () => {
        
    }
   
    
    return (
        <View style={StyleAll.container}>
            <RefreshControl onRefresh={() => loadHotel()} />
           <ScrollView style={[StyleAll.container, StyleAll.margin]} onScroll={loadMore} >
            {hoteldetail===null?<ActivityIndicator animating={true} color={'blue'} />:
                <Card>
                    <Card.Content>
                        <Text variant="titleLarge" style={styles.title}>{hoteldetail.nameofhotel}</Text>
                        <Text ><Icon size={15} source="home-city"/> {hoteldetail.address}</Text>
                        <Text ><Icon size={15} source="map-marker"/> {hoteldetail.Place_Name}</Text>
                       <RenderHTML contentWidth={width} source={{html: hoteldetail.descriptions}} />
                    </Card.Content>
      
                 {image.map(i=>{
                    if(i.album_id==album)
                    {
                        return (
                            <Card style={{marginTop:15}}>
                                <Card.Cover source={{
                            uri: `https://res.cloudinary.com/dqcjhhtlm/${i.Path}`}} />
                            </Card>
                           
                        )
                    }
                 })}

                {room.map(r=>{
                    if(r.id_hotel==hoteldetail.id)
                    {
                        return (
                            <Card style={styles.card3}>
                                <Card.Content>
                                    <Text style={styles.title1}>Loại phòng: {r.id_room.Name}</Text>
                                    <Text style={{marginLeft:10, marginTop:10}}><Icon size={15} source="cash"/>  {r.Price}/1 đêm</Text>
                                    {r.BreakfastOrNone==true?<Text style={{marginLeft:10, marginTop:10}}><Icon size={15} source="food-turkey"/> Bao gồm ăn sáng</Text>:
                                    <Text style={{marginLeft:10, marginTop:10}}><Icon size={15} source="food-turkey"/> Không bao gồm ăn sáng</Text>}
                                    <Text style={{marginLeft:10, marginTop:10}}><Icon size={15} source="bus-school"/> Miễn phí xe điện di chuyển trong khuôn viên</Text>
                                    <Text style={{marginLeft:10, marginTop:10}}><Icon size={15} source="sofa-outline"/> Tiện ích trong phòng đầy đủ</Text>
                                    <Text style={{marginLeft:10, marginTop:10}}><Icon size={15} source="shower"/> Toilet riêng trong phòng</Text>
                                    <Text style={{marginLeft:10, marginTop:10}}><Icon size={15} source="television"/> Tivi</Text>
                                    <Text style={{marginLeft:10, marginTop:10}}><Icon size={15} source="air-conditioner"/>Máy lạnh</Text>
                                    <Text style={{marginTop:10}}>{r.id_room.description}</Text>
                                </Card.Content>
                            </Card>
                            
                           
                        )
                    }
                 })}
                
                <View>
                    {like===null?
                        <ActivityIndicator/>:<></>}
                    {like.map(l=>{
                        if(l.id==user.id)
                            if(l.Active==true)
                                {
                                    return(
                                        <View style={{ flexDirection: 'row' }}><Text>{like.length}</Text><TouchableOpacity onPress={()=>dislike()}><Icon source="heart" color={MD3Colors.error50} size={30}></Icon></TouchableOpacity></View>
                                        )
                                }
                            else
                                {
                                    return(
                                        <View style={{ flexDirection: 'row' }}><Text>{like.length}</Text><TouchableOpacity onPress={()=>create_like()}><Icon source="heart" color={MD3Colors.secondary50} size={30}></Icon></TouchableOpacity></View>)
                                }

                    })}
                    </View>
                    

                   
                    <Button style={StyleAll.margin}  icon="bag-personal" mode="contained"  key={hotel_id} >
                    Đặt lịch</Button>
                </Card>
            }

           </ScrollView>
           </View>
       
         
    );
};
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
      },card3:{
        backgroundColor:"#f5eedd",
        marginBottom:30,
        marginLeft:8,
        marginRight:8,
        marginTop:10,
        height:400,
    },
    tieude:{
        fontWeight:'bold',
        fontSize:30, 
        marginTop:10, 
        color:'black',
    },
    text:{
        fontSize:18,
        marginLeft:10,
        marginTop:10
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
    },title1:{
        fontWeight:'bold',
        fontSize:20, 
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
export default HotelDetail;