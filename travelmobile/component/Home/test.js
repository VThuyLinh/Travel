import React, { useState } from "react"
import APIs, { endpoints } from "../../configs/APIs";
import { Text } from "react-native-paper";
import axios from "axios";

const Test=()=>{
    const [data,setData]= React.useState([])
    let url = `https://jsonplaceholder.typicode.com/todos/`;
    
    try {
        axios.get('https://jsonplaceholder.typicode.com/todos/')
        .then(res => {
                    const person = res.data.result;
                    console.info(person)
                  })
        // console.infor(res)
        // console.warn(res.data)
        console.info("okk")
        
    } catch (ex) {
        console.error(ex);
        
    } finally {
       console.log("finally")
    }

    return(
        <Text>Helllo</Text>
    )
}
export default Test