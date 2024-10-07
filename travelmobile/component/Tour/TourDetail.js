import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
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

const TourDetail = ({ navigation,route }) => {
    const [tourdetail, setTourDetail] = React.useState([]);
    const [noidi, setNoidi]= React.useState([]);
    const [noiden, setNoiden]= React.useState([]);
    const [ptien, setPTien]= React.useState([]);
    const [lis, setLis]= React.useState([]);
    const [gkhanh, setGioKH]= React.useState([]);
    const [nkhanh, setNgayKH]= React.useState([]);
    const [anh, setAnh]= React.useState([]);
    const [cmt, setComment]= React.useState([]);
    const [rating, setRating]= React.useState([]);
    const [cmtTour, setCommentTour]= React.useState([]);
    const [like, setLike]= React.useState([]);
    const [token, setToken]= React.useState([]);
    const [image, setImage]= React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [active, setActive] = React.useState(false);
    const [active1, setActive1] = React.useState(false);
    const [active2, setActive2] = React.useState(false);
    const [active3, setActive3] = React.useState(false);
    const [active4, setActive4] = React.useState(false);
    const [active5, setActive5] = React.useState(false);
    const nav = useNavigation();
    const tour_id = route.params?.tour_id;
    
    const { width } = useWindowDimensions();
    const loadTourDetail = async() => {
        try {
            let res = await APIs.get(endpoints["tourdetail"](tour_id));
            setTourDetail(res.data);
            setNoidi(res.data.DeparturePlace.Place_Name)
            setNoiden(res.data.Destination.Place_Name)
            setPTien(res.data.vehicle.Name)
            setGioKH(res.data.DepartureTime.DepartureTime)
            setNgayKH(res.data.DepartureDay)
            setAnh(res.data.album.id)
            setComment(res.data.cmt_tour)
            setRating(res.data.rating_tour)
            setLike(res.data.like_tour)
            setLis(res.data.vehicle.License)
            let res1= await APIs.get(endpoints["image"]);
            setImage(res1.data);
            AsyncStorage.getItem("token").then((value)=>{
                setToken(value)
            })
           
        } catch (ex) {
            console.error("hello",ex);
        }
    }
    

    const user= useContext(MyUserContext);  

    React.useEffect(() => {
        loadTourDetail();
    }, [tour_id]);

    const [visible, setVisible] = React.useState(false);

    const showCMT = () => setVisible(true);
  
    const hideCMT = () => setVisible(false);
    
    const [loading, setLoading] = React.useState(false);
    const [content, setContent]= React.useState([]);

    
    const create_cmt = async () => {
        let formData={
            content:content,
        }
        
        setLoading(true)
        try {
            axios.post(`https://thuylinh.pythonanywhere.com/TourDetail/${tour_id}/add_comments/`,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            .then((respone)=>console.log(respone))
            .catch((err)=>console.error(err.request))

            console.log(cmtTour);


            
            if (res.status === 201)
               nav.navigate("tour");
               
            
        } catch (ex) {
            console.log(ex.request);
            console.log(ex);
            
           
        } finally {
            setLoading(false);
        }
    }

    const updateState = (field, value) => {
        setCommentTour( t => {
            return { ...t, [field]: value }
        })
        console.log(cmtTour);
    }
    const create_like= async() =>{
        setLoading(true);
        let formData={
            Active:true
        }
        try {
            setActive(active? false: true);
            axios.post(`https://thuylinh.pythonanywhere.com/TourDetail/${tour_id}/like_tour/`,formData,{
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
            axios.post(`https://thuylinh.pythonanywhere.com/TourDetail/${tour_id}/like_tour/`,formData,{
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


    const create_rating1= async() =>{
        let formData={
            NumberOfStar: 1
        }
        setLoading(true);
        try {
            setActive1(active1? false: true);
            axios.post(`https://thuylinh.pythonanywhere.com/TourDetail/${tour_id}/create_rating_tour/`,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then((respone)=>console.log(respone))
            .catch((err)=>console.error(err.request))
        } catch (ex) {
            console.log(ex.request);
        } finally {
            setLoading(false);
        }
    }
    const create_rating2= async() =>{
        setLoading(true);
        let formData={
            NumberOfStar: 2
        }
        try {
            setActive1(true);
            setActive2(active2? false: true);
            axios.post(`https://thuylinh.pythonanywhere.com/TourDetail/${tour_id}/create_rating_tour/`,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then((respone)=>console.log(respone))
            .catch((err)=>console.error(err.request))
        } catch (ex) {
            console.log(ex.request);
        } finally {
            setLoading(false);
        }
    }
    const create_rating3= async() =>{
        setLoading(true);
        let formData={
            NumberOfStar: 3
        }
        try {
            setActive1(true);
            setActive2(true);
            setActive3(active3? false: true);
            axios.post(`https://thuylinh.pythonanywhere.com/TourDetail/${tour_id}/create_rating_tour/`,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then((respone)=>console.log(respone))
            .catch((err)=>console.error(err.request))
        } catch (ex) {
            console.log(ex.request);
        } finally {
            setLoading(false);
        }
    }
    const create_rating4= async() =>{
        setLoading(true);
        let formData={
            NumberOfStar: 4
        }
        try {
            setActive1(true);
            setActive2(true);
            setActive3(true);
            setActive4(active4? false: true);
            axios.post(`https://thuylinh.pythonanywhere.com/TourDetail/${tour_id}/create_rating_tour/`,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
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
    const create_rating5= async() =>{
        setLoading(true);
        let formData={
            NumberOfStar: 5
        }
        try {
            setActive1(true);
            setActive2(true);
            setActive3(true);
            setActive4(true);
            setActive5(active5? false: true);
            axios.post(`https://thuylinh.pythonanywhere.com/TourDetail/${tour_id}/create_rating_tour/`,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then((respone)=>console.log(respone))
            .catch((err)=>console.error(err.request))
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
            <RefreshControl onRefresh={() => loadTourDetail()} />
           <ScrollView style={[StyleAll.container, StyleAll.margin]} onScroll={loadMore} >
            {tourdetail===null?<ActivityIndicator animating={true} color={'blue'} />:
                <Card style={StyleAll.bgrcolor}>
                    <Card.Content>
                    {/* .slice(0,10) */}
                        <Text variant="titleLarge" style={StyleAll.text3}>{tourdetail.Tour_Name}</Text>
                        <Text style={StyleAll.text4}>{tourdetail.Days} ngày {tourdetail.Nights==0 ?'':`${tourdetail.Nights} đêm`} </Text>
                        <Text style={StyleTour.text1}>Nơi đi: {noidi}</Text>
                        <Text style={StyleTour.text1}>Nơi đến : {noiden}</Text>
                        <Text style={StyleTour.text1}>Phương tiện : {ptien}</Text>
                        <Text style={StyleTour.text1}>Ngày khởi hành : {nkhanh}</Text>
                        <Text style={StyleTour.text1}>Giờ khởi hành : {gkhanh}</Text>
                        <Text style={StyleTour.text1}>Giá vé người lớn : {tourdetail.Adult_price}  VNĐ</Text>
                        <Text style={StyleTour.text1}>Giá vé trẻ em : {tourdetail.Children_price} VNĐ</Text>
                        <RenderHTML contentWidth={width} source={{html: tourdetail.Description}} />
                    </Card.Content>

                        <Text>{token}</Text>
      
                 {image.map(i=>{
                    if(i.album_id==anh)
                    {
                        return (
                            <Card style={{marginTop:15}}>
                                <Card.Cover source={{
                            uri: `https://res.cloudinary.com/dqcjhhtlm/${i.Path}`}} />
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
                    

                    {rating.map(r=>{
                        if(r.id==user.id)
                            if(r.NumberOfStar==null)
                                {
                                    return(
                                        <View style={{ flexDirection: 'row' }}>
                                        {active1?<>
                                        <View >
                                            <TouchableOpacity onPress={create_rating1}><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                        </View></>:<>
                                        <View >
                                            <TouchableOpacity onPress={create_rating1}><Icon source="star" color={'grey'} size={30} /></TouchableOpacity>
                                            </View>
                                        </>}
                                        {active2?<>
                                        <View >
                                            <TouchableOpacity onPress={create_rating1}><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                        </View></>:<>
                                        <View >
                                            <TouchableOpacity onPress={create_rating2}><Icon source="star" color={'grey'} size={30} /></TouchableOpacity>
                                            </View></>}
                                        {active3?<>
                                        <View >
                                            <TouchableOpacity onPress={create_rating3}><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                        </View></>:<>
                                        <View >
                                            <TouchableOpacity onPress={create_rating3}><Icon source="star" color={'grey'} size={30} /></TouchableOpacity>
                                            </View></>}
                                        {active4?<>
                                        <View >
                                            <TouchableOpacity onPress={create_rating4}><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                        </View></>:<>
                                        <View >
                                            <TouchableOpacity onPress={create_rating4}><Icon source="star" color={'grey'} size={30} /></TouchableOpacity>
                                            </View></>}
                                        {active5?<>
                                        <View >
                                            <TouchableOpacity onPress={create_rating5}><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                        </View></>:<>
                                        <View >
                                            <TouchableOpacity onPress={create_rating5}><Icon source="star" color={'grey'} size={30} /></TouchableOpacity>
                                            </View></>}</View>    
                                )
                            }
                            else {
                                return(
                                    <View>
                                        {rating.map(ra=>{
                                            if (ra.NumberOfStar==5)
                                                {
                                                    return(
                                                        <View style={{ flexDirection: 'row' }}>
                                                        <Text>{ra.user}</Text>
                                                        <Avatar.Image size={40}  source={{uri: `https://res.cloudinary.com/dqcjhhtlm/${ra.avatar}`}} />
                                                        <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                                        <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                                        <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                                        <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                                        <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity></View>)
                                                }
                                            else
                                                if (ra.NumberOfStar==4)
                                                    {
                                                        return(
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text>{ra.user}</Text>
                                                                <Avatar.Image size={40}  source={{uri: `https://res.cloudinary.com/dqcjhhtlm/${ra.avatar}`}} />
                                                            <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                                            <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                                            <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                                            <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity></View>)
                                                    }
                                                else
                                                    if (ra.NumberOfStar==3)
                                                    {
                                                        return(
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text>{ra.user}</Text>
                                                                <Avatar.Image size={40}  source={{uri: `https://res.cloudinary.com/dqcjhhtlm/${ra.avatar}`}} />
                                                                <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                                            <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                                            <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity></View>)
                                                    }
                                                    else
                                                        if (ra.NumberOfStar==2)
                                                        {
                                                            return(
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text>{ra.user}</Text>
                                                                    <Avatar.Image size={40}  source={{uri: `https://res.cloudinary.com/dqcjhhtlm/${ra.avatar}`}} />
                                                                    <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
                                                                <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity></View>)
                                                        }
                                                        else
                                                        {
                                                            return(
                                                                <View style={{ flexDirection: 'row' }}><Text>{ra.user}</Text>
                                                                    <Avatar.Image size={40}  source={{uri: `https://res.cloudinary.com/dqcjhhtlm/${ra.avatar}`}} />
                                                                    <TouchableOpacity><Icon source="star" color={'orange'} size={30} /></TouchableOpacity></View>
                                                                )
                                                        }
                                           
                                                    })}
                                       
                                    </View>
                                )
                            } 

                    })}
                    
                   

                   
                   

                    
                    
                
                    <View>
                        {cmt===null?
                        <View>
                            <Text>Hãy là người bình luận đầu tiên</Text>
                            
                        </View>:<></>}
                        {cmt===null?<ActivityIndicator />:<>
                            <Button onPress={showCMT}>+ Thêm bình luận</Button></>}
                        {cmt.map (c => 
                            <List.Item style={StyleTour.cmtt} left={()=>
                                <Avatar.Image size={40}  
                                source={{uri: `https://res.cloudinary.com/dqcjhhtlm/${c.avatar}`}} 
                                />
                                } 
                                right={()=><RenderHTML contentWidth={width} source={{html:c.content}}/>}/>)}

                        {cmt===null?
                        <View>
                            <Text>Hãy đánh giá tour</Text>
                            
                        </View>:<></>}
                        
                        
                        

                        
                           
    
                       
                        
                        <Portal>
                        <Dialog visible={visible} onDismiss={hideCMT}>
                        <Card >
                            <Card.Content>
                            <TextInput placeholder="nội dung" style={StyleAll.input} onChangeText={(value)=>setContent(value)}></TextInput>
                            </Card.Content>
                            <Card.Cover source={{ uri: 'https://picsum.photos/700' } }/>
                            <Card.Actions>
                            <Button>Cancel</Button>
                            <Button onPress={()=>{hideCMT(), create_cmt()}}>Ok</Button>
                            </Card.Actions>
                         </Card>
                         </Dialog>
                        </Portal>
                    </View>
                   
                    <Button style={StyleAll.margin}  icon="bag-personal" mode="contained"  onPress={()=>navigation.navigate("booktour",{'id_tour_id':tour_id,'Adult_price':tourdetail.Adult_price,'Children_price':tourdetail.Children_price,'Tour_Name':tourdetail.Tour_Name,'lisence':lis,'DeparturePlace':noidi,'Destination':noiden,'vehicle':ptien,'DepartureDay':nkhanh,'DepartureTime':gkhanh,'Days':tourdetail.Days,'Nights':tourdetail.Nights})} key={tour_id} >
                    Đặt lịch</Button>
                </Card>
            }

           </ScrollView>
           </View>
         
    );
};

export default TourDetail;