import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import React, { useContext } from "react";
import APIs, { endpoints } from "../../config/APIs";
import { Avatar, Button, Card, Dialog, Icon, List, MD2Colors, MD3Colors, Portal, TextInput } from "react-native-paper";
import RenderHTML from "react-native-render-html";

import moment from "moment";
import StyleAll from "../../style/StyleAll";
import { MyUserContext } from "../../config/context";


const NewsDetail = ({ navigation,route }) => {
    const [newsdetail, setNewsDetail] = React.useState([]);
    const [cmtnews, setCommentNews]= React.useState([]);
    // const tour = useContext(MyUserContext);
    const news_id = route.params?.news_id;
    const { width } = useWindowDimensions();
    const loadNewsDetail = async() => {
        try {
            let res = await APIs.get(endpoints["newsdetail"](news_id));
            setNewsDetail(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const user= useContext(MyUserContext);  

    React.useEffect(() => {
        loadNewsDetail();
    }, [news_id]);

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
  


    const create_news = async () => {
        
        setLoading(true)
        try {
            
            let form = new FormData();
            
            
            form.append("content", cmtnews["content"]);
            
            console.log(cmtnews);
            console.info(form);

            let res = await APIs.post(endpoints['cmt_news'](news_id), form, {headers: {'Content-Type': 'multipart/form-data'}});
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
        setNewsDetail( t => {
            return { ...t, [field]: value }
        })
        console.log(cmtnews);
    }
   
    

    return (
       
           <ScrollView style={[StyleAll.container, StyleAll.margin]} >
            {newsdetail===null?<ActivityIndicator animating={true} color={MD2Colors.red800} />:<>
                    <Card>
                    <Card.Content>
                        <Text variant="titleLarge" style={StyleAll.text3}>{newsdetail.Name_News}</Text>
                        <RenderHTML contentWidth={width} source={{html:newsdetail.Content }} />
                    </Card.Content>
                    </Card>
                    {user===null?
                        <Text>Vui lòng <Text onPress={()=> navigation.navigate("Login")}>đăng nhập</Text> để có những trải nghiệm tốt nhất cùng TL_Travel</Text> :
                        <><View>
                            <Button onPress={showCMT}>Thêm bình luận</Button>
                            <Portal>
                            <Dialog visible={visible} onDismiss={hideCMT}>
                            <Card >
                                <Card.Content>
                                {field.map(f => <TextInput onChangeText={t=> updateState(f.name,t) } key={f.name} style={StyleAll.margin} label={f.label} right={<TextInput.Icon icon={f.icon} />} />)}
                                </Card.Content>
                                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                                <Card.Actions>
                                
                                <Button onPress={hideCMT}>Cancel</Button>
                                <Button onPress={()=>{hideCMT();create_news()}}>Ok</Button>
                                </Card.Actions>
                            </Card>
                            </Dialog>
                            </Portal>
                        </View></>}</>}
   </ScrollView>
         
    );
};

export default NewsDetail;