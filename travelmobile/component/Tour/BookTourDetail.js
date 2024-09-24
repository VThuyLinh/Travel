import { ScrollView, TouchableOpacity, View } from "react-native"
import StyleAll from "../../style/StyleAll"
import { ActivityIndicator, Button, Card, Chip, Text } from "react-native-paper"
import React, { useContext, useState } from "react"
import APIs, { endpoints } from "../../config/APIs"
import moment from "moment"

import Icon from "react-native-vector-icons/FontAwesome6"
import { MyDispatchContext, MyUserContext } from "../../config/context"
import StyleTour from "../../style/StyleTour"





const BookTourDetail =({navigation}) =>
    {
        const user= useContext(MyUserContext);
        const [booktourdetail, setBookTourDetail]=React.useState([]);
        const tour= useContext(MyDispatchContext);

        const loadBookTourDetail = async () =>{
            try{
                let res= await APIs.get(endpoints['booktourdetail']);
                setBookTourDetail(res.data);
                
            }
            catch (ex){
                console.error(ex);
            }
        }

        React.useEffect(()=>{
             loadBookTourDetail();
            },[]);
            // {booktourdetail.map(c=> {const [year, month, day] = c..slice(0,10).split('-');
            //     const formattedDate = `${day}/${month}/${year}`;})}
            function formatDate(date){
                const [year, day, month] = date.slice(0,10).split('-');
                const formattedDate = `${day}/${month}/${year}`;
                return formattedDate
            }
            function formatDate1(date){
                const [year, month, day] = date.slice(0,10).split('-');
                const formattedDate = `${day}/${month}/${year}`;
                return formattedDate
            }
            

            function formatMoney(number){
                number= number.toLocaleString('vi-VN');
                return number
            }
        return(
        <View style={StyleAll.container}>
            <ScrollView>  
                {booktourdetail.map(c=> c.id_customer_bt!==user.id?<>
                    
                </>:<>
                {booktourdetail === null ? <><ActivityIndicator/> 
                <Text>Hiện tại bạn chưa có chuyến đi nào. Hãy chọn cho mình 
                        <Text onPress={()=> navigation.navigate("tour")}>chuyến đi</Text> để có những trải nghiệm tốt nhất cùng TL_Travel</Text></>:<>
                    <Card mode="elevated" style={StyleTour.card}>
                        <Card.Content>
                        <View style={{ width: '100%', height: 1, backgroundColor: 'black', marginBottom:8}} />
                        <Text style={StyleTour.text2}>Thông tin người đi</Text>
                        <Text style={StyleTour.text1}>Người đặt chuyến đi : {c.FirstName_BookTour+" " + c.LastName_BookTour}</Text>
                        <Text style={StyleTour.text1}>Số điện thoại : {c.Phone_BookTour}</Text>
                        <Text style={StyleTour.text3}>Email nhận hóa đơn : {c.Email_BookTour}</Text>
                        <View style={{ width: '100%', height: 1.5, backgroundColor: 'black', marginBottom:8, marginTop:8  }} />
                        <Text style={StyleTour.text2}>Thông tin tour</Text>
                        <Text style={StyleTour.text1}>Chuyến đi :{c.TourName}</Text>
                        <Text style={StyleTour.text1}>Số hiệu phương tiện :{c.lisenceBookTour}</Text>
                        <Text style={StyleTour.text1}>Vé người lớn :{c.Quantity_Adult}</Text>
                        <Text style={StyleTour.text1}>Vé trẻ em :{c.Quantity_Children}</Text>
                        <Text style={StyleTour.text1}>Nơi đi : {c.DeparturePlaceBookTour}</Text>
                        <Text style={StyleTour.text1}>Nơi đến : {c.DestinationBookTour}</Text>
                        <Text style={StyleTour.text1}>Ngày khởi hành: {formatDate(c.DepartureTimeBookTour)} </Text>
                        <Text style={StyleTour.text1}>Giờ khởi hành: {c.DepartureTimeBookTour.slice(11,16)} </Text>
                        <Text style={StyleTour.text1}>Ngày đặt chuyến đi : {formatDate1(c.created_date)} {c.created_date.slice(11,16)}</Text>
                        <View style={{ width: '100%', height: 1.5, backgroundColor: 'black', marginBottom:8, marginTop:8  }} />
                        <Text style={StyleTour.text2}>Thanh toán</Text>
                        <Text style={StyleTour.text1}>Tiền vé người lớn: {c.adult_price} </Text>
                        <Text style={StyleTour.text1}>Tiền vé trẻ em: {c.children_price} </Text>
                        <Text style={StyleTour.text1}>Tổng tiền : {(c.adult_price*c.Quantity_Adult)+(c.children_price*c.Quantity_Children)}</Text>
                        {c.State==='Wait for Paid' || c.State==='WaitforPaid'?
                        <><Button style={StyleTour.btn} ><Text style={StyleTour.text21}>{c.State}</Text></Button></>
                        :<>{c.State==='Complete'?<><Button style={StyleTour.btn1} ><Text style={StyleTour.text21}>{c.State}</Text></Button></>
                        :<>{c.State==='Paid'?<><Button style={StyleTour.btn2} ><Text style={StyleTour.text21}>{c.State}</Text></Button></>
                        :<><Button style={StyleTour.btn3} ><Text style={StyleTour.text21}>{c.State}</Text></Button></>}</>}</>}
                        
                        </Card.Content>
                    </Card></>}
               
                </>)}
    
            </ScrollView>
        </View>
        
        );
    }

export default BookTourDetail;
 