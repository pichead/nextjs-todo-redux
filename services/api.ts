import { ENV } from '@/utils/constants';
import { cookiesHandler } from '@/utils/cookies';
import axios from 'axios';

const backend = ENV.backend
const accessTokenName = ENV.accessTokenName
const refreshTokenName = ENV.refreshTokenName


const apiAuth = axios.create({
    baseURL: backend,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiAuth.interceptors.request.use(request => {
    const accessToken = cookiesHandler.get(accessTokenName)
    if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
}, error => {
    return Promise.reject(error);
});

const apiPublic = axios.create({
    baseURL: backend,
    headers: {
        'Content-Type': 'application/json',
    },
});

const login = async (email: string, password: string): Promise<IResponse | null> => {
    try {

        let payload = JSON.stringify({
            "email": email,
            "password": password
        });

        const call = await apiPublic.post('/api/v1/auth/login', payload);
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const validate = async (): Promise<IResponse | null> => {
    try {
        const call = await apiAuth.get("/api/v1/auth/validate")
        const res = await call.data
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else {
            console.log(error)
            return null
        }
    }
}

const taskCreate = async () => {

}

const taskEdit = async () => {

}


const taskCompete = async () => {

}


const taskRemoveComplete = async () => {

}

const taskRemove = async () => {

}
const taskFindAll = async () => {

}
const taskFindAllActive = async () => {

}


export const apis = {
    auth: {
        login: login,
        validate: validate
    },
    task: {
        create: taskCreate,
        edit: taskEdit,
        complete: taskCompete,
        removeComplete: taskRemoveComplete,
        remove: taskRemove,
        findAll: taskFindAll,
        findAllActive: taskFindAllActive
    }
}