import { ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { ActivityIndicator, Avatar, Button, Card, Chip, DataTable, Searchbar, SegmentedButtons, Text, TextInput } from "react-native-paper"
import React, { useState } from "react"
import APIs, { endpoints } from "../../config/APIs"
import moment from "moment"


import Icon from "react-native-vector-icons/FontAwesome6"
import { isCloseToBottom } from "../Utils/util"



import StyleTour from "../../style/StyleTour"
import StyleAll from "../../style/StyleAll"
import { useNavigation } from "@react-navigation/native"









const Blog =({navigation}) =>
    {
        const [blog,setBlog]=React.useState([]);
        const [user,setUser]=React.useState([]);
        const [page, setPage]= React.useState(1);
        const [content, setContent]= React.useState('')
        const [loading, setLoading] = React.useState(false);
        const { width } = useWindowDimensions();
        const nav=useNavigation();
        const [collapsed, setCollapsed] = React.useState(true);

        const toggle = () => {
            setCollapsed(!collapsed);
          };

    const loadBlog = async () => {
        if (page > 0) {
            let url = `${endpoints['blog']}?content=${content}&page=${page}`;
            try {
                setLoading(true);
                let res = await APIs.get(url);
                if (page === 1) 
                    {setBlog(res.data.results) 
                    console.info(res.data.results)}
                else if (page > 1)
                    setBlog(current => {
                        return [...current, ...res.data.results]
                    });
                console.warn(res.data.results)
                
                let res1 = await APIs.get(endpoints['user']);
                setUser(res1.data)
            
            } catch (ex) {
                console.log("Lỗi",ex);
            } finally {
                setLoading(false);
            }
        }
    }

        React.useEffect(()=>{
             loadBlog();
            },[page,content]);


        
        
            const loadMore = ({nativeEvent}) => {
                if (loading===false && isCloseToBottom(nativeEvent)) {
                    console.log(page);
                    setPage(parseInt(page) + 1);
                    
                }
            }
            const search = (value, callback) => {
                setPage(1);
                callback(value);
                setContent(value);
            }


            const items = [1, 2, 3, 4, 5,6,7];
        return(

            <View style={StyleAll.container}>
            <RefreshControl onRefresh={() => loadBlog()} />
            <ScrollView onScroll={loadMore}>
            <Text style={StyleAll.tourspage}> Ethereal's Blog</Text>
            <TouchableOpacity style={styles.button} onPress={()=>{nav.navigate("postblog")}} >
                     <Text style={{fontSize:20, fontWeight:'bold', marginTop:8, marginLeft:16}}>+ Thêm bài đăng</Text>
                 </TouchableOpacity>
            <View>
            <Searchbar style={StyleAll.sear} value={content} placeholder="Tìm bài đăng..." onChangeText={t => search(t, setContent)} />
            </View>
            
            {loading ? <ActivityIndicator/>:<>
                {blog.map(b=> 
                <Card mode="elevated" style={StyleAll.card1} key={b.id}> 
                    <Card.Content>
                    {user.map(u=>{
                        if(u.id==b.user_post)
                        {
                            return(
                                <View style={{ flexDirection: 'row' }}>
                                    <Avatar.Image size={40} source={{uri: `https://res.cloudinary.com/dqcjhhtlm/${u.Avatar}`}}  />
                                    <View style={{ flexDirection: 'col' }}>
                                    <Text style={{marginLeft:20, fontSize:20}}>{u.username}</Text>
                                    <Text style={StyleAll.text2}> {moment(b.DatePost).fromNow()}</Text>
                                    </View>
                                </View>
                            )
                        }
                    })}
                    
                    <Text style={StyleAll.text}>{b.name}</Text>
                    </Card.Content>
                    {loading && <ActivityIndicator />}
                    <Card.Cover style={StyleAll.imgincard} source={{ uri: `https://res.cloudinary.com/dqcjhhtlm/${b.image}` }}/>  
                  
                    <TouchableOpacity style={{marginLeft:270, marginTop:10}} onPress={()=>navigation.navigate("blogdetail",{'blog_id':b.id})} key={b.id}><Text style={StyleAll.icon}><Icon color="#153050" size={20} name="mountain-sun"></Icon>  Xem thêm</Text></TouchableOpacity>
                    
                </Card>)}

            </>}   
           
            </ScrollView>
        </View>
        
        );
    }
    const styles= StyleSheet.create({
        button:{
            backgroundColor:"#b2dbbf",
            color:"white",
            textAlign:"center",
            height:44,
            width:170,
            marginLeft:225,
            marginBottom:10,
            borderRadius:20
        }});

export default Blog;