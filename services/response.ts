
const ok = <T>(message: string, data: T) => {
    return {
        status: "ok",
        message: message,
        data: data
    }
}


const any = <T>(message: string, data?: T) => {
    return {
        status: "any",
        message: message,
        data: data ? data : undefined
    }
}

const error = <T>(message: string) => {
    return {
        status: "error",
        message: message
    }
}


export const res = {
    ok,
    error,
    any
}