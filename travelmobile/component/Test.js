import React from "react";
import APIs, { endpoints } from "../config/APIs";
import { View } from "react-native";
import { Text } from "react-native-paper";
import StyleAll from "../style/StyleAll";

const Test =()=>{
  
    const [tour, setTour]= React.useState([]);
    const loadTour= async() =>{
        try{
            let res= await APIs.get(endpoints['tour']) 
            console.info(res.data.results);
            setTour(res.data.results);
            
        }
        catch(ex)
        {
            console.error(ex)
        }
    }
    React.useEffect(()=>{
        loadTour();
    },[])

    return(
        <View style={StyleAll.container}>
           <Text style={StyleAll.tour}>Danh sách tour du lịch</Text>
           {tour.map(c =><Text>{c.Id_Tour}</Text>)}
           <Text></Text>
        </View>
    )
}
export default Test;