import {API} from "./http/api";
import {DefaultHeaders} from "../constants/Constants";


export async function getTransactionHistory(fromDate, toDate, page) {
    return API.get(`dWallet/transList`, {
        headers: DefaultHeaders,
        params: {
            page: page,
            fromDate: fromDate,
            toDate: toDate,
            perPage: 20
        }
    });
}

export async function requestWithdrawApi(amount) {
    const formData = new FormData()
    formData.append('amount', amount)
    return API.post(`dWallet`,
        formData,
        {
            headers: DefaultHeaders
        }
    );
}


export async function getWalletInfoApi() {
    return API.get(`dWallet`,
        {
            headers: DefaultHeaders
        }
    );
}


