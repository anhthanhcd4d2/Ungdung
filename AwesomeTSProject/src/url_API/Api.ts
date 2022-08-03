import axios from "axios";

export const baseUrl = 'https://62db4eedd1d97b9e0c4e23b6.mockapi.io/product';

 async function getUse(key:string) {
   return await axios.get(baseUrl).then((data)=>data.data.map((value:any)=> value.use[key]))
}

async function getUseInfo(getUse:string){
   return await axios.get(baseUrl).then((data)=>data.data.find((element:any)=> element.account === getUse ))
}
export {getUse,getUseInfo}

