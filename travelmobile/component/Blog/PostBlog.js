import { View, Text, Image, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Avatar, Button, Card, Dialog, HelperText, PaperProvider, Portal, TextInput, TouchableRipple } from "react-native-paper";
import StyleAll from "../../style/StyleAll";
import APIs, { endpoints } from "../../config/APIs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { MyUserContext } from "../../config/context";
import { Alert } from "react-native";
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

const PostBlog =({route})=>{
    const user = useContext(MyUserContext);
    
    const fields = [{
    
        "label": "Họ",
        "icon": "card-account-phone-outline",
        "name": "user_post_id",
        "value": user?.id
    }];
    const [loading, setLoading] = React.useState(false);
    // const [error, setError] = React.useState(false);
    const nav = useNavigation();
    const [bk, setBK]= useState({"user_post_id":user.id});

    const postblog = async () => {
        
                setLoading(true)
                try {
                    
                    let form = new FormData();
                    
                    for (let key in bk)
                        {
                            form.append(key, bk[key]);
                        }
                    console.log(bk);
                    console.info(form);
        

                    let res = await APIs.post(endpoints['blog'], form, {headers: {'Content-Type': 'multipart/form-data'}});
                    if (res.status === 201)
                       nav.navigate("MyTour");
                       
                    
                } catch (ex) {
                    console.log(ex);
                    
                   
                } finally {
                    setLoading(false);
                }
            }
        
    
            const updateState = (field, value) => {
                setBK( t => {
                    return { ...t, [field]: value }
                })
                console.log(bk.response);
            }
        
           
    return (
    <View>
            <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {fields.map(f => <TextInput value={f.value} defaultValue={f.default} onChangeText={t=> updateState(f.name,t) } key={f.name} style={StyleAll.margin} label={f.label} secureTextEntry={f.secureTextEntry} keyboardType={f.keyboardType} right={<TextInput.Icon icon={f.icon} />} />)}
            <Text>Name : {(bk.name)}</Text>
            <Text>Content : {(bk.content)}</Text>
            </KeyboardAvoidingView>
            
            <Button style={StyleAll.margin}  loading={loading} icon="bag-personal" mode="contained"  
            onPress ={()=> { postblog() ; Alert.alert('Bạn đã đăng ký thành công. Hãy thanh toán trước 24h để được xác nhận nhé')}} >
                    Đăng bài
            </Button>
            
        </ScrollView>
    </View>
    )
}

export default PostBlog;