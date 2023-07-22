import {API} from "../../services/http/api";
import {DefaultHeaders} from "../../constants/Constants";
import {getBrowser, getOS} from "../../utils/Utils";


async function GetOtpApi(mobile) {
    return API.post(`/auth/otp`, {
        mobile: mobile,
        device: JSON.stringify({
            os: getOS(),
            platform: getBrowser()
        }),
        platform: 'pwa'
    }, {
        headers: DefaultHeaders
    });
}

async function ConsumeOtpApi(mobile, code) {

    return API.post(`/auth/consumeOtp`, {
        mobile: mobile,
        code: code,
        device: JSON.stringify({
            os: getOS(),
            platform: getBrowser()
        }),
    }, {
        headers: DefaultHeaders
    });

}

async function getDriverInfoApi() {

    return API.get(`/profile`, {
        headers: DefaultHeaders
    })
}


export async function updateProfileApi(params) {
    const formData = new FormData()
    formData.append('firstname', params.firstname)
    formData.append('lastname', params.lastname)
    formData.append('nationalNumber', params.nationalNumber)
    if( params.sheba)
    formData.append('sheba', params.sheba)

    return API.post(`profile`,
        formData,
        {
            headers: DefaultHeaders
        });
}

export async function ShebaInquiry(sheba) {

    const formData = new FormData()
    formData.append('iban', sheba.replace(/\D/g, ""))


    return API.post(`profile/iban`, formData,
        {
            headers: DefaultHeaders
        });
}


export {GetOtpApi, ConsumeOtpApi, getDriverInfoApi};


