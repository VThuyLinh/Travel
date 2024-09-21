import axios from "axios";

const BASE_URL='http://127.0.0.1:9000';
export const endpoints ={

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

}


export const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/JSON",
        }
    });
}

export default axios.create({
    baseURL: BASE_URL
});

// axios.get('http://127.0.0.1:9000/Tour/')
//   .then(response => {
    
//     const data = response.data;
//     console.log(data)
//     // Xử lý dữ liệu thành công
//   })
//   .catch(error => {
   
//     console.error('Lỗi khi gọi API:', error);
//   });

// axios.get(`http://127.0.0.1:9000/Tour/`)
//       .then(res => {
//         const person = res.data.result;
//         console.info(person)
//       }).then(data => console.log("Lỗi" ,data))
//       .catch(error => console.warn(error.message));


