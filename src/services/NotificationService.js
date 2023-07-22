import {API} from "./http/api";
import {DefaultHeaders} from "../constants/Constants";


export async function getNotificationsApi() {
    return API.get(`/api/transport/ListAdminMessage/`, {
        headers: DefaultHeaders
    });
}