
const errName = (name: string) => {
    return `error at local storage ${name} : `
}

export const local = {
    get: (key: string): any[] | { [key: string]: any } | null => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null
        }
        catch (error) {
            console.error(errName(key), error);
            return null
        }
    },
    set: (key: string, value: any): boolean | null => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true
        } catch (error) {
            console.error(errName(key), error);
            return null
        }
    },
    delete: (key: string): boolean | null => {
        try {
            localStorage.removeItem(key);
            return true
        } catch (error) {
            console.error(errName(key), error);
            return null
        }
    }
}