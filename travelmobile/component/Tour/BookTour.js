import { View, Text, Image, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Avatar, Button, Card, Dialog, HelperText, PaperProvider, Portal, TextInput, TouchableRipple } from "react-native-paper";
import StyleAll from "../../style/StyleAll";
import APIs, { endpoints } from "../../config/APIs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { MyUserContext } from "../../config/context";
import { Alert } from "react-native";
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

const BookTour =({route})=>{
    const user = useContext(MyUserContext);
    
    const id_tour_id = route.params?.id_tour_id;
    const Adult_price = route.params?.Adult_price;
    const Children_price = route.params?.Children_price;
    const DeparturePlace = route.params?.DeparturePlace;
    const Destination = route.params?.Destination;
    const vehicle= route.params?.vehicle;
    const DepartureDay = route.params?.DepartureDay;
    const Days= route.params?.Days;
    const Tour_Name= route.params?.Tour_Name;
    const lisence= route.params?.lisence;
    const Nights= route.params?.Nights;
    const fields = [{
    
        "label": "Họ",
        "icon": "card-account-phone-outline",
        "name": "FirstName_BookTour",
        "value": user?.first_name
    },{
        "label": "Tên",
        "icon": "card-account-phone-outline",
        "name": "LastName_BookTour",
        "value": user?.last_name
    }, {
        "label": "Email",
        "icon": "email-outline",
        "name": "Email_BookTour",
        "value": user?.email
    }
    , {
        "label": "Số điện thoại",
        "icon": "cellphone-basic",
        "keyboardType":"numeric",
        "name": "Phone_BookTour",
        "value": user?.sdt
    },
    {
        "label": "Người lớn",
        "icon": "human-male",
        "keyboardType":"numeric",
        "name": "Quantity_Adult",
        "default":"1"
    },
    {
        "label": "Trẻ em",
        "icon": "baby-face-outline",
        "keyboardType":"numeric",
        "name": "Quantity_Children",
        "default":"0"
       
    }];
    const [loading, setLoading] = React.useState(false);
    // const [error, setError] = React.useState(false);
    const nav = useNavigation();
    const [bk, setBK]= useState({"FirstName_BookTour":user.first_name,"LastName_BookTour":user.last_name,"Email_BookTour":user.email,"Phone_BookTour":user.sdt,"Quantity_Adult":1,"Quantity_Children":0});

    const booktour = async () => {
        
                setLoading(true)
                try {
                    
                    let form = new FormData();
                    
                    for (let key in bk)
                        {
                            form.append(key, bk[key]);
                        }
                    console.log(bk);
                    form.append("id_tour_id",id_tour_id); 
                    form.append("id_customer_bt",user.id); 
                    form.append("DeparturePlaceBookTour",DeparturePlace); 
                    form.append("DepartureTimeBookTour",DepartureDay); 
                    form.append("DestinationBookTour",Destination); 
                    form.append("DaysBookTour",Days);    
                    form.append("NightsBookTour",Nights); 
                    form.append("vehicleBookTour",vehicle);
                    form.append("TourName",Tour_Name);
                    form.append("children_price",Children_price);
                    form.append("adult_price",Adult_price);
                    console.info(form);
        

                    let res = await APIs.post(endpoints['booktour'], form, {headers: {'Content-Type': 'multipart/form-data'}});
                    if (res.status === 201)
                       nav.navigate("MyTour");
                       
                    
                } catch (ex) {
                    console.log(ex);
                    
                   
                } finally {
                    setLoading(false);
                }
            }
        
    
            const updateState = (field, value) => {
                setBK( t => {
                    return { ...t, [field]: value }
                })
                console.log(bk.response);
            }
        
           
    return (
    <View>
            <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {fields.map(f => <TextInput value={f.value} defaultValue={f.default} onChangeText={t=> updateState(f.name,t) } key={f.name} style={StyleAll.margin} label={f.label} secureTextEntry={f.secureTextEntry} keyboardType={f.keyboardType} right={<TextInput.Icon icon={f.icon} />} />)}
            <Text>Tổng tiền vé người lớn : {(bk.Quantity_Adult*Adult_price)}</Text>
            <Text>Tổng tiền vé trẻ em : {(bk.Quantity_Children*Children_price)}</Text>
            <Text>Tổng tiền : {(bk.Quantity_Adult*Adult_price)+(bk.Quantity_Children*Children_price)}</Text>
            </KeyboardAvoidingView>
            
            <Button style={StyleAll.margin}  loading={loading} icon="bag-personal" mode="contained"  
            onPress ={()=> { booktour() ; Alert.alert('Bạn đã đăng ký thành công. Hãy thanh toán trước 24h để được xác nhận nhé')}} >
                    Đặt chuyến đi 
            </Button>
            
        </ScrollView>
    </View>
    )
}

export default BookTour;