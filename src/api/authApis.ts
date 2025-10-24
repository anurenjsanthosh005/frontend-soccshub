import api from './axios/axiosInstance'

type loginType = {
    username: string,
    password: string
}

export const userLogin = async (username:string,password:string) => {
    const res =  await api.post('/login/', { username,password });
    return res.data
}