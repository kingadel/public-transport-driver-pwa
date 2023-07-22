import {API} from "./http/api";
import {DefaultHeaders} from "../constants/Constants";


export async function getAllPayloads(driver_id, vehicleTypeId, weight) {
    return API.get(`/api/transport/GetAllPayloadsWithFilter2/${vehicleTypeId}/${weight}/${driver_id}`, {
        headers: DefaultHeaders
    });
}

export async function getOrders(page, trailerId, sort, cityId) {
    const params = new FormData()
    params.append('page', page)

    params.append('perPage', 10)

    if (trailerId)
        params.append('trailerId', trailerId)

    if (cityId)
        params.append('cityId', cityId)

    params.append('sort', sort ?? '24')

    return API.get(`dOrder`, {
        params: params,
        headers: DefaultHeaders
    });
}

// export async function getCargos(page, trailerId, sort, cityId) {
//     const params = new FormData()
//     params.append('page', page)
//
//     params.append('perPage', 10)
//
//     if (trailerId)
//         params.append('trailerId', trailerId)
//
//     if (cityId)
//         params.append('cityId', cityId)
//
//     params.append('sort', sort ?? '24')
//
//     return API.get(`dCargo`, {
//         params: params,
//         headers: DefaultHeaders
//     });
// }

// export async function reserveCargoApi(driverId, payloadId, isReserved, lat, lng) {
//     const qs = require('qs');
//
//     const data = {
//         'DriverId': driverId,
//         'PayloadId': payloadId,
//         'Reserve': isReserved,
//         'Latitude': lat,
//         'Longitude': lng,
//     }
//
//     return API.post(
//         `/api/transport/ReservePayload`,
//         qs.stringify(data)
//     )
// }

export async function deliverCargoApi() {

    return API.post(
        `dCargo/dCargo/unloadApprove`,
        {
            headers: DefaultHeaders
        });
}

export async function getDeliveredCargoHistory(page) {
    const params = new FormData()
    params.append('page', page)

    params.append('perPage', '10')
    params.append('sort', '24')
    params.append('cargoFlow', '2')

    return API.get(`dCargo/myCargos`, {
        headers: DefaultHeaders,
        params: params
    });
}


export async function getOngoingCargoHistory(page) {
    const params = new FormData()

    params.append('page', page)

    params.append('perPage', '10')
    params.append('sort', '24')
    params.append('cargoFlow', '1')


    return API.get(`dCargo/myCargos`, {
        headers: DefaultHeaders,
        params: params
    });
}

export async function reserveOrderApi(orderId , promised) {
    const params = new FormData()

    params.append('orderId', orderId)
    params.append('promised', promised)

    return API.post(`dOrder`, params, {
        headers: DefaultHeaders
    });
}

export async function getOrderDetail(orderId) {
    return API.get(`dOrder/${orderId}`, {
        headers: DefaultHeaders
    });
}

export async function getCargoDetail(cargoId) {
    return API.get(`dCargo/${cargoId}`, {
        headers: DefaultHeaders
    });
}


// async function logoutApi() {
//     const token = localStorage.getItem('tb-token');
//     return API.post(`/user/logout`, null,
//         {
//             headers: {
//                 'Authorization': token,
//                 'x-api-key': 'test'
//             }
//         });
// }



