export const UPDATE_TOTAL = "UPDATE_TOTAL";
export const UPDATE_OCCUPIED = "UPDATE_OCCUPIED";
export const UPDATE_DATA = "UPDATE_DATA";
export const UPDATE_TOASTTYPE = "UPDATE_TOASTTYPE";


export const updateData = (payload:object)=>{
    return {type:UPDATE_DATA,payload}
}

export const updateOccupied = (payload:number)=>{
    return {type:UPDATE_OCCUPIED,payload}
}

export const updateTotal  = (payload:number)=>{
    return {type:UPDATE_TOTAL,payload}
}

export const updateToast = (payload:string)=>{
    return {type:UPDATE_TOASTTYPE,payload}
}