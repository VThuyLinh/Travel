import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import React, { useContext } from "react";
import APIs, { endpoints } from "../../config/APIs";
import { Avatar, Button, Card, Dialog, Icon, List, MD3Colors, Portal, TextInput } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { Intl } from 'react-native';
import moment from "moment";
import StyleAll from "../../style/StyleAll";
import { MyUserContext } from "../../config/context";
import StyleTour from "../../style/StyleTour";
// import { useCurrencyFormatter } from 'react-native-currency-formatter';

const TourDetail = ({ navigation,route }) => {
    const [tourdetail, setTourDetail] = React.useState([]);
    const [noidi, setNoidi]= React.useState([]);
    const [noiden, setNoiden]= React.useState([]);
    const [ptien, setPTien]= React.useState([]);
    const [lis, setLis]= React.useState([]);
    const [gkhanh, setGioKH]= React.useState([]);
    const [anh, setAnh]= React.useState([]);
    const [cmt, setComment]= React.useState([]);
    const [cmtTour, setCommentTour]= React.useState([]);
    const [active, setActive] = React.useState(false);
    const [active1, setActive1] = React.useState(false);
    const [active2, setActive2] = React.useState(false);
    const [active3, setActive3] = React.useState(false);
    const [active4, setActive4] = React.useState(false);
    const [active5, setActive5] = React.useState(false);
    const tour_id = route.params?.tour_id;
    const { width } = useWindowDimensions();
    const loadTourDetail = async() => {
        try {
            let res = await APIs.get(endpoints["tourdetail"](tour_id));
            setTourDetail(res.data);
            setNoidi(res.data.DeparturePlace.Place_Name)
            setNoiden(res.data.Destination.Place_Name)
            setPTien(res.data.vehicle.Name)
            setGioKH(res.data.DepartureTime.DepartureDay)
            setAnh(res.data.album.image)
            setComment(res.data.cmt_tour)
            setLis(res.data.vehicle.License)
        } catch (ex) {
            console.error(ex);
        }
    }

    const user= useContext(MyUserContext);  

    React.useEffect(() => {
        loadTourDetail();
    }, [tour_id]);

    const [visible, setVisible] = React.useState(false);

    const showCMT = () => setVisible(true);
  
    const hideCMT = () => setVisible(false);
    
    const field =[
    {
        "label": "Nội dung",
        "icon": "baby-face-outline",
        "name": "content"
       
    }];
    const [loading, setLoading] = React.useState(false);
    const [content, setContent]= React.useState([]);


    const create_cmt = async () => {
        
        setLoading(true)
        try {
            
            let form = new FormData();
            
            
            form.append("content", cmtTour["content"]);
            
            console.log(cmtTour);
            console.info(form);

            let res = await APIs.post(endpoints['cmt_tour'](tour_id), form, {headers: {'Content-Type': 'multipart/form-data'}});
            if (res.status === 201)
               nav.navigate("tour");
               
            
        } catch (ex) {
            console.log(ex.response);
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
        try {
            setActive(active? false: true);
            await APIs.post(endpoints["like_tour"](tour_id));
        } catch (ex) {
            console.log(ex.request);
        } finally {
            setLoading(false);
        }
    }
    const create_rating1= async() =>{
        setLoading(true);
        try {
            setActive1(active1? false: true);
            await APIs.post(endpoints["rating_tour"](tour_id));
        } catch (ex) {
            console.log(ex.request);
        } finally {
            setLoading(false);
        }
    }
    const create_rating2= async() =>{
        setLoading(true);
        try {
            setActive2(active2? false: true);
            await APIs.post(endpoints["rating_tour"](tour_id));
        } catch (ex) {
            console.log(ex.request);
        } finally {
            setLoading(false);
        }
    }
    const create_rating3= async() =>{
        setLoading(true);
        try {
            setActive3(active3? false: true);
            await APIs.post(endpoints["rating_tour"](tour_id));
        } catch (ex) {
            console.log(ex.request);
        } finally {
            setLoading(false);
        }
    }
    const create_rating4= async() =>{
        setLoading(true);
        try {
            setActive4(active4? false: true);
            await APIs.post(endpoints["rating_tour"](tour_id));
        } catch (ex) {
            console.log(ex);
        } finally {
            setLoading(false);
        }
    }
    const create_rating5= async() =>{
        setLoading(true);
        try {
            setActive5(active5? false: true);
            await APIs.post(endpoints["rating_tour"](tour_id));
        } catch (ex) {
            console.log(ex.request);
        } finally {
            setLoading(false);
        }
    }
    
    
   
    
    return (
       
           <ScrollView style={[StyleAll.container, StyleAll.margin]} >
            {tourdetail===null?<ActivityIndicator animating={true} color={'blue'} />:
                <Card style={StyleAll.bgrcolor}>
                    <Card.Content>
                        <Text variant="titleLarge" style={StyleAll.text3}>{tourdetail.Tour_Name}</Text>
                        <Text style={StyleAll.text4}>{tourdetail.Days} ngày {tourdetail.Nights==0 ?'':`${tourdetail.Nights} đêm`} </Text>
                        <Text style={StyleTour.text1}>Nơi đi: {noidi}</Text>
                        <Text style={StyleTour.text1}>Nơi đến : {noiden}</Text>
                        <Text style={StyleTour.text1}>Phương tiện : {ptien}</Text>
                        <Text style={StyleTour.text1}>Ngày khởi hành : {gkhanh.slice(0,10)}</Text>
                        <Text style={StyleTour.text1}>Giá vé người lớn : {tourdetail.Adult_price}  VNĐ</Text>
                        <Text style={StyleTour.text1}>Giá vé trẻ em : {tourdetail.Children_price} VNĐ</Text>
                        <RenderHTML contentWidth={width} source={{html: tourdetail.Description}} />
                    </Card.Content>

                    {anh.map(t=> 
                        <Card.Cover style={MyStyle.image} source={{uri: `https://tlinh.pythonanywhere.com/static${t.Path}`}}></Card.Cover>
                        // console.log(`https://tlinh.pythonanywhere.com/static${t.Path}`)
                    )}
                    {user!==null?<>
                        {active? <>
                    <TouchableOpacity onPress={create_like}><Icon source="heart" color={MD3Colors.error50} size={30}></Icon></TouchableOpacity>
                    </> : <>
                    <TouchableOpacity onPress={create_like}><Icon source="heart" color={MD3Colors.secondary50} size={30}></Icon></TouchableOpacity>
                    </>}
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
                        <TouchableOpacity onPress={create_rating2}><Icon source="star" color={'orange'} size={30} /></TouchableOpacity>
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
                    </>:<>
                    </>}
                    
                    
                       
                    
                    {cmt===null?<ActivityIndicator />:<>
                        {cmt.map(c => <List.Item style={StyleTour.cmtt} left={()=><RenderHTML contentWidth={width} source={{html:c.content}}/>} right={()=><Avatar.Image size={40}  source={{uri: `https://res.cloudinary.com/dqcjhhtlm/image/upload/fnnue6vhv7tnwtob8mwy.png`}} />}/>)}</>}
                    


                     {/* {cmt===null?<ActivityIndicator />:<>
                        {cmt.map(c => {<List.Item    
                                right={() => 
                                    <Avatar.Image size={40}  source={{uri: `https://tlinh.pythonanywhere.com/static${c.user.Avatar}`}} />} 
                                left={()=><RenderHTML contentWidth={width} source={{html: c.content}} />}/>})}
                     </>} */}
                     
                    
                    <View>
                        <Button onPress={showCMT}>+ Thêm bình luận</Button>
                        <Portal>
                        <Dialog visible={visible} onDismiss={hideCMT}>
                        <Card >
                            <Card.Content>
                            {field.map(f => <TextInput onChangeText={t=> updateState(f.name,t) } key={f.name} style={StyleAll.margin} label={f.label} right={<TextInput.Icon icon={f.icon} />} />)}
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
                    {user===null?
                        <Text style={StyleTour.text1}>Vui lòng <Text style={[StyleTour.loginn, StyleTour.text1]}onPress={()=> navigation.navigate("Login")}>đăng nhập</Text> để có những trải nghiệm tốt nhất cùng TL_Travel</Text>
                    :
                    <Button style={StyleAll.margin}  icon="bag-personal" mode="contained"  onPress={()=>navigation.navigate("booktour",{'id_tour_id':tour_id,'Adult_price':tourdetail.Adult_price,'Children_price':tourdetail.Children_price,'Tour_Name':tourdetail.Tour_Name,'lisence':lis,'DeparturePlace':noidi,'Destination':noiden,'vehicle':ptien,'DepartureDay':gkhanh,'Days':tourdetail.Days,'Nights':tourdetail.Nights})} key={tour_id} >
                    Đặt lịch</Button>}
                </Card>
            }

           </ScrollView>
         
    );
};

export default TourDetail;