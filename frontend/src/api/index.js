export const BASE_URL = 'http://localhost:8088/api/';
export const IMAGE_BASE_URL = 'http://localhost:8088/';

export const APIRequest = async (endPoint,method,token,body) => {
    let header = null;
    if(method === 'PUT'){
        header = {
            'Authorization': 'Barear '+ token
        }    
    } else {
        header = {
            'Content-Type':'application/json',
            'Authorization': 'Barear '+ token
        }
    }
    const response = await fetch(BASE_URL + endPoint,{
        method: method,
        headers:header,
        body:body
    })
    const result = await response?.json();
    return result;
};
