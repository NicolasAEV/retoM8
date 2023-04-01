import moment from "moment"

export const fecha = (data) =>{
    return moment(data).format('DD/MM/YYYY')
}

export const calendar = (data) =>{
    return moment(data).format('YYYY-MM-DD')
}