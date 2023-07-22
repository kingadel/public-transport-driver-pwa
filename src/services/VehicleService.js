import {API, TruckApi} from "./http/api";
import {DefaultHeaders} from "../constants/Constants";


export async function getVehicleSubtypes(vehicle_id) {
    return API.get(`/api/transport/GetAllVehivleSubTypes/${vehicle_id}/`, {
        headers: DefaultHeaders
    });
}

export async function getTruckList() {
    return TruckApi.get(`trailerType?perPage=20&sort=24`, {
        headers: DefaultHeaders
    });
}

export async function getTrailerList() {
    return TruckApi.get(`trailer?perPage=30&sort=12`, {
        headers: DefaultHeaders
    });
}

export async function addOrEditTruck(params) {
    const formData = new FormData()
    formData.append('trailerId', params.trailerId)
    formData.append('plate', params.plate)
    formData.append('capacity', params.capacity)
    formData.append('trailerTypeId', params.trailerTypeId)
    return API.post(`profile`,
        formData,
        {
            headers: DefaultHeaders
        });
}


export async function addNewTruck({capacity, plate, truckId, trailerId}) {

    const formData = new FormData()

    if (capacity)
        formData.append('capacity', capacity)
    if (plate)
        formData.append('plate', plate)
    if (truckId)
        formData.append('trailerTypeId', truckId)
    if (trailerId)
        formData.append('trailerId', trailerId)

    return API.post(`/profile`, formData, {
        headers: DefaultHeaders
    });
}
