import {baseUrl, getUse} from "../Api";

async function checkAccount(value:any) {
    return  getUse('acccount').then(data => {
        console.log(value)
        return data.find((element: string) => element === value)
    });
}

async function checkPassword(value:any) {
    return  getUse('password').then(data =>{
       return  data.find((element: string) => element === value)
    });
}

export {checkAccount,checkPassword}

