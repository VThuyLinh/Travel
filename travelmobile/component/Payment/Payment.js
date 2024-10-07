import React, { useRef, useState } from 'react';
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { View, TouchableOpacity,Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';


const Payment=({route})=>{
   const price= route.params?.price
   const paystackWebViewRef = useRef(paystackProps.PayStackRef); 
   console.log(price);
   const Price=100;


  return (
    <View style={{marginHorizontal:15, backgroundColor:"white"}}>
      <Paystack
        paystackKey="pk_test_5c6700536bdbfe1a3b8fbef74a07f8cafea4f15f"
        paystackSecretKey="sk_test_33616f7f53acb089b519ec80ef77da33e269fe50"
        billingEmail="vthuylinh135@gmail.com"
        billingMobile="12344321"
        billingName='ThuyLinh'
        currency="ZAR"
        amount={price}
        onCancel={(e) => {
         console.log(e);
        }}
        onSuccess={(res) => {
          console.warn(res);
        }}
        ref={paystackWebViewRef}
      />
      <View style={styles.image}>
        <Image width={200} height={200}  source={{uri:'https://res.cloudinary.com/dqcjhhtlm/image/upload/v1728235373/Screenshot_2024-10-07_002217_dvl5vc.png'}}/>
        </View>
        <TouchableOpacity style={styles.paystack} onPress={()=>paystackWebViewRef.current.startTransaction()}>
          <Text style={styles.pay}>Pay Now</Text>
        </TouchableOpacity>
        <View style={{height:300}}></View>
      </View>
  );
}
const styles= StyleSheet.create({
    paystack:{
        minHeight:"5%",
        backgroundColor:"#635bff",
        padding:10,
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center"
    },
    pay:{
        color:"white"
    },
    image:{
        marginTop:30,
        height:450,
        marginLeft:15
       
    }
})
export default Payment;