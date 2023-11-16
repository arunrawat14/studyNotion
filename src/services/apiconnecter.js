import axios from "axios";

//   This functions work is to just send the call to the backedn so i made it generic for evry request 
// weather it is post request or get or update delete anything 

export const axiosInstance  = axios.create({})

export const apiConnector = (method, url, bodyData, headers, params) => {

    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data:  bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    })
 }
