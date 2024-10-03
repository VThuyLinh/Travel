import { useContext } from "react";
import { View, Text } from "react-native";
import { Avatar, Button, Card, Chip, List} from "react-native-paper";
import StyleAll from "../../style/StyleAll";
import {MyDispatchContext, MyUserContext } from "../../config/context";
import StyleLogin from "../../style/StyleLogin";
import Icon from "react-native-vector-icons/FontAwesome6"
import { useWindowDimensions } from "react-native";



const Account = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);
    const { width } = useWindowDimensions();
   
    return (
        <View style={[StyleAll.container, StyleAll.margin]}>
            
            <Avatar.Image style={StyleLogin.avatar}size={280} source={{uri: `https://res.cloudinary.com/dqcjhhtlm/${user.Avatar}`}} />
            
           <Button style={StyleLogin.hello}><Text style={StyleLogin.textinhello}><Icon size={18} style={StyleLogin.m_10} name="suitcase-rolling"></Icon>  Xin chào, {user.last_name}</Text></Button>
            <List.Section>
                <Text style={StyleLogin.text}><Icon name="envelope-open-text" size={19}/>      {user.email}</Text>
                <Text style={StyleLogin.text}><Icon name="location-dot" size={19}/>{user.address}</Text>
                
                <Text style={StyleLogin.text}><Icon name="mobile-retro" size={19}/>{user.sdt}</Text>
            </List.Section>
            <Button style={StyleLogin.bnt} onPress={() => dispatch({"type": "logout"})}><Icon size={18} color="white" name="right-from-bracket" /><Text style={StyleLogin.out}>  Đăng xuất</Text></Button>
        </View>
    );
}




export default Account;