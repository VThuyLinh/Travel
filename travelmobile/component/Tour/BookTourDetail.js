import { Linking, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import StyleAll from "../../style/StyleAll"
import { ActivityIndicator, Button, Card, Chip, Icon, List, Text } from "react-native-paper"
import React, { useContext, useState } from "react"
import APIs, { endpoints } from "../../config/APIs"
import moment from "moment"


import { MyDispatchContext, MyUserContext } from "../../config/context"
import StyleTour from "../../style/StyleTour"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { isCloseToBottom } from "../Utils/util"
import { useNavigation } from "@react-navigation/native"








const BookTourDetail =({navigation}) =>
    {
        const user= useContext(MyUserContext);
        let date= new Date();
        const nav= useNavigation();
        const [booktourdetail, setBookTourDetail]=React.useState([]);
        const [tour, setTour]=React.useState([]);
        const [active, setActive]=React.useState(true);
        const [day, setDay]= React.useState('');
        const [month, setMonth]= React.useState('');
        const [year, setYear]= React.useState('');
        const [token, setToken]= React.useState('');
        const [loading, setLoading] = React.useState(false);
        let mngay='';
        const loadBookTourDetail = async () =>{
            try{
                setLoading(true)
                let res= await APIs.get(endpoints['booktourdetail']);
                setBookTourDetail(res.data);
                let res1= await APIs.get(endpoints['tour']);
                setTour(res1.data.results);
                setDay(date.getDate());
                setMonth(parseInt(date.getMonth())+1);
                setYear(date.getFullYear());
                mngay= Date.UTC(year,month,day);
                let a=  Date.UTC('2024','11','12');
                console.warn(a);
                console.info(mngay);
               
            }
            catch (ex){
                console.error(ex);
            }
        }
        const payment = async (id) => {
            let formData={
                State:"Paid"       
            }
            setLoading(loading?true:false)
            AsyncStorage.getItem("token").then((value)=>{
                setToken(value)})
                console.warn(token);
            setLoading(true)
            try {
                axios.patch(`https://thuylinh.pythonanywhere.com/BookTour/${id}/`,formData,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
            })
                .then((respone)=>console.log(respone))
                .catch((err)=>console.error(err.request))
                
              
                   
                
            } catch (ex) {
                console.log(ex);
                
               
            } finally {
                setLoading(false);
            }
        }
        
      


        const complete = async (id) => {
            let formData={
                State:"Complete"       
            }
            setLoading(loading?true:false)
            AsyncStorage.getItem("token").then((value)=>{
                setToken(value)})
                console.warn(token);
            setLoading(true)
            try {
                axios.patch(`https://thuylinh.pythonanywhere.com/BookTour/${id}/`,formData,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
            })
                .then((respone)=>console.log(respone))
                .catch((err)=>console.error(err.request))
               
              
                   
                
            } catch (ex) {
                console.log(ex);
                
               
            } finally {
                setLoading(false);
            }
        }
  

        React.useEffect(()=>{
             loadBookTourDetail();
            },[]);
            

            const loadMore = () => {
                if (loading==false) {
                    setActive(active?true:false);
                    
                }
            }

        return(
        <View style={StyleAll.container}>
            <RefreshControl onRefresh={() => loadBookTourDetail()} />
            <ScrollView onScroll={loadMore}>  
                {booktourdetail.map(c=> c.id_customer_bt!==user.id?<>
                    
                </>:<>
                <Text style={styles.tieude}>Chặng đường mà bạn đã đi  <Icon size={30} source='airplane-takeoff'/></Text>
               
                {booktourdetail === null ? <><ActivityIndicator/> 
                <Text>Hiện tại bạn chưa có chuyến đi nào. Hãy chọn cho mình 
                        <Text onPress={()=> navigation.navigate("tour")}>chuyến đi</Text> để có những trải nghiệm tốt nhất cùng TL_Travel</Text></>:<>
                    <Card mode="elevated" style={StyleTour.card}>
                        <Card.Content>
                        <View style={{ width: '100%', height: 1, backgroundColor: 'black', marginBottom:8}} />
                        <Text style={StyleTour.text2}>Thông tin người đi</Text>
                        <Text style={StyleTour.text1}>Người đặt chuyến đi : {user.first_name+" " + user.last_name}</Text>
                        <Text style={StyleTour.text1}>Số điện thoại : {user.sdt}</Text>
                        <Text style={StyleTour.text3}>Email nhận hóa đơn : {user.email}</Text>
                        <View style={{ width: '100%', height: 1.5, backgroundColor: 'black', marginBottom:8, marginTop:8  }} />
                        <Text style={StyleTour.text2}>Thông tin chuyến đi</Text>
                        
                        {tour.map(to=>
                            <View>
                                <Text style={StyleTour.text1}>Chuyến đi : {to.Tour_Name}</Text>
                                <Text style={StyleTour.text1}>Phương tiện di chuyển :{to.vehicle.Name}</Text>
                                <Text style={StyleTour.text1}>Số hiệu phương tiện :{to.vehicle.License}</Text>
                                <Text style={StyleTour.text1}>Giá vé người lớn :{to.Adult_price}</Text>
                                <Text style={StyleTour.text1}>Giá vé trẻ em :{to.Children_price}</Text>
                                <Text style={StyleTour.text1}>Nơi đi : {to.DeparturePlace.Place_Name}</Text>
                                <Text style={StyleTour.text1}>Nơi đến : {to.Destination.Place_Name}</Text>
                                <Text style={StyleTour.text1}>Ngày khởi hành: {to.DepartureDay} </Text>
                                <Text style={StyleTour.text1}>Giờ khởi hành: {to.DepartureTime.DepartureTime} </Text>
                                <Text style={StyleTour.text1}>Hành trình: {to.Days} Ngày {to.Nights} Đêm </Text>
                               
                            </View>
                        )}
                        {tour.map(tou=>{
                            
                        })}
                        

                        <View style={{ width: '100%', height: 1.5, backgroundColor: 'black', marginBottom:8, marginTop:8  }} />
                        <Text style={StyleTour.text2}>Thông tin đặt tour</Text>
                        <Text style={StyleTour.text1}>Mã đặt tour :{c.id_booktour}</Text>
                        <Text style={StyleTour.text1}>Ngày đặt chuyến đi : {c.book_date}</Text>
                        <Text style={StyleTour.text1}>Số vé người lớn :{c.Quantity_Adult}</Text>
                        <Text style={StyleTour.text1}>Số vé trẻ em :{c.Quantity_Children}</Text>
                        <Text style={StyleTour.text1}>Tổng tiền :{c.Price}</Text>
                        <View style={{ width: '100%', height: 1.5, backgroundColor: 'black', marginBottom:8, marginTop:8  }} />
                        
                        {c.State==="Wait for Paid"?<>
                        <View style={{ flexDirection: 'row' }}>
                        <Button style={StyleTour.btn1a} onPress={()=>{payment(`${c.id}`),nav.navigate("pay",{'price':c.Price})}}><Text style={StyleTour.text22}>Thanh toán</Text></Button>
                        <Button style={StyleTour.btn1b} onPress={()=>nav.navigate('reject')}><Text style={StyleTour.text22}>Hủy</Text></Button>
                        </View>
                        </>:<></>}

                        {c.State==='Paid'?
                        <>
                            <Text>Hãy bỏ đồ vào vali và chuẩn bị đi thôi</Text>
                           <View style={{ flexDirection: 'row' }}>
                           <Button style={StyleTour.btn2} ><Text style={StyleTour.text21}>{c.State}</Text></Button>
                           <Button style={StyleTour.btn1b} onPress={()=>nav.navigate('reject')}><Text style={StyleTour.text22}>Hủy</Text></Button>
                           </View>
                        </>:<></>}

                        {c.State==='Complete'?<>
                            <Button style={StyleTour.btn1} ><Text style={StyleTour.text21}>{c.State}</Text></Button>
                        </>:<></>}
                        {c.State==='Reject'?
                        <>
                            <Button style={StyleTour.btn3} ><Text style={StyleTour.text21}>{c.State}</Text></Button>
                        </>:<></>}
                        
                        
                        
                        
                        </Card.Content>
                    </Card></>}
                    
                        
               
                </>)}
    
            </ScrollView>
        </View>
        
        );
    }
    const styles= StyleSheet.create({
        tieude:{
            fontWeight:'bold',
            fontSize:30, 
            marginTop:10, 
            color:'black',
            marginLeft:15,
            marginBottom:10
        },
    });
    

export default BookTourDetail;
 