import { ScrollView, TouchableOpacity, View } from "react-native"
import StyleAll from "../../style/StyleAll"
import { ActivityIndicator, Button, Card, Chip, Text } from "react-native-paper"
import React, { useContext } from "react"
import APIs, { endpoints } from "../../config/APIs"
import moment from "moment"

import Icon from "react-native-vector-icons/FontAwesome6"
import { MyUserContext } from "../../config/context"
import StyleTour from "../../style/StyleTour"
import { isCloseToBottom } from "../Utils/util"

const News =({navigation}) =>
    {
        const [news,setNews]=React.useState([]);
        const [page,setPage]=React.useState(1);
        const [loading, setLoading]= React.useState(false);
        const user= useContext(MyUserContext);

        const loadNews = async () =>{
            try{
                let res= await APIs.get(`${endpoints['news']}?page=${page}`);
                setNews(res.data.results);
            }
            catch (ex){
                console.error(ex);
                
            }
        }
        const loadMore = ({nativeEvent}) => {
            if (loading===false && isCloseToBottom(nativeEvent)) {
                console.log(page);
                setPage(parseInt(page) + 1);
                
            }
        }

        React.useEffect(()=>{
             loadNews();
            },[]);

        return(
        <View style={StyleAll.container}>
            
            <ScrollView onScroll={loadMore}>
            {news === null ? <ActivityIndicator/>:<>
                {news.map(c=> 
                <Card mode="elevated" style={StyleAll.car} >
                    <Card.Content>
                    <Text style={StyleAll.text1}>{c.Name_News}</Text>
                    <Text>{c.id}</Text>
                    </Card.Content>
                    <Card.Cover source={{ uri:`https://res.cloudinary.com/dqcjhhtlm/${c.image_thumbnail}` }} />
                    <Text style={StyleAll.text2}>Ngày đăng: {moment(c.DatePost).fromNow()}</Text>
                   
                    <Card.Actions>
                    {user===null?<>
                        <Text style={StyleTour.text1}>Vui lòng <Text style={[StyleTour.loginn, StyleTour.text1]}onPress={()=> navigation.navigate("Login")}>đăng nhập</Text> để có những trải nghiệm tốt nhất cùng Ethereal_Travel</Text>
                    </>:<>
                    <TouchableOpacity onPress={()=>navigation.navigate("newsdetail",{'news_id':c.id})} key={c.id}><Text style={StyleAll.icon}><Icon color="#153050" size={20} name="mountain-sun"></Icon>  Xem thêm</Text></TouchableOpacity>
                    </>}
                    </Card.Actions>
                </Card>)}
            </>}   
            </ScrollView>
        </View>
        
        );
    }

export default News;