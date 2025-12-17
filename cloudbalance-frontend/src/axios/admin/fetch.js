import axios from "axios";

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
    return Promise.reject(error);
  }
)

fetchApi.interceptors.response.use(
    (response) => {
    return response;
  },
 async (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      console.error('Network error or server unreachable');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const {email,role} = JSON.parse(localStorage.getItem('user'));
        const response = await axios.post('/auth/refresh-token', {email,role,refreshToken:localStorage.getItem('refreshToken')}, {
          baseURL: backendUrl,
        });

        const newAccessToken = response.data.accessToken;

        localStorage.setItem('jwtToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return fetchApi(originalRequest);

      } catch (refreshError) {
        console.error('Refresh token failed. User must log in again.');
        window.location.href='/login';
        return Promise.reject(refreshError);
      }
    }
    window.location.href = '/login';
    return Promise.reject(error);
  })
