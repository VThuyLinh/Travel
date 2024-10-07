import { ImageBackground, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { ActivityIndicator, Button, Card, Chip, DataTable, Searchbar, SegmentedButtons, Text } from "react-native-paper"
import React, { useContext, useState } from "react"
import APIs, { endpoints } from "../../config/APIs"
import moment from "moment"
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from "react-native-vector-icons/FontAwesome6"
import { isCloseToBottom } from "../Utils/util"

import Calendar from "../Calendar/Calendar"
import { Image } from "react-native"
import StyleAll from "../../style/StyleAll"
import { MyUserContext } from "../../config/context"
import StyleTour from "../../style/StyleTour"
import Location from "../Location/Location"









const Tour =({navigation}) =>
    {
        const user= useContext(MyUserContext);  
        
        const [tour,setTour]=React.useState([]);
       
        const [page, setPage]= React.useState(1);
        const [DeparturePlace, setDeparturePlace] = React.useState("");
        const [Destination, setDestination] = React.useState("");
        const [DepartureTime, setDepartureTime] = React.useState("");
        const [price, setPrice] = React.useState("");
        const [loading, setLoading] = React.useState(false);
        

    const loadTour = async () => {
        if (page > 0) {
            let url = `${endpoints['tour']}?noidi=${DeparturePlace}&noiden=${Destination}&thoigiandi=${DepartureTime}&Price=${price}&page=${page}`;
            try {
                setLoading(true);
                let res = await APIs.get(url);
                if (page === 1) 
                    {setTour(res.data.results) 
                    console.info(res.data.results)}
                else if (page > 1)
                    setTour(current => {
                        return [...current, ...res.data.results]
                    });
                // if (res.data.count === null) 
                //     console.log("không tìm thấy") 
                //     setPage(0);
            } catch (ex) {
                console.error("Lỗi",ex);
            } finally {
                setLoading(false);
            }
        }
    }

   

        React.useEffect(()=>{
             loadTour();
            },[DeparturePlace,DepartureTime,Destination, page, price]);


        
        
            const loadMore = ({nativeEvent}) => {
                if (loading===false && isCloseToBottom(nativeEvent)) {
                    console.log(page);
                    setPage(parseInt(page) + 1);
                    
                }
            }
            const [value, setValue] = React.useState('Destination');
            const [q, setQ] = React.useState('');

            const search = (value, callback) => {
                setPage(1);
                callback(value);
                setQ(value);
            }


            const items = [1, 2, 3, 4, 5,6,7];
        return(
            
        <View style={StyleAll.container}>
        
            <RefreshControl onRefresh={() => loadTour()} />
            <ScrollView onScroll={loadMore}>
            <Text style={StyleAll.tourspage}> Where do you like to go ?</Text>
            <View>
                <Searchbar style={StyleAll.sear} value={q} placeholder="Tìm chuyến đi..." onChangeText={t => value==='Destination'?search(t, setDestination):value==='DeparturePlace'?search(t, setDeparturePlace):search(t, setPrice)} />
                
                <SegmentedButtons 
                    style={StyleAll.sty}
                    density="small"
                    value={value}
                    onValueChange={t=> {setValue(t);setQ("")}}
                    buttons={[
                    {
                        value:'Destination',
                        label: 'Nơi đến',
                        icon:'bus-side'
                        
                    },
                    {
                        value: 'DeparturePlace',
                        label: 'Nơi đi',
                        icon:'home-outline'
                    },
                    {   value: 'Price', 
                        label: 'Giá' ,
                        icon:'cash-100'
                    },
                    ]}
                />
            </View>
            <View style={{  textAlign:"center", marginTop:20, marginLeft:235, marginRight:35, borderRadius:20}}>
                <Calendar></Calendar>
            </View>
            
            
            {loading ? <ActivityIndicator/>:<>
                {tour.map(c=> 
                <Card mode="elevated" style={StyleAll.card} key={c.id}> 
                    <Card.Content>
                    <Text style={StyleAll.text1}>{c.Id_Tour}</Text>
                    <Text style={StyleAll.text}>{c.Tour_Name}</Text>
                    </Card.Content>
                    {loading && <ActivityIndicator />}
                    <Card.Cover style={StyleAll.imgincard} source={{ uri: `https://res.cloudinary.com/dqcjhhtlm/${c.cover}` }}/>
                    
                    <Text style={StyleAll.text2}>Ngày đăng: {moment(c.DatePost).fromNow()}</Text>
                    <Card.Actions>
                    {user===null?<>
                        <Text style={StyleTour.text1}>Vui lòng <Text style={[StyleTour.loginn, StyleTour.text1]}onPress={()=> navigation.navigate("Login")}>đăng nhập</Text> để có những trải nghiệm tốt nhất cùng Ethereal_Travel</Text>
                    </>:<>
                    <TouchableOpacity onPress={()=>navigation.navigate("tourdetail",{'tour_id':c.id})} key={c.id}><Text style={StyleAll.icon}><Icon color="#153050" size={20} name="mountain-sun"></Icon>  Xem thêm</Text></TouchableOpacity>
                    </>}
                    </Card.Actions>
                </Card>)}
            </>}   
           <View style={{ flexDirection: 'row' }}>
               { items.map((item) => <Button title="a"></Button>)}
           </View>
            </ScrollView>
        </View>
        
        );
    }
    

export default Tour;