import { Linking, TouchableOpacity, View } from "react-native"
import { Button, Text } from "react-native-paper";
import APIs, { endpoints } from "../../config/APIs";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { MyUserContext } from "../../config/context";

const EmailTest=()=>{
//     const [btour,setBTour]= React.useState([]);
//     const [tour, setTour]= React.useState([]);
//     const user= useContext(MyUserContext);
//     const sendMail=async()=>{
//         let res= await APIs.get(`https://thuylinh.pythonanywhere.com/BookTour/1/`)
//         setBTour(res.data);
//         let res1= await APIs.get(`https://thuylinh.pythonanywhere.com/Tour/1/`) 
//         setTour(res1.data);
        
        

//     const htmlBody = `
//         <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
//   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
// </head>

// <body>
// 	<div style='text-align: center;'>
//   <h1 style=''>Hóa đơn</h1>
//   </div>
//   <div style='margin-left: 15rem;'>
//     <div>
//       <p style='font-size: 25px;'>Thông tin tour</p>
//       <hr style='width: 30%;height: 2px;background-color: green;margin-right: auto;margin-top: 5px;margin-bottom: 5px;border-width: 2px;border-color: green;'>
//       <div style='margin-left: 1rem;'>
//       <p>Mã đặt tour: ${btour.id_booktour}</p>
//       <p>Tên tour:  ${btour.Tour_Name}</p>
//       <p>Ngày đặt:  ${btour.Date_Post}</p>
//       <p>Phương tiện: ${tour.vehicle.Name}</p>
//       <p>Số hiệu :${tour.vehicle.License}</p>
//       <p>Số vé người lớn: ${btour.Quantity_Adult}</p>
//       <p>Số vé trẻ em:  ${btour.Quantity_Children}</p>
//       <p>Gía vé người lớn:  ${tour.Adult_price}</p>
//       <p>Gía vé trẻ em: ${tour.Children_price}</p>
//       </div>
//       <p>Thông tin người đặt</p>
//       <hr style='width: 30%;height: 2px;background-color: green;margin-right: auto;margin-top: 5px;margin-bottom: 5px;border-width: 2px;border-color: green;'>
//         <div style='margin-left: 1rem;'>
//         <p>Email: ${user.email}</p>
//         <p>Số điện thoại: ${user.sdt}</p>
//         <p>Họ tên: ${user.first_name}  ${user.last_name}</p>
//         </div>
//       <p>Thông tin thanh toán</p>
//       <hr style='width: 30%;height: 2px;background-color: green;margin-right: auto;margin-top: 5px;margin-bottom: 5px;border-width: 2px;border-color: green;'>
//       <div style='margin-left: 1rem;'>
//         <p>Tổng tiền: ${btour.Price}</p>
//         <p>Trạng thái: ${btour.State}</p>
//         </div>
//       </div>
//     </div>
//   <p style='margin-left: 19rem; margin-top:30px; font-size:25px; font-weight: bold'>Chúc bạn có một chuyến đi thật vui vẻ cùng Ethereal Travel nhé</p>
 

// </body>
// </html>`;
        
//     const encodedHtmlBody = encodeURIComponent(htmlBody);
        
    
    
//     Linking.openURL(`mailto:vthuylinh135@gmail.com?subject=Book tour from Ethereal Travel&body=${encodedHtmlBody}`);
//     Linking.openURL(`mailto:vthuylinh135@gmail.com`);

// }
      
//     const sendHello=async()=>{
    
//        console.warn("hello")

//     }



//     return (
//         <View>
//             <TouchableOpacity onPress={()=>{sendMail(),sendHello()}}>
//                 <Text>Send Mail</Text>
//             </TouchableOpacity>
//         </View>
//     )

const [btour,setBTour]= React.useState([]);
const [tour, setTour]= React.useState([]);
const user= useContext(MyUserContext);
    const sendmail=async()=>{
        let res= await APIs.get(`https://thuylinh.pythonanywhere.com/BookTour/1/`)
        setBTour(res.data);
        let res1= await APIs.get(`https://thuylinh.pythonanywhere.com/Tour/1/`) 
        setTour(res1.data);
        console.info(res1.data);
        console.info(res.data);

const encodedHtmlBody = encodeURIComponent(htmlBody);
        
        Linking.openURL(`mailto:vthuylinh135@gmail.com`);
    }
    return (
        <View>
            <TouchableOpacity onPress={()=>sendmail()}>
              <Text>Send Mail</Text>
          </TouchableOpacity>
      </View>
    )
}
export default EmailTest;