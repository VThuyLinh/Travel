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
// import { useCurrencyFormatter } from 'react-native-currency-formatter';

const NewsDetail = ({ navigation,route }) => {
    const [newsdetail, setNewsDetail] = React.useState([]);
    const [cmtnews, setCommentNews]= React.useState([]);
    const [like, setLike]= React.useState([]);
    const [token, setToken]= React.useState([]);
    const [active, setActive] = React.useState(false);
    const [userall,setuserAll]= React.useState([]);
    const news_id = route.params?.news_id;
    
    const { width } = useWindowDimensions();
    const loadNewsDetail = async() => {
        try {
            let res = await APIs.get(endpoints["newsdetail"](news_id));
            let res1 = await APIs.get(endpoints['user']);
            setNewsDetail(res.data);
            setCommentNews(res.data.cmt_news)
            setuserAll(res1.data)
            setLike(res.data.like_news)
            AsyncStorage.getItem("token").then((value)=>{
                setToken(value)
           
            })
           
        } catch (ex) {
            console.error("hello",ex);
        }
    }

    const user= useContext(MyUserContext);  

    React.useEffect(() => {
        loadNewsDetail();
    }, [news_id]);

    const [visible, setVisible] = React.useState(false);

    const showCMT = () => setVisible(true);
  
    const hideCMT = () => setVisible(false);
    
    const [loading, setLoading] = React.useState(false);
    const [content, setContent]= React.useState([]);

    const loadMore = ({nativeEvent}) => {
        if (loading===false && isCloseToBottom(nativeEvent)) {
            console.log(page);
            setPage(parseInt(page) + 1);
            
        }
    }

    
    const create_cmt = async () => {
        let formData={
            content:content,
        }
        
        setLoading(true)
        try {
            axios.post(`https://thuylinh.pythonanywhere.com/NewsDetail/${news_id}/add_comments_news/`,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            .then((respone)=>console.log(respone))
            .catch((err)=>console.error(err.request))
               
            
        } catch (ex) {
            console.log(ex.request);
            console.log(ex);
            
           
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        loadNewsDetail();
    }, [news_id]);

    const create_like= async() =>{
        setLoading(true);
        let formData={
            Active:true
        }
        try {
            setActive(active? false: true);
            axios.post(`https://thuylinh.pythonanywhere.com/NewsDetail/${news_id}/like_news/`,formData,{
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
            axios.post(`https://thuylinh.pythonanywhere.com/NewsDetail/${news_id}/like_news/`,formData,{
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



   
    
   
    
    return (
       
           <ScrollView style={[StyleAll.container, StyleAll.margin]} >
            
            {newsdetail===null?<ActivityIndicator animating={true} color={'blue'} />:
                <Card style={StyleAll.bgrcolor} key={news_id}>
                    <Card.Content>
                        <Text variant="titleLarge" style={StyleAll.text3}>{newsdetail.name}</Text>
                        <Text style={StyleAll.text2}> {moment(newsdetail.DatePost).fromNow()}</Text>
                        <RenderHTML contentWidth={width} source={{html: newsdetail.content}} />
                    </Card.Content>
                </Card>
            }
                
                
               
                   
                    
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
                   
                    
                    <Text>{token}</Text>
                    <View>
                        {cmtnews===null?
                        <View>
                            <Text>Hãy là người bình luận đầu tiên</Text>
                            
                        </View>:<></>}
                        {cmtnews===null?<ActivityIndicator />:<>
                            <Button onPress={showCMT}>+ Thêm bình luận</Button></>}

                        {cmtnews.map (c => 
                            <List.Item style={StyleTour.cmtt} left={()=>
                                <Avatar.Image size={40}  
                                source={{uri: `https://res.cloudinary.com/dqcjhhtlm/${c.avatar}`}} 
                                />
                               } 
                                right={()=> <RenderHTML contentWidth={width} source={{html:c.content}}/>}/>)}

                        
                  
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

           </ScrollView>
         
    );
};

export default NewsDetail;