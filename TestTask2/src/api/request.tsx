import axios from "axios";
import { OptionsType } from "../vars";


const isOdjEmpty = (options:OptionsType) => {
    if (
        options.position === '' &&
        options.gender === '' &&
        options.searchValue === '' &&
        options.technology === ''
        ){
            return true
        }
    return false
}

const createOptionsURL = (options:OptionsType) => {
    const request:string[] = ['']

    if (isOdjEmpty(options)){
        return ''
    }
    
    if (options.position !== ''){
        request.push(`Position=${options.position}`)
    }
    if (options.gender !== ''){
        request.push(`Gender=${options.gender}`)
    }
    if (options.technology !== ''){
        request.push(`Stack=${options.technology}`)
    }
    if (options.searchValue !== ''){
        request.push(`Name=${encodeURI(options.searchValue)}`)
    }

    return request.join('&')
}

export const getUsers = async (page:number, options:OptionsType)=>{

    const res = await axios.get(`https://frontend-test-api.stk8s.66bit.ru/api/Employee?Page=${page}&Count=10${createOptionsURL(options)}`)
    // const res = await axios.get(`https://frontend-test-api.stk8s.66bit.ru/api/Employee?Page=${page}&Count=10&Name=${encodeURI('Василий')}`)
    return res
}
export const getUser = async (id:number)=>{
    const res = await axios.get(`https://frontend-test-api.stk8s.66bit.ru/api/Employee/${id}`)
    return res
}