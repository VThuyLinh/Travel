import axios from "axios";

const BASE_URL='https://thuylinh.pythonanywhere.com'
export const endpoints = {
    'tour':'/Tour/',
    'news':'/News/',
    'tourdetail':(tour_id) => `/TourDetail/${tour_id}/`,
    'newsdetail':(news_id)=> `NewsDetail/${news_id}/`,
    'image':`/Image/`,
    'login': '/o/token/',
    'current-user': '/User/current-user/',
    'signup':'/Customer/',
    'user':'/User/',
    'booktour':'/BookTourTravel/',
    'booktourdetail':'/BookTourDetail/',
    'cmt_tour': (tour_id) => `/TourDetail/${tour_id}/create_cmt_tour/`,
    'like_tour': (tour_id) => `/TourDetail/${tour_id}/like_tour/`,
    'rating_tour': (tour_id) => `/TourDetail/${tour_id}/create_rating_tour/`,
    'cmt_news': (news_id) => `/NewsDetail/${news_id}/create_cmt_news/`,
    'cmt_tour1':'/CMT_Tour/',
    'blog':'/Blog/'
};

export const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
            'withCredentials': true,
            'crossdomain':true
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});