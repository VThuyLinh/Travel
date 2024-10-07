import React, { useContext, useReducer } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TourDetail from './component/Tour/TourDetail';
import { NavigationContainer } from '@react-navigation/native';
import { MyReducer } from './config/reducer';
import { MyDispatchContext, MyUserContext } from './config/context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, PaperProvider } from 'react-native-paper';
import Signup from './component/User/Signup.js';
import Account from './component/User/account';
import BookTour from './component/Tour/BookTour.js';

import News from './component/News/News.js';
import NewsDetail from './component/News/NewDetail.js';
import Calendar from './component/Calendar/Calendar.js';
import Logout from './component/User/Logout.js';
import StyleAll from './style/StyleAll.js';
import Tour from './component/Tour/AllTour.js';
import BookTourDetail from './component/Tour/BookTourDetail.js';
import Blog from './component/Blog/BlogAll.js';
import PostBlog from './component/Blog/PostBlog.js';
import BlogDetail from './component/Blog/BlogDetail.js';
import Login from './component/User/Login.js';


import Location from './component/Location/Location.js';
import EmailTest from './component/Email/EmailTest.js';
import GeminiChat from './component/ChatBot/GeminiChat.js';




const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='tour' component={Tour} options={{title: 'Chuyến đi'}} />
      <Stack.Screen name='tourdetail' component={TourDetail} options={{title: 'Chi tiết chuyến đi'}} />
      <Stack.Screen name='booktour' component={BookTour} options={{title: 'Đặt chuyến đi'}} />
      <Stack.Screen name='newsdetail' component={NewsDetail} options={{title: 'Chi tiết tin tức'}} />
     
      <Stack.Screen name='blogdetail' component={BlogDetail} options={{title: 'Chi tiết tin tức'}} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();


const MyTab = () => {
  const user = useContext(MyUserContext); 

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MyStack} options={{ title: "", tabBarIcon: () => <Icon size={30} color="black" source="airplane-takeoff" />}} />
      
      {user === null?<>
        <Tab.Screen name="Singup" component={Signup} options={{ title: "Đăng ký", tabBarIcon: () => <Icon size={30} color="black" source="tree" />}} />
        <Tab.Screen name="login" component={Login} options={{ title: "", tabBarIcon: () => <Icon size={30} color="black" source="tree" />}}/>
        <Tab.Screen name="News" component={News} options={{title: "Tin tức", tabBarIcon: () => <Icon size={30} color="black" source="newspaper-variant-multiple-outline" />}} />
        <Tab.Screen name="Mail" component={EmailTest} options={{title: "Mail", tabBarIcon: () => <Icon size={30} color="black" source="newspaper-variant-multiple-outline" />}} />
       
        
       
      </>:<>
        <Tab.Screen name="Account" component={Account} options={{ title: "Tài khoản", tabBarIcon: () => <Icon size={30} color="black" source="account" />}} />
        <Tab.Screen name="MyTour" component={BookTourDetail} options={{ title: "Chuyến đi của tôi", tabBarIcon: () => <Icon size={30} color="black" source="ticket-account" />}} />
        <Tab.Screen name="Blog" component={Blog} options={{ title: "Blog", tabBarIcon: () => <Icon size={30} color="black" source="ticket-account" />}} />
        <Tab.Screen name="News" component={News} options={{title: "Tin tức", tabBarIcon: () => <Icon size={30} color="black" source="newspaper-variant-multiple-outline" />}} />
        <Tab.Screen name="PostBlog" component={PostBlog} options={{title: "Đăng bài", tabBarIcon: () => <Icon size={30} color="black" source="newspaper-variant-multiple-outline" />}} />
        <Tab.Screen name="Chat" component={GeminiChat} options={{title: "Chat", tabBarIcon: () => <Icon size={30} color="black" source="newspaper-variant-multiple-outline" />}} />
        <Tab.Screen name="Định vị" component={Location} options={{title: "Định vị", tabBarIcon: () => <Icon size={30} color="black" source="newspaper-variant-multiple-outline" />}} />
        
        
        
      </>
}
    </Tab.Navigator>
      
  );
}


export default function App() {
  const [user, dispatch]= useReducer(MyReducer, null)
  return (
    <NavigationContainer>
      <MyUserContext.Provider value={user}>
      <PaperProvider>
        <MyDispatchContext.Provider value={dispatch}>
          <MyTab/>
        </MyDispatchContext.Provider>
        </PaperProvider>
      </MyUserContext.Provider>
    </NavigationContainer>
  );
}