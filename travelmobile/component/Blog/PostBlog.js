import { View, Text, Image, ScrollView, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Avatar, Button, Card, Dialog, HelperText, PaperProvider, Portal, RadioButton, TextInput, TouchableRipple } from "react-native-paper";
import StyleAll from "../../style/StyleAll";
import APIs, { endpoints } from "../../config/APIs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { MyUserContext } from "../../config/context";
import * as ImagePicker from 'expo-image-picker';

import { Alert } from "react-native";
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";



const PostBlog =({route})=>{

   
    const user = useContext(MyUserContext);
    const [content,setContent]=React.useState('');
    const [name, setName]= React.useState('');
    const [tagAll, setTagAll]= React.useState([]);
    const [image, setImage]= React.useState('');
    const [an, setAn]= React.useState(true);
    const [loading, setLoading] = React.useState(false);
    // const [error, setError] = React.useState(false);
    const nav = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const [tag, setTag] = useState(1);
    const showAnh = () => setVisible(true);
    const [so,setSo]= useState();
    const hideAnh = () => setVisible(false);
    const [none, setNone]=useState('none');

    const images = [
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153311/Screenshot_2024-10-05_191722_np7qsd.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153312/Screenshot_2024-10-05_192142_ngbvki.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153312/Screenshot_2024-10-05_192056_ubcis6.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153312/Screenshot_2024-10-05_191207_pulqwl.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153313/Screenshot_2024-10-05_192227_nwcx6o.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153313/Screenshot_2024-10-05_192416_tolqcf.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153313/Screenshot_2024-10-05_192035_i4q66l.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153313/Screenshot_2024-10-05_192428_cgml1c.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153314/Screenshot_2024-10-05_193841_korobk.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153316/Screenshot_2024-10-05_192021_sagxki.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153325/Screenshot_2024-10-05_194109_ofp7kl.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153325/Screenshot_2024-10-05_194030_el74vl.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153324/Screenshot_2024-10-05_193957_n8nq2t.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153334/Screenshot_2024-10-05_194456_skizlg.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153325/Screenshot_2024-10-05_194155_ry72ts.png',
        'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728153325/Screenshot_2024-10-05_194017_fnkzka.png'
      ];
    

    const [ngaunhien, setNgaunhien] = useState(0);

    const getAnhNN = () => {
        setSo(Math.floor(Math.random() * images.length));
        setNgaunhien(so);
    };


    const updateState = (field, value) => {
        setImage( i=> {
            return { ...i, [field]: value }
        })
        console.log(image);
    }

    const getTag= async()=>{
        let res= await APIs.get(endpoints['tag'])
        setTagAll(res.data)
    }
    
  

    const postblog = async () => {
                let formData={
                    
                        name: name,
                        content: content,
                        user_post: `${user.id}`,
                        image: images[so],
                        tag:tag
                }
        
                setLoading(true)
                try {
                    
                    let res = await APIs.post('https://thuylinh.pythonanywhere.com/Blog/', formData, 
                        {
                            headers: {'Content-Type': 'application/json'}
                        });
                    console.warn(res.request);
                    if (res.status === 201)
                       nav.navigate("Blog");
                       
                    
                } catch (ex) {
                    console.log(ex.request);
                    
                   
                } finally {
                    setLoading(false);
                }
            }
            const picker = async () => {
                
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted')
                    Alert.alert("EtherealTravel", "Permissions Denied!");
                else {
                    let res = await ImagePicker.launchImageLibraryAsync();
                    if (!res.canceled) {
                        updateState("image", res.assets[0]);
                    }
                    setImage(res.assets[0])
                    console.warn("Hình",res.assets[0])
                }
                getAnhNN();
                setAn(false)
            }



            
            React.useEffect(()=>{
                getTag();
                console.warn(tag.toString());
               },[tag]);
    
           
        
           
    return (
    <View>
            <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{marginTop:20, marginLeft:25, marginRight:25, marginBottom:10}}>
                   <TextInput placeholder="Chủ đề bài đăng" style={styles.ip} onChangeText={(value)=>setName(value)}></TextInput>
            </View>
            <View style={{marginTop:20, marginLeft:25, marginRight:25, marginBottom:10}}>
                   <TextInput placeholder="Nội dung" style={styles.ip} onChangeText={(value)=>setContent(value)}></TextInput>
            </View>
            <View style={{marginTop:20, marginLeft:25, marginRight:25, marginBottom:10}}>
                   <Text placeholder={image} style={styles.ip} onChangeText={(value)=>setContent(value)}></Text>
            </View>
          
            <RadioButton.Group onValueChange={newValue => setTag(newValue)} value={tag} >
                <View style={{flexDirection:"row", marginLeft:40}}>
                {tagAll.map(ta=>
                     <>
                        <View style={{marginLeft:10, marginRight:10, width:130, flexDirection:"row"}}>
                        <Text style={{fontSize:18, marginTop:5, marginRight:5}}>{ta.name}</Text>
                        <RadioButton value={ta.id} />
                        </View>
                     </>
                )}
                </View>
            </RadioButton.Group>
           
           
            </KeyboardAvoidingView>
                
            <View>

            </View>
            {an===true?<>
                
                <TouchableRipple style={{backgroundColor:'#b2dbbf',marginLeft:60, borderRadius:20,marginBottom:20, marginTop:20, width: 300}} onPress={()=>{picker}}>
                    <Text style={{fontSize:18, marginTop:15,marginBottom:15,marginLeft:50, marginRight:5}}>+ Thêm hình ảnh</Text>
                </TouchableRipple></>:<>
                <Image width={200} height={200}
                    source={{ uri: images[so] }}/>
                </>}

                

            <Button style={{backgroundColor:'#e1bc73', height:40}}  loading={loading} icon="bag-personal" mode="contained"  
            onPress ={()=> { postblog() ; Alert.alert('Đăng bài thành công')}} >
                    <Text style={{fontSize:20}}>Đăng bài</Text>
            </Button>

            
            
        </ScrollView>
    </View>
    )
}



const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        paddingHorizontal:30
    },tinyLogo: {
        marginTop:20,
        marginLeft:5,
        width: 400,
        height: 200,
      },tinyLogo1: {
        marginTop:5,
        marginLeft:5,
        width: 400,
        height: 200,
      },
    tieude:{
        fontWeight:'bold',
        fontSize:30, 
        marginTop:10, 
        color:'black',
    },
    button:{
        backgroundColor:"#e1bc73",
        color:"white",
        textAlign:"center",
        marginTop:20,
        height:45,
        width:160,
        marginLeft:230,
        borderRadius:20
    },
    center:{alignItems:'center'},
    title:{
        fontWeight:'bold',
        fontSize:30, 
        color:'black'
    },form:{
        marginTop:30
    },ip:{
        borderBottomWidth:1,
        backgroundColor:'#fff',
        borderColor:'green',
        paddingLeft:10
    }});

export default PostBlog;