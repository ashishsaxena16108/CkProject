import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
export const fetchApi = axios.create({
    baseURL:`${backendUrl}`,
    timeout:3000,
    withCredentials:true
})

fetchApi.interceptors.request.use(async(config) => {
    const accessToken = localStorage.getItem('jwtToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("the error is this",error)
    return Promise.reject(error);
  }
)

fetchApi.interceptors.response.use(
    (response) => {
    return response;
  },
 async (error) => {
    const originalRequest = error.config;
    if (error.message==='Network Error') {
      error.response={data:{message:'Network error or server unreachable.Please try again later.'}};
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const {email,role} = JSON.parse(localStorage.getItem('user'));
        const response = await axios.post('/auth/refresh-token', {email,role,refreshToken:localStorage.getItem('refreshToken')}, {
          baseURL: backendUrl,
        });

        const newAccessToken = await response.data.accessToken;

        localStorage.setItem('jwtToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return fetchApi(originalRequest);

      } catch (refreshError) {
        error.response={data:{message:'Refresh Token is expired.Please Log In Again'}};
        toast.error('Refresh Token is expired.Please Log In Again');
        window.location.href='/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  })
