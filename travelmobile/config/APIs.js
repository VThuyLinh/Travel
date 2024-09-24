import axios from "axios";

const BASE_URL='https://thuylinh.pythonanywhere.com'
export const endpoints = {
    'tour':'/Tour/',
    'news':'/News/',
    'tourdetail':(tour_id) => `/TourDetail/${tour_id}/`,
    'newsdetail':(news_id)=> `NewsDetail/${news_id}/`,
    'login': '/o/token/',
    'current-user': '/User/current-user/',
    'signup':'/User/',
    'booktour':'/BookTourTravel/',
    'booktourdetail':'/BookTourDetail/',
    'cmt_tour': (tour_id) => `/TourDetail/${tour_id}/create_cmt_tour/`,
    'like_tour': (tour_id) => `/TourDetail/${tour_id}/like_tour/`,
    'rating_tour': (tour_id) => `/TourDetail/${tour_id}/create_rating_tour/`,
    'cmt_news': (news_id) => `/NewsDetail/${news_id}/create_cmt_news/`
};

export const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});