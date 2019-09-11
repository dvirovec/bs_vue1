
export function vEmpty(value) {
    return !(value && value.trim().length>0 && isNaN(value));
}

export function vNumber(value) {
    return !(value && !isNaN(value));
}

export function vIsLength(value, length) {
    return value.length == length; 
}