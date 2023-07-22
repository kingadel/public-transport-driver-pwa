export function HandleServerError(e, history) {
    console.log('error',e)
    if(!e?.status) return
    if (e.status === 406 || e.status === 401 || e.status === 403) {
        localStorage.removeItem('tb-token')
        history.replace('/login')
    } else return e
}

