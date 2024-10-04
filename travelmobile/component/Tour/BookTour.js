import { View, Text, Image, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Avatar, Button, Card, Dialog, HelperText, PaperProvider, Portal, TextInput, TouchableRipple } from "react-native-paper";
import StyleAll from "../../style/StyleAll";
import APIs, { endpoints } from "../../config/APIs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext} from "react";
import { useState } from "react";
import { MyUserContext } from "../../config/context";
import { Alert } from "react-native";
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import Code from "../../component/code/code"
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookTour =({route})=>{
    const user = useContext(MyUserContext);
    
    const id_tour_id = route.params?.id_tour_id;
    const Adult_price = route.params?.Adult_price;
    const Children_price = route.params?.Children_price;
    const DeparturePlace = route.params?.DeparturePlace;
    const Destination = route.params?.Destination;
    const vehicle= route.params?.vehicle;
    const DepartureDay = route.params?.DepartureDay;
    const DepartureTime = route.params?.DepartureTime;
    const Days= route.params?.Days;
    const Tour_Name= route.params?.Tour_Name;
    const Nights= route.params?.Nights;
    const [qadult, setQAdult] = React.useState('');
    const [token, setToken]= React.useState('');
    const [qchildren, setQChildren] = React.useState('');
    const [code, setCode]= React.useState('');
    const [loading, setLoading] = React.useState(false);
    const nav = useNavigation();

    const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 10; 
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);   
    
        }
        setCode(result);   
    
      };
    

   
    console.warn(id_tour_id,qadult,qchildren,Adult_price,Children_price,qadult*Adult_price,qchildren*Children_price,user.id)
    const booktour = async () => {
                let formData={
                    id_booktour: code,
                    Quantity_Adult: qadult,
                    Quantity_Children: qchildren,
                    Price: qadult*Adult_price + qchildren*Children_price,
                    id_customer_bt: user.id,
                    id_tour_id: id_tour_id        
                }
                AsyncStorage.getItem("token").then((value)=>{
                    setToken(value)})
                    console.warn(token);
                setLoading(true)
                try {
                    axios.post(`https://thuylinh.pythonanywhere.com/BookTour/${id_tour_id}/`,formData,{
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        },
                })
                    .then((respone)=>console.log(respone))
                    .catch((err)=>console.error(err.request))
                    nav.navigate("Home");
                  
                       
                    
                } catch (ex) {
                    console.log(ex);
                    
                   
                } finally {
                    setLoading(false);
                }
            }
        
           
    return (
    <View>
            <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Card>
                <Card.Content>
                    <Text>Thông tin chuyến đi</Text>
                    <Text>Tour_Name :{Tour_Name}</Text>
                    <Text>Nơi đi :{DeparturePlace}</Text>
                    <Text>Nơi đến :{Destination}</Text>
                    <Text>Ngày khởi hành:{DepartureDay}</Text>
                    <Text>Giờ khởi hành:{DepartureTime}</Text>
                    <Text> {Days} Ngày {Nights} Đêm</Text>
                    <Text>Phương tiện :{vehicle}</Text>  
                </Card.Content>
                <Card.Content>
                    <Text>Thông tin người đặt</Text>
                    <Text>Họ tên :{user.first_name} {user.last_name}</Text>
                    <Text>Email :{user.email}</Text>
                    <Text>Sdt :{user.sdt}</Text>
                </Card.Content>
            </Card>
            <TextInput placeholder="Người lớn" style={StyleAll.input} onChangeText={(value)=>setQAdult(value)}></TextInput>
            <TextInput placeholder="Trẻ em" style={StyleAll.input} onChangeText={(value)=>setQChildren(value)}></TextInput>
            <Text>Tổng tiền vé người lớn : {(qadult*Adult_price)}</Text>
            <Text>Tổng tiền vé trẻ em : {(qchildren*Children_price)}</Text>
            <Text>Tổng tiền : {(qadult*Adult_price)+(qchildren*Children_price)}</Text>
            </KeyboardAvoidingView>
            
            <Button style={StyleAll.margin}  loading={loading} icon="bag-personal" mode="contained"  
            onPress ={()=> { booktour();generateRandomString() ; Alert.alert('Bạn đã đặt chuyến đi thành công. Hãy thanh toán trong 8h để được xác nhận nhé')}} >
                    Đặt chuyến đi 
            </Button>
            
        </ScrollView>
    </View>
    )
}

export default BookTour;