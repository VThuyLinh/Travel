import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const Code = () => {
    const [randomString, setRandomString] = useState('');
  
    
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const length   = 10; // Độ dài chuỗi ngẫu nhiên
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);   
  
      }
      setRandomString(result);  
      console.log(result)
      AsyncStorage.setItem("code",result);

}
export default Code;