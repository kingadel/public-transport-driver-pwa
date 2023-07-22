import {getToken} from "../utils/Utils";


export const BASE_URL_PRODUCTION = ""
export const BASE_URL = "" // todo should change
export const BASE_URL_TRUCK = "" // todo should change

export const DefaultHeaders = getToken() ?  {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer '+ getToken(),
    'x-api-key' : 'test'
} : {
    'Content-Type': 'application/json',
    'x-api-key' : 'test'

}