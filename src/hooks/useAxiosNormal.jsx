import axios from "axios";

const axiosNormal=axios.create({
    baseURL:'https://medi-camp-hub-server.vercel.app'
})

const useAxiosNormal = () => {
    return axiosNormal
};

export default useAxiosNormal;