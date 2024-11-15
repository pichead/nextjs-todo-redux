
const errName = (name: string) => {
    return `error at local storage ${name} : `
}

export const local = {
    get: (key: string) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null
        }
        catch (error) {
            console.error(errName(key), error);
            return null
        }
    },
    set: (key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true
        } catch (error) {
            console.error(errName(key), error);
            return null
        }
    },
    delete: (key: string) => {
        try {
            localStorage.removeItem(key);
            return true
        } catch (error) {
            console.error(errName(key), error);
            return null
        }
    }
}