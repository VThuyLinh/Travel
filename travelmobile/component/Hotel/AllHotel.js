import axios from "axios";
import React, { useState } from "react"
import APIs from "../../config/APIs";
import { ActivityIndicator, Avatar, Card, Icon, Searchbar } from "react-native-paper";
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StyleAll from "../../style/StyleAll";
import { isCloseToBottom } from "../Utils/util";
import { useNavigation } from "@react-navigation/native";

const Hotel=()=>{
    
  const [visible, setVisible] = React.useState(false);
  const showSearch = () => setVisible(true);
  const hideSearch = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const navigation= useNavigation();

  
    const [hotel, setHotel]= React.useState([]);
    const [place, setPlace]= React.useState([]);
    const [address,setAddress]= React.useState('');
    const [page,setPage]= React.useState(1);
    const [loading, setLoading]= React.useState(false)
    const loadHotel= async()=>{
        try{
        let res= await APIs.get(`https://thuylinh.pythonanywhere.com/Hotel/?address=${address}&&page=${page}`)
        let res1= await APIs.get(`https://thuylinh.pythonanywhere.com/Place/`)
        setPlace(res1.data);
        if (page === 1) 
            {setHotel(res.data.results) 
            console.info(res.data.results)}
        else if (page > 1)
            setHotel(current => {
                return [...current, ...res.data.results]
            });}
        catch (ex) {
            console.error("Lỗi",ex.message);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(()=>{
        loadHotel();
       },[address,page]);

    const loadMore = ({nativeEvent}) => {
        if (loading===false && isCloseToBottom(nativeEvent)) {
            console.log(page);
            setPage(parseInt(page) + 1);
            
        }
    }

    const search = (value, callback) => {
        setPage(1);
        callback(value);
        setQ(value);
    }

    return (
        <View style={StyleAll.container}>
        <RefreshControl onRefresh={() => loadHotel()} />
        <ScrollView onScroll={loadMore}>
        <Text style={styles.tieude1}> Hotel</Text>
        <View>
            <Searchbar style={StyleAll.sear} value={address} placeholder="Tìm khách sạn..." onChangeText={t => search(t, setAddress)} />
        </View>
        
        {loading ? <ActivityIndicator/>:<>
            {hotel.map(b=> 
            <Card mode="elevated" style={StyleAll.card2} key={b.id}> 
                <Card.Content>
                {place.map(p=>{
                    if(p.id==b.place)
                    {
                        return(
                            <View>
                                <Text style={styles.tieude}>{b.nameofhotel}</Text>
                                <Text style={{marginLeft:20, fontSize:15,marginTop:9}}><Icon size={15} source="home-city"/> {b.address}</Text>
                                <Text style={{marginLeft:20, fontSize:15,marginTop:9, marginBottom:15}}><Icon size={15} source="map-marker"/> {p.Place_Name}</Text>
                            </View>
                        )
                    }
                })}
                
                
                </Card.Content>
                {loading && <ActivityIndicator />}
                <Card.Cover style={StyleAll.imgincard} source={{ uri: `https://res.cloudinary.com/dqcjhhtlm/${b.image}` }}/>  
              
                <TouchableOpacity style={{marginLeft:270, marginTop:10}} onPress={()=>navigation.navigate("hoteldetail",{'hotel_id':b.id})} key={b.id}>
                    <Text style={{marginTop:10, fontSize:16}}><Icon color="#153050" size={20} name="mountain-sun"></Icon>  Xem thêm</Text>
                    </TouchableOpacity>
                
            </Card>)}

        </>}   
       
        </ScrollView>
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
        fontSize:20, 
        marginTop:10,
        marginLeft:10, 
        color:'black',
    },
    tieude1:{
        fontWeight:'bold',
        fontSize:30, 
        marginTop:10,
        color:'black',
        marginLeft:140
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
export default Hotel;