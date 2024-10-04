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

const BlogDetail = ({ navigation,route }) => {
    const [blogdetail, setBlogDetail] = React.useState([]);
    const [cmtblog, setCommentBlog]= React.useState([]);
    const [like, setLike]= React.useState([]);
    const [token, setToken]= React.useState([]);
    const [active, setActive] = React.useState(false);
    const [userall,setuserAll]= React.useState([]);
    const blog_id = route.params?.blog_id;
    
    const { width } = useWindowDimensions();
    const loadBlogDetail = async() => {
        try {
            let res = await APIs.get(endpoints["blogdetail"](blog_id));
            let res1 = await APIs.get(endpoints['user']);
            setBlogDetail(res.data);
            setCommentBlog(res.data.cmt_blog)
            setuserAll(res1.data)
            setLike(res.data.like_blog)
            AsyncStorage.getItem("token").then((value)=>{
                setToken(value)
           
            })
           
        } catch (ex) {
            console.error("hello",ex);
        }
    }

    const user= useContext(MyUserContext);  

    React.useEffect(() => {
        loadBlogDetail();
    }, [blog_id]);

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
            axios.post(`https://thuylinh.pythonanywhere.com/Blog/${blog_id}/add_comments_blog/`,formData,{
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

    // const updateState = (field, value) => {
    //     setCommentBlog( t => {
    //         return { ...t, [field]: value }
    //     })
    //     console.log(cmtTour);
    // }

    const create_like= async() =>{
        setLoading(true);
        let formData={
            Active:true
        }
        try {
            setActive(active? false: true);
            axios.post(`https://thuylinh.pythonanywhere.com/Blog/${blog_id}/like_blog/`,formData,{
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
            axios.post(`https://thuylinh.pythonanywhere.com/Blog/${blog_id}/like_blog/`,formData,{
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
            
            {blogdetail===null?<ActivityIndicator animating={true} color={'blue'} />:
                <Card style={StyleAll.bgrcolor}>
                    <Card.Content>
                    {/* .slice(0,10) */}
                    
                        <Text variant="titleLarge" style={StyleAll.text3}>{blogdetail.name}</Text>
                        {userall.map(u=>{
                        if(u.id==blogdetail.user_post)
                        {
                            return(
                                <View style={{ flexDirection: 'row' }}>
                                    <Avatar.Image size={40} source={{uri: `https://res.cloudinary.com/dqcjhhtlm/${u.Avatar}`}}  />
                                    <View style={{ flexDirection: 'col' }}>
                                    <Text style={{marginLeft:20, fontSize:20}}>{u.username}</Text>
                                    <Text style={StyleAll.text2}> {moment(blogdetail.DatePost).fromNow()}</Text>
                                    <RenderHTML contentWidth={width} source={{html: blogdetail.content}} />
                                    </View>
                                </View>
                            )
                        }
                        
                    })}
                    </Card.Content>
                
                    {/* {like.map(l=>{
                        if(l.id==user.id)
                            if(l.Active===true)
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

                    })} */}

                   
                    
<View>
                    {like===null?
                        <View>
                            <Text>Hãy là người bình luận đầu tiên</Text>
                            
                        </View>:<></>}
                    {like.map(l=>{
                        if(l.id==user.id)
                            if(l.active==true)
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
                   
                    
                    <Text>{token}</Text>
                    <View>
                        {cmtblog===null?
                        <View>
                            <Text>Hãy là người bình luận đầu tiên</Text>
                            
                        </View>:<></>}
                        {cmtblog===null?<ActivityIndicator />:<>
                            <Button onPress={showCMT}>+ Thêm bình luận</Button></>}

                        {cmtblog.map (c => 
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
                </Card>
            }

           </ScrollView>
         
    );
};

export default BlogDetail;