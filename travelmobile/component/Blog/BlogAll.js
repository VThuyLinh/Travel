import { ImageBackground, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { ActivityIndicator, Button, Card, Chip, DataTable, Searchbar, SegmentedButtons, Text } from "react-native-paper"
import React, { useState } from "react"
import APIs, { endpoints } from "../../config/APIs"
import moment from "moment"
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from "react-native-vector-icons/FontAwesome6"
import { isCloseToBottom } from "../Utils/util"

import Calendar from "../Calendar/Calendar"
import { Image } from "react-native"
import StyleAll from "../../style/StyleAll"









const Blog =({navigation}) =>
    {
        const [blog,setBlog]=React.useState([]);
        // const [DeparturePlace, setDeparturePlace] = React.useState("");
        const [page, setPage]= React.useState(1);
        // const [Destination, setDestination] = React.useState("");
        // const [DepartureTime, setDepartureTime] = React.useState("");
        // const [price, setPrice] = React.useState("");
        const [loading, setLoading] = React.useState(false);

    const loadBlog = async () => {
        if (page > 0) {
            let url = `${endpoints['blog']}`;
            try {
                setLoading(true);
                let res = await APIs.get(url);
                console.warn(res.data)
                setBlog(res.data);
                // if (page === 1) 
                //     {setBlog(res.data.results) 
                //     console.info(res.data.results)}
                // else if (page > 1)
                //     setBlog(current => {
                //         return [...current, ...res.data.results]
                //     });
                



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
             loadBlog();
            },[page]);


        
        
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
            <RefreshControl onRefresh={() => loadBlog()} />
            <ScrollView onScroll={loadMore}>
            <Text style={StyleAll.tourspage}> Blog</Text>
            <View>
               
            </View>
            
            
            
            {loading ? <ActivityIndicator/>:<>
                {blog.map(b=> 
                    <Card mode="elevated" style={StyleAll.card} key={b.id}> 
                    <Card.Content>
                    <Text style={StyleAll.text}>{b.name}</Text>
                    <Text style={StyleAll.text}>{b.content}</Text>
                    <Text style={StyleAll.text}>{b.tag}</Text>
                    </Card.Content>
                    {loading && <ActivityIndicator />}
                    
                    <Text style={StyleAll.text2}>Ngày đăng: {moment(b.DatePost).fromNow()}</Text>
                    <Card.Actions>
                    <TouchableOpacity onPress={()=>navigation.navigate("blogdetail",{'blog_id':b.id})} key={b.id}><Text style={StyleAll.icon}><Icon color="#153050" size={20} name="mountain-sun"></Icon>  Xem thêm</Text></TouchableOpacity>
                    </Card.Actions>
                </Card>
                )}
            </>}   
           <View style={{ flexDirection: 'row' }}>
               { items.map((item) => <Button title="a"></Button>)}
           </View>
            </ScrollView>
        </View>
        
        );
    }
    

export default Blog;